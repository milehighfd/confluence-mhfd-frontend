import React from 'react';
import { Row, Col, Checkbox } from 'antd';
import { useMapState, useMapDispatch } from 'hook/mapHook';

const ApplyMapViewFilter = ({
  onCheck
}: {
  onCheck: Function
}) => {
  const {
    applyFilter,
    spinFilters: spinFilter,
    spinMapLoaded,
    spinCardProblems,
    spinCardProjects,
  } = useMapState();
  const {
    setApplyFilter,
  } = useMapDispatch();
  return (
    <Row
      justify="space-around"
      align="middle"
      style={{ cursor: 'pointer' }}
    >
      <Col>
        <div
          className={
            (spinFilter || spinCardProblems || spinCardProjects || spinMapLoaded)
              ? 'apply-filter'
              : 'apply-filter-no-effect'
          }
          style={{
            borderColor: 'transparent',
            fontSize: '12px',
            marginTop: '-6px',
            color: 'rgba(17, 9, 60, 0.5)'
          }}
        >
          Apply map view to filters
          <Checkbox
            style={{ paddingLeft: 6 }}
            checked={applyFilter}
            onChange={() => {
              setApplyFilter(!applyFilter);
              onCheck();
            }}
          />
          <div className="progress">
            <div className="progress-value"></div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ApplyMapViewFilter;
