'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:stockFenji
 * @description
 * # stockFenji
 */
angular.module('clientApp')
  .directive('stockFenji', function () {
    function parseData(data){
        var rows = [];
        var data_a = {};
        var data_b = {};
        var data_m = {};

        for(var i in data.a.rows){
            var item = data.a.rows[i];
            data_a[item.cell.funda_id] = item.cell;
        }
        for(var i in data.b.rows){
            var item = data.b.rows[i];
            data_b[item.cell.fundb_id] = item.cell;
        }
        for(var i in data.m.rows){
            var item = data.m.rows[i];
            data_m[item.cell.base_fund_id] = item.cell;
        }

        for(var m_id in data_m){
            var row = [];
            if(parseFloat(data_m[m_id].base_lower_recalc_rt) < 10){
                row.push('<a target="_blank" href="http://www.jisilu.cn/data/sfnew/detail/' + m_id + '">' + m_id + '<span style="color:red; font-weight:bold;">!</span>' + '</a>');
            } else {
                row.push('<a target="_blank" href="http://www.jisilu.cn/data/sfnew/detail/' + m_id + '">' + m_id + '</a>');
            }
            row.push(data_m[m_id].base_fund_nm);
            row.push('<a target="_blank" href="http://www.cninfo.com.cn/information/fund/netvalue/' + m_id + '.html">' + data_m[m_id].price + '</a>');
            row.push(data_m[m_id].upper_recalc_price);
            row.push(data_m[m_id].lower_recalc_price);
            row.push(data_m[m_id].base_lower_recalc_rt);
            row.push(data_m[m_id].issue_dt);
            row.push(data_m[m_id].left_year);
            row.push(data_m[m_id].base_est_dis_rt);
            row.push(data_m[m_id].abrate);

            var a_id = data_m[m_id].fundA_id;
            row.push('<a target="_blank" href="http://www.jisilu.cn/data/sfnew/detail/' + a_id + '">' + a_id + '</a>');
            row.push(data_a[a_id].funda_name);
            row.push(data_a[a_id].funda_current_price);
            if(parseFloat(data_a[a_id].funda_increase_rt) > 0) {
                row.push('<span style="color: red">' + data_a[a_id].funda_increase_rt + '</span>');
            } else if(parseFloat(data_a[a_id].funda_increase_rt) < 0){
                row.push('<span style="color: green">' + data_a[a_id].funda_increase_rt + '</span>');
            } else {
                row.push(data_a[a_id].funda_increase_rt);
            }
            row.push(data_a[a_id].funda_volume);
            row.push('<a target="_blank" href="http://www.cninfo.com.cn/information/fund/netvalue/' + a_id + '.html">' + data_a[a_id].funda_value + '</a>');
            row.push(data_a[a_id].funda_discount_rt);
            row.push(data_a[a_id].coupon_descr);
            row.push(data_a[a_id].funda_amount_increase);
            row.push(data_a[a_id].lower_recalc_profit_rt);

            var b_id = data_m[m_id].fundB_id;
            row.push('<a target="_blank" href="http://www.jisilu.cn/data/sfnew/detail/' + b_id + '">' + b_id + '</a>');
            row.push(data_b[b_id].fundb_name);
            row.push(data_b[b_id].fundb_current_price);
            if(parseFloat(data_b[b_id].fundb_increase_rt) > 0) {
                row.push('<span style="color: red">' + data_b[b_id].fundb_increase_rt + '</span>');
            } else if(parseFloat(data_b[b_id].fundb_increase_rt) < 0){
                row.push('<span style="color: green">' + data_b[b_id].fundb_increase_rt + '</span>');
            } else {
                row.push(data_b[b_id].fundb_increase_rt);
            }
            row.push(data_b[b_id].fundb_volume);
            row.push('<a target="_blank" href="http://j4.dfcfw.com/charts/pic1/' + b_id + '.png">' + data_b[b_id].b_est_val + '</a>');
            row.push('<a target="_blank" href="http://www.cninfo.com.cn/information/fund/netvalue/' + b_id + '.html">' + data_b[b_id].fundb_value + '</a>');
            row.push(data_b[b_id].fundb_discount_rt);
            row.push(data_b[b_id].fundb_price_leverage_rt);
            row.push(data_b[b_id].fundb_net_leverage_rt);
            row.push('<a target="_blank" href="http://quote.eastmoney.com/zs' + data_b[b_id].fundb_index_id + '.html">' + data_b[b_id].fundb_index_name + '</a>');
            if(parseFloat(data_b[b_id].fundb_index_increase_rt) > 0) {
                row.push('<span style="color: red">' + data_b[b_id].fundb_index_increase_rt + '</span>');
            } else if(parseFloat(data_b[b_id].fundb_index_increase_rt) < 0){
                row.push('<span style="color: green">' + data_b[b_id].fundb_index_increase_rt + '</span>');
            } else {
                row.push(data_b[b_id].fundb_index_increase_rt);
            }

            rows.push(row);
        }
//        console.info(rows);
        return rows;
    }

    var draw = function(table, data){
        // Create Header
        var head = [
            'M代码',
            'M名称',
            'M净值',
            'M上折',
            'M下折',
            'M下折需跌',
//            'M上折需涨',
            'M创立日期',
            '剩余年限',
            '整体溢价率',
            'A:B',

            'A代码',
            'A名称',
            'A现价',
            'A涨幅',
            'A成交额',
            'A净值',
            'A折价率',
            'A利率规则',
            'A新增(万份)',
            '下折A理论收益',

            'B代码',
            'B名称',
            'B现价',
            'B涨幅',
            'B成交额(万)',
            'B估值',
            'B净值',
            'B溢价率',
            'B价格杠杆',
            'B净值杠杆',
            '跟踪指数',
            '指数涨幅'
        ];
        table.append("thead").append("tr")
            .attr("class", "head")
            .selectAll("th")
            .data(head)
            .enter()
            .append("th")
            .attr("class", "data")
            .html(function(d){ return d; });

        table.append("tbody")
            .style("text-align", "left");

        data = parseData(data);
        $("table.table").dataTable({
            sDom: '<C>Tl<"H"f<"#paginate">>rt<"F"ip>',
            paginate: false,
            scrollY: 500,
            bProcessing: true,
            bAutoWidth: true,
            aaSorting: [
                [0, "asc"]
            ],
            oSearch: {
                bSmart: true
            },
            bDestroy: false,
            bStateSave: true,
            sScrollX: "100%",
            bScrollCollapse: true,
            aaData: data
        });
    };

    return {
      restrict: 'E',
      scope: {
          data: '='
      },
      compile: function(element, attrs, transclude){
          var table = d3.select(element[0])
              .append('table')
              .attr("class", "table table-striped table-hover table-condensed");

          return function(scope, element, attrs){
              scope.$watch('data', function(newVal, oldVal, scope){
                  if(scope.data.a !== "" && scope.data.b !== "" && scope.data.m !== ""){
                      draw(table, scope.data);
                  }
              }, true);
          };
      }
    };
  });
