import React from 'react';
import { Row, Col, Collapse, Button } from 'antd';

const { Panel } = Collapse;

export const firstLetterUppercase = (text : string) => {
  if (text) {
    const formatedText = text[0].toUpperCase() + text.slice(1);
    return formatedText;
  }
  return '';
}

const spacingCamelCase = (text : string) => {
  if (text) {
    const spacedText = text.replace(/([A-Z])/g, ' $1').trim();
    const formatedText = firstLetterUppercase(spacedText);
    return formatedText;
  }
  return '';
}

const projectCapitalBasics = (data: any) => {
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

const projectMaintenanceBasics = (data: any) => {
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

const projectStudyBasics = (data: any) => {
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

const projectDataSelector = ({ data, capital, maintenance, study } : { data : any, capital : Function, maintenance : Function, study : Function }) => {
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

export const getProjectBasics = (data: any) => {
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

export const mitigationPanel = (
  <Panel header="Mitigation Types" key="1" extra={genExtra()} >
    <Row>
      <Col span={12}><img src="/Icons/chart-01.png" alt="" height="333px" /></Col>
      <Col span={12}><img src="/Icons/chart-02.png" alt="" height="333px" /></Col>
    </Row>
  </Panel>
);

export const componentSolutionsPanel = (
  <Panel header="Component & solutions" key="2" extra={genExtra()}>
    <Row className="solution-h">
      <Col span={8}><Button>Component <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
      <Col span={4}><Button>Cost <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
      <Col span={4}><Button>Status <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
      <Col span={8}><Button>Solution Type <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
    </Row>

    <Row className="solution-b">
      <Col span={8}>Alpha St culvert</Col>
      <Col span={4}>$500,000</Col>
      <Col span={4}>Active</Col>
      <Col span={8}>Increased Conveyance - Crossing</Col>
    </Row>
    <Row className="solution-b">
      <Col span={8}>Beta Ave culvert</Col>
      <Col span={4}>$1,200,000</Col>
      <Col span={4}>Active</Col>
      <Col span={8}>Increased Conveyance - Crossing</Col>
    </Row>
    <Row className="solution-b">
      <Col span={8}>Channel imp - LDC @Alpha St</Col>
      <Col span={4}>$700,000</Col>
      <Col span={4}>Active</Col>
      <Col span={8}>Increased Conveyance - Crossing</Col>
    </Row>
    <Row className="solution-b">
      <Col span={8}>Pedestrian bridge in park</Col>
      <Col span={4}>$250,000</Col>
      <Col span={4}>Active</Col>
      <Col span={8}>Increased Conveyance - Crossing</Col>
    </Row>
    <Row className="solution-b">
      <Col span={8}><b>Total Estimated Cost</b></Col>
      <Col span={4}><b>$2,650,000</b></Col>
    </Row>
  </Panel>
);

export const problemPanel = (
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

export const vendorsPanel = (
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