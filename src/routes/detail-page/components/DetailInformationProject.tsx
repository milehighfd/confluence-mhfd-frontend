import React, { useEffect, useState } from "react";
import { Col, Row} from "antd";
import { useDetailedState } from "hook/detailedHook";
import { getStreams, getTeam } from '../../../utils/parsers';

const DetailInformationProject = () => {
  const {detailed,} = useDetailedState();
  const [mhfdManager, setMhfdManager] = useState<any>([{}]);
  const [lgManager, setLgManager] = useState<any>([{}]);
  const streamList = getStreams(detailed?.project_streams || []).join(' , ');
  const capitalizeWords = (str:any) =>{
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  } 
  useEffect(() => {
    const staffs = (getTeam(detailed?.project_staffs || [])); 
    setMhfdManager(staffs.length > 0? staffs.filter((staffs: { roleId: number; }) => staffs.roleId === 1):[{}])
    setLgManager(staffs.length > 0? staffs.filter((staffs: { roleId: number; }) => staffs.roleId === 10):[{}])
  }, [detailed]);

  return (
    <>
      <h3 style={{marginBottom:'15px'}} id="project-basics">PROJECT BASICS</h3>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Stream</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{streamList || 'N/A'}</p>
        </Col>
      </Row>      
      <Row>
      <Col xs={{ span: 24 }} lg={{ span: 4 }} >
          <label><i>Project ID</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} >
          <p>{detailed?.project_id ? detailed?.project_id : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <label><i>OnBase Project Number</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <p>{detailed?.onbase_project_number ? detailed?.onbase_project_number : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>LG Lead</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{lgManager.length > 0 ? lgManager[0].fullName : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <label><i>MHFD Lead</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <p>{mhfdManager.length > 0 ? mhfdManager[0].fullName : 'N/A'}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Description</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 20 }}>
          <p>{detailed?.description ? detailed?.description : 'N/A'}</p>
        </Col>
      </Row>     
    </>
  )
}

export default DetailInformationProject;