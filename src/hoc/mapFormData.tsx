import React, { useState } from 'react';

import Map from '../Components/Map/Map';
import NavbarView from "../Components/Shared/Navbar/NavbarView";
import SidebarView from "../Components/Shared/Sidebar/SidebarView";

import { MEDIUM_SCREEN, COMPLETE_SCREEN, EMPTY_SCREEN, NEW_PROJECT_FORM_COST } from "../constants/constants";
import { Redirect, useLocation } from "react-router-dom";

import { Layout, Row, Col, Dropdown, Menu, Button, Tag, Input, Upload, Table, Form } from 'antd';

export default function (WrappedComponent : any) {
    return (props : any) => {

        const location = useLocation();
        const emptyStyle: React.CSSProperties = {};
        const [rotationStyle, setRotationStyle] = useState(emptyStyle);
        const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN);
        const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN);
        const [selectedItems, setSelectedItems] = useState<any>([]);
        const [isPolygon, setIsPolygon] = useState<boolean>(false);
    
        const updateWidth = () => {
          if (leftWidth === MEDIUM_SCREEN) {
            setLeftWidth(COMPLETE_SCREEN);
            setRightWitdh(EMPTY_SCREEN);
            setRotationStyle({transform: 'rotate(180deg)'});
          } else {
            setLeftWidth(MEDIUM_SCREEN);
            setRightWitdh(MEDIUM_SCREEN);
            setRotationStyle(emptyStyle);
          }
        }
      
        return (
            <Layout>
            <NavbarView></NavbarView>
            <Layout>
              <SidebarView></SidebarView>
              <Layout className="map-00" style={{height: 'calc(100vh - 58px)'}}>
                <Row>
                    <Col span={leftWidth}>
                        <Map
                            leftWidth={leftWidth}
                            setSelectedItems={setSelectedItems}
                            selectedItems={selectedItems}
                            setIsPolygon={setIsPolygon}
                            {...props} />

                        <Button id="resizable-btn" className="btn-coll" onClick={updateWidth}>
                            <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px"/>
                        </Button>
                    </Col>
                    <Col span={rightWidth}>
                        <WrappedComponent 
                            selectedItems={selectedItems}
                            isPolygon={isPolygon}
                            setSelectedItems={setSelectedItems}
                            saveNewProjectForm={props.saveNewProjectForm} />
                    </Col>
                </Row>
              </Layout>
            </Layout>
          </Layout>
        );
    }
} 
