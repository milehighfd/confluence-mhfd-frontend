import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';
import { Button, Col, InputNumber, Row } from 'antd';
import RheoStatService from './RheoStatService';


const RheoStatYear = ({ data, type, selected, onSelect, defaultValue, axisLabel }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [leftOffset, setLeftOffset] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState<any>(null);

  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [minTick, setMinTick] = useState(0);
  const [maxTick, setMaxTick] = useState(data.length - 1);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const width = 200;
  const height = 140;
  const marginLeft = 30;
  const rounded = 2;
  const fillColor = '#ffdd04';
  const opaquedColor = '#fce9a6';

  data = data.map((d: any) => {
    return {
      ...d,
      count: d.hasOwnProperty('count') ? d.count : d.counter
    }
  })

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
    let minValue = data[minTick] ? data[minTick].value : 0;
    let maxValue = data[maxTick] ? data[maxTick].value : 0;
    setLeft(minValue);
    setRight(maxValue);
  });

  useEffect(() => {
    console.log('selectedData', selectedData);
  },[selectedData]);
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

    let sliderRange;
    if (!RheoStatService.getRef(type)) {
      sliderRange = sliderBottom()
    } else {
      sliderRange = RheoStatService.getRef(type);
    }

    sliderRange
      .min(0)
      .max(keys.length-1)
      .width(width-marginLeft)
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
      .attr("viewBox", `0 0 ${width + 20} ${height + 20}`)

    var x = d3.scaleBand()
      .rangeRound([marginLeft, width])

    var y = d3.scaleLinear()
      .range([height, 0]);

    x.domain(keys);

    let maxiCounter: any = d3.max(data, (d: any) => {
      return d.count;
    });

    y.domain([0, Math.max(maxiCounter, 1)]);

    let xdr: any = (d: any) => {
      let offset: any = x(d.value);
      return offset + 1;
    }

    let yCounterFn: any = (d: any) => {
      return y(d.count)
    };

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
      .attr("width", x.bandwidth()-2)
      .attr("height", function (_: any, i) {
        let d = data[i];
        return height - yCounterFn(d);
      });

    newRects.on('mouseover', mouseOverFn)
    newRects.on('mouseleave', mouseLeaveFn)

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
      .attr('transform', `translate(${marginLeft}, ${height / 2}) rotate(270) skewX(-20)`)
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
      .attr('stroke-width', 10);
  }, [data, selectedData]);

  const apply = () => {
    if (type === 'yearofstudy') {
      onSelect(selectedData);
    } else {
      onSelect(selectedData.join(','));
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
      if (e > d.value) {
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
      if (e > d.value) {
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

  let popupLabel = '';

  if (popupContent) {
    popupLabel = `${popupContent.count}`;
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
      <Row style={{ marginLeft: 30 }}>
        <Col span={12}>
          <label>
            Min Year
          </label>
          <InputNumber size='large' className="rheostat-input"
            min={0} value={left} onChange={onChangeLeft} />
        </Col>
        <Col span={12}>
          <label>
            Max Year
          </label>
          <InputNumber size='large' className="rheostat-input"
            min={0} value={right} onChange={onChangeRight}/>
        </Col>
      </Row>
    </>
  )
}

export default RheoStatYear;
