import React, { useEffect, useRef } from 'react';

import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';

const RheoStat = ({ data, type, selected, onSelect }: any) => {
  const divRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const width = 150;
    const height = 150;

    let condition: boolean = type !== 'year';

    const fillColor = condition ? '#2dc49a' : '#ffdc00';
    const opaquedColor = condition ? '#b7eadc' : '#fff2a8';

    const keyFn = (d: any) => {
      return condition ? d.max : d.value;
    }

    const filterFn = (d: any) => {
      return condition ? true : d !== null
    }

    const getMinMax = (cmin: any, cmax: any) => {
      let minValue, maxValue;
      if (condition) {
        minValue = cmin < data.length ? data[cmin] : { min: 0 };
        maxValue = data[cmax - 1];
        minValue = minValue.min;
        maxValue = maxValue.max;
      } else {
        minValue = cmin < data.length ? data[cmin].value : data[cmin - 1].value;
        maxValue = cmax < data.length ? data[cmax].value : data[cmax - 1].value;
      }
      return [minValue, maxValue];
    }

    let keys = data.map(keyFn).filter(filterFn);

    var sliderRange = sliderBottom()
      .min(0)
      .max(condition ? keys.length : keys.length - 1)
      .width(width)
      .tickFormat(d3.format('.2%'))
      .ticks(keys.length)
      .step(1)
      .default([0, 100])
      .handle(
        d3
          .symbol()
          .type(d3.symbolCircle)
          .size(200)()
      )
      .fill(fillColor)
      .on('onchange', (val: any) => {
        let [currentMin, currentMax] = val;
        let selectedData: any[] = [];
        d3
          .select(divRef.current)
          .selectAll(".bar-d3")
          .attr('fill', (d: any, i) => {
            if (currentMin <= i && i + 1 <= currentMax) {
              let value = condition ? `${d.min},${d.max}` : d.value;
              selectedData.push(value);
              return fillColor;
            }
            return opaquedColor;
          })
        const [dmin, dmax] = getMinMax(currentMin, currentMax);
        if (condition) {
          onSelect(selectedData);
        } else {
          onSelect(`${dmin}`);
        }
        d3.select(pRef.current).text(`${dmin} - ${dmax}`);
      });

    var svg2 = d3
      .select(divRef.current)
      .append('svg')
      .attr('width', width + 20)
      .attr('height', height + 20)

    let g = svg2.append("g")
      .attr("width", width)
      .attr("height", height);

    var x = d3.scaleBand()
      .rangeRound([0, width])

    var y = d3.scaleLinear()
      .range([height, 0]);

    x.domain(keys);

    let maxiCounter: any = d3.max(data, (d: any) => {
      return d.counter;
    });

    y.domain([0, maxiCounter]);

    let xdr: any = (d: any) => {
      return condition ? x(d.max) : x(d.value);
    }

    let yCounterFn: any = (d: any) => y(d.counter);

    g.selectAll(".bar-d3")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar-d3")
      .attr("x", xdr)
      .attr("y", yCounterFn)
      .attr('fill', fillColor)
      .attr("width", x.bandwidth())
      .attr("height", function (d: any) {
        return height - yCounterFn(d);
      });


    var gRange = svg2
      .append('g')
      .attr("transform", "translate(0," + height + ")");

    gRange.call(sliderRange);

    const [mnValue, mxValue] = getMinMax(0, condition ? keys.length : keys.length - 1)
    d3.select(pRef.current).text(`${mnValue} - ${mxValue}`);

  }, []);

  return (
    <>
      <div ref={divRef}></div>
      <p ref={pRef}></p>
    </>
  )
}

export default RheoStat;
