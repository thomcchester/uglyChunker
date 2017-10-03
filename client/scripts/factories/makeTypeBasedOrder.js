App.factory("smallFunctions", ["$http", function($http){
  var inArrayTest=function(e,f){
    var holdVal=0;
    for(var i = 0; i<f.length;i++){
      if(e==f[i].type){
        holdVal++
      }
    }
    return holdVal
  }

  function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }

  //makes all permutations of an array
  function permutator(inputArr) {
    var results = [];
    function permute(arr, memo) {
      var cur, memo = memo || [];
      for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }
      return results;
    }
    return permute(inputArr);
  }

    return {
      inArrayTest:inArrayTest,
      findWithAttr:findWithAttr,
      permutator:permutator
    };
}]);
