YogaScript.pose = function (params) {

  return {
	hideNavigationButton: true,

    id: myposes[params.id].id,
    name: myposes[params.id].name,
    level: myposes[params.id].level,
    durMin: myposes[params.id].durMin,
    durMax: myposes[params.id].durMax,
    url: myposes[params.id].url,
    desc: myposes[params.id].desc

//ko.observable('asdf'),
  };
};