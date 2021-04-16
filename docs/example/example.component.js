'use strict';

angular.module('example').controller('ExampleController', ExampleController);

ExampleController.$inject = ['dataTablesService', '$q'];

function ExampleController(dataTablesService, $q) {
    var vm = this;
    activate();

    function activate() {
        var table = {
            columns: [
                { data: 'Value1', title: 'Value 1', renderWith: 'default' },
                { data: 'Value2', title: 'Value 2', renderWith: 'default' },
                { data: 'Value3', title: 'Value 3', renderWith: 'default' },
                { data: 'Value4', title: 'Value 4', renderWith: 'default' }
            ],
            callback: getData
        };

        vm.table = dataTablesService.getDataTable(table.columns, table.options, table.callback, table.dom, table.buttons);
    }

    function getData() {
        var data = [
            {
                Value1: '1',
                Value2: '2',
                Value3: '3',
                Value4: '4'
            },
            {
                Value1: '1',
                Value2: '2',
                Value3: '3',
                Value4: '4'
            }
        ];
        var result = $q.when(data);

        return result;
    }
}

angular.
    module('example').
    component('example', {
        templateUrl: 'example/example.template.html',
        controller: ExampleController
    });
