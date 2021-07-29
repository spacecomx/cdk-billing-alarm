import '@aws-cdk/assert/jest';
import { SynthUtils } from '@aws-cdk/assert';
import {
  BasicBillingAlarmTest,
  BillingAlarmWithoutEmailSubscriptionTest,
  BillingAlarmWithCustomResourceNamesTest,
  LinkExistingTopicArnToBillingAlarmTest,
  LinkBillingAlarmToAwsAccountIdTest,
  LinkBillingAlarmToAwsServiceTest,
  LinkBillingAlarmToAwsAccountIdToAwsServiceTest,
} from '../src/integ.default';

test('integration snapshot test for basic billing alarm configuation', ()=> {
  const integration = new BasicBillingAlarmTest();

  integration.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});

test('integration snapshot test for billing alarm without email address subscription to sns topic', ()=> {
  const integration = new BillingAlarmWithoutEmailSubscriptionTest();

  integration.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});

test('integration snapshot test for billing alarm custom resource naming', ()=> {
  const integration = new BillingAlarmWithCustomResourceNamesTest();

  integration.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});

test('integration snapshot test for linking existing sns topic arn to billing alarm', ()=> {
  const integration = new LinkExistingTopicArnToBillingAlarmTest();

  integration.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});

test('integration snapshot test for linking an aws account id to billing alarm', ()=> {
  const integration = new LinkBillingAlarmToAwsAccountIdTest();

  integration.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});

test('integration snapshot test for linking an aws service to billing alarm', ()=> {
  const integration = new LinkBillingAlarmToAwsServiceTest();

  integration.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});

test('integration snapshot test for linking aws account id and service to billing alarm', ()=> {
  const integration = new LinkBillingAlarmToAwsAccountIdToAwsServiceTest();

  integration.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});