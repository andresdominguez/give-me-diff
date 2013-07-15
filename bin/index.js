//goog.provide('giveMeDiff.Diff');

var giveMeDiff = {};

giveMeDiff.Diff = function() {

};

giveMeDiff.Diff.prototype.compare = function(left, right) {
  var difference = this.areEqual('', left, right);


  if (difference.length) {
    var error = 'Diff:\n\n';

    _.each(difference, function(property) {
      var leftProperty = left[property];
      var rightProperty = right[property];

      error += this.getDiffString(property, leftProperty, rightProperty);

    }, this);

    return  error;
  }
};

giveMeDiff.Diff.prototype.areEqual = function(parentProperty, left, right) {
  var difference = [];

  var allKeys = _.uniq(_.keys(left).concat(_.keys(right)));

  _.each(allKeys, function(property) {
    if (!_.isEqual(left[property], right[property])) {
      difference.push(property);
    }
  });

  return difference;
};

giveMeDiff.Diff.prototype.getDiffString = function(property, left, right) {
  var l = _.isObject(left);
  var r = _.isObject(right);

  return property + ': ' + left + '|' + right + '\n';
};
