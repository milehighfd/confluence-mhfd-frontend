import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

const HorizontalStackedBarChart = (bind:any, data:any ) => {
    const groupData = (dataToGroup:any, total:any) => {
        // use scale to get percent values
        const percent = d3.scaleLinear()
          .domain([0, total])
          .range([0, 100])
        // filter out data that has zero values
        // also get mapping for next placement
        // (save having to format data for d3 stack)
        let cumulative = 0
        console.log('dataToGroup', dataToGroup)
        const _data = dataToGroup.map((d:any) => {
          cumulative += d.value
          return {
            value: d.value,
            // want the cumulative to prior value (start of rect)
            cumulative: cumulative - d.value,
            label: d.label,
            percent: percent(d.value)
          }
        }).filter((d:any) => d.value > 0)
        return _data
    }

    const buildHorizontalChart = (bind:any, dataForChart:any, config:any) => {
    config = {
      f: d3.format('.1f'),
      margin: {top: 20, right: 10, bottom: 20, left: 10},
      width: 800,
      height: 200,
      barHeight: 100,
      colors: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33'],
      ...config
    }
    const { f, margin, width, height, barHeight, colors } = config
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom
    const halfBarHeight = barHeight / 2
  
    const total = d3.sum(dataForChart, (d:any) => d.value)
    const _data = groupData(dataForChart, total)
  
    // set up scales for horizontal placement
    const xScale = d3.scaleLinear()
      .domain([0, total])
      .range([0, w])
  
    // create svg in passed in div
    const selection = d3.select(bind)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  
    // stack rect for each data value
    selection.selectAll('rect')
      .data(_data)
      .enter().append('rect')
      .attr('class', 'rect-stacked')
      .attr('x', (d:any) => {
        const cumulative = xScale(d.cumulative)
        return cumulative ? cumulative : 0})
      .attr('y', h / 2 - halfBarHeight)
      .attr('height', barHeight)
      .attr('width', (d:any) => {
        const value = xScale(d.value)
        return value ? value : 0})
      .style('fill', (d, i) => colors[i])
  
    // add values on bar
    selection.selectAll('.text-value')
      .data(_data)
      .enter().append('text')
      .attr('class', 'text-value')
      .attr('text-anchor', 'middle')
      .attr('x', (d:any) => {
        const cumulative = xScale(d.cumulative);
        const value = xScale(d.value);
        return cumulative && value ? cumulative + (value / 2): 0})
      .attr('y', (h / 2) + 5)
      .text((d:any) => d.value)
  
    // add some labels for percentages
    selection.selectAll('.text-percent')
      .data(_data)
      .enter().append('text')
      .attr('class', 'text-percent')
      .attr('text-anchor', 'middle')
      .attr('x', (d:any) => {
        const cumulative = xScale(d.cumulative);
        const value = xScale(d.value);
        return cumulative && value ? cumulative + (value / 2): 0})
      .attr('y', (h / 2) - (halfBarHeight * 1.1))
      .text((d:any) => f(d.percent) + ' %')
  
    // add the labels
    selection.selectAll('.text-label')
      .data(_data)
      .enter().append('text')
      .attr('class', 'text-label')
      .attr('text-anchor', 'middle')
      .attr('x', (d:any) => {
        const cumulative = xScale(d.cumulative);
        const value = xScale(d.value);
        return cumulative && value ? cumulative + (value / 2): 0})
      .attr('y', (h / 2) + (halfBarHeight * 1.1) + 20)
      .style('fill', (d, i) => colors[i])
      .text((d:any) => d.label)
    }

    useEffect(() => {
        buildHorizontalChart('.chart', data, {})
    }, [data])

    return (
        <div className="chart"></div>
    )
  }
  
  export default HorizontalStackedBarChart;
