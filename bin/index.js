var giveMeDiff = {};

giveMeDiff.Diff = function() {

};

giveMeDiff.Diff.prototype.compare = function(left, right) {
  var difference = [];

  var allEqual = _.all(left, function(value, key) {
    var isEqual = _.isEqual(value, right[key]);

    if (!isEqual) {
      difference.push(key);
    }

    return isEqual;
  });

  if (!allEqual) {
    var error = 'Expected: ' + JSON.stringify(left) +
        ' to equal: ' + JSON.stringify(right) + '\n\n' +
        'Diff:\n\n';

    _.each(difference, function(property) {
      error += property + ': ' + left[property] + '|' + right[property];
    });

    return  error;
  }
};
