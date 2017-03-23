
QUnit.module( "Testing the time converting function", function(assert){

  QUnit.test("300 seconds = 5 minutes", function(assert){
    assert.equal(secToMin(300), '5:00');
  });

//
  QUnit.test("125 seconds = 2 minutes and 5 seconds", function(assert){
    assert.equal(secToMin(125), '2:05');
  });

  QUnit.test("Just 40 seconds", function(assert){
    assert.equal(secToMin(40), '0:40');
  });

});
