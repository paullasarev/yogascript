"use strict";

window.YogaScript = {};

$(function() {
    // "iPhone", "iPhone5", "iPad", "iPadMini", "androidPhone", "androidTablet", "win8", "win8Phone", "msSurface", "desktop" and "tizen". 
    DevExpress.devices.current('androidTablet');
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

YogaScript.notify = function(message) {
  var el = $("#toastContainer").dxToast('instance');
  el.option("message", message);
  el.show();
}

YogaScript.home = function () {
  return {
    doTraining: function () {
      YogaScript.notify("Training!");
    },
    doSchedule: function () {
      YogaScript.notify("Show schedule");
    },
    doAbout: function () {
      YogaScript.notify("Show About");
    },
  };
}
  