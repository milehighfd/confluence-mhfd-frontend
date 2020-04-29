import React from 'react';
import { Row, Col } from 'antd';

const firstLetterUppercase = (text : string) => {
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