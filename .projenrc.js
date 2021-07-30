const {
  AwsCdkConstructLibrary,
  DependenciesUpgradeMechanism,
  NpmAccess,
  ProjectType,
} = require('projen');

const RELEASE_STATUS = true;
const RELEASE_BRANCH = 'main';
const PRE_RELEASE = '';
const MAYOR_VERSION = 1;
const RELEASE_TO_NPM = true;
const AWS_CDK_VERSION = '1.115.0';
const AUTOMATION_TOKEN = 'GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  name: 'cdk-billing-alarm',
  packageName: '@spacecomx/cdk-billing-alarm',
  description:
    'High level CDK construct to monitor estimated billing charges with alerts and notifications. It sets up an estimated monthly billing alarm associated with an email address endpoint. It then subscribes the endpoint to an SNS Topic or an existing SNS Topic Arn.',
  author: 'Wayne Gibson',
  authorAddress: 'wayne.gibson@spacecomx.com',
  repositoryUrl: 'https://github.com/spacecomx/cdk-billing-alarm.git',
  keywords: [
    'aws',
    'aws-billing',
    'aws-organizations',
    'cdk',
    'cdk-construct',
    'cloudwatch-alarms',
    'sns-topic',
    'sns-notifications',
    'spacecomx',
  ],
  license: 'MIT',
  copyrightOwner: 'Spacecomx LLC',
  projectType: ProjectType.LIB,

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

  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['waynegibson'],
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
