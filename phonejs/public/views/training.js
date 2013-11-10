YogaScript.training = function (params) {
    return {
      isStarted: false,
      
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
    };
};