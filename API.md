# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### BillingAlarm <a name="@spacecomx/cdk-billing-alarm.BillingAlarm"></a>

A construct to create an estimated monthly billing alarm associated with an SNS topic, and estimate billing alert notifications via email.

#### Initializers <a name="@spacecomx/cdk-billing-alarm.BillingAlarm.Initializer"></a>

```typescript
import { BillingAlarm } from '@spacecomx/cdk-billing-alarm'

new BillingAlarm(scope: Construct, id: string, props: BillingAlarmProps)
```

##### `scope`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.BillingAlarm.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.BillingAlarm.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.BillingAlarm.parameter.props"></a>

- *Type:* [`@spacecomx/cdk-billing-alarm.BillingAlarmProps`](#@spacecomx/cdk-billing-alarm.BillingAlarmProps)

---



#### Properties <a name="Properties"></a>

##### `topicArn`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.BillingAlarm.property.topicArn"></a>

```typescript
public readonly topicArn: CfnOutput;
```

- *Type:* [`@aws-cdk/core.CfnOutput`](#@aws-cdk/core.CfnOutput)

---


### BillingTopic <a name="@spacecomx/cdk-billing-alarm.BillingTopic"></a>

A construct to create a new SNS topic or use an existing SNS topic Arn.

It then subscribes the configured email address to the SNS topic or the existing SNS topic Arn.

#### Initializers <a name="@spacecomx/cdk-billing-alarm.BillingTopic.Initializer"></a>

```typescript
import { BillingTopic } from '@spacecomx/cdk-billing-alarm'

new BillingTopic(scope: Construct, id: string, props: BillingTopicProps)
```

##### `scope`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.BillingTopic.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.BillingTopic.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.BillingTopic.parameter.props"></a>

- *Type:* [`@spacecomx/cdk-billing-alarm.BillingTopicProps`](#@spacecomx/cdk-billing-alarm.BillingTopicProps)

---



#### Properties <a name="Properties"></a>

##### `topic`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.BillingTopic.property.topic"></a>

```typescript
public readonly topic: ITopic;
```

- *Type:* [`@aws-cdk/aws-sns.ITopic`](#@aws-cdk/aws-sns.ITopic)

---


## Structs <a name="Structs"></a>

### AlarmOptions <a name="@spacecomx/cdk-billing-alarm.AlarmOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { AlarmOptions } from '@spacecomx/cdk-billing-alarm'

const alarmOptions: AlarmOptions = { ... }
```

##### `thresholdAmount`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.AlarmOptions.property.thresholdAmount"></a>

```typescript
public readonly thresholdAmount: number;
```

- *Type:* `number`

Enter the monthly threshold amount in USD that must be exceeded to trigger the alarm e.g. (thresholdAmount: 150).

---

##### `alarmDescription`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.AlarmOptions.property.alarmDescription"></a>

```typescript
public readonly alarmDescription: string;
```

- *Type:* `string`
- *Default:* Not configured

Description for the alarm.

A developer-defined string that can be used to identify this alarm.

---

##### `alarmName`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.AlarmOptions.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* `string`
- *Default:* Generated name

Name of the alarm.

If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the alarm name (recommended).

---

##### `numberOfHours`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.AlarmOptions.property.numberOfHours"></a>

```typescript
public readonly numberOfHours: number;
```

- *Type:* `number`
- *Default:* Duration.hours(6)

Evaluates the metric every few hours as `EstimatedCharges` metrics are updated every 6 hours.

---

### BillingAlarmProps <a name="@spacecomx/cdk-billing-alarm.BillingAlarmProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { BillingAlarmProps } from '@spacecomx/cdk-billing-alarm'

const billingAlarmProps: BillingAlarmProps = { ... }
```

##### `alarmConfiguration`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.BillingAlarmProps.property.alarmConfiguration"></a>

```typescript
public readonly alarmConfiguration: AlarmOptions;
```

- *Type:* [`@spacecomx/cdk-billing-alarm.AlarmOptions`](#@spacecomx/cdk-billing-alarm.AlarmOptions)

Alarm configuration options to configure the billing alarm e.g. (name, description etc.).

---

##### `topicConfiguration`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.BillingAlarmProps.property.topicConfiguration"></a>

```typescript
public readonly topicConfiguration: BillingTopicProps;
```

- *Type:* [`@spacecomx/cdk-billing-alarm.BillingTopicProps`](#@spacecomx/cdk-billing-alarm.BillingTopicProps)

Topic configuration options to configure the SNS topic and email address's that will be used to subscribe to the topic.

---

##### `metricDimensions`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.BillingAlarmProps.property.metricDimensions"></a>

```typescript
public readonly metricDimensions: MetricDimensionOptions;
```

- *Type:* [`@spacecomx/cdk-billing-alarm.MetricDimensionOptions`](#@spacecomx/cdk-billing-alarm.MetricDimensionOptions)

Metric dimension options to configure advanced alarm metrics e.g. (link the alarm to a specific account, region or AWS service).

---

### BillingTopicProps <a name="@spacecomx/cdk-billing-alarm.BillingTopicProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { BillingTopicProps } from '@spacecomx/cdk-billing-alarm'

const billingTopicProps: BillingTopicProps = { ... }
```

##### `displayName`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.BillingTopicProps.property.displayName"></a>

```typescript
public readonly displayName: string;
```

- *Type:* `string`
- *Default:* Not configured

The display name of the topic.

A developer-defined string that can be used to identify this SNS topic.

---

##### `existingTopicArn`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.BillingTopicProps.property.existingTopicArn"></a>

```typescript
public readonly existingTopicArn: string;
```

- *Type:* `string`
- *Default:* Not configured

Use an existing SNS topic ARN e.g. ('arn:aws:sns:us-east-2:444455556666:MyTopic').

---

##### `topicName`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.BillingTopicProps.property.topicName"></a>

```typescript
public readonly topicName: string;
```

- *Type:* `string`
- *Default:* Generated name

The name of the topic.

If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the topic name (recommended).

---

##### `emailAddress`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.BillingTopicProps.property.emailAddress"></a>

```typescript
public readonly emailAddress: string[];
```

- *Type:* `string`[]

The email address that will be used to subcribe to the SNS topic for billing alert notifications e.g. ['hello@example.org'] or [''hello@example.org', 'admin@example.org'].

---

##### `json`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.BillingTopicProps.property.json"></a>

```typescript
public readonly json: boolean;
```

- *Type:* `boolean`
- *Default:* false (Message text)

Indicates if the full notification JSON should be sent to the email address or just the message text.

---

### MetricDimensionOptions <a name="@spacecomx/cdk-billing-alarm.MetricDimensionOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { MetricDimensionOptions } from '@spacecomx/cdk-billing-alarm'

const metricDimensionOptions: MetricDimensionOptions = { ... }
```

##### `account`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.MetricDimensionOptions.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* `string`
- *Default:* Not configured.

Account which this metric comes from.

---

##### `region`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.MetricDimensionOptions.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* `string`
- *Default:* Not configured.

Region which this metric comes from.

---

##### `service`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.MetricDimensionOptions.property.service"></a>

```typescript
public readonly service: string;
```

- *Type:* `string`
- *Default:* Not configured.

The AWS Service to associate the alarm with e.g (AWSService.AMAZON_API_GATEWAY).

---

### SubscribeOptions <a name="@spacecomx/cdk-billing-alarm.SubscribeOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { SubscribeOptions } from '@spacecomx/cdk-billing-alarm'

const subscribeOptions: SubscribeOptions = { ... }
```

##### `emailAddress`<sup>Required</sup> <a name="@spacecomx/cdk-billing-alarm.SubscribeOptions.property.emailAddress"></a>

```typescript
public readonly emailAddress: string[];
```

- *Type:* `string`[]

The email address that will be used to subcribe to the SNS topic for billing alert notifications e.g. ['hello@example.org'] or [''hello@example.org', 'admin@example.org'].

---

##### `json`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.SubscribeOptions.property.json"></a>

```typescript
public readonly json: boolean;
```

- *Type:* `boolean`
- *Default:* false (Message text)

Indicates if the full notification JSON should be sent to the email address or just the message text.

---

### TopicOptions <a name="@spacecomx/cdk-billing-alarm.TopicOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { TopicOptions } from '@spacecomx/cdk-billing-alarm'

const topicOptions: TopicOptions = { ... }
```

##### `displayName`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.TopicOptions.property.displayName"></a>

```typescript
public readonly displayName: string;
```

- *Type:* `string`
- *Default:* Not configured

The display name of the topic.

A developer-defined string that can be used to identify this SNS topic.

---

##### `existingTopicArn`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.TopicOptions.property.existingTopicArn"></a>

```typescript
public readonly existingTopicArn: string;
```

- *Type:* `string`
- *Default:* Not configured

Use an existing SNS topic ARN e.g. ('arn:aws:sns:us-east-2:444455556666:MyTopic').

---

##### `topicName`<sup>Optional</sup> <a name="@spacecomx/cdk-billing-alarm.TopicOptions.property.topicName"></a>

```typescript
public readonly topicName: string;
```

- *Type:* `string`
- *Default:* Generated name

The name of the topic.

If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the topic name (recommended).

---



## Enums <a name="Enums"></a>

### AWSService <a name="AWSService"></a>

List of AWS Services to used to link a service to a billing alarm.

#### `AMAZON_API_GATEWAY` <a name="@spacecomx/cdk-billing-alarm.AWSService.AMAZON_API_GATEWAY"></a>

---


#### `AMAZON_CLOUD_FRONT` <a name="@spacecomx/cdk-billing-alarm.AWSService.AMAZON_CLOUD_FRONT"></a>

---


#### `AMAZON_CLOUD_WATCH` <a name="@spacecomx/cdk-billing-alarm.AWSService.AMAZON_CLOUD_WATCH"></a>

---


#### `AMAZON_DYNAMO_DB` <a name="@spacecomx/cdk-billing-alarm.AWSService.AMAZON_DYNAMO_DB"></a>

---


#### `AMAZON_RDS` <a name="@spacecomx/cdk-billing-alarm.AWSService.AMAZON_RDS"></a>

---


#### `AMAZON_ROUTE_53` <a name="@spacecomx/cdk-billing-alarm.AWSService.AMAZON_ROUTE_53"></a>

---


#### `AMAZON_S3` <a name="@spacecomx/cdk-billing-alarm.AWSService.AMAZON_S3"></a>

---


#### `AMAZON_SES` <a name="@spacecomx/cdk-billing-alarm.AWSService.AMAZON_SES"></a>

---


#### `AMAZON_SNS` <a name="@spacecomx/cdk-billing-alarm.AWSService.AMAZON_SNS"></a>

---


#### `AMAZON_WORK_MAIL` <a name="@spacecomx/cdk-billing-alarm.AWSService.AMAZON_WORK_MAIL"></a>

---


#### `AWS_AMPLIFY` <a name="@spacecomx/cdk-billing-alarm.AWSService.AWS_AMPLIFY"></a>

---


#### `AWS_DATA_TRANSFER` <a name="@spacecomx/cdk-billing-alarm.AWSService.AWS_DATA_TRANSFER"></a>

---


#### `AWS_LAMDA` <a name="@spacecomx/cdk-billing-alarm.AWSService.AWS_LAMDA"></a>

---


#### `AWS_KMS` <a name="@spacecomx/cdk-billing-alarm.AWSService.AWS_KMS"></a>

---


#### `AWS_MARKETPLACE` <a name="@spacecomx/cdk-billing-alarm.AWSService.AWS_MARKETPLACE"></a>

---


#### `AWS_SECRETS_MANAGER` <a name="@spacecomx/cdk-billing-alarm.AWSService.AWS_SECRETS_MANAGER"></a>

---


#### `AWS_QUEUE_SERVICE` <a name="@spacecomx/cdk-billing-alarm.AWSService.AWS_QUEUE_SERVICE"></a>

---

