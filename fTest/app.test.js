/* eslint-disable no-undef */

QUnit.module( 'Testing the time conversion function', function() {
  QUnit.test('300 seconds = 5 minutes', function(assert) {
    assert.equal(secToMin(300), '5:00 mins');
  });

  QUnit.test('125 seconds = 2 minutes and 5 seconds', function(assert) {
    assert.equal(secToMin(125), '2:05 mins');
  });

  QUnit.test('Just 40 seconds', function(assert){
    assert.equal(secToMin(40), '0:40 mins');
  });
});
