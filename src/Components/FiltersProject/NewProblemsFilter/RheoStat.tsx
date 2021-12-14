import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';
import { Button, Col, InputNumber, Row } from 'antd';
import RheoStatService from './RheoStatService';


const RheoStat = ({ data, type, selected, onSelect, defaultValue, axisLabel }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [leftOffset, setLeftOffset] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState<any>(null);

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const [selectedData, setSelectedData] = useState<any[]>([]);

  const width = 200;
  const height = 140;
  const marginLeft = 30;
  const rounded = 2;
  const fillColor = '#2dc49a';
  const opaquedColor = '#b7eadc';

  useEffect(() => {
    if (data.length > 0) {
      setLeft(Math.floor(data[0].min / 1000))
      setRight(Math.floor((data[data.length - 1].max + 0.001) / 1000))
    }
  }, [data])

  useEffect(() => {
    let _data = data.map((d: any, i: any) => {
      return { 
        ...d,
        min: Math.floor(d.min / 1000),
        max: Math.floor((d.max + 0.001) / 1000),
        id: i 
      }
    });

    const keyFn = (d: any) => {
      return d.id;
    }

    const getMinMax = (cmin: any, cmax: any) => {
      let minValue, maxValue;
      minValue = cmin < _data.length ? _data[cmin] : _data[_data.length - 1];
      maxValue = cmax < _data.length ? _data[cmax] : _data[_data.length - 1];
      minValue = minValue.min;
      maxValue = maxValue.max;
      return [minValue, maxValue];
    }

    let keys = _data.map(keyFn);

    let sliderRange;
    if (!RheoStatService.getRef(type)) {
      sliderRange = sliderBottom()
        .default([0, keys.length])
    } else {
      sliderRange = RheoStatService.getRef(type);
    }

    sliderRange
      .min(0)
      .max(keys.length)
      .width(width - marginLeft)
      .tickFormat(d3.format('.2%'))
      .ticks(0)
      .step(1)
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
          .attr('fill', (d: any, i) => {
            if (currentMin <= i && i + 1 <= currentMax) {
              let value = `${d.min*1000},${d.max*1000}`;
              sData.push(value);
              return fillColor;
            }
            return opaquedColor;
          })
        d3
          .select(svgRef.current)
          .selectAll('.track-inset')
          .attr('stroke', opaquedColor);
        setSelectedData(sData);
        const [dmin, dmax] = getMinMax(currentMin, currentMax);
        setLeft(dmin);
        setRight(dmax);
      })

    var svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width + 20} ${height + 20}`)
      // .attr('width', width + 20)
      // .attr('height', height + 20)

    var x = d3.scaleBand()
      .rangeRound([marginLeft, width])

    var y = d3.scaleLinear()
      .range([height, 0]);

    x.domain(keys);

    let maxiCounter: any = d3.max(_data, (d: any) => {
      return d.counter;
    });

    y.domain([0, Math.max(maxiCounter, 1)]);

    let xdr: any = (d: any) => {
      let offset: any = x(d.id);
      return offset + 0.5;
    }

    let yCounterFn: any = (d: any) => y(d.counter);

    let mouseOverFn = (d: any) => {
      setPopupContent(d)
      setLeftOffset(xdr(d));
      setTopOffset(yCounterFn(d));
      setShowPopup(true);
    }

    let mouseLeaveFn = () => {
      setShowPopup(false);
    }

    var rects = svg
      .selectAll(".bar-d3")
      .data(_data)

    rects
      .transition().duration(2000)
      .attr('rx', rounded)
      .attr('ry', rounded)
      .attr("x", xdr)
      .attr("y", yCounterFn)
      .attr("height", function (d: any) {
        return height - yCounterFn(d);
      });

    rects.on('mouseover', mouseOverFn)
    rects.on('mouseleave', mouseLeaveFn)

    let newRects = rects
      .enter().append("rect").lower();
    newRects
      .attr("class", "bar-d3")
      .attr('rx', rounded)
      .attr('ry', rounded)
      .attr("x", xdr)
      .attr("y", yCounterFn)
      .attr('fill', fillColor)
      .attr("width", x.bandwidth() - 1)
      .attr("height", function (d: any) {
        return height - yCounterFn(d);
      });

    newRects.sort((a: any, b: any) => {
      return a.min - b.min;
    })

    newRects.on('mouseover', mouseOverFn)
    newRects.on('mouseleave', mouseLeaveFn)

    rects.exit().remove();

    let lines = svg
      .selectAll('.hlines')
      .data(_data.filter((_: any, i: number) => i % 2 === 1))

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
      .attr('transform', `translate(${(marginLeft)}, ${height / 2}) rotate(270) skewX(-20)`)
      .append('text')
      .text(axisLabel)
      .style("text-anchor", "middle")
      .style('opacity', 0.40)
      .style('font-size',12);

    var gRange = d3
      .select(gRef.current)
      .attr("transform", `translate(${marginLeft},${height})`);

    gRange.call(sliderRange);

    RheoStatService.setRef(type, sliderRange);

    d3
      .select(svgRef.current)
      .selectAll('.track-inset')
      .attr('stroke', opaquedColor)
      .attr('stroke-width', 6);
    d3
      .select(svgRef.current)
      .selectAll('.track-fill')
      .attr('stroke-width', 6);

    d3.select(svgRef.current)
      .selectAll('.track-overlay')
      .attr('stroke-width', 10)

  }, [data, selectedData]);

  const apply = () => {
    onSelect(selectedData);
    if (RheoStatService.getRef(type)) {
      RheoStatService.getRef(type).value([0, 20]);
    }
    if (selectedData.length > 0) {
      setLeft(selectedData[0].split(',')[0] / 1000);
      setRight(selectedData[selectedData.length - 1].split(',')[1] / 1000);
    }
  }

  const reset = () => {
    onSelect(defaultValue);
    d3
      .select(svgRef.current)
      .selectAll(".bar-d3")
      .attr('fill', fillColor)
    RheoStatService.getRef(type).value([0, data.length])
  }

  const onChangeLeft = (e: any) => {
    let index = 0;
    data.forEach((d: any) => {
      if (e >= Math.floor((d.max+0.001)/1000)) {
        index++;
      }
    })
    let [lf, rg] = RheoStatService.getRef(type).value();
    if (index > rg) {
      index = rg;
    }
    RheoStatService.getRef(type).value([index, rg]);
    setLeft(e);
  }

  const onChangeRight = (e: any) => {
    let index = 0;
    data.forEach((d: any) => {
      if (e >= Math.floor((d.max+0.001)/1000)) {
        index++;
      }
    })
    let [lf, rg] = RheoStatService.getRef(type).value();
    if (index < lf) {
      index = lf;
    }
    RheoStatService.getRef(type).value([lf, index]);
    setRight(e);
  }

  const priceFormatter = (value: any) => {
    return `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const priceParser = (value: any) => {
    value = value.replace(/\$\s?|(,*)/g, '');
    if (value === '0') {
      return value;
    }
    while (value.length > 0 && value[0] === '0') {
      value = value.substr(1);
    }
    return value
  }

  let popupLabel = '';

  if (popupContent) {
    popupLabel = `${popupContent.counter}`;
  }

  const getLo = () => {
    let l = 0;
    if (svgRef.current && svgRef.current?.clientWidth) {
      l = (leftOffset / width) * svgRef.current?.clientWidth
    }
    l -= popupLabel.length * 5;
    return l;
  }

  const getTo = () => {
    let t = 0;
    if (svgRef.current && svgRef.current?.clientHeight) {
      t = ((topOffset + 5)/ height) * svgRef.current?.clientHeight;
    }
    return t;
  }

  const popupStyle: React.CSSProperties = {
    display: showPopup ? 'block' : 'none',
    position: 'absolute',
    left: getLo(),
    top: getTo(),
    backgroundColor: 'white',
    textAlign: 'center',
    padding: 8,
    borderRadius: 8,
    zIndex: 5
  }

  return (
    <>
      <div ref={popupRef} style={popupStyle} className="popup-chart">
        { popupContent &&
          <>
            {popupLabel}
          </>
        }
      </div>
      <div>
      <Button className="btn-svg" onClick={apply}>
        <u>Apply</u>
      </Button>
      &nbsp;|&nbsp;
      <Button className="btn-svg" onClick={reset}>
        <u>Reset</u>
      </Button>
      </div>
      <svg ref={svgRef} className={'svg-top-pad'}>
        <g ref={gRef}></g>
      </svg>
      <Row style={{ marginLeft: 30, marginTop: -10 }}>
        <Col span={12}>
          <label>
            Min Cost (K)
          </label>
          <InputNumber className="rheostat-input" size='large' min={0}
            formatter={priceFormatter}
            parser={priceParser}
            value={left} onChange={onChangeLeft} />
        </Col>
        <Col span={12}>
          <label>
            Max Cost (K)
          </label>
          <InputNumber className="rheostat-input" size='large' min={0}
            formatter={priceFormatter}
            parser={priceParser}
            value={right} onChange={onChangeRight} />
        </Col>
      </Row>
    </>
  )
}

export default RheoStat;
