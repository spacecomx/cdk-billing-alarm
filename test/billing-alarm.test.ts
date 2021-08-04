import { countResources, expect as expectCDK, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { BillingAlarm, BillingAlarmProps, AWSService } from '../src';

test('ensure resources exist to create a basic billing alarm', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      emailAddress: ['john@example.org'],
    },
    alarmConfiguration: {
      thresholdAmount: 20,
    },
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 1));

  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Subscription', {
      TopicArn: { Ref: 'BillingAlarmTopic524A3288' },
      Endpoint: 'john@example.org',
      Protocol: 'email',
    }),
  );

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::CloudWatch::Alarm', {
      AlarmActions: [
        { Ref: 'BillingAlarmTopic524A3288' },
      ],
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 21600,
      Statistic: 'Maximum',
      Threshold: 20,
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD',
        },
      ],
    }),
  );
});

test('ensure resources exist to create multiple email address subscriptions associated with the sns topic', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      emailAddress: ['john@example.org', 'jane@example.org'],
    },
    alarmConfiguration: {
      thresholdAmount: 20,
    },
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 1));

  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 2));
  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Subscription', {
      TopicArn: { Ref: 'BillingAlarmTopic524A3288' },
      Endpoint: 'john@example.org',
      Protocol: 'email',
    }),
  );
  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Subscription', {
      TopicArn: { Ref: 'BillingAlarmTopic524A3288' },
      Endpoint: 'jane@example.org',
      Protocol: 'email',
    }),
  );

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::CloudWatch::Alarm', {
      AlarmActions: [
        { Ref: 'BillingAlarmTopic524A3288' },
      ],
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 21600,
      Statistic: 'Maximum',
      Threshold: 20,
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD',
        },
      ],
    }),
  );
});

test('ensure resource do not exist when creating a billing alarm without an email address subscription', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      emailAddress: [],
    },
    alarmConfiguration: {
      thresholdAmount: 20,
    },
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 1));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 0));

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::CloudWatch::Alarm', {
      AlarmActions: [
        { Ref: 'BillingAlarmTopic524A3288' },
      ],
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 21600,
      Statistic: 'Maximum',
      Threshold: 20,
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD',
        },
      ],
    }),
  );
});

test('ensure resources exist to create a billing alarm with custom resource names', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      topicName: 'BillingAlarmTopic',
      displayName: 'Billing alarm topic for monthly alarm estimates',
      emailAddress: ['john@example.org'],
    },
    alarmConfiguration: {
      alarmName: 'Billing Alarm (All Services)',
      alarmDescription: 'Alarm threshold alert for every AWS Service used in the account',
      thresholdAmount: 20,
    },
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Topic', {
      DisplayName: 'Billing alarm topic for monthly alarm estimates',
      TopicName: 'BillingAlarmTopic',
    }),
  );

  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Subscription', {
      TopicArn: { Ref: 'BillingAlarmTopic524A3288' },
      Endpoint: 'john@example.org',
      Protocol: 'email',
    }),
  );

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::CloudWatch::Alarm', {
      AlarmActions: [
        { Ref: 'BillingAlarmTopic524A3288' },
      ],
      AlarmDescription: 'Alarm threshold alert for every AWS Service used in the account',
      AlarmName: 'Billing Alarm (All Services)',
      EvaluationPeriods: 1,
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 21600,
      Statistic: 'Maximum',
      Threshold: 20,
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD',
        },
      ],
    }),
  );
});

test('ensure resource exists for usd currency estimate totals', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      emailAddress: ['john@example.org'],
    },
    alarmConfiguration: {
      thresholdAmount: 20,
    },
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(haveResourceLike('AWS::CloudWatch::Alarm', {
    Dimensions: [
      {
        Name: 'Currency',
        Value: 'USD',
      },
    ],
  }));
});

test('ensure resource exists when linking aws account id to billing alarm', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      emailAddress: ['john@example.org'],
    },
    alarmConfiguration: {
      thresholdAmount: 20,
    },
    metricDimensions: {
      account: '123456789000',
    },
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(haveResourceLike('AWS::CloudWatch::Alarm', {
    Dimensions: [
      {
        Name: 'Currency',
        Value: 'USD',
      },
      {
        Name: 'LinkedAccount',
        Value: '123456789000',
      },
    ],
  }));
});

