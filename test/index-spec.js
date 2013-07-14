describe('give-me-diff', function() {
  var diff;

  beforeEach(function() {
    diff = new giveMeDiff.Diff();
  });

  it('should compare one property', function() {
    var left = {name: 'Andres'};
    var right = {name: 'andres'};

    expect(diff.compare(left, right)).toEqual('Diff:\n\n' +
        'name: Andres|andres\n');
  });

  it('should compare when left has more properties', function() {
    var left = {
      name: 'Andres',
      tel: 123
    };
    var right = {name: 'andres'};

    expect(diff.compare(left, right)).toEqual('Diff:\n\n' +
        'name: Andres|andres\n' +
        'tel: 123|undefined\n');

  });

  it('should return undefined when object are equal', function() {
    expect(diff.compare({name: 'foo'}, {name: 'foo'})).toBeUndefined();
  });
});
