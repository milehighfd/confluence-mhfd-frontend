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
        >
          Apply map view to filters
          <Checkbox
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