test('ensure resource exists when linking aws account id and region to billing alarm', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      emailAddress: ['john@example.org'],
    },
    alarmConfiguration: {
      thresholdAmount: 20,
    },
    metricDimensions: {
      account: '123456789000',
      region: 'us-east-1',
    },
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(haveResourceLike('AWS::CloudWatch::Alarm', {
    Dimensions: [
      {
        Name: 'Currency',
        Value: 'USD',
      },
      {
        Name: 'LinkedAccount',
        Value: '123456789000',
      },
      {
        Name: 'Region',
        Value: 'us-east-1',
      },
    ],
  }));
});

test('ensure resource exists when linking aws service with helper to billing alarm', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      emailAddress: ['john@example.org'],
    },
    alarmConfiguration: {
      thresholdAmount: 20,
    },
    metricDimensions: {
      service: AWSService.AMAZON_API_GATEWAY,
    },
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(haveResourceLike('AWS::CloudWatch::Alarm', {
    Dimensions: [
      {
        Name: 'Currency',
        Value: 'USD',
      },
      {
        Name: 'ServiceName',
        Value: 'AmazonApiGateway',
      },
    ],
  }));
});

test('ensure resource exists when linking aws service manually to billing alarm', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      emailAddress: ['john@example.org'],
    },
    alarmConfiguration: {
      thresholdAmount: 20,
    },
    metricDimensions: {
      service: 'AmazonApiGateway',
    },
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(haveResourceLike('AWS::CloudWatch::Alarm', {
    Dimensions: [
      {
        Name: 'Currency',
        Value: 'USD',
      },
      {
        Name: 'ServiceName',
        Value: 'AmazonApiGateway',
      },
    ],
  }));
});

test('ensure resource exists when linking aws account id and aws service manually to billing alarm', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      emailAddress: ['john@example.org'],
    },
    alarmConfiguration: {
      thresholdAmount: 20,
    },
    metricDimensions: {
      account: '123456789000',
      service: 'AmazonApiGateway',
    },
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(haveResourceLike('AWS::CloudWatch::Alarm', {
    Dimensions: [
      {
        Name: 'Currency',
        Value: 'USD',
      },
      {
        Name: 'LinkedAccount',
        Value: '123456789000',
      },
      {
        Name: 'ServiceName',
        Value: 'AmazonApiGateway',
      },
    ],
  }));
});

test('ensure resource does not exists and fails silently when additional metric dimension options are not provided', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      emailAddress: ['john@example.org'],
    },
    alarmConfiguration: {
      thresholdAmount: 20,
    },
    metricDimensions: {}, // no additional options configured
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 1));
  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 1));

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(haveResourceLike('AWS::CloudWatch::Alarm', {
    Dimensions: [
      {
        Name: 'Currency',
        Value: 'USD',
      },
    ],
  }));
});

test('ensure resources exist when providing an existing topic arn to associate with the billing alarm', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const config: BillingAlarmProps = {
    topicConfiguration: {
      existingTopicArn: 'arn:aws:sns:us-east-1:444455556666:BillingAlarmTopic',
      emailAddress: ['john@example.org'],
    },
    alarmConfiguration: {
      thresholdAmount: 20,
    },
  };

  new BillingAlarm(stack, 'BillingAlarm', config);

  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));

  expectCDK(stack).to(countResources('AWS::SNS::Subscription', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::SNS::Subscription', {
      Endpoint: 'john@example.org',
      Protocol: 'email',
      TopicArn: 'arn:aws:sns:us-east-1:444455556666:BillingAlarmTopic',
    }),
  );

  expectCDK(stack).to(countResources('AWS::CloudWatch::Alarm', 1));
  expectCDK(stack).to(
    haveResourceLike('AWS::CloudWatch::Alarm', {
      AlarmActions: [
        'arn:aws:sns:us-east-1:444455556666:BillingAlarmTopic',
      ],
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      EvaluationPeriods: 1,
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 21600,
      Statistic: 'Maximum',
      Threshold: 20,
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD',
        },
      ],
    }),
  );
});