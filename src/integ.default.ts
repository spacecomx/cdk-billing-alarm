import * as cdk from '@aws-cdk/core';
import { AWSService } from './aws-services';
import { BillingAlarm, BillingAlarmProps } from './index';

export class BasicBillingAlarmTest {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'TestStack', { env });

    const config: BillingAlarmProps = {
      topicConfiguration: {
        emailAddress: ['john@example.org'],
      },
      alarmConfiguration: {
        thresholdAmount: 20,
      },
    };

    new BillingAlarm(stack, 'BillingAlarm', config);

    this.stack = [stack];
  }
}

export class BillingAlarmWithoutEmailSubscriptionTest {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'TestStack', { env });

    const config: BillingAlarmProps = {
      topicConfiguration: {
        emailAddress: [],
      },
      alarmConfiguration: {
        thresholdAmount: 20,
      },
    };

    new BillingAlarm(stack, 'BillingAlarm', config);

    this.stack = [stack];
  }
}

export class BillingAlarmWithCustomResourceNamesTest {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'TestStack', { env });

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

    this.stack = [stack];
  }
}

export class LinkExistingTopicArnToBillingAlarmTest {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'TestStack', { env });

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

    this.stack = [stack];
  }
}

export class LinkBillingAlarmToAwsAccountIdTest {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'TestStack', { env });

    const config: BillingAlarmProps = {
      topicConfiguration: {
        displayName: 'Billing alarm topic for monthly alarm estimates',
        emailAddress: ['john@example.org'],
      },
      alarmConfiguration: {
        alarmName: 'Billing Alarm All Services (Account: 123456789000)',
        alarmDescription: 'Billing Alarm all services (Account: 123456789000)',
        thresholdAmount: 20,
      },
      metricDimensions: {
        account: '123456789000',
      },
    };

    new BillingAlarm(stack, 'BillingAlarm', config);

    this.stack = [stack];
  }
}

export class LinkBillingAlarmToAwsServiceTest {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'TestStack', { env });

    const config: BillingAlarmProps = {
      topicConfiguration: {
        displayName: 'Billing alarm topic for monthly alarm estimates',
        emailAddress: ['john@example.org'],
      },
      alarmConfiguration: {
        alarmName: 'Billing Alarm (Amazon S3)',
        alarmDescription: 'Billing Alarm for all Amazon S3 charges',
        thresholdAmount: 20,
      },
      metricDimensions: {
        service: AWSService.AMAZON_S3,
      },
    };

    new BillingAlarm(stack, 'BillingAlarm', config);

    this.stack = [stack];
  }
}

export class LinkBillingAlarmToAwsAccountIdToAwsServiceTest {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'TestStack', { env });

    const config: BillingAlarmProps = {
      topicConfiguration: {
        displayName: 'Billing alarm topic for monthly alarm estimates',
        emailAddress: ['john@example.org'],
      },
      alarmConfiguration: {
        alarmName: 'Billing Alarm Amazon S3 (Account: 123456789000)',
        alarmDescription: 'Billing Alarm for all Amazon S3 charges (Account: 123456789000)',
        thresholdAmount: 20,
      },
      metricDimensions: {
        account: '123456789000',
        service: AWSService.AMAZON_S3,
      },
    };

    new BillingAlarm(stack, 'BillingAlarm', config);

    this.stack = [stack];
  }
}

