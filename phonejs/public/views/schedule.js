  //var queryWasExecute = false;
YogaScript.schedule = function (params) {
	var skip = 0;
	var PAGE_SIZE = 10;
    scheduleDataLeft = leftArray;
    scheduleDataRight = rightArray;
	scheduleDataDays = scheduleDataDays;
	onItemRender = function (itemData , itemIndex, itemElement ) {
            if (itemData.id == null) {
                itemElement.html(itemData.name);
                return;
            }
			itemElement.attr('data-bind', "text: name, dxAction: '#sequence/{id}'").attr('data-options', "dxTemplate : { name: 'item' }").html(itemData.name);
			

			
        };
		
    sequencelistSrc = DevExpress.data.createDataSource({
		 lookup: function (lookupOptions)
		 {},
      load: function (loadOptions) {
        if (loadOptions.refresh) {
          skip = 0;
        }
        var deferred = new $.Deferred();
        //queryWasExecute = true;
        $.get('/api/sequences',
        {
          skip: skip,
          take: PAGE_SIZE,
          searchString: ''
        })
        .done(function (result) {
          //Console.log(result);
	/*	if(queryWasExecute){
			queryWasExecute = false;
			result.push({id:0, name:' '});
		}*/
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
    });
	//sequencelistSrc = sequencelistSource();

    actionSheetVisible = ko.observable(false);
    actionSheetData = [
    {text:"Reply", clickAction: function(){ processClick("Reply")}},
    {text:"ReplyAll", clickAction: function(){ processClick("ReplyAll")}},
    {text:"Forward", clickAction: function(){ processClick("Forward")}},
    {text:"Delete", clickAction: function(){ processClick("Delete")}}
    ];
    processClick = function(name){
    DevExpress.ui.notify( name + " clicked", "success", 3000 );
    };
    showActionSheet = function () {
    actionSheetVisible(true);
    };


};
