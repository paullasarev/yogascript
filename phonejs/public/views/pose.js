YogaScript.pose = function (params) {

  return {
	hideNavigationButton: true,
    id: poses[params.id].id,
    name: poses[params.id].name,
    level: poses[params.id].level,
    durMin: poses[params.id].durMin,
    durMax: poses[params.id].durMax,
    url: poses[params.id].url,

//ko.observable('asdf'),
  };
};