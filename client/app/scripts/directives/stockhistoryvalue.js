'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:StockHistoryValue
 * @description
 * # StockHistoryValue
 */
angular.module('clientApp')
  .directive('stockHistoryValue', function () {
    var draw = function(svg, width, height, data){
        var margin = 45;
        var brushMargin = margin/2;
        var duration = 200;
        var brushHeight = height/5;

        var xMin = d3.min(data, function(d){ return d.x; });
        var xMax = d3.max(data, function(d){ return d.x; });
        var yMax = d3.max(data, function(d){ return d.y; });

        svg.attr('width', width)
            .attr('height', height + brushHeight)
            .style('border', '1px solid gray');
        svg.append('g').attr('class', 'data').attr("height", height - margin);
        svg.append('g').attr('class', 'x-axis axis');
        svg.append('g').attr('class', 'y-axis axis');

        var cursor = svg.append('g').attr('class', 'cursor');
        cursor.append('line').attr('class', 'x-cursor cursor');
        cursor.append('line').attr('class', 'y-cursor cursor');

        var xLabelNode = cursor.append('g').attr('class', 'x-label label');
        var yLabelNode = cursor.append('g').attr('class', 'y-label label');

        var tag_path = 'M 51.166,23.963 62.359,17.5 c 1.43,-0.824 1.43,-2.175 0,-3 L 51.166,8.037 48.568,1.537 2,1.4693227 2,30.576466 48.568,30.463 z';

        xLabelNode.append('path')
            .style('display', 'none')
            .attr('d', tag_path)
            .attr('transform', 'translate(-60,-15)scale(0.85)');
        xLabelNode
            .append('text');

        yLabelNode.append('path')
            .style('display', 'none')
            .attr('d', tag_path)
            .attr('transform', 'translate(-30,-15)scale(0.7)');
        yLabelNode
            .append('text');

        var max = d3.max(data, function(d){ return d.x; });
        var xScale = d3.time.scale()
            .domain([max-365*24*3600*1000, max])
            .range([margin, width - margin])
            .clamp(true);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(10)
            .tickFormat(d3.time.format('%y-%b'))
            .orient('bottom');

        var yScale = d3.scale.linear()
            .domain([
                0,
                d3.max(data, function(d){ return d.y; })
            ])
            .range([height - margin, margin])
            .clamp(true);

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .tickFormat(d3.format('f'));

        svg.select('.x-axis')
            .attr("transform", "translate(0, " + (height - margin) + ")")
            .call(xAxis);

        svg.select('.y-axis')
            .attr("transform", "translate(" + margin + ")")
            .call(yAxis);

        var line = d3.svg.line()
            .x(function(d){ return xScale(d.x); })
            .y(function(d){ return yScale(d.y); });

        var brushScale = d3.time.scale()
            .domain(d3.extent(data, function(d){ return d.x; }))
            .range([margin, width - margin]);
        var brush = d3.svg.brush()
            .x(brushScale)
            .extent([max-365*24*3600*1000, max]);
        var brushContainer = svg.append("g")
            .attr("class", "brush")
            .attr("transform", "translate(0, " + height + ")")
            .call(brush);
        brushContainer.selectAll("rect")
            .attr("y", 0)
            .attr("height", brushHeight - brushMargin);
        var brushAxis = d3.svg.axis()
            .scale(brushScale)
            .ticks(10)
            .orient('bottom');
        var brushAxisContainer = svg.append("g")
            .attr("class", "b-axis axis")
            .attr("transform", "translate(0, " + (height + brushHeight - brushMargin) + ")")
            .call(brushAxis);
        var brushYScale = d3.scale.linear()
            .domain([
				0,
                d3.max(data, function(d){ return d.y; })
            ])
            .range([brushHeight - brushMargin, brushMargin]);
        var brushLine = d3.svg.line()
            .x(function(d){ return brushScale(d.x); })
            .y(function(d){ return brushYScale(d.y); });
        var brushUpdate = brushContainer.append("g").append('path').datum(data);
        brushUpdate
            .attr('class', 'line')
            .attr('d', brushLine);
        brush.on('brushend', function(){
            xScale.domain(brush.extent());
            svg.select('.x-axis')
                .transition()
                .duration(duration)
                .call(xAxis);
            var update = svg.select('.data')
                .select('path').datum(data);
    
            update
                .attr('class', 'line')
                .attr('d', line);
////            brushContainer.call(brush.clear());
        });

//        var zoom = d3.behavior.zoom()
//            .x(xScale)
//            .on("zoom", function(){
//                svg.select(".x-axis").call(xAxis);
//                svg.select(".data").selectAll("rect").data(data)
//                    .attr('x', function(d){ return xScale(d.x); });
//            });           
//        svg.call(zoom);
    
        var xCursor = svg.select('.x-cursor');
        var yCursor = svg.select('.y-cursor');
        var xLabel = svg.select('.x-label');
        var yLabel = svg.select('.y-label');

        svg.on('mousemove', function(){
			var xMargin = -8, yMargin = 6;
            var pos = d3.mouse(this);
            if(pos[1] > height - margin || pos[1] < margin) return;
            var xValue = xScale.invert(pos[0]);
            var yValue = yScale.invert(pos[1]);

			var xBisect = d3.bisector(function(d){ return d.x; }).right;
			var index = xBisect(data, xValue);
			if(index == 0 || index >= data.length){
				return;
			}
			var d0 = data[index-1];
			var d1 = data[index];
			var d = xValue - d0.x > d1.x - xValue ? d1 : d0;

			var xLeft = xScale(d.x);
			var xTop = yScale(0);

            xCursor
				.attr('x1', xScale(d.x))
                .attr('y1', yScale(0))
				.attr('x2', xScale(d.x))
                .attr('y2', yScale(yMax));

            xLabel
				.transition()
				.duration(duration)
				.ease('cubic')
                .attr('transform', 'translate(' + xLeft + ',' + xTop + ')rotate(-90)')
				.select('text')
				.attr('transform', 'translate(-55,5)')
                .text(d.date.substr(2,8));
			xLabel.select('path')
				.style('display', 'block');

			yLabel
				.transition()
				.duration(duration)
				.ease('cubic')
				.attr('transform', 'translate(' + (margin/2 + yMargin) + ',' + pos[1] + ')')
				.select('text')
				.attr('transform', 'translate(-20,3)')
				.text(d3.format('f')(yValue));
			yLabel.select('path')
				.style('display', 'block');

            yCursor
                .attr('x1', 0)
                .attr('y1', function(){ return pos[1];})
                .attr('x2', xScale(xMax))
                .attr('y2', function(){ return pos[1];});

        });

        var update = svg.select('.data').append('path')
            .datum(data);

        update
            .attr('class', 'line')
            .attr('d', line);
    };

    return {
      restrict: 'E',
      scope: {
        data: '='
      }, 
      compile: function(element, attrs, transclude){
        var svg = d3.select(element[0]).append('svg');
        var width = 800, height = 500;

        return function(scope, element, attrs){
          scope.$watch('data', function(newVal, oldVal, scope){
              if(scope.data !== "" && scope.data.length !== 0){
                  draw(svg, width, height, scope.data);
              } else {
                  svg.remove();
                  svg = d3.select(element[0]).append('svg');
              }
          }, true);
        };
      }
    };
  });
