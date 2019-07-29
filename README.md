# angularjs-datatables-service

> AngularJS Service Wrapper for angular.datatables.js

* [Overview](#overview)
* [Install](#install)
* [Usage](#usage)

<a name="overview"></a>
## Overview
This is an AngularJS service wrapper for angular-datatables.js. 

<a name="install"></a>
## Install
```sh
npm install angularjs-datatables-service --save
```

<a name="usage"></a>
## Usage
Include the following script
```html
<script type="text/javascript" src="angularjs-datatables-service.js"></script>
```

Include it in your app.module.js

```js
'use strict';

angular.module('exampleApp', [
    'angularjs-datatables-service'
]);
```

Then you can start using it by injecting it into your controller

```js
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
```
```html
<div class="container-fluid" ng-controller="ExampleController as vm">
  <div class="row">
      <div class="col-md-6">
          <table id="table"
                 datatable
                 dt-options="vm.table.options"
                 dt-columns="vm.table.columns"
                 dt-instance="vm.table.instance"
                 class="table table-striped table-bordered table-hover">
          </table>
      </div>
  </div>
</div>

```