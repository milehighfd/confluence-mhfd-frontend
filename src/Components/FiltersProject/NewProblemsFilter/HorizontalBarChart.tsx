import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { Button } from 'antd';

const labelmap: any = {
  0: '0 - 25%',
  25: '25 - 50%',
  50: '50 - 75%',
  75: '75 - 100%'
}

const solutionstatus = 'solutionstatus';
const status = 'status';
const component_type = 'component_type';

var transformSelectedData = (sData: any) => {
  return sData.map((r: any) => `${r}`)
}

const HorizontalBarChart = ({ data, type, selected, onSelect, hasScroll, defaultValue }: any) => {
  console.log('HorizontalBarChart', data, selected)
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
          count: r.count
        }
      })
    } else if (type === status) {
      data = data.filter((r: any) => r.counter > 0).map((r: any) => {
        return {
          value: r.value,
          count: r.counter
        }
      })
    } else if (type === component_type) {
      data = data.filter((r: any) => r.counter > 0).map((r: any) => {
        return {
          value: r.value,
          count: r.counter,
          key: r.key
        }
      })
    }

    const width = 200;
    const height = type === solutionstatus ? 200 : 300;

    let maxi: any = d3.max(data, (d: any) => d.count);

    var x = d3.scaleLinear()
      .domain([0, maxi])
      .range([0, width]);

    var y: any = d3.scaleBand()
      .range([10, height])
      .domain(data.map((d: any) => d.value))
      .padding(.1);

    let xCountFn: any = (d: any) => x(d.count);

    var yFn: any = (d: any) => y(d.value);

    var heightFn: any = () => {
      if (type === solutionstatus) {
        return 25;
      } else if (type === status) {
        return Math.floor(y.bandwidth() / 2);
      } else if (type === component_type) {
        return 25;
      }
    }

    var fontSizeFn: any = () => {
      if (type === solutionstatus) {
        return 14
      } else if (type === status) {
        return 12;
      } else if (type === component_type) {
        return 12;
      }
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

    d3.select(svgRef.current).select('g').remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g")
      .call(d3.axisLeft(y))

    let xInitialValue: any = x(0);

    svg.selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", xInitialValue)
      .attr("y", yFn)
      .attr("width", xCountFn)
      .attr("height", heightFn)
      .attr("fill", "#261964")
      .style("opacity", (d: any) => {
        let index = getIndex(d);
        if (index !== -1) {
          return 1;
        } else {
          return 0.7;
        }
      })
      .on('click', (d: any, i: number) => {
        let index = getIndex(d);
        if (index !== -1) {
          setSelectedData(selectedData.filter((_, ind) => i !== index))
        } else {
          setSelectedData([...selectedData, getValueToPush(d)])
        }
      })

    svg
      .selectAll('.labels')
      .data(data)
      .enter()
      .append('text')
      .text(labelTextFn)
      .attr("transform", function (d: any) {
        let xo = 10;
        let yo = yFn(d) - 5;
        return `translate(${xo}, ${yo})`;
      })
      .style("font-size", fontSizeFn)

    var countXFn = (d: any) => {
      return xCountFn(d) - (d.count < 10 ? 10 : (d.count < 100 ? 20 : 30));
    }

    var countYFn = (d: any) => {
      return yFn(d) + ((heightFn() + fontSizeFn()) / 2) - 2;
    }

    svg
      .selectAll('.count')
      .data(data)
      .enter()
      .append('text')
      .text(xCountFn)
      .attr('x', countXFn)
      .attr('y', countYFn)
      .style("font-size", fontSizeFn)
      .style('fill', 'white')

  }, [data, selectedData])

  const apply = () => {
    onSelect(transformSelectedData(selectedData))
  }

  const reset = () => {
    onSelect(defaultValue);
  }

  return (
    <>
      <div className={hasScroll ? 'svg-scroll' : ''}>
        <svg ref={svgRef} />
      </div>
      <Button onClick={apply}>
        apply
      </Button>
      <Button onClick={reset}>
        reset
      </Button>
    </>
  )
}

export default HorizontalBarChart;