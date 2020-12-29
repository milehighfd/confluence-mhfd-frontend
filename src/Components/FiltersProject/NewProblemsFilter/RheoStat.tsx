import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';
import { Button, Col, InputNumber, Row } from 'antd';

var sliderRange: any;

const RheoStat = ({ data, type, selected, onSelect, defaultValue }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  let condition: boolean = type !== 'year';
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [minTick, setMinTick] = useState(0);
  const [maxTick, setMaxTick] = useState(condition ? data.length : data.length - 1);

  const width = 200;
  const height = 200;
  const fillColor = condition ? '#2dc49a' : '#ffdc00';
  const opaquedColor = condition ? '#b7eadc' : '#fff2a8';

  useEffect(() => {
    setSelectedData(selected);
    if (selected.length === 0) {
      setMinTick(0);
      setMaxTick(condition ? data.length : data.length - 1);
    } else {
      let minValue = selected[0];
      let maxValue = selected[selected.length - 1];
      let minIndex = data.map((r: any) => `${r.min},${r.max}`).indexOf(minValue);
      let maxIndex = data.map((r: any) => `${r.min},${r.max}`).indexOf(maxValue);
      setMinTick(minIndex);
      setMaxTick(maxIndex + 1);
    }
  }, [selected])

  useEffect(() => {
    let minValue = data[minTick].min;
    let maxValue = data[maxTick - 1].max;
    setLeft(minValue);
    setRight(maxValue);
  });

  useEffect(() => {

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

    sliderRange = sliderBottom()
      .min(0)
      .max(condition ? keys.length : keys.length - 1)
      .width(width)
      .tickFormat(d3.format('.2%'))
      .ticks(0)
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
            if (currentMin <= i && i + 1 <= currentMax) {
              let value = condition ? `${d.min},${d.max}` : d.value;
              sData.push(value);
              return fillColor;
            }
            return opaquedColor;
          })
        setSelectedData(sData);
        setMinTick(currentMin);
        setMaxTick(currentMax);
        const [dmin, dmax] = getMinMax(currentMin, currentMax);
        setLeft(dmin);
        setRight(dmax);
      });

    var svg = d3
      .select(svgRef.current)
      .attr('width', width + 20)
      .attr('height', height + 20)
    // .attr('transform', `translate(${25}, 0)`)

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
      let offset: any = condition ? x(d.max) : x(d.value);
      return offset + 0.5;
    }

    let yCounterFn: any = (d: any) => y(d.counter);

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
      .attr("width", x.bandwidth() - 1)
      .attr("height", function (_: any, i) {
        let d = data[i];
        return height - yCounterFn(d);
      });

    rects.exit().remove();

    let lines = svg
      .selectAll('.hlines')
      .data(data.filter((_: any, i: number) => i % 2 === 1))

    lines
      .enter()
      .append("line").lower()
      .attr('class', 'hlines')
      .attr("x1", (d: any) => xdr(d) + x.bandwidth())
      .attr("x2", (d: any) => xdr(d) + x.bandwidth())
      .attr("y1", 0)
      .attr("y2", height)
      .attr('stroke-width', '0.1%')
      .style("stroke-dasharray", "2,2")
      .style("stroke", 'black')
      .style('opacity', 0.4);

    lines.exit().remove();

    var gRange = d3
      .select(gRef.current)
      .attr("transform", "translate(0," + height + ")");

    gRange.call(sliderRange);

  }, [data, selectedData]);

  const apply = () => {
    if (condition) {
      onSelect(selectedData);
    } else {
      onSelect(selectedData[0]);
    }
  }

  const reset = () => {
    onSelect(defaultValue);
    d3
      .select(svgRef.current)
      .selectAll(".bar-d3")
      .attr('fill', fillColor)
    sliderRange.value([0, condition ? data.length : data.length - 1])
  }

  const onChangeLeft = (e: any) => {
    setLeft(e);
  }

  const onChangeRight = (e: any) => {
    setRight(e);
  }

  return (
    <>
      <svg ref={svgRef}>
        <g ref={gRef}></g>
      </svg>
      <Row>
        <Col span={12}>
          <label>
            Min Cost
          </label>
          <InputNumber size='large' min={0} value={left} onChange={onChangeLeft} style={{ width: '80%' }} />
        </Col>
        <Col span={12}>
          <label>
            Max Cost
          </label>
          <InputNumber size='large' min={0} value={right} onChange={onChangeRight} style={{ width: '80%' }} />
        </Col>
      </Row>
      <Button onClick={apply}>
        apply
      </Button>
      <Button onClick={reset}>
        reset
      </Button>
    </>
  )
}

export default RheoStat;
