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
      <Button style={{marginRight:'20px'}} onClick={()=>{setOpenFilters(false)}}>
        Calcel
      </Button>
      <Button className="btn-purple" onClick={()=>{setOpenFilters(false)}}>
        Apply
      </Button>
    </div>

  </div>
};

export default Filters;