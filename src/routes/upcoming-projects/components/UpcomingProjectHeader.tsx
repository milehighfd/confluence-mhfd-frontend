import { Select, Tag } from 'antd'
import React from 'react'

const items =[
    { value: 'jack', label: 'Jack' },
    { value: 'South Watershed', label: 'South Watershed' },
    { value: 'Yiminghe', label: 'yiminghe' },
  ]
export const UpcomingProjectHeader = () => {
  return (
    <div className='upcoming-header'>
        <Select defaultValue="South Watershed" bordered={false} options={items} className='upcoming-select'> 
        </Select>
        <span className='upcoming-tag-label'>Year 2023 - Quarter 2</span>
    </div>
  )
}
