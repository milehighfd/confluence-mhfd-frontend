import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { Button } from 'antd';
import { CHART_CONSTANTS } from './Charts.constants';

const labelmap: any = {
  0: '0 - 25%',
  25: '25 - 50%',
  50: '50 - 75%',
  75: '75 - 100%'
}

let partitionData = [0, 1, 2, 3, 4];

const solutionstatus = 'solutionstatus';
const status = 'status';
const component_type = 'component_type';

var transformSelectedData = (sData: any) => {
  return sData.map((r: any) => `${r}`)
}

const HorizontalBarChart = ({ data, type, selected, onSelect, defaultValue, color, axisLabel }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedData, setSelectedData] = useState<string[]>([]);

  useEffect(() => {
    let temporal = selected.split(',')
    .filter((r: any) => r !== '')
    .map((r: any) => {
      if (type === solutionstatus) {
        return +r
      } else {
        return r;
      }
    });
    setSelectedData(temporal);
  }, [selected])

  useEffect(() => {
    if (type === solutionstatus) {
      data = data.map((r: any) => {
        return {
          value: r.value,
          counter: r.counter
        }
      })
    } else if (type === status) {
      data = data.filter((r: any) => r.counter > 0).map((r: any) => {
        return {
          value: r.value,
          counter: r.counter
        }
      })
    } else if (type === component_type) {
      data = data.filter((r: any) => r.counter > 0).map((r: any) => {
        return {
          value: r.value,
          counter: r.counter,
          key: r.key
        }
      })
    }

    const spaceBetween = 45;
    const width = 180;
    const height = Math.max(data.length * spaceBetween - 20, 140);

    let maxi: any = d3.max(data, (d: any) => d.counter);

    var x = d3.scaleLinear()
      .domain([0, maxi])
      .range([0, width-10]);

    var y: any = (value: any) => {
      let index = 0;
      data.forEach((d: any, id: any) => {
        if (d.value === value) {
          index = id;
        }
      })
      return 20 + index * spaceBetween;
    }

    var countFn: any = (d: any) => d.counter;

    let xCountFn: any = (d: any) => Math.max(17, x(d.counter) || 0);

    var yFn: any = (d: any) => y(d.value);

    var heightFn: any = () => {
      return 14;
    }

    var fontSizeFn: any = () => {
      return 12;
    }

    var getIndex = (d: any) => {
      let property;
      switch (type) {
        case solutionstatus:
          property = 'value';
          break;
        case status:
          property = 'value';
          break;
        case component_type:
          property = 'key';
          break;
        default:
          property = 'value';
          break;
      }
      let index = selectedData.indexOf(d[property]);
      return index;
    }

    var getValueToPush = (d: any) => {
      if (type === component_type) {
        return d.key;
      } else {
        return d.value;
      }
    }

    let labelTextFn = (d: any) => {
      if (type === solutionstatus) {
        return labelmap[d.value]
      } else if (type === status) {
        return d.value;
      } else if (type === component_type) {
        return d.value;
      }
    }

    let xInitialValue: any = x(0);

    let onClickFn = (d: any) => {
      let index = getIndex(d);
      if (index !== -1) {
        setSelectedData(selectedData.filter((_, ind) => ind !== index))
      } else {
        setSelectedData([...selectedData, getValueToPush(d)])
      }
    }

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      // .attr("width", width)
      // .attr("height", height)

    let lines = svg
      .selectAll('.hlines')
      .data(partitionData)
    
    lines
      .enter()
      .append("line").lower()
      .attr('class', 'hlines')
      .attr("x1", (d: any) => (d / (partitionData.length-1)) * width)
      .attr("x2", (d: any) => (d / (partitionData.length-1)) * width)
      .attr("y1", 0)
      .attr("y2", height)
      .attr('stroke-width', '0.1%')
      .style("stroke-dasharray","2,2")
      .style("stroke", 'black')
      .style('opacity', 0.4);

    lines.exit().remove();

    let rects = svg
      .selectAll(".hrect")
      .data(data);

    rects.exit().remove();

    rects
      .style("opacity", (d: any) => {
        let index = getIndex(d);
        if (index !== -1) {
          return CHART_CONSTANTS.opacityFull;
        } else {
          return CHART_CONSTANTS.opacityOpaque;
        }
      })

    rects
      .transition().duration(2000)
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("x", xInitialValue)
      .attr("y", yFn)
      .attr("width", xCountFn)
      .attr("height", heightFn)
      .attr("fill", color)

    let newRects = rects.enter()
      .append("rect")
      .attr("class", "hrect")
    
    newRects
      .transition().duration(2000)
      .attr("x", xInitialValue)
      .attr("y", yFn)
      .attr("width", xCountFn)
      .attr("height", heightFn)
      .attr("fill", color)
      .style("opacity", (d: any) => {
        let index = getIndex(d);
        if (index !== -1) {
          return CHART_CONSTANTS.opacityFull;
        } else {
          return CHART_CONSTANTS.opacityOpaque;
        }
      })

    rects.on('click', onClickFn)
    newRects.on('click', onClickFn)

    var labels = svg
      .selectAll('.hlabels')
      .data(data)

    labels.exit().remove();

    let newLabels = labels
      .enter()
      .append('text')
      .attr("class", "hlabels")
    
    newLabels
      .transition().duration(2000)
      .text(labelTextFn)
      .attr("x", 0)
      .attr("y", (d: any) => {
        return yFn(d) - 6;
      })
      .style("font-size", fontSizeFn)
      .style('opacity', 0.7);
    
    labels
      .transition().duration(2000)
      .text(labelTextFn)
      .attr("x", 0)
      .attr("y", (d: any) => {
        return yFn(d) - 6;
      })
      .style("font-size", fontSizeFn)
      .style('opacity', 0.7);

    var countXFn = (d: any) => {
      let digits = Math.floor(Math.log10(d.counter === 0 ? 1 : d.counter)) + 1;
      return xCountFn(d) - (digits * 8);
    }

    var countYFn = (d: any) => {
      // return yFn(d) + ((heightFn() + fontSizeFn()) / 2);
      return yFn(d) + fontSizeFn() - 1;
    }

    let counts = svg
      .selectAll('.hcount')
      .data(data)

    counts.exit().remove();

    let newCounts = counts
      .enter()
      .append('text')
      .attr('class', 'hcount')

    newCounts
      .transition().duration(2000)
      .text(countFn)
      .attr('x', countXFn)
      .attr('y', countYFn)
      .style("font-size", fontSizeFn)
      .style('fill', 'white')

    counts
      .transition().duration(2000)
      .text(countFn)
      .attr('x', countXFn)
      .attr('y', countYFn)
      .style("font-size", fontSizeFn)
      .style('fill', 'white')

    counts.on('click', onClickFn)
    newCounts.on('click', onClickFn)

  }, [data, selectedData])

  const apply = () => {
    onSelect(transformSelectedData(selectedData))
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
      <div className={'svg-scroll svg-top-pad'}>
        <svg ref={svgRef} className="horizontal-text" />
      </div>
      <div className="horizontal-axis-label">
        <i>{axisLabel}</i>
      </div>
    </>
  )
}

export default HorizontalBarChart;