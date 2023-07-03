import React, { useState, useEffect } from 'react';

const colors = ['#FF0806', '#BE0807', '#8D0000', '#00ff00'];
export const ClusterPie = ({
  counts,
  offsets,
  total
} : any) => {
  const fontSize = total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
  const r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
  const r0 = Math.round(r * 0.6);
  const width = r * 2;
  return <div className='svgclass'>
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      textAnchor="middle"
      style={{font: `${fontSize}px sans-serif`, display: 'block'}}
    >
      {
        counts.map((count: any, i: any) => {
          if (total > 0) {
            const start = offsets[i] / total;
            let end = (offsets[i] + counts[i]) / total;
            const color = colors[i];
            if (end - start === 1) end -= 0.00001;
            const a0 = 2 * Math.PI * (+start - 0.25);
            const a1 = 2 * Math.PI * (+end - 0.25);
            const x0 = Math.cos(a0), y0 = Math.sin(a0);
            const x1 = Math.cos(a1), y1 = Math.sin(a1);
            const largeArc = end - start > 0.5 ? 1 : 0;
            return <path key={i} d={`M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0} ${r + r * y0
            } A ${r} ${r} 0 ${largeArc} 1 ${r + r * x1} ${r + r * y1} L ${r + r0 * x1
            } ${r + r0 * y1} A ${r0} ${r0} 0 ${largeArc} 0 ${r + r0 * x0} ${r + r0 * y0
            }`} fill={`${color}`} /> 
          } else {
            return null;
          }
        })
      }
      <circle cx={r} cy={r} r={r0} fill="white" />
      <text dominantBaseline="central" transform={`translate(${r}, ${r})`} fontFamily="Ubuntu, sans-serif">
        {total.toLocaleString()}
      </text>
    </svg>
  </div>
}