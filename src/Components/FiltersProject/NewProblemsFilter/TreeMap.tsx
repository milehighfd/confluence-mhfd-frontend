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

  if (type === 'servicearea') {
    color = '#80a7f7';
  } else {
    color = '#66d4ff';
  }

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

  const numberFormatter = (value: any) => {
    let integerValue = Math.floor(value);
    return `${integerValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const nameFormatter: any = (value: any) => {
    if (value.includes('County')) {
      let index = value.indexOf('County');
      if (index !== -1) {
        value = value.substr(0, index - 1);
      }
    }
    if (value.includes('Service Area')) {
      let index = value.indexOf('Service Area');
      if (index !== -1) {
        value = value.substr(0, index - 1);
      }
    }
    return value;
  }

  useEffect(() => {
    const width = 220;
    const height = 220;
    const rounded = 4;
    const percentage = 0.10;
    const fontSizeText = '12px';
    const fontSizePercentage = '10px';

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
      .attr("rx", rounded)
      .attr("ry", rounded)
      .attr("x", function (d: any) { return d.x0 })
      .attr("y", function (d: any) { return d.y0 })
      .attr('width', function (d: any) { return d.x1 - d.x0; })
      .attr('height', function (d: any) { return d.y1 - d.y0; })
      .style("fill", color)
    
    rects
      .style("opacity", function (d: any) {
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
      .attr("rx", rounded)
      .attr("ry", rounded)
      .attr("x", function (d: any) { return d.x0 })
      .attr("y", function (d: any) { return d.y0 })
      .attr('width', function (d: any) { return d.x1 - d.x0; })
      .attr('height', function (d: any) { return d.y1 - d.y0; })
      .style("fill", color)

    newRects
      .style("opacity", function (d: any) {
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
      .text(function (d: any) {
        if (d.data.percentage > percentage) {
          return nameFormatter(d.data.name);
        } else {
          return '';
        }
      })
      .attr("font-size", fontSizeText)
      .attr("fill", "black")
      .attr('font-weight', 'bold')
      .style("text-anchor", "middle")

    texts
      .enter()
      .append("text")
      .attr("class", "titles")
      .transition().duration(2000)
      .attr("x", function (d: any) { return (d.x0 + d.x1) / 2 + textsOffsetX })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2 + textsOffsetY })
      .text(function (d: any) {
        if (d.data.percentage > percentage) {
          return nameFormatter(d.data.name);
        } else {
          return '';
        }
      })
      .attr("font-size", fontSizeText)
      .attr("fill", "black")
      .attr('font-weight', 'bold')
      .style("text-anchor", "middle")

    var percentageOffsetX = 0;
    var percentageOffsetY = 15;

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
      .text(function (d: any) {
        if (d.data.percentage > percentage) {
          return numberFormatter(d.data.value);
        } else {
          return '';
        }
      })
      .attr("font-size", fontSizePercentage)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .style('opacity', 0.7)

    percentages
      .enter()
      .append("text")
      .attr("class", "percentages")
      .transition().duration(2000)
      .attr("x", function (d: any) { return (d.x0 + d.x1) / 2 + percentageOffsetX })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2 + percentageOffsetY })
      .text(function (d: any) {
        if (d.data.percentage > percentage) {
          return numberFormatter(d.data.value);
        } else {
          return '';
        }
      })
      .attr("font-size", fontSizePercentage)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .style('opacity', 0.7)

  }, [data, selectedData])

  const apply = () => {
    if (type === 'county' && tab === 'problem') {
      onSelect(selectedData)
    } else {
      onSelect(selectedData.join(','))
    }
  }

  const reset = () => {
    onSelect(defaultValue);
  }

  return (
    <>
      <Button className="btn-svg" onClick={apply}>
        <u>Apply</u>
      </Button>
      &nbsp;|&nbsp;
      <Button className="btn-svg" onClick={reset}>
        <u>Reset</u>
      </Button>
      <svg ref={svgRef} className={'svg-top-pad'} />
    </>
  )
}

export default TreeMap;