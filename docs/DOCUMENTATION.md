# Documentation

CDK construct to monitor estimated billing charges with alerts and notifications. It sets up an estimated monthly billing alarm associated with an email address endpoint. It then subscribes an email endpoint to an SNS Topic or an existing SNS Topic Arn.

The construct can be used to implement multiple customizable billing alarms for master/payer accounts e.g (AWS Organization). For customizable multi-account billing alarm requirements, see [@spacecomx/cdk-organization-billing-alarm](https://github.com/spacecomx/cdk-organization-billing-alarm)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

  - [Example 1: Create a billing alarm in a single AWS account](#example_1)
  - [Example 2: Configure billing alarm with custom resource names](#example_2)
  - [Example 3: Link alarm to an existing SNS Topic Arn](#example_3)
  - [Example 4: Link alarm to a specific AWS Service](#example_4)
  - [Example 5: Link alarm to a specific AWS Account in master/payer account](#example_5)
  - [Example 6: Link alarm to a specific AWS Account and Service in master/payer account](#example_6)
  - [Example 7: Updating/Removing SNS Topic email address endpoint subscription](#example_7)

- [Post Deployment](#post-deployment)
- [API Documentation](#api-documentation)

## Prerequisites

> :warning: Before you can create a billing alarm, you must enable billing alerts in your account, or the master/payer account if you are using consolidated billing. For more information, see [Enabling Billing Alerts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics).

## Installation

TypeScript/JavaScript:

```bash
npm i @spacecomx/cdk-billing-alarm
```

or:

```bash
yarn add @spacecomx/cdk-billing-alarm
```

Python:

```bash
pip install spacecomx.cdk-billing-alarm
```

## Usage

<a name="example_1"></a>

### Example 1: Create a billing alarm in a single AWS account.

This type of billing alarm configuration will provide estimated charges for every AWS Service that you use, in addition to the estimated overall total of your AWS charges within your AWS account.

> :small_orange_diamond: The `emailAddress` is an endpoint that subscribes to the SNS topic. The `thresholdAmount` is the amount in USD, that will trigger the alarm when AWS charges exceed the threshold in you AWS account.

```typescript
import { Stack, StackProps } from '@aws-cdk/core';
import { BillingAlarm, BillingAlarmProps } from '@spacecomx/cdk-billing-alarm';

export class BillingAlarmStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const options: BillingAlarmProps = {
      topicConfiguration: {
        emailAddress: ['john@example.org'], // required
      },
      alarmConfiguration: {
        thresholdAmount: 150, // required
      },
    };

    new BillingAlarm(this, 'BillingAlarm', options);
  }
}
```

<a name="example_2"></a>

### Example 2: Configure billing alarm with custom resource names.

The configuration options are `topicConfiguration` and `alarmConfiguration`. Importing the `BillingAlarmProps` interface will provide you with all the configuration options. For more detail, see [API documentation](https://github.com/spacecomx/cdk-billing-alarm/blob/main/API.md)

> :small_orange_diamond: It is recommended that resources created by the aws-cdk, be named by the cdk itself. This will prevent resource naming conflicts with existing resources within your AWS account.

However, you can safely create user friendly descriptions for both the SNS topic and the alarm, that can be easliy identified in you AWS console for Simple Notification Service and Cloudwatch. These options are:

- **topicConfiguration**: `displayName`
- **alarmConfiguration**: `alarmDescription`

```typescript
import { Stack, StackProps } from '@aws-cdk/core';
import { BillingAlarm, BillingAlarmProps } from '@spacecomx/cdk-billing-alarm';

export class BillingAlarmStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const options: BillingAlarmProps = {
      topicConfiguration: {
        topicName: 'BillingAlarmTopic', // named by aws-cdk (recommended)
        displayName: 'Billing alarm alert topic',
        emailAddress: ['john@example.org'],
      },
      alarmConfiguration: {
        alarmName: 'Billing Alarm (All Services)', // named by aws-cdk (recommended)
        alarmDescription: 'Consolidated Billing Alarm - All AWS Services',
        thresholdAmount: 150,
      },
    };

    new BillingAlarm(this, 'BillingAlarm', options);
  }
}
```

<a name="example_3"></a>

### Example 3: Link alarm to an existing SNS Topic Arn.

When providing an existing SNS Topic Arn e.g. `arn:aws:sns:us-east-2:444455556666:MyTopic`, **no new topic** will be created within your AWS account. Any email address provided with the `emailAddress` option, will subscribe to the existing SNS topic, within your AWS account.

> :small_orange_diamond: It is not neccessary to provide any additional `topicConfiguration` options other than what is shown in the code sample below. The options `topicName` and `displayName` will be ignored as these are **only** used when creating a **new** SNS topic.

```typescript
import { Stack, StackProps } from '@aws-cdk/core';
import { BillingAlarm, BillingAlarmProps } from '@spacecomx/cdk-billing-alarm';

export class BillingAlarmStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // Assumes you already have a SNS topic in your account
    const options: BillingAlarmProps = {
      topicConfiguration: {
        existingTopicArn: 'arn:aws:sns:<REGION>:<ACCOUNT_ID>:<TOPIC_NAME>',
        emailAddress: ['john@example.org'],
      },
      alarmConfiguration: {
        alarmName: 'Billing Alarm (All Services)', // named by aws-cdk (recommended)
        alarmDescription: 'Consolidated Billing Alarm - All AWS Services',
        thresholdAmount: 150,
      },
    };

    new BillingAlarm(this, 'BillingAlarm', options);
  }
}
```

<a name="example_4"></a>

### Example 4: Link alarm to a specific AWS Service.

The billing alarm can be attached to any AWS Service used in your AWS account. This will give you fine-grain control over billing estimates for just that AWS Service. An additional configuration option `metricDimensions` is made available, to add custom metrics to the billing alarm.

Adding a AWS service name can be done in two ways, either by using the provided helper or manually:

**1. Add AWS Service name with helper -**

First import `AWSService` from the `@spacecomx/cdk-billing-alarm` package.

```typescript
import { ..., AWSService } from '@spacecomx/cdk-billing-alarm';
```

Under the `metricDimensions` configuration option, add the `service` metric option. Then select the AWS Service name that should be associated with the alarm.

```typescript
import { Stack, StackProps } from '@aws-cdk/core';
import {
  BillingAlarm,
  BillingAlarmProps,
  AWSService,
} from '@spacecomx/cdk-billing-alarm';

export class BillingAlarmStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const options: BillingAlarmProps = {
      topicConfiguration: {
        displayName: 'Billing alarm topic',
        emailAddress: ['john@example.org'],
      },
      alarmConfiguration: {
        alarmName: 'Billing Alarm (All Services)',
        alarmDescription: 'Consolidated Billing Alarm - All AWS Services',
        thresholdAmount: 150,
      },
      metricDimensions: {
        service: AWSService.AMAZON_API_GATEWAY, // added service
      },
    };

    new BillingAlarm(this, 'BillingAlarm', options);
  }
}
```

**2. Add AWS Service name manually -**

Under the `metricDimensions` configuration option, add the `service` metric option. Then add the AWS Service name that should be associated with the alarm.

> :warning: AWS Service names are case sensitive and if misspelt, will cause the cloudformation stack been deployed to your AWS account to fail.

```typescript
const options: BillingAlarmProps = {
  ...
  metricDimensions: {
    service: 'AmazonApiGateway',
  },
};
```

<a name="example_5"></a>

### Example 5: Link alarm to a specific AWS Account in master/payer account.

The billing alarm can be attached to a specific linked account within an AWS Organization, master/payer or consolidate billing account. An additional configuration option `metricDimensions` is made available, to add custom metrics to the billing alarm. See [API documentation](https://github.com/spacecomx/cdk-billing-alarm/blob/main/API.md) for details.

> :warning: Before you can create a billing alarm, you must enable billing alerts in your account, or the master/payer account if you are using consolidated billing. For more information, see [Enabling Billing Alerts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics).

Under the `metricDimensions` configuration option, add the `account` metric option. Then add the AWS account ID that should be associated with the alarm.

```typescript
const options: BillingAlarmProps = {
  ...
  metricDimensions: {
    account: '123456789000', // added account
  },
};
```

<a name="example_6"></a>

### Example 6: Link alarm to a specific AWS Account and Service in master/payer account.

- it creates a new billing alarm stack within the master/payer account.
- it creates new topic, email subscription and associates the billing alarm to the AWS linked account in the master/payer account.
- the added option `service: AWSServices.AMAZON_S3` provides a consolidate estimated charge, for **only** the AWS Amazon S3 services used by the linked account.

> :small_orange_diamond: Under the `alarmConfiguration` configuration option, add the `numberOfHours` metric option to customize how often the metric should be updated. The default is every 6 hours (recommended).

```typescript
import { Stack, StackProps } from '@aws-cdk/core';
import {
  BillingAlarm,
  BillingAlarmProps,
  AWSService,
} from '@spacecomx/cdk-billing-alarm';

export class BillingAlarmStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const options: BillingAlarmProps = {
      topicConfiguration: {
        displayName: 'Billing alarm topic',
        emailAddress: ['john@example.org'],
      },
      alarmConfiguration: {
        alarmDescription: 'Billing Alarm Amazon S3 (Account: 123456789000)',
        numberOfHours: 6, // default (recommended)
        thresholdAmount: 150,
      },
      metricDimensions: {
        account: '123456789000', // added service
        service: AWSService.AMAZON_S3, // added service
      },
    };

    new BillingAlarm(this, 'BillingAlarm', options);
  }
}
```

<a name="example_7"></a>

### Example 7: Updating/Removing SNS Topic email address endpoint subscription.

When would you use this option?

- When an existing SNS topic that already has an email address endpoint subscribed to it,
- or you dont require any additional email address endpoints to be added to the existing topic,
- or you want to add your own email address endpoints manually to the SNS topic (not recommended),
- or you want to remove an email address endpoints from the SNS topic created with the package,
- or you want to add or update email address endpoints for the SNS topic using the package.

> :small_orange_diamond: To manage adding and removing endpoints for the SNS topic, use the packages `emailAddress` option. You can simply set the `emailAddress: ['john@example.org']` option to `emailAddress: []`. Please note that email endpoint subscriptions created manually via AWS SNS Console will not be removed by the package.

```typescript
const options: BillingAlarmProps = {
  topicConfiguration: {
    emailAddress: [],
  },
  ...
};
```

Adding and removing endpoints means **_you will need to again confirm the subscription_** of each email address you specified with `emailAddress` option or those manually by you e.g AWS SNS console (not recommended). See [post deployment](#post-deployment) for details.

> :warning: Please be **cautious**. Without an endpoint been provided i.e. (email address been subscribed to the SNS topic), the billing alarm will still trigger when exceeding the alarm threshold. However you will **not recieve any email alarm notifications** via email.

## Post Deployment

Once the Billing Alarm Stack resources has been successfully created in your AWS account, you will need to confirm the subscription of each email address you specified with the `emailAddress` configuration option. Clicking on the **"Confirm Subscription"** link for that email, will automatically activate billing alarm notifications for that email address.

If you did not receive the email, you can process a **"Request Confirmation"** for the subscription from the Simple Notification Service (SNS) console within your AWS account.

> :warning: Without confirming the email subscription you will **not recieve any email alarm notifications** via email. The billing alarm will trigger when exceeding the alarm threshold, but **you will not be notified** via email.

## API Documentation

See [API documentation](https://github.com/spacecomx/cdk-billing-alarm/blob/main/API.md) for details.
