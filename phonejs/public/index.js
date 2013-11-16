"use strict";

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
                    "title": "Home",
                    "action": "#home",
                    "icon": "home"
                },
                {
                    "id": "Training",
                    "title": "Training",
                    "action": "#training",
                    "icon": "favorites"
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
	  loadSchedule();      
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
	var loadSchedule = function(){		
		var dayNum = dateFrom.getDay();
		dayNum = (dayNum - 1 >= 0)?(dayNum - 1):6;
		dateFrom.setDate(dateFrom.getDate() - dayNum +7*weekNum);
		var day = dateFrom.getUTCDate();
		var month = dateFrom.getUTCMonth();
		for(var i = 0;i<7;i++)
		{
			leftArray[i] = {name:"empty", id: null, num:i*2};
			rightArray[i] = {name:"empty", id: null, num:i*2+1};
			scheduleDataDays[i].name = scheduleDataDays[i].name + (day + i);
		}
		$.each(/*DevExpress.data.createDataSource({
		  load: function (loadOptions) {
			if (loadOptions.refresh) {
			  //dateFrom = 0;
			}
			var deferred = new $.Deferred();
			//$.get('http://sampleservices.devexpress.com/api/Products',
			$.get('/api/schedule',
			{
			  dateFrom: dateFrom
			})
			.done(function (result) {
			  //Console.log(result);
			  var mapped = $.map(result, function (data) {
				return {
				  id: data.id,
				  name: data.name,
				  num : data.num
				};
			  });
			  deferred.resolve(mapped);
			});
			return deferred;
		  }
		})*/[
			{name:"seq 1", id: 1, num:0},
			{name:"seq 2", id: 3, num:3},
			{name:"seq 3", id: 2, num:6},
			{name:"seq 4", id: 1, num:7}
			], function(i, el){if(el.num%2==0)
				{leftArray[el.num/2] = el;}
			else
				{rightArray[(el.num-1)/2] = el;} 
			});YogaScript.app.navigate("schedule");
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
    {id:7, name:'Vrikshasana', level:2, durMin:'2m', durMax:'5m', url:'images/8.png', desc: "From Tadasana, weight is shifted to one leg, for example, starting with the left leg. The entire sole of the foot remains in contact with the floor. The right knee is bent and the right foot placed on the left inner thigh, or in half lotus position. With the toes of the right foot pointing directly down, the left foot, center of the pelvis, shoulders and head are all vertically aligned. Hands are typically held above the head either pointed directly upwards and unclasped, or clasped together in anjali mudra."},
    {id:8, name:'Utkatasana', level:2, durMin:'2m', durMax:'5m', url:'images/9.png', desc: "This asana increases strength, balance and stability. The Hamstrings, quadriceps, gluteal muscles, and the erector spinae muscles of the back are exercised and strengthened. The erector muscles contract isometrically to keep the normal curvature of the spine. The anterior lower leg muscles are also strengthened and developed. These include the tibialis anterior, extensor hallucis longus, extensor digitorum longus, and peroneus tertius. This group of muscles primarily extends the toes and dorsiflexes the ankle and are used for balance and stability."},
    {id:9, name:'Trikonasana', level:2, durMin:'2m', durMax:'5m', url:'images/10.png', desc: "Trikonasana is usually performed in two parts, facing left, and then facing right. The practitioner begins standing with the feet one leg-length apart, knees unbent, turns the right foot completely to the outside and the left foot less than 45 degrees to the inside, keeping the heels in line with the hips. The arms are spread out to the sides, parallel to the ground, palms facing down; the trunk is extended as far as is comfortable to the right, while the arms remain parallel to the floor. Once the trunk is fully extended to the right, the right arm is dropped so that the right hand reaches the shin (or a block or on the floor) to the front (left side) of the right foot, with the palm down if flexed."},
    {id:10, name:'Virabhadrasana II', level:2, durMin:'2m', durMax:'5m', url:'images/11.png', desc: "It is possible to enter Vīrabhadrāsana using vinyasas starting from either Adho Mukha Śvānāsana (Downward facing dog) or from Tāḍāsana.The arms are stretched up, palm touching.Inhaling spread the legs sideways by jumping or stepping, creating a gap of 2/3 body height.Exhaling turn the trunk facing to the left while rotating the left foot 90° so it faces forward and the right foot so it points slightly to the right.Bend the left knee till the thigh is parallel to the floor, avoid extending the bent knee past the ankle and keeping the other leg straight.Stretch the right leg, with the knee locked."},
    {id:11, name:'Garudasana', level:2, durMin:'2m', durMax:'5m', url:'images/12.png', desc: "Knees-chest-chin pose: Exhale and bend your knees to the floor and then lower your chest and chin to the floor. Keep your chest open and your elbows close to the side of your ribcage."},
    {id:12, name:'Bakasana', level:2, durMin:'2m', durMax:'5m', url:'images/13.png', desc: "Cobra: Inhale and raise your upper body to the cobra pose. Roll your shoulders back and extend the shoulder blades down and press them in towards the chest. Your chest should be lifted and open and elbows should stay close to the body. Make sure to lift up your knee caps and firm your thighs. Your legs and feet should be well extended. As a variation, you can also do an upward dog."},
    {id:13, name:'Ushtrasana', level:2, durMin:'2m', durMax:'5m', url:'images/14.png', desc: "Downward-facing dog: Spread your fingers and press your palms into the mat, they should be shoulder width apart. Now, lift your hips up towards the sky, lengthening your spine. Gently straighten your legs, pressing your heels down into your mat as far as you can go."},
    {id:14, name:'Chakrasana ', level:2, durMin:'2m', durMax:'5m', url:'images/15.png', desc: "Inhale through your nose and raise your arms up to the side, palms facing upwards. Extend your arms above your head with your hands in prayer position."},
    {id:15, name:'Sarvangasana', level:2, durMin:'2m', durMax:'5m', url:'images/16.png', desc: "Swan dive to forward bend, be sure to bend your knees especially if you have tight hamstrings. This will protect the back: Exhale through your nose. Open your arms wide and bend at your waist to a standing forward bend. Your hands should touch the floor if you can or if not, the front of the ankles."},
    {id:16, name:'Trikonasana inverted triangle', level:2, durMin:'2m', durMax:'5m', url:'images/17.png', desc: "Step with your left foot in front of your right foot and lean slightly on it and bend your knees forwards, without lifting your right foot. Your right foot should be almost off the ground, with just the toes touching."},
    {id:17, name:'Uttanpadasana ', level:2, durMin:'2m', durMax:'5m', url:'images/18.png', desc: "Plank pose: Inhale and take your shoulders forward directly over your wrists, extending well with your arms to form plank position. Keep your thighs strong and firm, your feet flexed and your belly drawn in."},
    {id:18, name:'Dancer', level:2, durMin:'2m', durMax:'5m', url:'images/19.png', desc: "Knees-chest-chin pose: Exhale and bend your knees to the floor and then lower your chest and chin to the floor. Keep your chest open and your elbows close to the side of your ribcage."},
    {id:19, name:'Boat', level:2, durMin:'2m', durMax:'5m', url:'images/20.png', desc: "Cobra: Inhale and raise your upper body to the cobra pose. Roll your shoulders back and extend the shoulder blades down and press them in towards the chest. Your chest should be lifted and open and elbows should stay close to the body. Make sure to lift up your knee caps and firm your thighs. Your legs and feet should be well extended. As a variation, you can also do an upward dog."},
    {id:20, name:'Purvottanasana ', level:2, durMin:'2m', durMax:'5m', url:'images/21.png', desc: "Downward-facing dog: Spread your fingers and press your palms into the mat, they should be shoulder width apart. Now, lift your hips up towards the sky, lengthening your spine. Gently straighten your legs, pressing your heels down into your mat as far as you can go."},
    {id:21, name:'Lotus', level:2, durMin:'2m', durMax:'5m', url:'images/22.png', desc: "Inhale through your nose and raise your arms up to the side, palms facing upwards. Extend your arms above your head with your hands in prayer position."}
  ];
	var secus =  [
		{id:0, name:'Surya 0', myposes:[7,8,9,10,11,12,13,14]},
		{id:1, name:'Surya Namascar 1', myposes:[0,1,2,3,4,5,6,1,0]},
		{id:2, name:'Surya Namascar 2', myposes:[0,1,9,2,3,4,5,6,11,9,1,0]},
		{id:3, name:'Chandra Namascar', myposes:[15,16,17,18,19,20,21]}
	];


  