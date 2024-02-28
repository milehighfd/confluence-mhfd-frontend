import React from "react";
import { Input, Row, Col, Popover, Select, Switch, Checkbox } from 'antd';
import {  MAINTENANCE_ELIGIBILITY, NEW_PROJECT_TYPES, WINDOW_WIDTH } from "../../../constants/constants";
import { useProjectState } from "hook/projectHook";

interface InformationMaintenanceProps {
  frequency: string;
  applyFrequency: Function;
  ownership: boolean;
  applyOwnership: Function;
  eligibility: string;
  applyEligibility: Function;
  isRoutine: boolean;
  setIsRoutine: Function;
}
const content03 = (<div className="popver-info">Frequency indicates the number of times per-year that a maintenance activity is requested for routine activities. For example, select 2 for twice-per-year, or select 12 for monthly.</div>);
const content05 = (<div className="popver-info" style={{ width: '261px' }}> Indicate why this project is eligible for MHFD maintenance. <br /><br /><b>Capital Project</b>: The project was completed as part of a MHFD Capital Improvement Plan
  <br /> <b>MEP</b>: The project has been accepted through development review as part of MHFD's Maintenance Eligibility Program (MEP)
  <br /><b>Grandfathered</b>: Development occurred before MHFD’s Maintenance Eligibility Program started in 1980
  <br /><b>Not Eligible</b>: The project does not meet any of the above criteria
  <br /><b>Unknown</b>: Maintenance eligibility status is unknown</div>);
const content04 = (<div className="popver-info">Flip this switch to indicate that the project is located on a property to which the Local Government has legal right-of-access. This is a requirement for all Maintenance Projects.</div>);
const selec = ['None'];
for (var i = 1; i < 13; i++) {
  selec.push('' + i);
}

export const InformationMaintenance = ({ 
  frequency, 
  applyFrequency, 
  ownership, 
  applyOwnership, 
  eligibility, 
  applyEligibility,
  isRoutine,
  setIsRoutine,
}: InformationMaintenanceProps) => {
  const WINDOW_WIDTH = window.innerWidth;
  const {
    disableFieldsForLG,
  } = useProjectState();
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '13px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Checkbox checked={isRoutine} onChange={(e) => setIsRoutine(e.target.checked)}>
            Add project to the routine contract
          </Checkbox>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '13px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Frequency <Popover overlayClassName="project-popover" content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <div id="freqid">
            <Select
              placeholder={frequency !== '' ? frequency + '' : 'Select a Frequency'}
              style={{ width: '100%' }}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              onChange={(frequency) => applyFrequency(frequency)}
              getPopupContainer={() => document.getElementById('freqid') as HTMLElement}
              disabled={disableFieldsForLG}
            >
              {selec.map((element) => {
                return (
                  <Select.Option key={element} value={element}>
                    {element}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Access Control <Popover overlayClassName="project-popover" content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <p className="switch-option" style={{ fontSize: '14px' }}>
            Public Access / Ownership{' '}
            <span>
              <Switch disabled={disableFieldsForLG} checkedChildren="Yes" unCheckedChildren="No" checked={ownership} onChange={(ownership) => applyOwnership(ownership)} />
            </span>
          </p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Maintenance Eligibility <Popover overlayClassName="project-popover" content={content05}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <div id="elegid">
            <Select
              placeholder={eligibility !== '' ? MAINTENANCE_ELIGIBILITY.find((el: any) => parseInt(el.id) === parseInt(eligibility))?.name + '' : 'Select a Eligibility'}
              style={{ width: '100%' }}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              onChange={(eligibility) => applyEligibility(eligibility)}
              getPopupContainer={() => document.getElementById('elegid') as HTMLElement}
              disabled={disableFieldsForLG}
            >
              {MAINTENANCE_ELIGIBILITY.map((element) => {
                return (
                  <Select.Option key={element.id} value={element.id}>
                    {element.name}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        </Col>
      </Row>
    </>
  );
};