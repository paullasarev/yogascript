"use strict";

window.YogaScript = {};

$(function() {
    // "iPhone", "iPhone5", "iPad", "iPadMini", "androidPhone", "androidTablet", "win8", "win8Phone", "msSurface", "desktop" and "tizen". 
    DevExpress.devices.current('androidTablet');

    YogaScript.app = new DevExpress.framework.html.HtmlApplication({
        namespace: YogaScript,
        defaultLayout: "slideout",
            navigation: [
                {
                    "id": "Home",
                    "title": "Home",
                    "action": "#home",
                    "icon": "home"
                },
                {
                    "id": "Training",
                    "title": "Training",
                    "action": "#training",
                    "icon": "event"
                },
                {
                    "id": "Schedule",
                    "title": "Schedule",
                    "action": "#schedule",
                    "icon": "event"
                },
                {
                    "id": "sequence_list",
                    "title": "Sequences",
                    "action": "#sequence_list",
                    "icon": "card"
                },
                {
                    "id": "pose_list",
                    "title": "Poses",
                    "action": "#pose_list",
                    "icon": "card"
                }
            ]
    });
    
    YogaScript.app.router.register(":view/:id", {view: "home", id: undefined});
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


	var poses =  [
		{id:0, name:'P10', level:2, durMin:'2m', durMax:'5m', url:'images/add.png'},
		{id:1, name:'P11', level:2, durMin:'2m', durMax:'5m', url:'images/back.png'},
		{id:2, name:'P12', level:2, durMin:'2m', durMax:'5m', url:'images/basecircle.png'},
		{id:3, name:'P13', level:2, durMin:'2m', durMax:'5m', url:'images/camera.png'},
		{id:4, name:'P14', level:2, durMin:'2m', durMax:'5m', url:'images/cancel.png'},
		{id:5, name:'P15', level:3, durMin:'2m', durMax:'5m', url:'images/check.png'},
		{id:6, name:'P16', level:3, durMin:'2m', durMax:'5m', url:'images/delete.png'},
		{id:7, name:'P17', level:3, durMin:'2m', durMax:'5m', url:'images/download.png'}
	];
  var myposes =  [
    {id:0, name:'Dog', level:2, durMin:'2m', durMax:'5m', url:'images/dog.png'},
    {id:1, name:'Cat', level:2, durMin:'2m', durMax:'5m', url:'images/cat.png'},
  ];
	var secus =  [
		{id:0, name:'Surya 0', poses:[0,1]},
		{id:1, name:'Surya Namascar 1', poses:[2,3]},
		{id:2, name:'Surya Namascar 2', poses:[3,4]},
		{id:3, name:'Chandra Namascar', poses:[5,6,7]}
	];


  