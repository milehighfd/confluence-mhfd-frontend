import React, { useEffect, useState } from "react";
import { Button, Calendar, Col, Input, Layout, message, Popover, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { NewProjectsFilter } from "../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter";


const { Step } = Steps;
const Filters = ({openFilters, setOpenFilters}:{openFilters:boolean, setOpenFilters:any}) => {

  return <div className="filters">
    <div className="filters-body">
      <NewProjectsFilter />
    </div>
    <div className="filters-foot">
      <Button className="btn-filter" style={{marginRight:'20px', border:'1px solid #251863', color:'#251863', borderRadius:'5px', height:'auto'}} onClick={()=>{setOpenFilters(false)}}>
        Cancel
      </Button>
      <Button className="btn-purple btn-filter" onClick={()=>{setOpenFilters(false)}} style={{height:'auto'}}>
        Apply
      </Button>
    </div>

  </div>
};

export default Filters;