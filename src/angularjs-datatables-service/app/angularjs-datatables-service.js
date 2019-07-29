(function () {
    'use strict';

    var angularJSDataTablesService = window.angular.module('angularjs-datatables-service', ['datatables']);

    dataTablesService.$inject = ['DTColumnBuilder', 'DTOptionsBuilder', '$filter', '$q'];

    function dataTablesService(DTColumnBuilder, DTOptionsBuilder, $filter, $q) {

        var renderWith = {
            'number': function (data, type, full, meta) {
                return data ? $filter('number')(data) : data;
            },
            'percentage': function (data, type, full, meta) {
                return data ? $filter('number')(data * 100, 0) + '%' : data;
            },
            'percentage100': function (data, type, full, meta) {
                return data ? $filter('number')(data, 0) + '%' : data;
            },
            'seconds': function (data, type, full, meta) {

                if (!data) {
                    return data;
                }

                var minutes = Math.floor(data / 60);
                var seconds = data - (minutes * 60);
                seconds = seconds < 0 ? 0 : seconds;
                return minutes + ':' + pad(seconds, 2);

                function pad(n, width, z) {
                    z = z || '0';
                    n = n + '';
                    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
                }
            },
            'date': function (data, type, full, meta) {
                return data ? $filter('date')(data, 'yyyy-MM-dd') : data;
            },
            'datetime': function (data, type, full, meta) {
                return data ? $filter('date')(data, 'yyyy-MM-dd hh:mm a') : data;
            },
            'phone': function (data, type, full, meta) {
                return data ? $filter('tel')(data) : data;
            },
            'money': function (data, type, full, meta) {
                return '$' + data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            'money$': function (data, type, full, meta) {
                if (data) {
                    return '$' + data;
                }
                return '';
            },
            'default': function (data, type, full) {
                return data;
            }
        };

        return {
            getDataTable: getDataTable,
            refresh: refresh,
            reload: reload
        };

        function getDataTable(columns, options, callback, dom, buttons) {

            var result = {};

            result.options = DTOptionsBuilder.fromFnPromise(callback)
                .withPaginationType('full_numbers')
                .withOption('autoWidth', false)
                .withOption('responsive', true);

            if (options) {
                angular.forEach(options, function (o) {
                    result.options.withOption(o.name, o.value);
                });
            }

            if (dom) {
                result.options.withDOM(dom);
            } else {
                result.options.withDOM("<'dt-toolbar'<'col-xs-6 col-sm-6'f>r<'col-sm-6 col-xs-12 hidden-xs'l>>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>");
            }

            if (buttons) {
                result.options.withButtons(buttons);
            }

            result.columns = columns.map(function (c) {
                var column = DTColumnBuilder.newColumn(c.data).withTitle(c.title);
                if (c.renderWith) {
                    var render;
                    if (typeof c.renderWith === "string") {
                        render = renderWith[c.renderWith];
                    }
                    column.renderWith(render || c.renderWith);
                }

                if (c.options) {
                    angular.forEach(c.options, function (o) {
                        column.withOption(o.name, o.value);
                    });
                }

                return column;
            });

            result.instance = {};

            return result;
        }

        function refresh(instance) {
            instance.rerender();
        }

        function reload(instance) {
            instance.reloadData();
        }
    }

    angularJSDataTablesService.factory('dataTablesService', dataTablesService);
})();