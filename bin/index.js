var giveMeDiff = {};

giveMeDiff.Diff = function() {

};

giveMeDiff.Diff.prototype.compare = function(left, right) {
  var difference = this.areEqual(left, right);

  if (difference.length) {
    var error = 'Diff:\n\n';

    _.each(difference, function(property) {
      error += property + ': ' + left[property] + '|' + right[property];
    });

    return  error;
  }
};

giveMeDiff.Diff.prototype.areEqual = function(left, right) {
  var difference = [];
  _.each(left, function(value, key) {
    if (!_.isEqual(value, right[key])) {
      difference.push(key);
    }

    return _.isEqual(value, right[key]);
  });

  return difference;
};
