"use strict";

window.MyApp = {};

$(function() {
    // "iPhone", "iPhone5", "iPad", "iPadMini", "androidPhone", "androidTablet", "win8", "win8Phone", "msSurface", "desktop" and "tizen". 
    DevExpress.devices.current('iPad');
    MyApp.app = new DevExpress.framework.html.HtmlApplication({
        namespace: MyApp,
        
        defaultLayout: "navbar", //"slideout", //"navbar",
        navigation: [
          {
            title: "Home",
            action: "#home",
            icon: "home"
          },
          {
            title: "About",
            action: "#about",
            icon: "info"
          }
        ]
    });
    MyApp.app.router.register(":view", {view: "home"});
    MyApp.app.navigate();   
});