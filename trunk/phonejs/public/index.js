"use strict";

window.YogaScript = {};

$(function() {
    // "iPhone", "iPhone5", "iPad", "iPadMini", "androidPhone", "androidTablet", "win8", "win8Phone", "msSurface", "desktop" and "tizen". 
    DevExpress.devices.current('androidPhone');
    YogaScript.app = new DevExpress.framework.html.HtmlApplication({
        namespace: YogaScript,
        
        defaultLayout: "default", //slideout, navbar, simple, desktop, empty, split
        // navigation: [
          // {
            // title: "About",
            // action: "#about",
            // icon: "info"
          // },
          // {
            // title: "Home",
            // action: "#home",
            // icon: "home"
          // },
        // ]
        
        
    });
    
    YogaScript.app.router.register(":view", {view: "home"});
    YogaScript.app.navigate();   
});

//type: 'info'|'warning'|'error'|'success'|'custom', default == "success"
YogaScript.notify = function(message, type) {
  if (!type) type = "success";
  DevExpress.ui.notify(message,type,3000);

  // var el = $("#toastContainer").dxToast('instance');
  // el.option("type", type);
  // el.option("message", message);
  // el.show();
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
      YogaScript.error("Schedule is not yet implemented");
    },
    doSequences: function () {
      YogaScript.error("Sequences is not yet implemented");
    },
    doPoses: function () {
      YogaScript.error("Poses is not yet implemented");
    },
    doAbout: function () {
      YogaScript.notify("YogaScript (C 2013, JAPA)");
    },
  };
}
  