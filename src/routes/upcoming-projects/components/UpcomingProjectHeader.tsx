import { Select, Tag } from 'antd'
import React from 'react'

const items =[
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ]
export const UpcomingProjectHeader = () => {
  return (
    <div className='upcoming-header'>
        <Select defaultValue="lucy" bordered={false} options={items} className='upcoming-select'> 
        </Select>
        <span className='upcoming-tag-label'>Year 2023 - Quarter 2</span>
    </div>
  )
}
