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
  var allKeys = this.getProperties(left, right);

  _.each(allKeys, function(property) {
    var leftValue = left[property];
    var rightValue = right[property];

    // Values are the same, go to the next property.
    if (_.isEqual(leftValue, rightValue)) {
      return;
    }

    // If any of the property values is an object do a recursive diff.
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

giveMeDiff.Diff.prototype.getProperties = function(var_args) {
  var props = [];

  _.each(arguments, function(arg) {
    props = props.concat(_.keys(arg))
  });

  return _.uniq(props);
};

giveMeDiff.Diff.prototype.getDiffString = function(property, left, right) {
  return property + ': ' + left + '|' + right + '\n';
};
