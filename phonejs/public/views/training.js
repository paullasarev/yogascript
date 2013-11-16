YogaScript.training = function (params) {
  var id = 1; //params.id
  
  var viewModel = {
      isStarted: false,
      id: id,
      
      getMessage: function() {
        return this.isStarted ? "START" : "STOP";
      },
      
      modeMessage: ko.observable("START"),
      
      startStop: function() {
        var msg = this.getMessage();
        this.isStarted = !this.isStarted;
        this.modeMessage(msg);
        YogaScript.notify(this.getMessage());
      },
      
      trainingDate: moment().format('ddd, DD MMM, ha'),
      
      completionPercent: ko.observable(20),
      dataSource: ko.observable([]),
  };
  
  $.get('/api/sequences/' + viewModel.id)
  .done(function (data) {
    console.log("sequence: name=" + data.name + " poses=" + data.poses);
    
    var pos = [];
    data.poses.forEach(function(p){
		 pos.push(myposes[p]);
    });
    viewModel.dataSource(pos);
  });

  return viewModel;    
 
};