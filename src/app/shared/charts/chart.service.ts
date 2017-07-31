import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Rx';

import * as d3 from 'd3';

@Injectable()
export class ChartService {
	
	constructor() { }
	public interactiveAreaChartControler = {
		chartData: null,
		width: null,
		height: null,
		id: null,
		mainSVG: null,
		margins: { top: 7, right: 30, bottom: 20, left: 15 },
		scaleWidth: null,
		scaleHeight: null,
		yMin: null,
		yMax: null,
		xScale: null,
		yScale: null,
		xAxis: null,
		yAxis: null,
		instance: null,
		init: function(initParams) {
			let self = this;
			self.instance = this;
			self.chartData = initParams.data;
			self.id = initParams.id;
			self.height = document.getElementById(self.id).clientHeight;
			self.width = document.getElementById(self.id).clientWidth;
			self.setupChart();
		},
		getInstance: function() {
			return this.instance;
		},
		setupChart: function() {
			let self = this;
			if (self.mainSVG) {
				self.mainSVG.remove();
			}
			self.mainSVG = d3.select(`#${self.id}`).append("svg").attr("preserveAspectRatio", "none").attr("viewBox", "0 0 " + self.width + " " + self.height + "").attr("type", "chart");

			// Actual width and height for charts
			var scaleWidth = self.width - self.margins.left - self.margins.right;
			var scaleHeight = self.height - self.margins.top - self.margins.bottom;

			//Globalize chart width and height
			self.scaleWidth = scaleWidth;
			self.scaleHeight = scaleHeight;

			self.mainGroup = self.mainSVG.append("g").attr("class", "mainGroup")
				.attr("transform", "translate(" + self.margins.left + "," + self.margins.top + ")");

			self.xScale = d3.scaleLinear().range([0, self.scaleWidth]);

			self.mainGroup.append('g').attr('class', 'xAxisGroup')
				.attr('transform', 'translate(0,' + this.scaleHeight + ')')

			self.yScale = d3.scaleLinear().range([self.scaleHeight, 0]);

			self.mainGroup.append("g")
				.attr("class", "yAxisGroup")
				.attr("transform", "translate(" + self.scaleWidth + "," + 0 + ")")

			self.updateChart();
		},
		updateChart: function() {
			var self = this;

			// calculate maximum and minimum value for y scaling
			let maxMinArray = self.chartData.yAxisData.slice();
			self.yMin = d3.min(maxMinArray);
			self.yMax = d3.max(maxMinArray);
			self.xScale.domain([0, self.chartData.xAxisData.length - 1])

			self.xAxis = d3.axisBottom(self.xScale)
				.tickValues(self.getTicksIndex(0, self.chartData.xAxisData.length, 5, self.scaleWidth))
				.tickSizeInner(0)
				.tickSizeOuter(0)
				.tickPadding(3)

			self.mainSVG.select('.xAxisGroup')
				.call(self.xAxis)
				.selectAll("text")
				.text(function(d, i) {
					let tick = self.chartData.xAxisData[d]
					return tick;
				});

			self.yScale.domain([self.yMin, self.yMax])


			self.yAxis = d3.axisRight(self.yScale)
				.ticks(3)
				.tickFormat(function(d){ return '$'+d })
				.tickSizeInner(-self.scaleWidth)
				.tickSizeOuter(-self.scaleWidth)
				.tickPadding(5)


			// Group for Y Axis						  
			self.mainSVG.select('.yAxisGroup')
				.call(customYAxis)
				.style('shape-rendering', 'crispEdges')
				.attr("fill", "none")
				.selectAll("text")
				.attr("fill", "black");


			function customYAxis(g) {
				g.call(self.yAxis);
				g.select(".domain").remove();
				//:not(:first-of-type)
				g.selectAll(".tick line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
				//g.selectAll(".tick text").attr("x", 4).attr("dy", -4);
			}

			var lineFunction = d3.line()
				.x(function(d, i) { return self.xScale(i); })
				.y(function(d, i) { return self.yScale(d); })

			var area = d3.area()
				.x(function(d, i) { return self.xScale(i); })
				.y0(self.yScale(self.yMin))
				.y1(function(d, i) { return self.yScale(d); });

			// Path generate 
			self.mainSVG.selectAll(".area-chart").remove();
			var areaPath = self.mainGroup.append("path")
				.attr("d", area(self.chartData.yAxisData))
				.attr("class", "area-chart")
				.attr("id", "areaChart")
				.attr("stroke-width", 2)
				.attr("fill", 'cyan')
				.style("opacity", .3)
				.attr("display", "block")

			//self.mainGroup.selectAll(".area").data(self.candleData)
			self.mainSVG.selectAll(".area-chart-line").remove();
			self.mainGroup.append("path")
				.attr("d", lineFunction(self.chartData.yAxisData))
				.attr("class", "area-chart-line")
				.attr("stroke", "blue")
				.attr("stroke-width", 1)
				.attr("fill", "none")
				.style("opacity", 0.8)
				.style('shape-rendering', 'crispEdges')


			
			/*d3.select(".axis")
				.call(d3.axisBottom(self.xScale));*/

			//self.xAxis = d3.svg.axis().scale(self.xScale).tickValues([0, 1, 2, 3, 4, 5]);
			///console.log(self.xAxis);
			/*d3.select(".axis")
				.call(d3.axisBottom(self.xAxis));*/
		},
		formatxAxisText: function(value) {
			return value.split(':')[0];
		},
		getTicksIndex: function (minVal, maxVal, maxCharacterLength, svgWidth) {
				let tickArray = [];
				let maxTickWidth = 2 * 6.5 * maxCharacterLength;
				let totalTicks = (svgWidth / maxTickWidth);

				let curval = minVal;
				tickArray.push(curval);
				let factor = (maxVal - minVal) / totalTicks;

				while (curval < maxVal) {
					//alert(curval+"::"+maxVal+"::"+factor);
					curval = Math.floor(curval + factor);
					if (tickArray.indexOf(curval) == -1 && curval <= maxVal - 1)
						tickArray.push(curval);
					else
						curval++;

				}

				return tickArray;
		
		}
	};

	public realTimeAreaChartControler = {
		chartData: null,
		width: null,
		height: null,
		id: null,
		mainSVG: null,
		margins: { top: 7, right: 30, bottom: 20, left: 7 },
		scaleWidth: null,
		scaleHeight: null,
		yMin: null,
		yMax: null,
		xScale: null,
		yScale: null,
		xAxis: null,
		yAxis: null,
		instance: null,
		init: function(initParams) {
			let self = this;
			self.instance = this;
			self.chartData = initParams.data;
			self.id = initParams.id;
			self.height = document.getElementById(self.id).clientHeight;
			self.width = document.getElementById(self.id).clientWidth;

			self.setupChart();
		},
		getInstance: function() {
			return this.instance;
		},
		appendNewData: function(res) {
			if (this.chartData.xAxisData[this.chartData.xAxisData.length - 1] != res.timeInterval) {
				this.chartData.xAxisData.push(res.timeInterval);
				this.chartData.yAxisData.push(parseFloat(res.intraDayPrice));
			}
			
			if (this.mainSVG == null) {
				this.setupChart();
			}else{
				this.updateChart();
			}
			
		},
		setupChart: function() {
			let self = this;
			if (self.mainSVG) {
				self.mainSVG.remove();
			}
			self.mainSVG = d3.select(`#${self.id}`).append("svg").attr("preserveAspectRatio", "none").attr("viewBox", "0 0 " + self.width + " " + self.height + "").attr("type", "chart");

			// Actual width and height for charts
			var scaleWidth = self.width - self.margins.left - self.margins.right;
			var scaleHeight = self.height - self.margins.top - self.margins.bottom;

			//Globalize chart width and height
			self.scaleWidth = scaleWidth;
			self.scaleHeight = scaleHeight;

			self.mainGroup = self.mainSVG.append("g").attr("class", "mainGroup")
				.attr("transform", "translate(" + self.margins.left + "," + self.margins.top + ")");

			self.xScale = d3.scaleLinear().range([0, self.scaleWidth]);

			self.mainGroup.append('g').attr('class', 'xAxisGroup')
				.attr('transform', 'translate(0,' + this.scaleHeight + ')')

			self.yScale = d3.scaleLinear().range([self.scaleHeight, 0]);

			self.mainGroup.append("g")
				.attr("class", "yAxisGroup")
				.attr("transform", "translate(" + self.scaleWidth + "," + 0 + ")")

			self.updateChart();
		},
		updateChart: function() {
			var self = this;

			// calculate maximum and minimum value for y scaling
			let maxMinArray = self.chartData.yAxisData.slice();;
			maxMinArray.push(self.chartData.midValue);
			self.yMin = d3.min(maxMinArray);
			self.yMax = d3.max(maxMinArray);
			self.xScale.domain([0, self.chartData.xAxisData.length - 1])

			self.xAxis = d3.axisBottom(self.xScale)
				.tickValues(self.getTicksIndex(self.chartData.xAxisData))
				.tickSizeInner(0)
				.tickSizeOuter(0)
				.tickPadding(3)

			self.mainSVG.select('.xAxisGroup')
				.call(self.xAxis)
				.selectAll("text")
				.text(function(d, i) {
					let tick = self.formatxAxisText(self.chartData.xAxisData[d])
					return (tick > 12) ? tick - 12 : tick;
				});

			self.yScale.domain([self.yMin, self.yMax])


			self.yAxis = d3.axisRight(self.yScale)
				.ticks(3)
				.tickSizeInner(-self.scaleWidth)
				.tickSizeOuter(-self.scaleWidth)
				.tickPadding(5)


			// Group for Y Axis						  
			self.mainSVG.select('.yAxisGroup')
				.call(customYAxis)
				.style('shape-rendering', 'crispEdges')
				.attr("fill", "none")
				.selectAll("text")
				.attr("fill", "black");


			function customYAxis(g) {
				g.call(self.yAxis);
				g.select(".domain").remove();
				//:not(:first-of-type)
				g.selectAll(".tick line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
				//g.selectAll(".tick text").attr("x", 4).attr("dy", -4);
			}

			var lineFunction = d3.line()
				.x(function(d, i) { return self.xScale(i); })
				.y(function(d, i) { return self.yScale(d); })

			var area = d3.area()
				//.interpolate("cardinal")
				.x(function(d, i) { return self.xScale(i); })
				.y0(self.yScale(self.chartData.midValue))
				.y1(function(d, i) { return self.yScale(d); });

			// Path generate 
			self.mainSVG.selectAll(".area-chart").remove();
			var areaPath = self.mainGroup.append("path")
				.attr("d", area(self.chartData.yAxisData))
				.attr("class", "area-chart")
				.attr("id", "areaChart")
				.attr("stroke-width", 2)
				.attr("fill", 'cyan')
				.style("opacity", .3)
				.attr("display", "block")

			//self.mainGroup.selectAll(".area").data(self.candleData)
			self.mainSVG.selectAll(".area-chart-line").remove();
			self.mainGroup.append("path")
				.attr("d", lineFunction(self.chartData.yAxisData))
				.attr("class", "area-chart-line")
				.attr("stroke", "blue")
				.attr("stroke-width", 1)
				.attr("fill", "none")
				.style("opacity", 0.8)
				.style('shape-rendering', 'crispEdges')

			self.mainSVG.selectAll(".close-price-line").remove();
			self.mainGroup.append("line")          // attach a line
				.attr("class", "close-price-line")
				.style("stroke", "red")  // colour the line
				.attr("x1", 0)     // x position of the first end of the line
				.attr("y1", self.yScale(self.chartData.midValue))      // y position of the first end of the line
				.attr("x2", self.scaleWidth)     // x position of the second end of the line
				.attr("y2", self.yScale(self.chartData.midValue))
				.style('shape-rendering', 'crispEdges')

			self.mainSVG.selectAll(".close-price-circle").remove();
			self.mainGroup.append('circle')
				.attr("class", "close-price-circle")
				.attr('cx', 0)
				.attr('cy', self.yScale(self.chartData.midValue))
				.attr('r', 3)
				.attr('stroke', '#000')
				.attr('fill', '#000');
			/*d3.select(".axis")
				.call(d3.axisBottom(self.xScale));*/

			//self.xAxis = d3.svg.axis().scale(self.xScale).tickValues([0, 1, 2, 3, 4, 5]);
			///console.log(self.xAxis);
			/*d3.select(".axis")
				.call(d3.axisBottom(self.xAxis));*/
		},
		formatxAxisText: function(value) {
			return value.split(':')[0];
		},
		getTicksIndex: function(xAxisData) {
			var self = this;
			let tickArray: Array<object> = [];
			let jsonTick = {};
			xAxisData.forEach((value, index, arr) => {
				let calculatedTicks = parseInt(self.formatxAxisText(value));
				if (!jsonTick[calculatedTicks] && calculatedTicks % 2 == 0) {
					jsonTick[calculatedTicks] = index;
				}
			});
			for (var key in jsonTick) {
				tickArray.push(jsonTick[key]);
			}
			if (tickArray.length==0){
				
			}
			return tickArray;
		}
	};
	
}