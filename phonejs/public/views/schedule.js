YogaScript.schedule = function (params) {
    scheduleDataLeft = leftArray;
    scheduleDataRight = rightArray;
	scheduleDataDays = scheduleDataDays;
	onItemRender = function (itemData , itemIndex, itemElement ) {
            if (itemData.id == null) {
                itemElement.html(itemData.name);
                return;
            }
			itemElement.attr('data-bind', "text: name, dxAction: '#sequence/{id}'").attr('data-options', "dxTemplate : { name: 'item' }").html(itemData.name);
        }
};
