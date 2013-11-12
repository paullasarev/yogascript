YogaScript.sequence = function (params) {

	var pos = [];
	secus[params.id].poses.forEach(function(p){
		pos.push(poses[p]);
	})

  return {
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