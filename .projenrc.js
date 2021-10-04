const { AwsCdkConstructLibrary, NpmAccess } = require('projen');

const RELEASE_STATUS = true;
const RELEASE_BRANCH = 'main';
const PRE_RELEASE = '';
const MAYOR_VERSION = 1;
const RELEASE_TO_NPM = true;
const AWS_CDK_VERSION = '1.125.0';

const project = new AwsCdkConstructLibrary({
  name: 'cdk-billing-alarm',
  packageName: '@spacecomx/cdk-billing-alarm',
  description:
    'It sets up an estimated monthly billing alarm associated with an email address endpoint. It then subscribes that endpoint to an SNS Topic created by the package or it can use an existing SNS Topic Arn. The CDK construct can be used to implement multiple customizable billing alarms for single or master/payer account e.g (AWS Organization).',
  author: 'Wayne Gibson',
  authorAddress: 'wayne.gibson@spacecomx.com',
  repositoryUrl: 'https://github.com/spacecomx/cdk-billing-alarm.git',
  keywords: [
    'aws',
    'cdk',
    'aws-constructs',
    'constructs',
    'aws-billing',
    'billing',
    'billing-alarm',
    'aws-organizations',
    'cloudwatch',
    'aws-cloudwatch',
    'cloudwatch-alarms',
    'sns',
    'spacecomx',
  ],
  license: 'MIT',
  copyrightOwner: 'Spacecomx LLC',

  cdkVersion: AWS_CDK_VERSION,
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-cloudwatch-actions',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-sns-subscriptions',
  ],

  release: RELEASE_STATUS,
  defaultReleaseBranch: RELEASE_BRANCH,
  prerelease: PRE_RELEASE,
  majorVersion: MAYOR_VERSION,

  releaseToNpm: RELEASE_TO_NPM,
  npmAccess: NpmAccess.PUBLIC,

  publishToPypi: {
    distName: 'spacecomx.cdk-billing-alarm',
    module: 'spacecomx.cdk_billing_alarm',
  },
});

const exclude = [
  'cdk.out',
  'cdk.context.json',
  'yarn-error.log',
  'dependabot.yml',
  '.env',
];

project.gitignore.exclude(...exclude);
project.npmignore.exclude(...exclude);

project.synth();
