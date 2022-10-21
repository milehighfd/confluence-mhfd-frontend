import React, { useEffect, useState } from "react";
import { AutoComplete, Button, Col, Dropdown, Input, Layout, Row, Select } from 'antd';
import NavbarContainer from "../../Components/Shared/Navbar/NavbarContainer";
import SidebarView from "../../Components/Shared/Sidebar/SidebarView";
import LoadingViewOverall from "../../Components/Loading-overall/LoadingViewOverall";
import { MEDIUM_SCREEN_LEFT, MEDIUM_SCREEN_RIGHT } from "../../constants/constants";
import WorkRequestMap from "../../Components/WorkRequestMap/WorkRequestMap";
import ProjectEditService from "../../Components/Work/Request/ProjectEditService";
import { AlignCenterOutlined, AppstoreOutlined, DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import ListViewBody from "./components/ListViewBody";

const ListView = () => {
  const emptyStyle: React.CSSProperties = {};
  const [loadingTransp, setLoadingT] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [dataAutocomplete, setDataAutocomplete] = useState<string[]>([]);
  const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN_RIGHT - 1);
  const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN_LEFT + 1);
  const [rotationStyle, setRotationStyle] = useState<any>(emptyStyle);
  const [locality, setLocality] = useState('');
  const [years, setYears] = useState([2022, 2021, 2020, 2019, 2018]);
  const [isOnSelected,setIsOnSelected]= useState(false);
  const [year, setYear] = useState<any>(years[0]);
  const [problemid, setProblemId ] = useState<any>(undefined);
  const [projectsAmounts, setProjectAmounts] = useState([]);
  const [tabKey, setTabKey] = useState<any>(null);
  const [showModalProject, setShowModalProject] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  let currentProject: any = {};
  const renderOption = (item: string) => {
    return {
      key: `${item}|${item}`,
      value: item,
      label: item
    };
  };
  const updateWidth = () => {
    if (leftWidth === (MEDIUM_SCREEN_RIGHT - 1)) {
      setLeftWidth(MEDIUM_SCREEN_LEFT);
      setRightWitdh(MEDIUM_SCREEN_RIGHT);
      setRotationStyle({transform: 'rotate(180deg)', marginRight:'-4px', right:'4px', position:'relative'});
    } else {
      setLeftWidth(MEDIUM_SCREEN_RIGHT - 1);
      setRightWitdh(MEDIUM_SCREEN_LEFT + 1);
      setRotationStyle(emptyStyle);
    }
    setTimeout( () => {
      setChanges(Math.random())
    }, 1000)
  }
  const setShowModalEdit = (project: any) => {
    let projectswithid: any = new Set();
    let projectsFiltered = ProjectEditService.getProjects().filter((proj:any) => (proj.project_id == project.id.toString()));
    if(projectsFiltered.length>0){
      projectswithid.add(projectsFiltered[0]);
    }
    let newArray = [...projectswithid.values()];
    if(newArray[0]){
      currentProject = {...newArray[0].projectData};
      setTimeout(()=>{
        setShowModalProject(true);
      },200);
    }
  }
  const [changes, setChanges] = useState(0);
  useEffect(()=>{
    setChanges(Math.random());
  },[locality, tabKey,year]);
  const openEdit = (project:any,event:any) => {
    setShowModalEdit(project);
  }

  return <>
    <Layout>
      <NavbarContainer/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="work">
          { (loadingTransp || loading ) &&<LoadingViewOverall></LoadingViewOverall>}
          {
            <Row>
            <Col xs={{ span: 24 }} className={"height-mobile"} lg={{ span: leftWidth }} style={{transition:'all 0.7s ease'}}>
                <WorkRequestMap isFirstRendering={true} locality={{locality: locality, isOnSelected: isOnSelected}} openEdit={openEdit} projectsAmounts={projectsAmounts} currentTab={tabKey} change={changes} openModal={setShowCreateProject} setProblemId={setProblemId} leftWidth={leftWidth}/>
                <Button id="resizable-btn" className="btn-coll" onClick={updateWidth}>
                  <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px"/>
                </Button>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: rightWidth }}>
              <ListViewBody />
            </Col>
          </Row>
          }
        </Layout>
      </Layout>
    </Layout>
  </>
};

export default ListView;