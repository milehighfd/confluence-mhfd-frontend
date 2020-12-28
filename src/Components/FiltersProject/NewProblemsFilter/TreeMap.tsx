import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { Button } from 'antd';

const TreeMap = ({ data, type, tab, selected, onSelect, defaultValue }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [selectedData, setSelectedData] = useState<string[]>([]);

  useEffect(() => {
    let sData = selected === '' ? [] : selected.split(',')
    setSelectedData(sData);
  }, [selected])

  let color: string;

  let datatype = typeof data[0];

  if (type === 'servicearea') {
    color = '#80a7f7';
  } else {
    color = '#66d4ff';
  }

  if (datatype === 'string') {
    let sa = 'Service Area';
    data = {
      name: '',
      children: (data || []).map((d: any) => {
        let index = d.indexOf(sa);
        if (index !== -1) {
          d = d.substr(0, index - 1);
        }
        return {
          name: d,
          value: 1,
          colname: 'level2',
          percentage: 1 / (data || []).length
        }
      })
    }
  } else {
    let sum = 0;
    (data || []).forEach((d: any) => {
      sum += d.counter;
    });
    data = {
      name: '',
      children: (data || []).map((d: any) => {
        return {
          name: d.value,
          value: d.counter,
          colname: 'level2',
          percentage: (d.counter) / sum
        }
      })
    }
  }

  useEffect(() => {
    const width = 200;
    const height = 200;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)

    var _root = d3.hierarchy(data).sum(function (d: any) { return d.value })
    d3.treemap()
      .size([width, height])
      .padding(2)
      (_root)

    var rects: any = svg
      .selectAll("rect")
      .data(_root.leaves())

    rects.exit()
      .transition().duration(2000)
      .attr('width', 0)
      .attr('height', 0)
      .style("opacity", 0)
      .remove()

    rects
      .transition().duration(2000)
      .attr("x", function (d: any) { return d.x0 })
      .attr("y", function (d: any) { return d.y0 })
      .attr('width', function (d: any) { return d.x1 - d.x0; })
      .attr('height', function (d: any) { return d.y1 - d.y0; })
      .style("fill", color)
      .style("opacity", function(d:any) {
        let index = selectedData.indexOf(d.data.name);
        if (index !== -1) {
          return 1;
        } else {
          return 0.6;
        }
      })
    
    rects.on('click', (d: any) => {
      let index = selectedData.indexOf(d.data.name);
      if (index !== -1) {
        setSelectedData(selectedData.filter((_, ind) => ind !== index))
      } else {
        setSelectedData([...selectedData, d.data.name])
      }
    })

    let newRects = rects
      .enter()
      .append("g")
      .append("rect");

    newRects
      .transition().duration(2000)
      .attr("x", function (d: any) { return d.x0 })
      .attr("y", function (d: any) { return d.y0 })
      .attr('width', function (d: any) { return d.x1 - d.x0; })
      .attr('height', function (d: any) { return d.y1 - d.y0; })
      .style("fill", color)
      .style("opacity", function(d:any) {
        let index = selectedData.indexOf(d.data.name);
        if (index !== -1) {
          return 1;
        } else {
          return 0.6;
        }
      })

    newRects.on('click', (d: any) => {
      let index = selectedData.indexOf(d.data.name);
      if (index !== -1) {
        setSelectedData(selectedData.filter((_, ind) => ind !== index))
      } else {
        setSelectedData([...selectedData, d.data.name])
      }
    })

    var textsOffsetX = 0;
    var textsOffsetY = 0;

    var texts = svg
      .selectAll(".titles")
      .data(_root.leaves())

    texts
      .exit()
      .transition().duration(2000)
      .attr('width', 0)
      .attr('height', 0)
      .style("opacity", 0)
      .remove()

    texts
      .transition().duration(2000)
      .attr("x", function (d: any) { return (d.x0 + d.x1) / 2 + textsOffsetX })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2 + textsOffsetY })
      .style("text-anchor", "middle")

    texts
      .enter()
      .append("text")
      .attr("class", "titles")
      .transition().duration(2000)
      .attr("x", function (d: any) { return (d.x0 + d.x1) / 2 + textsOffsetX })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2 + textsOffsetY })
      .text(function (d: any) {
        console.log('d.data.percentage', d.data.percentage, d.data.percentage > 10, typeof d.data.percentage)
        if (d.data.percentage > 0.10) {
          return d.data.name;
        } else {
          return '';
        }
      })
      .attr("font-size", "10px")
      .attr("fill", "black")
      .style("text-anchor", "middle")

    var percentageOffsetX = 0;
    var percentageOffsetY = 10;

    var percentages = svg
      .selectAll(".percentages")
      .data(_root.leaves())

    percentages
      .exit()
      .transition().duration(2000)
      .attr('width', 0)
      .attr('height', 0)
      .style("opacity", 0)
      .remove()

    percentages
      .transition().duration(2000)
      .attr("x", function (d: any) { return (d.x0 + d.x1) / 2 + percentageOffsetX })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2 + percentageOffsetY })
      .style("text-anchor", "middle")

    percentages
      .enter()
      .append("text")
      .attr("class", "percentages")
      .transition().duration(2000)
      .attr("x", function (d: any) { return (d.x0 + d.x1) / 2 + percentageOffsetX })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2 + percentageOffsetY })
      .text(function (d: any) {
        if (d.data.percentage > 0.10) {
          return d.data.value;
        } else {
          return '';
        }
      })
      .attr("font-size", "10px")
      .attr("fill", "black")
      .style("text-anchor", "middle")

  }, [data])

  const apply = () => {
    if (type === 'servicearea') {
      onSelect(selectedData.join(','))
    } else if (type === 'county' && tab === 'problem') {
      onSelect(selectedData)
    } else if (type === 'county' && tab === 'project') {
      onSelect(selectedData.join(','))
    } else if (type === 'county' && tab === 'component') {
      onSelect(selectedData.join(','))
    }
  }

  const reset = () => {
    onSelect(defaultValue);
  }

  return (
    <>
      <svg ref={svgRef} />
      <Button onClick={apply}>
        apply
      </Button>
      <Button onClick={reset}>
        reset
      </Button>
    </>
  )
}

export default TreeMap;