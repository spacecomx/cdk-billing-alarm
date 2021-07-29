import { Metric, MetricProps, Alarm, AlarmProps, ComparisonOperator } from '@aws-cdk/aws-cloudwatch';
import { SnsAction } from '@aws-cdk/aws-cloudwatch-actions';
import { ITopic } from '@aws-cdk/aws-sns';
import { Construct, Duration, CfnOutput } from '@aws-cdk/core';
import { AWSService } from './aws-services';
import { BillingTopic, BillingTopicProps } from './billing-topic';
import { mapObjectKeys, ObjectMap } from './helper';

export interface AlarmOptions {
  /**
   * Name of the alarm.
   *
   * If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the alarm name (recommended).
   *
   * @default Generated name
   */
  readonly alarmName?: string;
  /**
  * Description for the alarm. A developer-defined string that can be used to identify this alarm.
  *
  * @default - Not configured
  */
  readonly alarmDescription?: string;
  /**
   * Enter the monthly threshold amount in USD that must be exceeded to trigger the alarm e.g. (thresholdAmount: 150).
   */
  readonly thresholdAmount: number;
  /**
   * Evaluates the metric every few hours as `EstimatedCharges` metrics are updated every 6 hours.
   *
   * @default Duration.hours(6)
   */
  readonly numberOfHours?: number;
}

export interface MetricDimensionOptions {
  /**
   * Account which this metric comes from.
   *
   * @default - Not configured.
   */
  readonly account?: string;
  /**
  * Region which this metric comes from.
  *
  * @default - Not configured.
  */
  readonly region?: string;
  /**
  * The AWS Service to associate the alarm with e.g (AWSService.AMAZON_API_GATEWAY)
  *
  * @default - Not configured.
  */
  readonly service?: AWSService | string;
}

export interface BillingAlarmProps {
  /** Topic configuration options to configure the SNS topic and email address's that will be used to subscribe to the topic. */
  readonly topicConfiguration: BillingTopicProps;

  /** Alarm configuration options to configure the billing alarm e.g. (name, description etc.). */
  readonly alarmConfiguration: AlarmOptions;

  /** Metric dimension options to configure advanced alarm metrics e.g. (link the alarm to a specific account, region or AWS service). */
  readonly metricDimensions?: MetricDimensionOptions;
}

/**
 * A construct to create an estimated monthly billing alarm associated with an SNS topic, and estimate billing alert notifications via email.
 *
 * @example
 *
 * new BillingAlarm(this, 'BillingAlarm', {
 *  topicConfiguration: {
 *    emailAddress: ['hello@example.org'],
 *  },
 *  alarmConfiguration: {
 *    thresholdAmount: 20,
 *  }
 * });
 */
export class BillingAlarm extends Construct {
  constructor(scope: Construct, id: string, props: BillingAlarmProps) {
    super(scope, id);

    let metricDimensions = {};
    const metricDimensionOptions: MetricDimensionOptions | undefined = props.metricDimensions;
    const topicConfig: BillingTopicProps = props.topicConfiguration;
    const { alarmName, alarmDescription, thresholdAmount, numberOfHours = 6 }: AlarmOptions = props.alarmConfiguration;

    // 1. Check if any any custom metric dimensions are included before creating the metric.
    if (typeof metricDimensionOptions !== 'undefined' && Object.keys(metricDimensionOptions).length > 0) {
      const obj: ObjectMap = { ...metricDimensionOptions };

      const mapping: ObjectMap = {
        account: 'LinkedAccount',
        region: 'Region',
        service: 'ServiceName',
      };

      metricDimensions = mapObjectKeys(obj, mapping);
    }

    // 2. Create an SNS topic and associate the SNS action to the topic.

    const { topic } = new BillingTopic(this, 'Topic', topicConfig);
    const snsAction = this.createSnsAction(topic);

    // 3. Create the metric, inclusive of any custom metric dimensions.
    const metricConfig: MetricProps = {
      metricName: 'EstimatedCharges',
      namespace: 'AWS/Billing',
      statistic: 'Maximum',
      dimensionsMap: { Currency: 'USD', ...metricDimensions },
    };
    const metric = this.createMetric(metricConfig, numberOfHours);

    // 4. Create the alarm and associate the alarm to SNS action.
    const alarmConfig: AlarmProps = {
      alarmName,
      alarmDescription,
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      metric: metric,
      threshold: thresholdAmount,
    };
    const alarm = this.createAlarm(alarmConfig);
    alarm.addAlarmAction(snsAction);

    // 5. Output cloudformation variables for consumption.
    new CfnOutput(this, 'TopicArn', {
      value: topic.topicArn,
      description: 'Billing Alarm Topic Arn.',
    });
  }

  /**
   * Create a metric.
   *
   * @param props
   * @param amount
   * @returns
   */
  private createMetric(props: MetricProps, amount: number): Metric {
    const metric: Metric = new Metric(props).with({
      period: Duration.hours(amount),
    });

    return metric;
  }

  /**
   * Create an alarm.
   *
   * @param config
   * @returns
   */
  private createAlarm(props: AlarmProps): Alarm {
    const alarm: Alarm = new Alarm(this, 'Alarm', props);

    return alarm;
  }

  /**
   * Create a SNS action.
   *
   * @param topic
   * @returns
   */
  private createSnsAction(topic: ITopic): SnsAction {
    const action: SnsAction = new SnsAction(topic);

    return action;
  }
}