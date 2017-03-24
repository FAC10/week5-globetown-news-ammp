/* eslint-disable no-undef */

QUnit.test('Test secToMin function', function(assert) {
  assert.equal(secToMin(300), '5:00', '300 seconds = 5 minutes');
  assert.equal(secToMin(125), '2:05', '125 seconds = 2 minutes and 5 seconds');
  assert.equal(secToMin(40), '0:40', 'just 40 seconds');
  assert.equal(secToMin(130), '2:10', '130 seconds = 2 minutes and 10 seconds');
});
