﻿YogaScript.pose_list = function (params) {
  var skip = 0;
  var PAGE_SIZE = 10;
  var viewModel = {
    searchString: ko.observable(''),

    dataSource: DevExpress.data.createDataSource({
      load: function (loadOptions) {
        if (loadOptions.refresh) {
          skip = 0;
        }
        var deferred = new $.Deferred();
        $.get('/api/poses',
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
    })    
  };
  
  ko.computed(function () {
      return viewModel.searchString();
  }).extend({
      throttle: 500
  }).subscribe(function () {
      viewModel.dataSource.reload();
  });  
  
  return viewModel;
};