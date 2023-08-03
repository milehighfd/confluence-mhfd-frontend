import React, { useEffect } from "react";
import { Input, Row, Col, Popover, Select, Switch } from 'antd';
import {  MAINTENANCE_ELIGIBILITY, NEW_PROJECT_TYPES,  PROGRESS_ACQUISITION,  STUDY_REASON, WINDOW_WIDTH } from "../../../constants/constants";
const { Option } = Select;


interface ModalAcquisitionProps {
  progress: string;
  setProgress: Function;
  purchaseDate: string;
  setPurchaseDate: Function;
  year: number;
}
const content03 = (<div className="popver-info">Frequency indicates the number of times per-year that a maintenance activity is requested for routine activities. For example, select 2 for twice-per-year, or select 12 for monthly.</div>);
const content04 = (<div className="popver-info">Flip this switch to indicate that the project is located on a property to which the Local Government has legal right-of-access. This is a requirement for all Maintenance Projects.</div>);
const selec = [0];
for (var i = 1; i < 21; i++) {
  selec.push(i);
}
export const InformationAcquisition = ({
  progress,
  setProgress,
  purchaseDate,
  setPurchaseDate,
  year
}: ModalAcquisitionProps) => {
  const apllyProgress = (e: any) => {
    setProgress(e);
  };

  const apllyPurchaseDate = (e: any) => {
    setPurchaseDate(e);
  };
  return (
    <Row gutter={[16, 16]}>
    <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginTop:'10px'}}>
      <label className="sub-title">Progress <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
      <div id="progreid">
        <Select
          placeholder={progress != '' ? PROGRESS_ACQUISITION.find((el: any) => parseInt(el.id) === parseInt(progress))?.name + "" : "Select a Status"}
          style={{ width: '100%' }}
          listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
          onChange={(progress) => apllyProgress(progress)}
          getPopupContainer={() => (document.getElementById("progreid") as HTMLElement)}>
        {PROGRESS_ACQUISITION.map((element) => {
          return <Option key={element.id} value={element.id}>{element.name}</Option>
        })}
      </Select></div>
    </Col>
    <Col xs={{ span: 24 }} lg={{ span: 12 }}  style={{marginTop:'10px'}}>
      <label className="sub-title">Anticipated Purchase Date <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
      <div id="antid">
        <Select
          placeholder={purchaseDate != '' ? purchaseDate + "" : "Select a Purchase Date"}
          style={{ width: '100%' }} onChange={(purchaseDate) => apllyPurchaseDate(purchaseDate)}
          listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
          getPopupContainer={() => (document.getElementById("antid") as HTMLElement)}>
          {selec.map((element:any) => {
            var newYear = year + element;
            return <Option key={newYear} value={newYear}>{newYear}</Option>
          })}
        </Select>
      </div>
    </Col>
  </Row>
  );
};