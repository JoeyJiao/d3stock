'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:StockYearRange
 * @description
 * # StockYearRange
 */
angular.module('clientApp')
  .directive('stockYearRange', function () {
    var draw = function(svg, width, height, data){
        var margin = 40;
        var brushMargin = margin/2;
        var duration = 200;
        var brushHeight = height/5;

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
            .attr('transform', 'translate(-30,-15)scale(0.85)');
        xLabelNode.append('text')
            .attr('transform', 'translate(-20)');

        yLabelNode.append('path')
            .style('display', 'none')
            .attr('d', tag_path)
            .attr('transform', 'translate(-30,-15)scale(0.85)');
        yLabelNode.append('text')
            .attr('transform', 'translate(-20)');


        var xScale = d3.scale.linear()
            .domain(d3.extent(data, function(d){ return d.x; }))
            .range([margin, width - margin]);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(5)
            .orient('bottom');

        var yScale = d3.scale.linear()
            .domain([
                0,
                d3.max(data, function(d){ return d.max; })
            ])
            .range([height - margin, margin]);

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

        var max = d3.max(data, function(d){ return d.x; });
        var brushScale = d3.scale.linear()
            .domain(d3.extent(data, function(d){ return d.x; }))
            .range([margin, width - margin]);
        var brush = d3.svg.brush()
            .x(brushScale)
            .extent([max-5, max]);
        var brushContainer = svg.append("g")
            .attr("class", "brush")
            .attr("transform", "translate(0, " + height + ")")
            .call(brush);
        brushContainer.selectAll("rect")
            .attr("y", 0)
            .attr("height", brushHeight - brushMargin);
        var brushAxis = d3.svg.axis()
            .scale(brushScale)
            .orient('bottom');
        var brushAxisContainer = svg.append("g")
            .attr("class", "b-axis axis")
            .attr("transform", "translate(0, " + (height + brushHeight - brushMargin) + ")")
            .call(brushAxis);
        var brushYScale = d3.scale.linear()
            .domain([
				0,
                d3.max(data, function(d){ return d.max; })
            ])
            .range([brushHeight - brushMargin, brushMargin]);
        var brushUpdate = brushContainer.append("g").selectAll('rect').data(data);
        brushUpdate.enter()
            .append('rect');
        brushUpdate.style('fill', 'red')
            .attr('x', function(d){ return brushScale(d.x); })

            .attr('y', function(d){ return brushYScale(d.max); })
            .attr('width', 2.5)
            .attr('height', function(d){ return -(brushYScale(d.max) - brushYScale(d.min)); });
        brush.on('brushend', function(){
            xScale.domain(brush.extent());
            svg.select('.x-axis')
                .transition()
                .duration(duration)
                .call(xAxis);
            var update = svg.select('.data')
                .selectAll('rect').data(data);
    
            update
                .attr('x', function(d){ return xScale(d.x); })
    
                .attr('y', function(d){ return yScale(d.max); })
                .attr('width', 2.5)
                .attr('height', function(d){ return -(yScale(d.max) - yScale(d.min)); });
//            brushContainer.call(brush.clear());
        });

//        var zoom = d3.behavior.zoom()
//            .x(xScale)
//            .on("zoom", function(){
//                svg.select(".x-axis").call(xAxis);
//                svg.select(".data").selectAll("rect").data(data)
//                    .attr('x', function(d){ return xScale(d.x); });
//            });           
//        svg.call(zoom);
    
        xScale.domain(brush.extent());
        svg.select('.x-axis')
            .call(xAxis);

        var xCursor = svg.select('.x-cursor');
        var yCursor = svg.select('.y-cursor');
        var xLabel = svg.select('.x-label');
        var yLabel = svg.select('.y-label');

        svg.on('mousemove', function(){
			var xMargin = -8, yMargin = 6;
            var pos = d3.mouse(this);
            var xValue = xScale.invert(pos[0]);
            var yValue = yScale.invert(pos[1]);
            var xMin = d3.min(data, function(d){ return d.x; });
            var xMax = d3.max(data, function(d){ return d.x; });
            var yMax = d3.max(data, function(d){ return d.max; });

			var xBisect = d3.bisector(function(d){ return d.x; }).left;
			var index = xBisect(data, xValue);
			if(index == 0 || index >= data.length){
				return;
			}
			var d0 = data[index-1];
			var d1 = data[index];
			var d = xValue - d0.x > d1.x - xValue ? d1 : d0;

			var xLeft = xScale(d.x) + xMargin;
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
                .attr('transform', 'translate(' + xLeft + ',' + xTop + ')rotate(90)')
				.select('text')
				.attr('transform', 'translate(13,-7)rotate(180)')
                .text(d.x);
			xLabel.select('path')
				.style('display', 'block');

			var yLeft = xScale(xMin);
			var yTop = yScale(d.y) + yMargin;

			yLabel
				.transition()
				.duration(duration)
				.ease('cubic')
				.attr('transform', 'translate(' + (margin/2 + yMargin) + ',' + pos[1] + ')')
				.select('text')
				.attr('transform', 'translate(-10,3)')
				.text(d3.format('f')(yValue));
			yLabel.select('path')
				.style('display', 'block');

            yCursor
                .attr('x1', 0)
                .attr('y1', function(){ return pos[1]<margin?margin:pos[1]>(height-margin)?(height-margin):pos[1];})
                .attr('x2', xScale(xMax))
                .attr('y2', function(){ return pos[1]<margin?margin:pos[1]>(height-margin)?(height-margin):pos[1];});

        });

        var update = svg.select('.data')
            .selectAll('rect').data(data);

        update.enter()
            .append('rect');

        update
            .style('fill', 'red')
            .attr('x', function(d){ return xScale(d.x); })

            .attr('y', function(d){ return yScale(d.max); })
            .attr('width', 2.5)
            .attr('height', function(d){ return -(yScale(d.max) - yScale(d.min)); });
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
              if(scope.data !== ""){
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
