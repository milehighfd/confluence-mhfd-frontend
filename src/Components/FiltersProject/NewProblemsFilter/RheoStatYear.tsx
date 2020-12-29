import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';
import { Button, Col, InputNumber, Row } from 'antd';

var sliderRange: any;

const RheoStatYear = ({ data, selected, onSelect, defaultValue }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [minTick, setMinTick] = useState(0);
  const [maxTick, setMaxTick] = useState(data.length - 1);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const width = 220;
  const height = 200;
  const marginLeft = 30;
  const rounded = 4;
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
    setLeft(minValue);
    setRight(maxValue);
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
      .width(width-marginLeft)
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
        setLeft(dmin);
        setRight(dmax);
      });

    var svg = d3
      .select(svgRef.current)
      .attr('width', width + 20)
      .attr('height', height + 20)
      .attr('transform', `translate(${25}, 0)`)

    var x = d3.scaleBand()
      .rangeRound([marginLeft, width])

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
      .attr("width", x.bandwidth()-2)
      .attr("height", function (_: any, i) {
        let d = data[i];
        return height - yCounterFn(d);
      });

    rects.exit().remove();

    let lines = svg
      .selectAll('.hlines')
      .data(data)

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
      .attr('transform', `translate(${marginLeft/2}, ${height / 2}) rotate(270) skewX(-20)`)
      .append('text')
      .text('Number of Componets')
      .style("text-anchor", "middle")
      .style('opacity', 0.40);

    var gRange = d3
      .select(gRef.current)
      .attr("transform", `translate(${marginLeft},${height})`);

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

  const onChangeLeft = (e: any) => {
    setLeft(e);
  }

  const onChangeRight = (e: any) => {
    setRight(e);
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
      <Row style={{ marginLeft: 30 }}>
        <Col span={12}>
          <label>
            Min Years
          </label>
          <InputNumber size='large' min={0} value={left} onChange={onChangeLeft} style={{ width: '80%' }} />
        </Col>
        <Col span={12}>
          <label>
            Max Years
          </label>
          <InputNumber size='large' min={0} value={right} onChange={onChangeRight} style={{ width: '80%' }} />
        </Col>
      </Row>
    </>
  )
}

export default RheoStatYear;
