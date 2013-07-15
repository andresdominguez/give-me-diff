//goog.provide('giveMeDiff.Diff');

var giveMeDiff = {};

giveMeDiff.Diff = function() {
};

giveMeDiff.Diff.prototype.compare = function(left, right) {
  var difference = this.deepCompare(null, left, right);

  if (difference.length) {
    return _.reduce(difference, function(memory, diffString) {
      return memory + diffString;
    }, 'Diff:\n\n');
  }
};

giveMeDiff.Diff.prototype.deepCompare = function(parentProperty, left, right) {
  var difference = [];

  // Get all the properties of both left and right.
  var allKeys = _.uniq(_.keys(left).concat(_.keys(right)));

  _.each(allKeys, function(property) {
    var leftValue = left[property];
    var rightValue = right[property];

    if (_.isEqual(leftValue, rightValue)) {
      return;
    }

    if (_.isObject(leftValue) || _.isObject(rightValue)) {
      var compareItems = this.deepCompare(property, leftValue, rightValue);
      difference = difference.concat(compareItems);
    } else {
      var diffString = this.getDiffString(property, leftValue, rightValue);
      diffString = parentProperty ? parentProperty + '.' + diffString : diffString;
      difference.push(diffString);
    }
  }, this);

  return difference;
};

giveMeDiff.Diff.prototype.getDiffString = function(property, left, right) {
  var l = _.isObject(left);
  var r = _.isObject(right);

  return property + ': ' + left + '|' + right + '\n';
};
