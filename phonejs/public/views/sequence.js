YogaScript.sequence = function (params) {

	var pos = [];
	secus[params.id].myposes.forEach(function(p){
		pos.push(myposes[p]);
	})

  return {
    hideNavigationButton: true,
    namesec: secus[params.id].name,
  	dataSource: pos
/*
    dataSource: [
      { id: 1, name: 'Pranamasana' },
      { id: 2, name: 'Hasta Uttanasana' },
      { id: 3, name: 'Hastapaadasana' },
      { id: 4, name: 'Aekpaadprasarnaasana ' },
    ],
*/
  };
};