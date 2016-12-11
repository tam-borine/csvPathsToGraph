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

  buildUserPaths: function (dataGroupedByUser){ //BROKEN CURRENTLY
    userPaths = {} //{userid9: [[A, 7],[B, 9],[D, 5], [F, 7]], userid10: [[A, 6],[C, 7]]}
    dataGroupedByUser.forEach(function(user){
      for (item in user){  //we need to iterate less now as have taken away unecesssary abstraction layer when grouping
        userPaths[item] = []
        for (subitem in user[item]) {
          //score is proxy for edge weight and ex_id is proxy for node
          score = user[item][subitem]["attempts_before_completion"]/user[item][subitem]["attempts"] //numbers are weird
          ex_id = user[item][subitem]["exercise_id"]
          userPaths[item].push([ex_id, score])
        }
      }

    })
    return userPaths
  }

} //end of module.export

module.exports.runAll(data)
