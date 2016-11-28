import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';

console.log('in the client test')
describe('小测试', function () {
  it('做简单的加法测试', function () {
    // This code will be executed by the test driver when the app is started
    // in the correct mode
    chai.assert.equal(1+1,2);
  })
});

