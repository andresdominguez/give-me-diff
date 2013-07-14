var giveMeDiff = {};

giveMeDiff.Diff = function() {

};

giveMeDiff.Diff.prototype.compare = function(left, right) {
  var difference = this.areEqual(left, right);

  if (difference.length) {
    var error = 'Expected: ' + JSON.stringify(left) +
        ' to equal: ' + JSON.stringify(right) + '\n\n' +
        'Diff:\n\n';

    _.each(difference, function(property) {
      error += property + ': ' + left[property] + '|' + right[property];
    });

    return  error;
  }
};

giveMeDiff.Diff.prototype.areEqual = function(left, right) {
  var difference = [];
  _.all(left, function(value, key) {
    var isEqual = _.isEqual(value, right[key]);

    if (!isEqual) {
      difference.push(key);
    }

    return isEqual;
  });

  return difference;
};
