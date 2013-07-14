var giveMeDiff = {};

giveMeDiff.Diff = function() {

};

giveMeDiff.Diff.prototype.compare = function(left, right) {
  var difference = this.areEqual(left, right);

  if (difference.length) {
    var error = 'Diff:\n\n';

    _.each(difference, function(property) {
      error += property + ': ' + left[property] + '|' + right[property] + '\n';
    });

    return  error;
  }
};

giveMeDiff.Diff.prototype.areEqual = function(left, right) {
  var difference = [];

  var allKeys = _.uniq(_.keys(left).concat(_.keys(right)));

  _.each(allKeys, function(property) {
    if (!_.isEqual(left[property], right[property])) {
      difference.push(property);
    }
  });

  return difference;
};
