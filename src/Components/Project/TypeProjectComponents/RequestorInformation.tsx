import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Timeline, Popover, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { WINDOW_WIDTH } from 'constants/constants';
import store from '../../../store';
import { JURISDICTION, PROJECT_INFORMATION, SERVICE_AREA, GOVERNMENT_STAFF } from "../../../constants/constants";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { useProjectDispatch, useProjectState } from '../../../hook/projectHook';

interface Props {
  index: number;
  sponsor: any;
  setSponsor: any;
  cosponsor: string[];
  setCoSponsor: any;  
  originModal: string;
  projectId: number;
}
const { Option } = Select;

export const RequestorInformation = ({
  index,
  sponsor,
  setSponsor,
  cosponsor,
  setCoSponsor,
  originModal,
  projectId = 0
}: Props) => {  
  const [localities, setLocalities] = useState([]);
  const [name, setName] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isLocalGovernment, setIsLocalGovernment] = useState(false);
  const {
    isEdit
  } = useProjectState();
  const { setServiceAreaCounty } = useProjectDispatch();
  const user = store.getState().profile.userInformation;
  const isMaintenance = originModal === 'Maintenance';
  const isStudy = originModal === 'Study';
  useEffect(() => {
    const CODE_LOCAL_GOVERNMENT = 3;
    if (user?.business_associate_contact?.business_address?.business_associate?.code_business_associates_type_id === CODE_LOCAL_GOVERNMENT) {
      if (user?.business_associate_contact?.business_address?.business_associate?.business_name) {
        setIsLocalGovernment(true);
      }
    }
  }, []);

  const getLabel = () => {
    if (originModal == 'Study') {
      return 'Study'
    }
    if (originModal == 'Acquisition') {
      return 'acquisition'
    }
    return 'project';
  }
  const getLabelCap = () => {
    if (originModal == 'Study') {
      return 'study'
    }
    if (originModal == 'Acquisition') {
      return 'acquisition'
    }
    return 'Project';
  }
  
  const content03 = (<div className="popver-info">This is the primary local government sponsor that is requesting the project. By default, this attribute matches that of the Work Request. If changed, this project will be sent to the corresponding Work Request.</div>);
  const contentLocInf = (<div className="popver-info">Some Location Information fields are populated automatically when the {getLabelCap()} Location is drawn. Please check them for accuracy and make changes as-necessary.</div>);
  const content04 = (<div className="popver-info">This is a list of all potential local government co-sponsors which might contribute funding or otherwise participate in the {getLabel()}.</div>);
  
  useEffect(() => {
    datasets.getData(`${SERVER.GET_SPONSOR}`)
      .then((rows) => {
        const sponsor = rows.map((row:any) => row.business_name);
        setLocalities(sponsor);
      }).catch((e) => {
        console.log(e);
    })
    return () => {
      setServiceAreaCounty({});
    }
  }, []);

  useEffect(() => {
    if (isEdit && projectId > 0) {
      datasets.getData(SERVER.GET_CREATE_DATA(projectId), datasets.getToken())
        .then((rows) => {
          setName(rows?.user?.name ? rows.user.name : '---');
        const date = new Date(rows?.created_date);
        const formattedDate = date.toLocaleDateString('en-US');
        setCreatedDate(formattedDate ? formattedDate : '---');
        const businessName = rows?.user?.business_associate_contact?.business_address?.business_associate?.business_name;
        setBusinessName(businessName ? businessName : '---');
        }).catch((e) => {
          console.log(e);
        })
      return () => {
        setServiceAreaCounty({});
      }
    }
  }, [projectId]);

  return (
    <div>
      <div className="sub-title-project">
        <h5 className="requestor-information">{index}. SPONSOR INFORMATION <Popover content={contentLocInf}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
      </div>
      <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Sponsor <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <div id="sponsorid">
            <Select
              style={{ width: '100%' }}
              placeholder={'Select a Sponsor'}
              value={sponsor === "" ? undefined : sponsor}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              disabled={isLocalGovernment}
              onChange={setSponsor}
              getPopupContainer={() => (document.getElementById("sponsorid") as HTMLElement)}>
              {
                isLocalGovernment ? (
                  <Option value={sponsor + ""}>{sponsor + ""}</Option>
                ) : (
                  localities.map((element: string) => {
                    return <Option key={element} value={element}>{element}</Option>
                  })
                )
              }
            </Select>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Potential Co-Sponsor <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <div className="sponsor-select" id="cosponsorid">
            <Select
              mode="multiple"
              placeholder={cosponsor?.length != 0 ? cosponsor : "Select a Co-Sponsor"}
              style={{ width: '100%' }}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              onChange={(coSponsor: any) => setCoSponsor(coSponsor)}
              value={cosponsor}
              getPopupContainer={() => (document.getElementById("cosponsorid") as HTMLElement)}>
              {localities.map((element: string) => {
                return <Option key={element} value={element}>{element}</Option>
              })}
            </Select>
          </div>
        </Col>
        {isEdit && <label className="sub-title-footer" style={{paddingLeft:'10px'}}>{`This project was created by ${name} (${businessName}) on ${createdDate}.`}</label>}
      </Row>
    </div>
  );
};

export default RequestorInformation;