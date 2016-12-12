var data = require('./tmpfilename.json').data //run runner.js if this file doesn't exist yet
// GOAL IS A GRAPH SUCH AS {"A":{"B":[9], "F":[3]}, "B":{"D": [5]}, "D": {"F":[7,6]}}

module.exports = {

  runAll: function(data){
    var sortedData = this.sortByTimeStamps(data)
    var groupedData = this.groupDataByUser(sortedData)
    return this.buildUserPaths(groupedData)
  },

  groupDataByUser: function (data){

    var groups = {};

    for(var i = 0; i < data.length; i++) {
        var row = data[i];

        if(!groups[row.user_id]) {
            groups[row.user_id] = [];
        }

        groups[row.user_id].push({ //csv col names are hardcoded here, refactor?
            completion_timestamp: row.completion_timestamp,
            attempts: row.attempts,
            struggling: row.struggling,
            exercise_id: row.exercise_id,
            streak_progress: row.streak_progress,
            attempts_before_completion: row.attempts_before_completion
        });
    }
    console.log(groups);
    return groups
  },

  sortByTimeStamps: function (data){
    return data.sort(function(a, b){
          var aD = new Date(a.completion_timestamp).getTime(), bD = new Date(b.completion_timestamp).getTime();
          return ((aD < bD) ? -1 : ((aD > bD) ? 1 : 0));
    });
  },

  buildUserPaths: function (data){ //BROKEN CURRENTLY
    userPaths = {} //{userid9: [[A, 7],[B, 9],[D, 5], [F, 7]], userid10: [[A, 6],[C, 7]]}
      for (item in data){
        userPaths[item] = []
        for (key in data[item]) {
          console.log(data[item][key]);
          //score is proxy for edge weight and ex_id is proxy for node
          score = data[item][key]["attempts_before_completion"]/data[item][key]["attempts"] //numbers are weird
          ex_id = data[item][key]["exercise_id"]
          userPaths[item].push([ex_id, score])
        }
      }
    return userPaths
  },

  createGraph: function(dataObject){
    var graph = {}
    //input: {userid9: [[A, 7],[B, 9],[D, 5], [F, 7]], userid10: [[A, 6],[C, 7]]}
    for(key in dataObject){
      for (subarray in dataObject[key])
        node = subarray[0];
        weight = subarray[1];
        if(!graph[node]) {
             graph[node] = {};
         }
    }

    //for (var i=0; i<a.length; i++) {
    // i // is the index
    // a[i] // is the item
}
    //// GOAL IS A GRAPH SUCH AS {"A":{"B":[9], "F":[3]}, "B":{"D": [5]}, "D": {"F":[7,6]}}

  }

} //end of module.export

// console.log(module.exports.runAll(data));
