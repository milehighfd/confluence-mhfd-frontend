import React, { useEffect, useRef } from 'react';

import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';

const RheoStat = ({ data, selected, onSelect }: any) => {
  const divRef = useRef<HTMLDivElement>(null);

  data = data.map((r: any) => {
    let index = selected.indexOf(`${r.min},${r.max}`);
    return {
      min: r.min,
      max: r.max,
      counter: r.counter,
      last: r.last,
      selected: index === -1 ? false : true
    }
  })

  useEffect(() => {
    const width = 150;
    const height = 150;
    let keys = data.map((r: any) => r.max);

    var sliderRange = sliderBottom()
      .min(0)
      .max(keys.length)
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
      .fill('#2dc49a')
      .on('onchange', (val: any) => {
        let [currentMin, currentMax] = val;
        let selectedData: any[] = [];
        d3
          .select(divRef.current)
          .selectAll(".bar-d3")
          .attr('fill', (d: any, i) => {
            if (currentMin <= i && i + 1 <= currentMax) {
              selectedData.push(`${d.min},${d.max}`);
              return '#2dc49a';
            }
            return '#b7eadc';
          })
        onSelect(selectedData);
        let dmin = currentMin < data.length ? { min: 0 } : data[currentMin];
        let dmax = data[currentMax - 1];
        d3.select('p#value-range').text(`${dmin.min} - ${dmax.max}`);
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
      return x(d.max);
    }

    g.selectAll(".bar-d3")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar-d3")
      .attr("x", xdr)
      .attr("y", function (d: any) {
        return y(d.counter);
      })
      .attr('fill', '#2dc49a')
      .attr("width", x.bandwidth())
      .attr("height", function (d: any) {
        return height - y(d.counter);
      });


    var gRange = svg2
      .append('g')
      .attr("transform", "translate(0," + height + ")");

    gRange.call(sliderRange);

    d3.select('p#value-range').text(
      sliderRange
        .value()
        .map(d3.format('.2%'))
        .join('-')
    );

  }, []);

  return (
    <>
      <div ref={divRef}></div>
      <p id="value-range"></p>
    </>
  )
}

export default RheoStat;
