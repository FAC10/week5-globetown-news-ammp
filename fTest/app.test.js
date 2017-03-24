var secToMin = testFunc.secToMin;

QUnit.test('Let the tests begin', function(assert) {
  assert.equal(secToMin(300), '5:00', '300 seconds = 5 minutes');
  assert.equal(secToMin(125), '2:05', '125 seconds = 2 minutes and 5 seconds');
    // assert.equal(app.secToMin(40), '0:40', 'just 40 seconds');
    // assert.equal(app.secToMin(130), '02:10', '130 seconds = 2 minutes and 10 seconds');
});
QUnit.module("Testing the time converting function", function(assert) {
    QUnit.test("300 seconds = 5 minutes", function(assert) {
      assert.equal(secToMin(300), '5:00');
    });
});
