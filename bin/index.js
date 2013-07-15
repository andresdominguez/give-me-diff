//goog.provide('giveMeDiff.Diff');

var giveMeDiff = {};

giveMeDiff.Diff = function() {

};

giveMeDiff.Diff.prototype.compare = function(left, right) {
  var difference = this.deepCompare('', left, right);


  if (difference.length) {
    var error = 'Diff:\n\n';

    return _.reduce(difference, function(memory, diffString) {
      return memory + diffString;
    }, 'Diff:\n\n');
  }
};

giveMeDiff.Diff.prototype.deepCompare = function(parentProperty, left, right) {
  var difference = [];

  var allKeys = _.uniq(_.keys(left).concat(_.keys(right)));

  _.each(allKeys, function(property) {
    if (!_.isEqual(left[property], right[property])) {
      var diffString = this.getDiffString(property, left[property], right[property]);
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
