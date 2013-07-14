describe('give-me-diff', function() {
  var diff;

  beforeEach(function() {
    diff = new giveMeDiff.Diff();
  });

  it('should compare one property', function() {
    var left = {name: 'Andres'};
    var right = {name: 'andres'};

    expect(diff.compare(left, right)).toEqual(
        'Expected: {"name":"Andres"} to equal: {"name":"andres"}');
  });
});
