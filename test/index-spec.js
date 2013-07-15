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

  it('should compare when right has more properties', function() {
    var left = {
      foo: true,
      name: 'Andres'
    };
    var right = {
      name: 'andres',
      tel: 123,
      foo: true
    };

    expect(diff.compare(left, right)).toEqual('Diff:\n\n' +
        'name: Andres|andres\n' +
        'tel: undefined|123\n');
  });

  it('should return undefined when object are equal', function() {
    expect(diff.compare({name: 'foo'}, {name: 'foo'})).toBeUndefined();
  });

  it('should equals with deep compare', function() {
    var left = {
      address: {
        street: 'Fifth',
        zip: 12345
      }
    };

    var right = {
      address: {
        street: 'Fifth',
        zip: 12345
      }
    };

    expect(diff.compare(left, right)).toBeUndefined();
  });

  it('should find deep diff', function() {
    var left = {
      address: {
        street: 'Fifth',
        zip: 12345
      }
    };

    var right = {
      address: {
        street: 'the fifth',
        zip: 12345
      }
    };

    expect(diff.compare(left, right)).toBe('Diff:\n\n' +
        'address.street: Fifth|the fifth');
  });
});
