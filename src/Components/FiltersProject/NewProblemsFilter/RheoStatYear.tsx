import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';
import { Button } from 'antd';

var sliderRange: any;

const RheoStatYear = ({ data, selected, onSelect, defaultValue }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const gRef = useRef<SVGGElement>(null);

  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [minTick, setMinTick] = useState(0);
  const [maxTick, setMaxTick] = useState(data.length - 1);

  const width = 150;
  const height = 200;
  const fillColor = '#ffdc00';
  const opaquedColor = '#fff2a8';

  useEffect(() => {
    let sData = selected.length === 0 ? [] : selected.split(',');
    setSelectedData(sData);
    if (sData.length === 0) {
      setMinTick(0);
      setMaxTick(data.length - 1);
    } else {
      let minValue = +sData[0];
      let maxValue = +sData[sData.length - 1];
      let minIndex = data.map((r: any) => r.value).indexOf(minValue);
      let maxIndex = data.map((r: any) => r.value).indexOf(maxValue);
      setMinTick(minIndex);
      setMaxTick(maxIndex);
    }
  }, [selected])

  useEffect(() => {
    let minValue = data[minTick].value;
    let maxValue = data[maxTick].value;
    d3
      .select(pRef.current)
      .text(`${minValue} - ${maxValue}`);
  });

  useEffect(() => {

    const keyFn = (d: any) => {
      return d.value;
    }

    const filterFn = (d: any) => {
      return d !== null
    }

    const getMinMax = (cmin: any, cmax: any) => {
      let minValue, maxValue;
      minValue = cmin < data.length ? data[cmin].value : data[cmin - 1].value;
      maxValue = cmax < data.length ? data[cmax].value : data[cmax - 1].value;
      return [minValue, maxValue];
    }

    let keys = data.map(keyFn).filter(filterFn);

    sliderRange = sliderBottom()
      .min(0)
      .max(keys.length-1)
      .width(width)
      .tickFormat(d3.format('.2%'))
      .ticks(keys.length-1)
      .step(1)
      .default([minTick, maxTick])
      .handle(
        d3
          .symbol()
          .type(d3.symbolCircle)
          .size(200)()
      )
      .fill(fillColor)
      .on('onchange', (val: any) => {
        let [currentMin, currentMax] = val;
        let sData: any[] = [];
        let bars = d3
          .select(svgRef.current)
          .selectAll(".bar-d3")
        bars
          .attr('fill', (_: any, i) => {
            let d = data[i]
            if (currentMin <= i && i <= currentMax) {
              let value = d.value;
              sData.push(value);
              return fillColor;
            }
            return opaquedColor;
          })
        setSelectedData(sData);
        setMinTick(currentMin);
        setMaxTick(currentMax);
        const [dmin, dmax] = getMinMax(currentMin, currentMax);
        d3.select(pRef.current).text(`${dmin} - ${dmax}`);
      });

    var svg = d3
      .select(svgRef.current)
      .attr('width', width + 20)
      .attr('height', height + 20)
      .attr('transform', `translate(${25}, 0)`)

    var x = d3.scaleBand()
      .rangeRound([0, width])

    var y = d3.scaleLinear()
      .range([height, 0]);

    x.domain(keys);

    let maxiCounter: any = d3.max(data, (d: any) => {
      return d.count;
    });

    y.domain([0, maxiCounter]);

    let xdr: any = (d: any) => {
      let offset: any = x(d.value);
      return offset + 1;
    }

    let yCounterFn: any = (d: any) => {
      return y(d.count)
    };

    var rects = svg
      .selectAll(".bar-d3")
      .data(data)

    rects
      .transition().duration(2000)
      .attr("x", xdr)
      .attr("y", yCounterFn)
      .attr("height", function (_: any, i) {
        let d = data[i];
        return height - yCounterFn(d);
      });

    rects
      .enter().append("rect").lower()
      .attr("class", "bar-d3")
      .attr("x", xdr)
      .attr("y", yCounterFn)
      .attr('fill', fillColor)
      .attr("width", x.bandwidth()-2)
      .attr("height", function (_: any, i) {
        let d = data[i];
        return height - yCounterFn(d);
      });

    rects.exit().remove();

    var gRange = d3
      .select(gRef.current)
      .attr("transform", "translate(0," + height + ")");

    gRange.call(sliderRange);

  }, [data, selectedData]);

  const apply = () => {
    onSelect(selectedData);
  }

  const reset = () => {
    onSelect(defaultValue);
    d3
      .select(svgRef.current)
      .selectAll(".bar-d3")
      .attr('fill', fillColor)
    sliderRange.value([0, data.length])
  }

  return (
    <>
      <svg ref={svgRef}>
        <g ref={gRef}></g>
      </svg>
      <p ref={pRef}></p>
      <Button onClick={apply}>
        apply
      </Button>
      <Button onClick={reset}>
        reset
      </Button>
    </>
  )
}

export default RheoStatYear;
