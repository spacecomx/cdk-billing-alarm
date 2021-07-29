# @spacecomx/cdk-billing-alarm

[![Build status](https://github.com/spacecomx/cdk-billing-alarm/workflows/build/badge.svg)](https://github.com/spacecomx/cdk-billing-alarm/actions/)
[![npm version](https://badge.fury.io/js/%40spacecomx%2Fcdk-billing-alarm.svg)](https://badge.fury.io/js/%40spacecomx%2Fcdk-billing-alarm)

High level CDK construct to monitor estimated billing charges with alerts and notifications. It sets up an estimated monthly billing alarm associated with an email address endpoint. It then subscribes the endpoint to an SNS Topic or an existing SNS Topic Arn.

The CDK construct can be used to implement multiple customizable billing alarms for single or master/payer linked AWS accounts e.g (AWS Organisations). Customizing the billing alarm gives you the capability to monitor specific AWS Service charges, by specific linked AWS account in a master/payer account.

## Features

Some features built-in:

- consolidated charge estimates of all AWS services in your AWS account.
- associate the billing alarm with an existing SNS topic Arn in your AWS account.
- consolidated charges for a specific AWS service used by your AWS account e.g. Amazon DynamoDB.
- consolidated charges for all linked accounts within the master/payer account e.g. AWS Organization.
- consolidated charges for a specific linked account within a master/payer account.
- consolidated charges for a specific AWS service and linked account within the master/payer account.

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

## Setup basic billing alarm in your AWS account

This type of billing alarm configuration will provide estimated charges for every AWS Service that you use, in addition to the estimated overall total of your AWS charges within your AWS account. See [documentation](./docs/DOCUMENTATION.md) for more examples and custom implementations.

> :small_orange_diamond: The `emailAddress` is an endpoint that subscribes to a SNS topic. The `thresholdAmount` is the amount in USD, that will trigger the alarm when AWS charges exceed the threshold.

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
        alarmDescription: 'Billing alarm alert for all account AWS services',
        thresholdAmount: 150, // required
      },
    };

    new BillingAlarm(this, 'BillingAlarm', options);
  }
}
```

## Documentation

See [documentation](./docs/DOCUMENTATION.md) for more examples and custom implemenations.

## API Documentation

See [API documentation](./../API.md) for details.

## Contributions

Contributions of all kinds are welcome! Check out our [contributor's guide](./CONTRIBUTING.md) and our [code of conduct](./CODE_OF_CONDUCT.md)

## Credits

- [Wayne Gibson](https://github.com/waynegibson)

## Alternatives

- [aws-cdk-billing-alarm](https://github.com/alvyn279/aws-cdk-billing-alarm)

## License

@spacecomx/cdk-billing-alarm is distributed under the [MIT](./LICENSE) license.
