"use strict";

window.YogaScript = {};

$(function() {
    // "iPhone", "iPhone5", "iPad", "iPadMini", "androidPhone", "androidTablet", "win8", "win8Phone", "msSurface", "desktop" and "tizen". 
    DevExpress.devices.current('androidPhone');
    YogaScript.app = new DevExpress.framework.html.HtmlApplication({
        namespace: YogaScript,
        defaultLayout: "default",
    });
    
    YogaScript.app.router.register(":view", {view: "home"});
    YogaScript.app.navigate();   
});

//type: 'info'|'warning'|'error'|'success', default == "success"
YogaScript.notify = function(message, type, time) {
  if (!type) type = "success";
  if (!time) time = 1000;
  DevExpress.ui.notify(message, type, time);
}

YogaScript.error = function(message) {
  YogaScript.notify(message, "error");
}

YogaScript.home = function () {
  return {
    doTraining: function () {
      //YogaScript.notify("Training!");
      YogaScript.app.navigate("training");
    },
    doSchedule: function () {
      //YogaScript.error("Schedule is not yet implemented");
      YogaScript.app.navigate("schedule");
    },
    doSequences: function () {
      YogaScript.error("Sequences is not yet implemented");
    },
    doPoses: function () {
      YogaScript.error("Poses is not yet implemented");
    },
    doAbout: function () {
      YogaScript.notify("YogaScript (C 2013, JAPA)", 'success', 3000);
    },
  };
}
  