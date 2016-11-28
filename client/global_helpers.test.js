import { assert } from 'meteor/practicalmeteor:chai';
import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Tracker } from 'meteor/tracker';
import { round } from './global_helpers.js'

describe('template', function () {
  it('', function () {
    // This code will be executed by the test driver when the app is started
    // in the correct mode
    var result = Template.registerHelper['twoDecimal'].apply(3.456)
    assert.equal(result,3.45);
  })
})
