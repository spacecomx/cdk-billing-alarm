/**
 * List of AWS Services to used to link a service to a billing alarm.
 *
 * @stable
 */
export enum AWSService {
  AMAZON_API_GATEWAY = 'AmazonApiGateway',
  AMAZON_CLOUD_FRONT = 'AmazonCloudFront',
  AMAZON_CLOUD_WATCH = 'AmazonCloudWatch',
  AMAZON_DYNAMO_DB = 'AmazonDynamoDB',
  AMAZON_RDS = 'AmazonRDS',
  AMAZON_ROUTE_53 = 'AmazonRoute53',
  AMAZON_S3 = 'AmazonS3',
  AMAZON_SES = 'AmazonSES',
  AMAZON_SNS = 'AmazonSNS',
  AMAZON_WORK_MAIL = 'AmazonWorkMail',
  AWS_AMPLIFY = 'AWSAmplify',
  AWS_DATA_TRANSFER = 'AWSDataTransfer',
  AWS_LAMDA = 'AWSLambda',
  AWS_KMS = 'awskms',
  AWS_MARKETPLACE = 'AWSMarketplace',
  AWS_SECRETS_MANAGER= 'AWSSecretsManager',
  AWS_QUEUE_SERVICE = 'AWSQueueService',
}