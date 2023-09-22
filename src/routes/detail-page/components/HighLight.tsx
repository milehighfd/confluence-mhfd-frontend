import React from 'react'

export const HighLight = ({text, boldText}:{text:String, boldText:String}) => {
  return (
    <div className='highlight-detail'><b>{boldText}</b>&nbsp;{text}</div>
  )
}
