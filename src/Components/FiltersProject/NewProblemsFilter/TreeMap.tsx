import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { Button } from 'antd';
import { CHART_CONSTANTS } from './Charts.constants';

const TreeMap = ({ data, type, tab, selected, onSelect, defaultValue }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [leftOffset, setLeftOffset] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState<any>(null);

  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let sData = selected ? selected : [];
    setSelectedData(sData);
  }, [selected])

  let color: string;
  let colorUnselected: string;
  if (type === 'servicearea') {
    color = "#5D3DC7";
    colorUnselected = "#775DD0";
  } else {
    color = '#047CD7';
    colorUnselected = '#0A92FA';
  }

  let sum = 0;
  (data || []).forEach((d: any) => {
    sum += d.counter ? d.counter : 0 ;
  });
  data = {
    name: '',
    children: (data || []).map((d: any) => {
      return {
        name: d.value,
        value: d.counter ? d.counter : 0,
        colname: 'level2',
        percentage: (d.counter ? d.counter : 0) / sum,
        id: d.id
      }
    })
  }

  const numberFormatter = (value: any) => {
    let integerValue = Math.floor(value);
    return `${integerValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const nameFormatter: any = (value: any) => {
    if (value?.includes('County')) {
      let index = value.indexOf('County');
      if (index !== -1) {
        value = value.substr(0, index - 1);
      }
    }
    if (value?.includes('Service Area')) {
      let index = value.indexOf('Service Area');
      if (index !== -1) {
        value = value.substr(0, index - 1);
      }
    }
    return value;
  }

  const width = 220;
  const height = 220;
  const rounded = 4;
  const percentage = 0.10;
  const fontSizeText = '9px';
  const fontSizePercentage = '9px';

  let clickFn = (d: any) => {
    let index = selectedData?.indexOf(d.data.id);
    if (index !== -1) {
      setSelectedData(selectedData.filter((_, ind) => ind !== index))
    } else {
      setSelectedData([...selectedData, d.data.id])
    }
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)

    var _root = d3.hierarchy(data).sum(function (d: any) { return d.value })
    d3.treemap()
      .size([width, height])
      .padding(2)
      (_root)

    var rects: any = svg
      .selectAll("rect")
      .data(_root.leaves())

    rects.exit()
      .transition().duration(1000)
      .attr('width', 0)
      .attr('height', 0)
      .style("opacity", 0)
      .remove()

    rects
      .style("fill", function (d: any) {
        let index = selectedData?.indexOf(d.data.id);
        if (index !== -1) {
          return color;
        } else {
          return colorUnselected;
        }
      })
      .transition().duration(1000)
      .attr("rx", rounded)
      .attr("ry", rounded)
      .attr("x", function (d: any) { return d.x0 })
      .attr("y", function (d: any) { return d.y0 })
      .attr('width', function (d: any) { return d.x1 - d.x0; })
      .attr('height', function (d: any) { return d.y1 - d.y0; })
 
    
    rects
      .style("opacity", function (d: any) {
        return 1;
      })

    let mouseOverFn = function(d: any) {
      setPopupContent(d)
      setLeftOffset((d.x0 + d.x1) / 2);
      setTopOffset((d.y0+d.y1) / 2);
      setShowPopup(true);
    }

    let mouseLeaveFn = () => {
      setShowPopup(false);
    }

    
    rects.on('click', clickFn)
    rects.on('mouseover', mouseOverFn)
    rects.on('mouseleave', mouseLeaveFn)

    let newRects = rects
      .enter()
      .append("g")
      .append("rect");

    newRects
      .style("fill", function (d: any) {
        let index = selectedData?.indexOf(d.data.id);
        if (index !== -1) {
          return color;
        } else {
          return colorUnselected;
        }
      })
      .transition().duration(1000)
      .attr("rx", rounded)
      .attr("ry", rounded)
      .attr("x", function (d: any) { return d.x0 })
      .attr("y", function (d: any) { return d.y0 })
      .attr('width', function (d: any) { return d.x1 - d.x0; })
      .attr('height', function (d: any) { return d.y1 - d.y0; });


    newRects
      .style("opacity", function (d: any) {
        return CHART_CONSTANTS.opacityFull;
      })
      .on('click', clickFn)
      .on('mouseover', mouseOverFn).on('mouseleave', mouseLeaveFn)

    var textsOffsetX = 0;
    var textsOffsetY = 0;

    var texts = svg
      .selectAll(".titles")
      .data(_root.leaves())

    texts
      .exit()
      .transition().duration(2000)
      .attr('width', 0)
      .attr('height', 0)
      .style("opacity", 0)
      .remove()

    texts
      .transition().duration(2000)
      .attr("x", function (d: any) { return (d.x0 + d.x1) / 2 + textsOffsetX })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2 + textsOffsetY })
      .text(function (d: any) {
        if (d.data.percentage > percentage) {
          return nameFormatter(d.data.name);
        } else {
          return '';
        }
      })
      .attr("font-size", fontSizeText)
      .attr("fill", "white")
      .attr('font-weight', 'bold')
      .style("text-anchor", "middle")
    
    texts.on('click', clickFn).on('mouseover', mouseOverFn).on('mouseleave', mouseLeaveFn)

    texts
      .enter()
      .append("text")
      .attr("class", "titles")
      .on('click', clickFn)
      .on('mouseover', mouseOverFn).on('mouseleave', mouseLeaveFn)
      .transition().duration(2000)
      .attr("x", function (d: any) { return (d.x0 + d.x1) / 2 + textsOffsetX })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2 + textsOffsetY })
      .text(function (d: any) {
        if (d.data.percentage > percentage) {
          return nameFormatter(d.data.name);
        } else {
          return '';
        }
      })
      .attr("font-size", fontSizeText)
      .attr("fill", "white")
      .attr('font-weight', 'bold')
      .style("text-anchor", "middle")

    var percentageOffsetX = 0;
    var percentageOffsetY = 15;

    var percentages = svg
      .selectAll(".percentages")
      .data(_root.leaves())

    percentages
      .exit()
      .transition().duration(2000)
      .attr('width', 0)
      .attr('height', 0)
      .style("opacity", 0)
      .remove()

    percentages
      .transition().duration(2000)
      .attr("x", function (d: any) { return (d.x0 + d.x1) / 2 + percentageOffsetX })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2 + percentageOffsetY })
      .text(function (d: any) {
        if (d.data.percentage > percentage) {
          return numberFormatter(d.data.value);
        } else {
          return '';
        }
      })
      .attr("font-size", fontSizePercentage)
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .style('opacity', 0.7)
    
    percentages.on('click', clickFn).on('mouseover', mouseOverFn).on('mouseleave', mouseLeaveFn)

    percentages
      .enter()
      .append("text")
      .attr("class", "percentages")
      .on('click', clickFn).on('mouseover', mouseOverFn).on('mouseleave', mouseLeaveFn)
      .transition().duration(2000)
      .attr("x", function (d: any) { return (d.x0 + d.x1) / 2 + percentageOffsetX })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2 + percentageOffsetY })
      .text(function (d: any) {
        if (d.data.percentage > percentage) {
          return numberFormatter(d.data.value);
        } else {
          return '';
        }
      })
      .attr("font-size", fontSizePercentage)
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .style('opacity', 0.7)

  }, [data, selectedData])

  const apply = () => {
    console.log('selected ', selectedData);
    if (type === 'county' && tab === 'problem') {
      onSelect(selectedData)
    } else {
      onSelect(selectedData)
    }
  }

  const reset = () => {
    onSelect(defaultValue);
  }

  let popupLabel = '';

  if (popupContent) {
    popupLabel = `${nameFormatter(popupContent.data.name)} ${popupContent.data.value}`;
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
    display: (showPopup || isHovered) ? 'block' : 'none',
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
      <div onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
        onClick={() => clickFn(popupContent)}
        ref={popupRef}
        style={popupStyle}
        className="tremap-popup">
          { popupContent &&
            <>
              <b>{nameFormatter(popupContent.data.name)}</b>: {numberFormatter(popupContent.data.value)}
            </>
          }
      </div>
      <div>
      <Button className="btn-svg" onClick={apply}>
        Apply
      </Button>
      &nbsp;<span style={{color:'#E9E8EF'}}>|</span>&nbsp;
      <Button className="btn-svg" onClick={reset}>
        Reset
      </Button>
      </div>
      <div className="tree-chart">
        <svg ref={svgRef} className={'svg-top-pad'} />
      </div>
    </>
  )
}

export default TreeMap;