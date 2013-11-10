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
      YogaScript.app.navigate("training");
    },
    doSchedule: function () {
      YogaScript.app.navigate("schedule");
    },
    doSequences: function () {
      YogaScript.app.navigate("sequence_list");
    },
    doPoses: function () {
      YogaScript.app.navigate("pose_list");
    },
    doAbout: function () {
      YogaScript.app.navigate("about");
    },
  };
}
  