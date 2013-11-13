YogaScript.sequence_list = function (params) {
  var skip = 0;
  var PAGE_SIZE = 10;
  var viewModel = {
  /*
    dataSource: [
      { id: 1, name: 'Surya Namascar 1' },
      { id: 2, name: 'Surya Namascar 2' },
      { id: 3, name: 'Chandra Namascar' },
    ],
  */  
    searchString: ko.observable(''),

    dataSource: DevExpress.data.createDataSource({
      load: function (loadOptions) {
        if (loadOptions.refresh) {
          skip = 0;
        }
        var deferred = new $.Deferred();
        //$.get('http://sampleservices.devexpress.com/api/Products',
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