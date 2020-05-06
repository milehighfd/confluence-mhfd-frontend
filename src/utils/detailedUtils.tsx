import React from 'react';
import { Row, Col, Collapse, Button } from 'antd';
import { DetailedMapProps, ComponentType } from '../Classes/MapTypes';
import { firstLetterUppercase, spacingCamelCase, numberWithCommas } from './utils';

const { Panel } = Collapse;

const projectCapitalBasics = (data: DetailedMapProps) => {
  const { priority, description } = data;

  return (
    <>
      <Row>
        <FormField label={'Stream'} value={'Little Dry Creek (ADCO)'} />
        <FormField
          label={'Priority'}
          value={firstLetterUppercase(priority) + ' Priority'}
          valueStyle={{ color: 'red' }} />
      </Row>
      <Row>
        <FormField label={'Start Year'} value={'2009'} />
        <FormField label={'Source'} value={'MHFD Master Plan'} />
      </Row>
      <Row>
        <FormField label={'Source Name'} value={'Little Dry Creek & Tributaries MDP'} />
      </Row>
      <Row>
        <FormField
          label={'Description'}
          value={description}
          valueSpan={20} />
      </Row>
    </>
  );
}

const projectMaintenanceBasics = (data: DetailedMapProps) => {
  const { draft, projectSubtype, frecuency } = data;
  
  return (
    <>
      <Row>
        <FormField label={'Stream'} value={'Little Dry Creek (ADCO)'} />
        <FormField
          label={'Subtype'}
          value={spacingCamelCase(projectSubtype)} />
      </Row>
      <Row>
        <FormField label={'Project Status'} value={firstLetterUppercase(draft)} />
        <FormField label={'Frequency'} value={spacingCamelCase(frecuency)} />
      </Row>
      <Row>
        <FormField label={'Contractor'} value={'Atkins'} />
      </Row>
    </>
  );
}

const projectStudyBasics = (data: DetailedMapProps) => {
  const { sponsor, coSponsor, requestedStartyear, projectSubtype } = data;
  
  return (
    <>
      <Row>
        <FormField label={'Stream'} value={'Little Dry Creek (ADCO)'} />
        <FormField
          label={'Subtype'}
          value={spacingCamelCase(projectSubtype)} />
      </Row>
      <Row>
        <FormField label={'Tributary A'} value={sponsor} />
        <FormField label={'Tributary B'} value={coSponsor} />
      </Row>
      <Row>
        <FormField label={'Start Year'} value={requestedStartyear} />
        <FormField label={'Completed Year'} value={'TBD'} />
      </Row>
    </>
  );
}

const FormField = ({ label, value, valueStyle, valueSpan } : { label : string, value : string, valueStyle? : any, valueSpan? : number }) => (
  <>
    <Col span={4}>
      <label><i>{label}</i></label>
    </Col>
    <Col span={valueSpan ? valueSpan : 8}>
      <p style={valueStyle}>{value}</p>
    </Col>
  </>
);

const projectDataSelector = ({ data, capital, maintenance, study } : { data : DetailedMapProps, capital : Function, maintenance : Function, study : Function }) => {
  switch (data.projectType) {
    case 'capital':
      return capital(data);
    case 'maintenance':
      return maintenance(data);
    case 'study':
      return study(data);
    default:
      return;
  }
}

export const getProjectBasics = (data: DetailedMapProps) => {
  return (
    <div className="detailed-info">
      {projectDataSelector({
        data,
        capital: projectCapitalBasics,
        maintenance: projectMaintenanceBasics,
        study: projectStudyBasics
      })}
    </div>
  );
}

export const genExtra = () => (
  <div className="divider">
    <div className="line-01"></div>
    <img src="/Icons/icon-20.svg" alt="" />
  </div>
);

export const mitigationPanel = (data : DetailedMapProps) => (
  <Panel header="Mitigation Types" key="1" extra={genExtra()} >
    <Row>
      <Col span={12}><img src="/Icons/chart-01.png" alt="" height="280px" width="320px" /></Col>
      <Col span={12}><img src="/Icons/chart-02.png" alt="" height="280px" width="320px" /></Col>
    </Row>
  </Panel>
);

export const componentSolutionsPanel = (data : any) => {
  const { components } = data;

  return (
    <Panel header="Component & solutions" key="2" extra={genExtra()}>
      <Row className="solution-h">
        <Col span={8}><Button>Component <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
        <Col span={4}><Button>Cost <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
        <Col span={4}><Button>Status <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
        <Col span={8}><Button>Solution Type <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
      </Row>

      {components.map((component : ComponentType) => (
        <Row className="solution-b" key={component.componentId}>
          <Col span={8}>{component.componentName}</Col>
          <Col span={4}>${numberWithCommas(component.howCost)}</Col>
          <Col span={4}>{component.status}</Col>
          <Col span={8}>{component.studyName}</Col>
        </Row>
      ))}
    </Panel>
  );
};

export const problemPanel = (data : DetailedMapProps) => (
  <Panel header="PROBLEM" key="5" extra={genExtra()}>
    <div className="detailed-info">
      <Row>
        <Col span={4}>
          <label><i>Name</i></label>
        </Col>
        <Col span={8}>
          <p>8 structures in LDC floodplain @Alpha St</p>
        </Col>
        <Col span={4}>
          <label><i>Priority</i></label>
        </Col>
        <Col span={8}>
          <p>High Priority</p>
        </Col>
      </Row>
    </div>
  </Panel>
);

export const vendorsPanel = (data : DetailedMapProps) => (
  <Panel header="VENDORS" key="6" extra={genExtra()}>
    <div className="detailed-info">
      <Row>
        <Col span={4}>
          <label><i>Contractor</i></label>
        </Col>
        <Col span={8}>
          <p>Atkins</p>
        </Col>
        <Col span={4}>
          <label><i>Consultant</i></label>
        </Col>
        <Col span={8}>
          <p>Applegate Group</p>
        </Col>
      </Row>
    </div>
  </Panel>
);