var giveMeDiff = {};

giveMeDiff.Diff = function() {

};

giveMeDiff.Diff.prototype.compare = function(left, right) {
  var allEqual = _.all(left, function(vale, key) {

  });

  if (!allEqual) {
    return 'Expected: ' + JSON.stringify(left) +
        ' to equal: ' + JSON.stringify(right)
  }
};
