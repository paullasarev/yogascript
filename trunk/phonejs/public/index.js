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
    {id:0, name:'Extended Mountain pose', level:2, durMin:'2m', durMax:'5m', url:'images/SN1_1.png', desc: "Inhale through your nose and raise your arms up to the side, palms facing upwards. Extend your arms above your head with your hands in prayer position."},
    {id:1, name:'Janubhalasana', level:2, durMin:'2m', durMax:'5m', url:'images/SN1_2.png', desc: "Swan dive to forward bend, be sure to bend your knees especially if you have tight hamstrings. This will protect the back: Exhale through your nose. Open your arms wide and bend at your waist to a standing forward bend. Your hands should touch the floor if you can or if not, the front of the ankles."},
    {id:2, name:'Ardhabhujangasana', level:2, durMin:'2m', durMax:'5m', url:'images/SN1_3.png', desc: "Step with your left foot in front of your right foot and lean slightly on it and bend your knees forwards, without lifting your right foot. Your right foot should be almost off the ground, with just the toes touching."},
    {id:3, name:'Hastapadasana', level:2, durMin:'2m', durMax:'5m', url:'images/SN1_4.png', desc: "Plank pose: Inhale and take your shoulders forward directly over your wrists, extending well with your arms to form plank position. Keep your thighs strong and firm, your feet flexed and your belly drawn in."},
    {id:4, name:'Ashtangasana', level:2, durMin:'2m', durMax:'5m', url:'images/SN1_5.png', desc: "Knees-chest-chin pose: Exhale and bend your knees to the floor and then lower your chest and chin to the floor. Keep your chest open and your elbows close to the side of your ribcage."},
    {id:5, name:'Bhujangasana', level:2, durMin:'2m', durMax:'5m', url:'images/SN1_6.png', desc: "Cobra: Inhale and raise your upper body to the cobra pose. Roll your shoulders back and extend the shoulder blades down and press them in towards the chest. Your chest should be lifted and open and elbows should stay close to the body. Make sure to lift up your knee caps and firm your thighs. Your legs and feet should be well extended. As a variation, you can also do an upward dog."},
    {id:6, name:'Adho Mukha Svanasana', level:2, durMin:'2m', durMax:'5m', url:'images/SN1_7.png', desc: "Downward-facing dog: Spread your fingers and press your palms into the mat, they should be shoulder width apart. Now, lift your hips up towards the sky, lengthening your spine. Gently straighten your legs, pressing your heels down into your mat as far as you can go."},
  ];
	var secus =  [
		{id:0, name:'Surya 0', poses:[0,1]},
		{id:1, name:'Surya Namascar 1', poses:[2,3]},
		{id:2, name:'Surya Namascar 2', poses:[3,4]},
		{id:3, name:'Chandra Namascar', poses:[5,6,7]}
	];


  