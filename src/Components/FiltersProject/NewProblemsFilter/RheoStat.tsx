import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';
import { Button, Col, InputNumber, Row } from 'antd';
import RheoStatService from './RheoStatService';


const RheoStat = ({ data, selected, onSelect, defaultValue, axisLabel }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [minTick, setMinTick] = useState(0);
  const [maxTick, setMaxTick] = useState(data.length);

  const [service] = useState<RheoStatService>(new RheoStatService());

  const width = 200;
  const height = 180;
  const marginLeft = 30;
  const rounded = 4;
  const fillColor = '#2dc49a';
  const opaquedColor = '#b7eadc';

  useEffect(() => {
    setSelectedData(selected);
    if (selected.length === 0) {
      setMinTick(0);
      setMaxTick(data.length);
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
      return d.max;
    }

    const filterFn = (d: any) => {
      return true;
    }

    const getMinMax = (cmin: any, cmax: any) => {
      let minValue, maxValue;
      minValue = cmin < data.length ? data[cmin] : { min: 0 };
      maxValue = data[cmax - 1];
      minValue = minValue.min;
      maxValue = maxValue.max;
      return [minValue, maxValue];
    }

    let keys = data.map(keyFn).filter(filterFn);

    let sliderRange;
    if (!service.ref) {
      sliderRange = sliderBottom()
    } else {
      sliderRange = service.ref;
    }

    sliderRange
      .min(0)
      .max(keys.length)
      .width(width - marginLeft)
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
              let value = `${d.min},${d.max}`;
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

    var x = d3.scaleBand()
      .rangeRound([marginLeft, width])

    var y = d3.scaleLinear()
      .range([height, 0]);

    x.domain(keys);

    let maxiCounter: any = d3.max(data, (d: any) => {
      return d.counter;
    });

    y.domain([0, maxiCounter]);

    let xdr: any = (d: any) => {
      let offset: any = x(d.max);
      return offset + 0.5;
    }

    let yCounterFn: any = (d: any) => y(d.counter);

    var rects = svg
      .selectAll(".bar-d3")
      .data(data)

    rects
      .transition().duration(2000)
      .attr('rx', rounded)
      .attr('ry', rounded)
      .attr("x", xdr)
      .attr("y", yCounterFn)
      .attr("height", function (_: any, i) {
        let d = data[i];
        return height - yCounterFn(d);
      });

    rects
      .enter().append("rect").lower()
      .attr("class", "bar-d3")
      .attr('rx', rounded)
      .attr('ry', rounded)
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

    svg.selectAll('.hleftlabel').remove();

    svg
      .append('g')
      .attr('class', 'hleftlabel')
      .attr('transform', `translate(${marginLeft / 2}, ${height / 2}) rotate(270) skewX(-20)`)
      .append('text')
      .text(axisLabel)
      .style("text-anchor", "middle")
      .style('opacity', 0.40);

    var gRange = d3
      .select(gRef.current)
      .attr("transform", `translate(${marginLeft},${height})`);

    gRange.call(sliderRange);

    service.ref = sliderRange;

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
    service.ref.value([0, data.length])
  }

  const onChangeLeft = (e: any) => {
    setLeft(e);
  }

  const onChangeRight = (e: any) => {
    setRight(e);
  }

  const priceFormatter = (value: any) => {
    let integerValue = Math.floor(value / 1000);
    return `$${integerValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const priceParser = (value: any) => {
    return value.replace(/\$\s?|(,*)/g, '')
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
      <svg ref={svgRef} className={'svg-top-pad'}>
        <g ref={gRef}></g>
      </svg>
      <Row style={{ marginLeft: 30, marginTop: -10 }}>
        <Col span={12}>
          <label>
            Min Cost (K)
          </label>
          <InputNumber size='large' style={{ width: '80%' }} min={0}
            formatter={priceFormatter}
            parser={priceParser}
            value={left} onChange={onChangeLeft} />
        </Col>
        <Col span={12}>
          <label>
            Max Cost (K)
          </label>
          <InputNumber size='large' style={{ width: '80%' }} min={0}
            formatter={priceFormatter}
            parser={priceParser}
            value={right} onChange={onChangeRight} />
        </Col>
      </Row>
    </>
  )
}

export default RheoStat;
