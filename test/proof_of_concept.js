QUnit.module('proof of concept');

QUnit.test(
  "hello test",
  function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
  }
);

QUnit.test( "a basic test example", function( assert ) {
  var value = "hello";
  assert.equal(
    value,
    "hello",
    "We expect value to be hello"
  );
});
