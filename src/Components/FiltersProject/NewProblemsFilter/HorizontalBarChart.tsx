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

const HorizontalBarChart = ({ data, type, selected, onSelect, defaultValue }: any) => {
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

    const width = 220;
    const height = data.length * 45;

    let maxi: any = d3.max(data, (d: any) => d.count);

    var x = d3.scaleLinear()
      .domain([0, maxi])
      .range([0, width]);

    var y: any = (value: any) => {
      let index = 0;
      data.forEach((d: any, id: any) => {
        if (d.value === value) {
          index = id;
        }
      })
      return 25 + index * 45;
    }

    var countFn: any = (d: any) => d.count;

    let xCountFn: any = (d: any) => x(d.count);

    var yFn: any = (d: any) => y(d.value);

    var heightFn: any = () => {
      return 25;
    }

    var fontSizeFn: any = () => {
      return 14;
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
      .attr("x", 10)
      .attr("y", (d: any) => {
        return yFn(d) - 6;
      })
      .style("font-size", fontSizeFn)

    var countXFn = (d: any) => {
      let digits = Math.floor(Math.log10(d.count === 0 ? 1 : d.count));
      return xCountFn(d) - (digits * 14);
    }

    var countYFn = (d: any) => {
      return yFn(d) + ((heightFn() + fontSizeFn()) / 2) - 2;
    }

    svg
      .selectAll('.count')
      .data(data)
      .enter()
      .append('text')
      .text(countFn)
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
      <div className={'svg-scroll'}>
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