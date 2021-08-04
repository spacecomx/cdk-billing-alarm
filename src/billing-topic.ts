import { Topic, ITopic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { Construct } from '@aws-cdk/core';

export interface TopicOptions {
  /**
   * The name of the topic.
   *
   * If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the topic name (recommended).
   *
   * @default Generated name
   */
  readonly topicName?: string;
  /**
   * The display name of the topic. A developer-defined string that can be used to identify this SNS topic.
   *
   * @default - Not configured
   */
  readonly displayName?: string;
  /**
   * Use an existing SNS topic ARN e.g. ('arn:aws:sns:us-east-2:444455556666:MyTopic').
   *
   * @default - Not configured
   */
  readonly existingTopicArn?: string;
}

export interface SubscribeOptions {
  /**
   * The email address that will be used to subcribe to the SNS topic for billing alert notifications e.g. ['hello@example.org'] or [''hello@example.org', 'admin@example.org'].
   */
  readonly emailAddress: string[];
  /**
   * Indicates if the full notification JSON should be sent to the email address or just the message text.
   *
   * @default false (Message text)
   */
  readonly json?: boolean;
}

export interface BillingTopicProps extends TopicOptions, SubscribeOptions {}

/**
 * A construct to create a new SNS topic or use an existing SNS topic Arn. It then subscribes the configured email address to the SNS topic or the existing SNS topic Arn.
 *
 * @example
 *
 * new BillingTopic(stack, 'BillingTopic', {
 *   emailAddress: ['hello@example.org']
 * });
 */
export class BillingTopic extends Construct {
  readonly topic: ITopic;

  constructor(scope: Construct, id: string, props: BillingTopicProps) {
    super(scope, id);

    const { topicName, displayName, existingTopicArn }: TopicOptions = props;
    const { emailAddress, json = false }: SubscribeOptions = props;

    // 1. Create new SNS topic or use and existing SNS topic arn.
    const topic = this.createTopicOrUseExisting({ topicName, displayName, existingTopicArn });

    // 2. Check if any email address subscriptions need to be associated with the topic.
    if (typeof emailAddress !== 'undefined' && emailAddress.length > 0) {
      this.createTopicEmailSubscription(topic, { emailAddress, json });
    }

    this.topic = topic;
  }

  /**
   * Create a SNS topic or use and existing SNS topic arn.
   *
   * @param options
   * @returns
   */
  private createTopicOrUseExisting(options: TopicOptions): ITopic {
    const { topicName, displayName, existingTopicArn } = options;

    const topic = existingTopicArn
      ? Topic.fromTopicArn(this, 'Topic', existingTopicArn)
      : new Topic(this, 'Topic', { topicName, displayName });

    return topic;
  }

  /**
   * Create email address subscription and associate the SNS topic.
   *
   * @param topic
   * @param options
   */
  private createTopicEmailSubscription(topic: ITopic, options: SubscribeOptions): void {
    const { emailAddress, json } = options;

    emailAddress.forEach((email: string): void => {
      topic.addSubscription(new EmailSubscription(email, { json: json }));
    });
  }
}