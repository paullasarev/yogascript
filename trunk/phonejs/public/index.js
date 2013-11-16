﻿"use strict";

window.YogaScript = {};

$(function() {
    // "iPhone", "iPhone5", "iPad", "iPadMini", "androidPhone", "androidTablet", "win8", "win8Phone", "msSurface", "desktop" and "tizen". 
    DevExpress.devices.current('androidTablet');
    YogaScript.app = new DevExpress.framework.html.HtmlApplication({
        namespace: YogaScript,
        //defaultLayout: "default",
        defaultLayout: "slideout",
            navigation: [
                {
                    "id": "Home",
                    "title": "Training",
                    "action": "#home",
                    "icon": "favorites"
                },
                // {
                    // "id": "Training",
                    // "title": "Training",
                    // "action": "#training",
                    // "icon": "favorites"
                // },
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
                    "icon": "group"
                },
                {
                    "id": "pose_list",
                    "title": "Poses",
                    "action": "#pose_list",
                    "icon": "user"
                }
            ]
    });

    YogaScript.app.viewShown.add(onViewShown);
    YogaScript.app.router.register(":view/:id", {view: "home", id: undefined});
    YogaScript.app.navigate();  
	loadSchedule();	
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
	  //loadSchedule();
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

    function onViewShown(args) {
        var viewInfo = args.viewInfo;
        if (viewInfo.model.hideNavigationButton)
            viewInfo.renderResult.$markup.find(".nav-button-item").remove();

        //currentBackAction = viewInfo.model.backButtonDown;
    }


	var weekNum = 0;
	var dateFrom = new Date();
	var leftArray = [];
	var rightArray = []; 
	var scheduleDataDays = [{name:'Mo '}, {name:'Tu '}, {name:'We '}, {name:'Th '}, {name:'Fr '}, {name:'Sa '}, {name:'Su '}];
	var sequencelistSource;
	var loadSchedule = function(){		
		var dayNum = dateFrom.getDay();
		dayNum = (dayNum - 1 >= 0)?(dayNum - 1):6;
		dateFrom.setDate(dateFrom.getDate() - dayNum +7*weekNum);
		var day = dateFrom.getUTCDate();
		var month = dateFrom.getUTCMonth();
		for(var i = 0;i<7;i++)
		{
			leftArray[i] = {name:" ", id: null, num:i*2};
			rightArray[i] = {name:" ", id: null, num:i*2+1};
			scheduleDataDays[i].name = scheduleDataDays[i].name + (day + i);
		}
		$.each([
			{name:"seq 1", id: 1, num:0},
			{name:"seq 2", id: 3, num:3},
			{name:"seq 3", id: 2, num:6},
			{name:"seq 4", id: 1, num:7}
			], function(i, el){if(el.num%2==0)
				{leftArray[el.num/2] = el;}
			else
				{rightArray[(el.num-1)/2] = el;} 
			});
	}
	
/*	var loadSequenceList = function(){	
		sequencelistSource = ko.observable(DevExpress.data.createDataSource({
			 lookup: function (lookupOptions)
			 {},
		  load: function (loadOptions) {
			if (loadOptions.refresh) {
			  skip = 0;
			}
			var deferred = new $.Deferred();
			
			$.get('/api/sequences',
			{
			  skip: skip,
			  take: PAGE_SIZE,
			  searchString: viewModel.searchString()
			})
			.done(function (result) {
			  //Console.log(result);
			  skip += PAGE_SIZE;
			  var mapped = $.map(result, function (data) {
				return {
				  name: data.name,
				  id: data.id
				};
			  });
			  deferred.resolve(mapped);
			});
			return deferred;
		  }
		}));
}*/
