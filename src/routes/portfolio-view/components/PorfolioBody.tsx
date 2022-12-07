import React, { useEffect, useRef, useState } from "react";
import moment from 'moment';
import { Button, Col, Dropdown, Input, Layout, Menu, Popover, Row, Select, Space, Tabs } from 'antd';
import { CalendarOutlined, CheckCircleOutlined, DownOutlined, HeartOutlined, SettingFilled, ToTopOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import Search from "./Search";
import TablePortafolio from "./TablePortfolio";
import PhaseView from "./PhaseView";
import ActionItems from "./ActionItems";
import CalendarView from "./CalendarView";
import Filters from "./Filters";
import ModalFields from "routes/list-view/components/ModalFields";
import ModalTollgate from "routes/list-view/components/ModalTollgate";
import ModalGraphic from "./ModalGraphic";


const { TabPane } = Tabs;
const tabKeys = ['All','Capital', 'Restoration', 'Study', 'Acquisition', 'R&D', 'DIP'];
const popovers: any = [
  <div className="popoveer-00"><b>All:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Capital:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Restoration:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Study:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Any other effort for which MHFD funds or staff time is requested.</div>,
  <div className="popoveer-00"><b>R&D:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>DIP:</b> Master plans that identify problems and recommend improvements.</div>,
]
const PortafolioBody = () => {
  const [graphicOpen, setGrapphicOpen] = useState(false);
  const [positionModalGraphic, setPositionModalGraphic]= useState({left: 500, top:500})
  const [tabKey, setTabKey] = useState<any>('All');
  const [openAction, setOpenAction] = useState(true);
  const [openModalTollgate, setOpenModalTollgate] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [openModalTable, setOpenModalTable] = useState(false);
  let displayedTabKey = tabKeys;
  const [optionSelect, setOptionSelect] = useState('List');
  const [openTable, setOpenTable] = useState([true, true, true]);
  const [hoverTable, setHoverTable] = useState([0, 0, 0])
  const tableRef = useRef<null | HTMLDivElement>(null); 
  const searchRef = useRef<null | HTMLDivElement>(null); 
  const phaseRef = useRef<null | HTMLDivElement>(null);
  const scheduleRef = useRef<null | HTMLDivElement>(null);
  const [moveSchedule, setMoveSchedule] = useState('null'); 
  const [zoomTimeline, setZoomTimeline] = useState(0);
  // console.log('zoom',zoomTimeline);
  
  let rawData = [
    {
      id: 'Title0',
      headerLabel: 'Centennial',
      date: moment('2022/08/11'),
      schedule: [
        {
          objectId: 10,
          type: 'title',
          categoryNo: 100,
          from: moment('2022/02/01 00:00:00'),
          to: moment('2022/06/01 00:00:00'),
          status: 'completed',
          name: 'Centennial',
        }
      ],
    },
    {
      id: 'Centennial1',
      headerLabel: 'Centennial',
      rowLabel: 'West Tollgate Creek GSB Drops  ',
      date: moment('2022/08/11'),
      schedule: [
        {
          objectId: 1,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/06/22 07:30:00'),
          to: moment('2022/07/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 6,
        },
        {
          objectId: 2,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/07/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 8
        },
        {
          objectId: 3,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/17 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 12
        },
        {
          objectId: 4,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/18 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 32
        },
        {
          objectId: 5,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/10/11 10:00:00'),
          status: 'active',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 6
        },
        {
          objectId: 6,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/10/12 08:30:00'),
          to: moment('2022/12/10 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 12
        },
        {
          objectId: 7,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/12/11 00:00:00'),
          to: moment('2023/01/20 00:00:00'),
          status: 'notStarted',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 15
        },
        {
          objectId: 8,
          type: 'rect',
          categoryNo: 8,
          from: moment('2023/01/21 00:00:00'),
          to: moment('2023/03/01 00:00:00'),
          status: 'notStarted',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId: 9,
          type: 'rect',
          categoryNo: 9,
          from: moment('2023/03/02 00:00:00'),
          to: moment('2023/05/03 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId: 10,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/05/04 00:00:00'),
          to: moment('2023/06/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 7
        },
        {
          objectId: 11,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/06/16 00:00:00'),
          to: moment('2023/07/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 10
        },
        {
          objectId: 12,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/07/30 00:00:00'),
          to: moment('2023/09/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 10
        },
        {
          objectId: 13,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/09/21 00:00:00'),
          to: moment('2023/10/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId: 14,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/10/21 00:00:00'),
          to: moment('2023/11/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId: 15,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/11/21 00:00:00'),
          to: moment('2023/12/30 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Centennial2',
      headerLabel: 'Centennial',
      rowLabel: 'North Outfall - Phase III ',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId: 16,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/03/22 07:30:00'),
          to: moment('2022/04/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 10,
        },
        {
          objectId:17,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/04/02 00:00:00'),
          to: moment('2022/04/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 5
        },
        {
          objectId: 18,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/04/22 08:30:00'),
          to: moment('2022/05/17 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 9
        },
        {
          objectId: 19,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/05/18 08:30:00'),
          to: moment('2022/06/10 10:00:00'),
          status: 'completed',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 12
        },
        {
          objectId: 20,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/06/11 08:30:00'),
          to: moment('2022/08/11 10:00:00'),
          status: 'completed',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 4
        },
        {
          objectId: 21,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/08/12 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 21
        },
        {
          objectId: 22,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/09/11 00:00:00'),
          to: moment('2022/10/20 00:00:00'),
          status: 'active',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 3
        },
        {
          objectId: 23,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/10/21 00:00:00'),
          to: moment('2022/12/01 00:00:00'),
          status: 'active',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId: 24,
          type: 'rect',
          categoryNo: 9,
          from: moment('2022/12/02 00:00:00'),
          to: moment('2023/02/03 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId: 25,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/04 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 10
        },
        {
          objectId: 26,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/06/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 8
        },
        {
          objectId: 27,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/06/30 00:00:00'),
          to: moment('2023/7/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 7
        },
        {
          objectId: 28,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/08/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId: 29,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/08/21 00:00:00'),
          to: moment('2023/10/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId: 30,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/10/21 00:00:00'),
          to: moment('2023/11/15 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Centennial3',
      headerLabel: 'Centennial',
      rowLabel: 'Niver Detention Dam - EAP... ',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId:31,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/03/22 07:30:00'),
          to: moment('2022/04/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 10,
        },
        {
          objectId:32,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/04/02 00:00:00'),
          to: moment('2022/04/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 5
        },
        {
          objectId:33,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/04/22 08:30:00'),
          to: moment('2022/05/17 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 9
        },
        {
          objectId:34,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/05/18 08:30:00'),
          to: moment('2022/06/10 10:00:00'),
          status: 'completed',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 12
        },
        {
          objectId:35,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/06/11 08:30:00'),
          to: moment('2022/08/11 10:00:00'),
          status: 'completed',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 4
        },
        {
          objectId:36,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/08/12 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 21
        },
        {
          objectId:37,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/09/11 00:00:00'),
          to: moment('2022/10/20 00:00:00'),
          status: 'active',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 3
        },
        {
          objectId:38,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/10/21 00:00:00'),
          to: moment('2022/12/01 00:00:00'),
          status: 'active',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:39,
          type: 'rect',
          categoryNo: 9,
          from: moment('2022/12/02 00:00:00'),
          to: moment('2023/02/03 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:40,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/04 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 10
        },
        {
          objectId:41,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/06/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 8
        },
        {
          objectId:42,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/06/30 00:00:00'),
          to: moment('2023/7/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 7
        },
        {
          objectId:43,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/08/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:44,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/08/21 00:00:00'),
          to: moment('2023/09/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:45,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/09/21 00:00:00'),
          to: moment('2023/10/15 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Centennial4',
      headerLabel: 'Centennial',
      rowLabel: 'Barr Creek - E470 to Quebec ',
      date: moment('2022/08/11'),
      schedule: [
        {
          objectId:46,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/03/22 07:30:00'),
          to: moment('2022/04/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 10,
        },
        {
          objectId:47,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/04/02 00:00:00'),
          to: moment('2022/04/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 5
        },
        {
          objectId:48,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/04/22 08:30:00'),
          to: moment('2022/05/17 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 9
        },
        {
          objectId:49,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/05/18 08:30:00'),
          to: moment('2022/06/10 10:00:00'),
          status: 'completed',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 12
        },
        {
          objectId:50,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/06/11 08:30:00'),
          to: moment('2022/08/11 10:00:00'),
          status: 'completed',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 4
        },
        {
          objectId:51,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/08/12 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 21
        },
        {
          objectId:52,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/09/11 00:00:00'),
          to: moment('2022/10/20 00:00:00'),
          status: 'active',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 3
        },
        {
          objectId:53,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/10/21 00:00:00'),
          to: moment('2022/12/01 00:00:00'),
          status: 'active',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:54,
          type: 'rect',
          categoryNo: 9,
          from: moment('2022/12/02 00:00:00'),
          to: moment('2023/02/03 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:55,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/04 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 10
        },
        {
          objectId:56,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/06/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 8
        },
        {
          objectId:57,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/06/30 00:00:00'),
          to: moment('2023/7/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 7
        },
        {
          objectId:58,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/08/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:59,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/08/21 00:00:00'),
          to: moment('2023/09/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:60,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/09/21 00:00:00'),
          to: moment('2023/10/15 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Centennial5',
      headerLabel: 'Centennial',
      rowLabel: 'Niver Creek Trib M - Thornton ',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId:61,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/03/22 07:30:00'),
          to: moment('2022/04/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 10,
        },
        {
          objectId:62,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/04/02 00:00:00'),
          to: moment('2022/04/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 5
        },
        {
          objectId:63,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/04/22 08:30:00'),
          to: moment('2022/05/17 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 9
        },
        {
          objectId:64,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/05/18 08:30:00'),
          to: moment('2022/06/10 10:00:00'),
          status: 'completed',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 12
        },
        {
          objectId:65,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/06/11 08:30:00'),
          to: moment('2022/08/11 10:00:00'),
          status: 'completed',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 4
        },
        {
          objectId:66,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/08/12 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 21
        },
        {
          objectId:67,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/09/11 00:00:00'),
          to: moment('2022/10/20 00:00:00'),
          status: 'active',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 3
        },
        {
          objectId:68,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/10/21 00:00:00'),
          to: moment('2022/12/01 00:00:00'),
          status: 'active',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:69,
          type: 'rect',
          categoryNo: 9,
          from: moment('2022/12/02 00:00:00'),
          to: moment('2023/02/03 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:70,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/04 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 10
        },
        {
          objectId:71,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/06/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 8
        },
        {
          objectId:72,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/06/30 00:00:00'),
          to: moment('2023/7/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 7
        },
        {
          objectId:73,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/08/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:74,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/08/21 00:00:00'),
          to: moment('2023/09/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:75,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/09/21 00:00:00'),
          to: moment('2023/10/15 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Centennial6',
      headerLabel: 'Centennial',
      rowLabel: 'Big Dry Creek (ARAPCO) ',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId:76,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/03/22 07:30:00'),
          to: moment('2022/04/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 10,
        },
        {
          objectId:77,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/04/02 00:00:00'),
          to: moment('2022/04/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 5
        },
        {
          objectId:78,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/04/22 08:30:00'),
          to: moment('2022/05/17 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 9
        },
        {
          objectId:79,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/05/18 08:30:00'),
          to: moment('2022/06/10 10:00:00'),
          status: 'completed',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 12
        },
        {
          objectId:80,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/06/11 08:30:00'),
          to: moment('2022/08/11 10:00:00'),
          status: 'completed',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 4
        },
        {
          objectId:81,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/08/12 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 21
        },
        {
          objectId:82,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/09/11 00:00:00'),
          to: moment('2022/10/20 00:00:00'),
          status: 'active',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 3
        },
        {
          objectId:83,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/10/21 00:00:00'),
          to: moment('2022/12/01 00:00:00'),
          status: 'active',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:84,
          type: 'rect',
          categoryNo: 9,
          from: moment('2022/12/02 00:00:00'),
          to: moment('2023/02/03 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:85,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/04 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 10
        },
        {
          objectId:86,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/06/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 8
        },
        {
          objectId:87,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/06/30 00:00:00'),
          to: moment('2023/7/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 7
        },
        {
          objectId:88,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/08/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:89,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/08/21 00:00:00'),
          to: moment('2023/09/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:90,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/09/21 00:00:00'),
          to: moment('2023/10/15 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Centennial7',
      headerLabel: 'Centennial',
      rowLabel: 'West Tollgate Creek ',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId:91,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/03/22 07:30:00'),
          to: moment('2022/04/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 10,
        },
        {
          objectId:92,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/04/02 00:00:00'),
          to: moment('2022/04/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 5
        },
        {
          objectId:93,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/04/22 08:30:00'),
          to: moment('2022/05/17 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 9
        },
        {
          objectId:94,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/05/18 08:30:00'),
          to: moment('2022/06/10 10:00:00'),
          status: 'completed',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 12
        },
        {
          objectId:95,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/06/11 08:30:00'),
          to: moment('2022/08/11 10:00:00'),
          status: 'completed',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 4
        },
        {
          objectId:96,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/08/12 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 21
        },
        {
          objectId:97,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/09/11 00:00:00'),
          to: moment('2022/10/20 00:00:00'),
          status: 'active',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 3
        },
        {
          objectId:98,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/10/21 00:00:00'),
          to: moment('2022/12/01 00:00:00'),
          status: 'active',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:99,
          type: 'rect',
          categoryNo: 9,
          from: moment('2022/12/02 00:00:00'),
          to: moment('2023/02/03 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:100,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/04 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 10
        },
        {
          objectId:101,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/06/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 8
        },
        {
          objectId:102,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/06/30 00:00:00'),
          to: moment('2023/7/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 7
        },
        {
          objectId:103,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/08/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:104,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/08/21 00:00:00'),
          to: moment('2023/09/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:105,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/09/21 00:00:00'),
          to: moment('2023/10/15 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Centennial8',
      headerLabel: 'Centennial',
      rowLabel: 'West Tollgate Creek ',
      date: moment('2022/08/19'),
      schedule: [
               {
          objectId:106,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/03/22 07:30:00'),
          to: moment('2022/04/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 10,
        },
        {
          objectId:107,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/04/02 00:00:00'),
          to: moment('2022/04/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 5
        },
        {
          objectId:108,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/04/22 08:30:00'),
          to: moment('2022/05/17 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 9
        },
        {
          objectId:109,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/05/18 08:30:00'),
          to: moment('2022/06/10 10:00:00'),
          status: 'completed',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 12
        },
        {
          objectId:110,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/06/11 08:30:00'),
          to: moment('2022/08/11 10:00:00'),
          status: 'completed',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 4
        },
        {
          objectId:111,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/08/12 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 21
        },
        {
          objectId:112,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/09/11 00:00:00'),
          to: moment('2022/10/20 00:00:00'),
          status: 'active',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 3
        },
        {
          objectId:113,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/10/21 00:00:00'),
          to: moment('2022/12/01 00:00:00'),
          status: 'active',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:114,
          type: 'rect',
          categoryNo: 9,
          from: moment('2022/12/02 00:00:00'),
          to: moment('2023/02/03 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:115,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/04 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 10
        },
        {
          objectId:116,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/06/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 8
        },
        {
          objectId:117,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/06/30 00:00:00'),
          to: moment('2023/7/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 7
        },
        {
          objectId:118,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/08/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:119,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/08/21 00:00:00'),
          to: moment('2023/09/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:120,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/09/21 00:00:00'),
          to: moment('2023/10/15 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Centennial9',
      headerLabel: 'Centennial',
      rowLabel: 'West Tollgate Creek ',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId:121,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/03/22 07:30:00'),
          to: moment('2022/04/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 10,
        },
        {
          objectId:122,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/04/02 00:00:00'),
          to: moment('2022/04/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 5
        },
        {
          objectId:123,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/04/22 08:30:00'),
          to: moment('2022/05/17 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 9
        },
        {
          objectId:124,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/05/18 08:30:00'),
          to: moment('2022/06/10 10:00:00'),
          status: 'completed',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 12
        },
        {
          objectId:125,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/06/11 08:30:00'),
          to: moment('2022/08/11 10:00:00'),
          status: 'completed',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 4
        },
        {
          objectId:126,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/08/12 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 21
        },
        {
          objectId:127,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/09/11 00:00:00'),
          to: moment('2022/10/20 00:00:00'),
          status: 'active',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 3
        },
        {
          objectId:128,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/10/21 00:00:00'),
          to: moment('2022/12/01 00:00:00'),
          status: 'active',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:129,
          type: 'rect',
          categoryNo: 9,
          from: moment('2022/12/02 00:00:00'),
          to: moment('2023/02/03 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:130,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/04 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 10
        },
        {
          objectId:131,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/06/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 8
        },
        {
          objectId:132,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/06/30 00:00:00'),
          to: moment('2023/7/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 7
        },
        {
          objectId:133,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/08/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:134,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/08/21 00:00:00'),
          to: moment('2023/09/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:135,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/09/21 00:00:00'),
          to: moment('2023/10/15 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Title1',
      headerLabel: 'Commerce City',
      date: moment('2022/08/11'),
      schedule: [{
        objectId: 10,
        type: 'title',
        categoryNo: 100,
        from: moment('2022/07/01 00:00:00'),
        to: moment('2022/11/01 00:00:00'),
        status: 'completed',
        name: 'Commerce City',
      }],
    },
    {
      id: 'CommerceCity1',
      headerLabel: 'Commerce City',
      rowLabel: 'North Outfall - Phase IV',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId:136,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/06/22 07:30:00'),
          to: moment('2022/07/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 6,
        },
        {
          objectId:137,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/07/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 8
        },
        {
          objectId:138,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/17 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 12
        },
        {
          objectId:139,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/18 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 32
        },
        {
          objectId:140,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/10/11 10:00:00'),
          status: 'active',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 6
        },
        {
          objectId:141,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/10/12 08:30:00'),
          to: moment('2022/12/10 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 12
        },
        {
          objectId:142,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/12/11 00:00:00'),
          to: moment('2023/01/20 00:00:00'),
          status: 'notStarted',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 15
        },
        {
          objectId:143,
          type: 'rect',
          categoryNo: 8,
          from: moment('2023/01/21 00:00:00'),
          to: moment('2023/03/01 00:00:00'),
          status: 'notStarted',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:144,
          type: 'rect',
          categoryNo: 9,
          from: moment('2023/03/02 00:00:00'),
          to: moment('2023/05/03 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:145,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/05/04 00:00:00'),
          to: moment('2023/06/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 7
        },
        {
          objectId:146,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/06/16 00:00:00'),
          to: moment('2023/07/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 10
        },
        {
          objectId:147,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/07/30 00:00:00'),
          to: moment('2023/09/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 10
        },
        {
          objectId:148,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/09/21 00:00:00'),
          to: moment('2023/10/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:149,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/10/21 00:00:00'),
          to: moment('2023/11/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:150,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/11/21 00:00:00'),
          to: moment('2023/12/30 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'CommerceCity2',
      headerLabel: 'Commerce City',
      rowLabel: 'Snyder Creek - E470 to Quebec',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId:151,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/06/22 07:30:00'),
          to: moment('2022/07/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 6,
        },
        {
          objectId:152,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/07/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 8
        },
        {
          objectId:153,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/17 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 12
        },
        {
          objectId:154,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/18 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 32
        },
        {
          objectId:155,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/10/11 10:00:00'),
          status: 'active',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 6
        },
        {
          objectId:156,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/10/12 08:30:00'),
          to: moment('2022/12/10 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 12
        },
        {
          objectId:157,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/12/11 00:00:00'),
          to: moment('2023/01/20 00:00:00'),
          status: 'notStarted',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 15
        },
        {
          objectId:158,
          type: 'rect',
          categoryNo: 8,
          from: moment('2023/01/21 00:00:00'),
          to: moment('2023/03/01 00:00:00'),
          status: 'notStarted',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:159,
          type: 'rect',
          categoryNo: 9,
          from: moment('2023/03/02 00:00:00'),
          to: moment('2023/05/03 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:160,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/05/04 00:00:00'),
          to: moment('2023/06/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 7
        },
        {
          objectId:161,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/06/16 00:00:00'),
          to: moment('2023/07/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 10
        },
        {
          objectId:162,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/07/30 00:00:00'),
          to: moment('2023/09/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 10
        },
        {
          objectId:163,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/09/21 00:00:00'),
          to: moment('2023/10/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:164,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/10/21 00:00:00'),
          to: moment('2023/11/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:165,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/11/21 00:00:00'),
          to: moment('2023/12/30 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Title2',
      headerLabel: 'Denver',
      date: moment('2022/08/11'),
      schedule: [{
        objectId: 10,
        type: 'title',
        categoryNo: 100,
        from: moment('2022/06/01 00:00:00'),
        to: moment('2022/10/01 00:00:00'),
        status: 'completed',
        name: 'Denver',
      }],
    },
    {
      id: 'Denver1',
      headerLabel: 'Denver',
      rowLabel: 'Piney Creek Channel Restore',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId:166,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/05/22 07:30:00'),
          to: moment('2022/06/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 6,
        },
        {
          objectId:167,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/06/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 8
        },
        {
          objectId:168,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/10 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 12
        },
        {
          objectId:169,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 32
        },
        {
          objectId:170,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/10/11 10:00:00'),
          status: 'active',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 6
        },
        {
          objectId:171,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/10/12 08:30:00'),
          to: moment('2022/11/05 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 12
        },
        {
          objectId:172,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/11/06 00:00:00'),
          to: moment('2022/12/20 00:00:00'),
          status: 'notStarted',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 15
        },
        {
          objectId:173,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/12/21 00:00:00'),
          to: moment('2023/01/22 00:00:00'),
          status: 'notStarted',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:174,
          type: 'rect',
          categoryNo: 9,
          from: moment('2023/01/23 00:00:00'),
          to: moment('2023/02/24 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:175,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/25 00:00:00'),
          to: moment('2023/03/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 7
        },
        {
          objectId:176,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/03/30 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 10
        },
        {
          objectId:177,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/05/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 10
        },
        {
          objectId:178,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/05/21 00:00:00'),
          to: moment('2023/06/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:179,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/06/21 00:00:00'),
          to: moment('2023/07/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:180,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/09/30 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Denver2',
      headerLabel: 'Denver',
      rowLabel: 'No Name Creek Regional ',
      date: moment('2022/08/11'),
      schedule: [
        {
          objectId:181,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/05/22 07:30:00'),
          to: moment('2022/06/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 6,
        },
        {
          objectId:182,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/06/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 8
        },
        {
          objectId:183,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/10 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 12
        },
        {
          objectId:184,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 32
        },
        {
          objectId:185,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/10/11 10:00:00'),
          status: 'active',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 6
        },
        {
          objectId:186,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/10/12 08:30:00'),
          to: moment('2022/11/05 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 12
        },
        {
          objectId:187,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/11/06 00:00:00'),
          to: moment('2022/12/20 00:00:00'),
          status: 'notStarted',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 15
        },
        {
          objectId:188,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/12/21 00:00:00'),
          to: moment('2023/01/22 00:00:00'),
          status: 'notStarted',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:189,
          type: 'rect',
          categoryNo: 9,
          from: moment('2023/01/23 00:00:00'),
          to: moment('2023/02/24 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:190,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/25 00:00:00'),
          to: moment('2023/03/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 7
        },
        {
          objectId:191,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/03/30 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 10
        },
        {
          objectId:192,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/05/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 10
        },
        {
          objectId:193,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/05/21 00:00:00'),
          to: moment('2023/06/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:194,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/06/21 00:00:00'),
          to: moment('2023/07/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:195,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/09/30 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Denver3',
      headerLabel: 'Denver',
      rowLabel: 'East Tollgate Creek',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId:196,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/05/22 07:30:00'),
          to: moment('2022/06/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 6,
        },
        {
          objectId:197,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/06/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 8
        },
        {
          objectId:198,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/10 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 12
        },
        {
          objectId:199,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 32
        },
        {
          objectId:200,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/10/11 10:00:00'),
          status: 'active',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 6
        },
        {
          objectId:201,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/10/12 08:30:00'),
          to: moment('2022/11/05 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 12
        },
        {
          objectId:202,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/11/06 00:00:00'),
          to: moment('2022/12/20 00:00:00'),
          status: 'notStarted',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 15
        },
        {
          objectId:203,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/12/21 00:00:00'),
          to: moment('2023/01/22 00:00:00'),
          status: 'notStarted',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:204,
          type: 'rect',
          categoryNo: 9,
          from: moment('2023/01/23 00:00:00'),
          to: moment('2023/02/24 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:205,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/25 00:00:00'),
          to: moment('2023/03/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 7
        },
        {
          objectId:206,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/03/30 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 10
        },
        {
          objectId:207,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/05/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 10
        },
        {
          objectId:208,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/05/21 00:00:00'),
          to: moment('2023/06/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:209,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/06/21 00:00:00'),
          to: moment('2023/07/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:210,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/09/30 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },{
      id: 'Denver4',
      headerLabel: 'Denver',
      rowLabel: 'East Tollgate Creek',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId:211,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/05/22 07:30:00'),
          to: moment('2022/06/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 6,
        },
        {
          objectId:212,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/06/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 8
        },
        {
          objectId:213,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/10 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 12
        },
        {
          objectId:214,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 32
        },
        {
          objectId:215,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/10/11 10:00:00'),
          status: 'active',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 6
        },
        {
          objectId:216,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/10/12 08:30:00'),
          to: moment('2022/11/05 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 12
        },
        {
          objectId:217,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/11/06 00:00:00'),
          to: moment('2022/12/20 00:00:00'),
          status: 'notStarted',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 15
        },
        {
          objectId:218,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/12/21 00:00:00'),
          to: moment('2023/01/22 00:00:00'),
          status: 'notStarted',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:219,
          type: 'rect',
          categoryNo: 9,
          from: moment('2023/01/23 00:00:00'),
          to: moment('2023/02/24 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:220,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/25 00:00:00'),
          to: moment('2023/03/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 7
        },
        {
          objectId:221,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/03/30 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 10
        },
        {
          objectId:222,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/05/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 10
        },
        {
          objectId:223,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/05/21 00:00:00'),
          to: moment('2023/06/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:224,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/06/21 00:00:00'),
          to: moment('2023/07/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:225,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/09/30 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Denver5',
      headerLabel: 'Denver',
      rowLabel: 'East Tollgate Creek',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId:226,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/05/22 07:30:00'),
          to: moment('2022/06/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 6,
        },
        {
          objectId:227,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/06/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 8
        },
        {
          objectId:228,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/10 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 12
        },
        {
          objectId:229,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 32
        },
        {
          objectId:230,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/10/11 10:00:00'),
          status: 'active',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 6
        },
        {
          objectId:231,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/10/12 08:30:00'),
          to: moment('2022/11/05 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 12
        },
        {
          objectId:232,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/11/06 00:00:00'),
          to: moment('2022/12/20 00:00:00'),
          status: 'notStarted',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 15
        },
        {
          objectId:233,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/12/21 00:00:00'),
          to: moment('2023/01/22 00:00:00'),
          status: 'notStarted',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:234,
          type: 'rect',
          categoryNo: 9,
          from: moment('2023/01/23 00:00:00'),
          to: moment('2023/02/24 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:235,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/25 00:00:00'),
          to: moment('2023/03/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 7
        },
        {
          objectId:236,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/03/30 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 10
        },
        {
          objectId:237,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/05/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 10
        },
        {
          objectId:238,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/05/21 00:00:00'),
          to: moment('2023/06/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:239,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/06/21 00:00:00'),
          to: moment('2023/07/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:240,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/09/30 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Denver6',
      headerLabel: 'Denver',
      rowLabel: 'East Tollgate Creek',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId:241,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/05/22 07:30:00'),
          to: moment('2022/06/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 6,
        },
        {
          objectId:242,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/06/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 8
        },
        {
          objectId:243,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/10 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 12
        },
        {
          objectId:244,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 32
        },
        {
          objectId:245,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/10/11 10:00:00'),
          status: 'active',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 6
        },
        {
          objectId:246,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/10/12 08:30:00'),
          to: moment('2022/11/05 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 12
        },
        {
          objectId:247,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/11/06 00:00:00'),
          to: moment('2022/12/20 00:00:00'),
          status: 'notStarted',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 15
        },
        {
          objectId:248,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/12/21 00:00:00'),
          to: moment('2023/01/22 00:00:00'),
          status: 'notStarted',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:249,
          type: 'rect',
          categoryNo: 9,
          from: moment('2023/01/23 00:00:00'),
          to: moment('2023/02/24 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:250,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/25 00:00:00'),
          to: moment('2023/03/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 7
        },
        {
          objectId:251,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/03/30 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 10
        },
        {
          objectId:252,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/05/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 10
        },
        {
          objectId:253,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/05/21 00:00:00'),
          to: moment('2023/06/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:254,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/06/21 00:00:00'),
          to: moment('2023/07/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:255,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/09/30 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Denver7',
      headerLabel: 'Denver',
      rowLabel: 'East Tollgate Creek',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId:256,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/05/22 07:30:00'),
          to: moment('2022/06/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 6,
        },
        {
          objectId:257,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/06/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 8
        },
        {
          objectId:258,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/10 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 12
        },
        {
          objectId:259,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 32
        },
        {
          objectId:260,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/10/11 10:00:00'),
          status: 'active',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 6
        },
        {
          objectId:261,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/10/12 08:30:00'),
          to: moment('2022/11/05 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 12
        },
        {
          objectId:262,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/11/06 00:00:00'),
          to: moment('2022/12/20 00:00:00'),
          status: 'notStarted',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 15
        },
        {
          objectId:263,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/12/21 00:00:00'),
          to: moment('2023/01/22 00:00:00'),
          status: 'notStarted',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:264,
          type: 'rect',
          categoryNo: 9,
          from: moment('2023/01/23 00:00:00'),
          to: moment('2023/02/24 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:265,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/25 00:00:00'),
          to: moment('2023/03/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 7
        },
        {
          objectId:266,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/03/30 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 10
        },
        {
          objectId:267,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/05/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 10
        },
        {
          objectId:268,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/05/21 00:00:00'),
          to: moment('2023/06/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:269,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/06/21 00:00:00'),
          to: moment('2023/07/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:270,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/09/30 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    },
    {
      id: 'Denver8',
      headerLabel: 'Denver',
      rowLabel: 'East Tollgate Creek',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId:271,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/05/22 07:30:00'),
          to: moment('2022/06/01 08:30:00'),
          status: 'completed',
          name: 'Draft',
          phase: 'Draft', 
          tasks: 6,
        },
        {
          objectId:272,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/06/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
          phase: 'WorkRequest', 
          tasks: 8
        },
        {
          objectId:273,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/10 10:00:00'),
          status: 'completed',
          name: 'Work Plan',
          hase: 'WorkPlan', 
          tasks: 12
        },
        {
          objectId:274,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/09/10 10:00:00'),
          status: 'active',
          name: 'Start Up',
          phase: 'StartUp', 
          tasks: 32
        },
        {
          objectId:275,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/10/11 10:00:00'),
          status: 'active',
          name: 'Funding',
          phase: 'Funding', 
          tasks: 6
        },
        {
          objectId:276,
          type: 'rect',
          categoryNo: 6,
          from: moment('2022/10/12 08:30:00'),
          to: moment('2022/11/05 10:00:00'),
          status: 'active',
          name: 'Consultant Procurement',
          phase: 'ConsultantProcurement', 
          tasks: 12
        },
        {
          objectId:277,
          type: 'rect',
          categoryNo: 7,
          from: moment('2022/11/06 00:00:00'),
          to: moment('2022/12/20 00:00:00'),
          status: 'notStarted',
          name: 'Conceptual Design',
          phase: 'ConceptualDesign', 
          tasks: 15
        },
        {
          objectId:278,
          type: 'rect',
          categoryNo: 8,
          from: moment('2022/12/21 00:00:00'),
          to: moment('2023/01/22 00:00:00'),
          status: 'notStarted',
          name: 'Preliminary Design',
          phase: 'PreliminaryDesign', 
          tasks: 9
        },
        {
          objectId:279,
          type: 'rect',
          categoryNo: 9,
          from: moment('2023/01/23 00:00:00'),
          to: moment('2023/02/24 00:00:00'),
          status: 'notStarted',
          name: 'Final Design',
          phase: 'FinalDesign', 
          tasks: 2
        },
        {
          objectId:280,
          type: 'rect',
          categoryNo: 10,
          from: moment('2023/02/25 00:00:00'),
          to: moment('2023/03/29 00:00:00'),
          status: 'notStarted',
          name: 'Construction Contracting',
          phase: 'ConstructionContracting', 
          tasks: 7
        },
        {
          objectId:281,
          type: 'rect',
          categoryNo: 11,
          from: moment('2023/03/30 00:00:00'),
          to: moment('2023/04/15 00:00:00'),
          status: 'notStarted',
          name: 'Construction',
          phase: 'Construction', 
          tasks: 10
        },
        {
          objectId:282,
          type: 'rect',
          categoryNo: 12,
          from: moment('2023/04/16 00:00:00'),
          to: moment('2023/05/20 00:00:00'),
          status: 'notStarted',
          name: 'Documentation',
          phase: 'Documentation', 
          tasks: 10
        },
        {
          objectId:283,
          type: 'rect',
          categoryNo: 13,
          from: moment('2023/05/21 00:00:00'),
          to: moment('2023/06/20 00:00:00'),
          status: 'notStarted',
          name: 'Establishment',
          phase: 'Establishment', 
          tasks: 10
        },
        {
          objectId:284,
          type: 'rect',
          categoryNo: 14,
          from: moment('2023/06/21 00:00:00'),
          to: moment('2023/07/20 00:00:00'),
          status: 'notStarted',
          name: 'Close Out',
          phase: 'CloseOut', 
          tasks: 10
        },
        {
          objectId:285,
          type: 'rect',
          categoryNo: 15,
          from: moment('2023/07/21 00:00:00'),
          to: moment('2023/09/30 00:00:00'),
          status: 'notStarted',
          name: 'Closed',
          phase: 'Closed', 
          tasks: 10
        },
      ],
    }
  ];
  const menu = (
    <Menu
      className="menu-drop"
      items={[
        {
          key: '1',
          label: 'MHFD Lead/PM',
          className:'menu-drop-sub-sub',
          children: [
            {
              key: '1-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '1-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '1-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
        {
          key: '2',
          label: 'Service Area',
          children: [
            {
              key: '2-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '2-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '2-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
        {
          key: '3',
          label: 'County',
          children: [
            {
              key: '3-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '3-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '3-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
        {
          key: '4',
          label: 'Jurisdiction',
          children: [
            {
              key: '4-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '4-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '4-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
        {
          key: '5',
          label: 'Consultant',
          children: [
            {
              key: '5-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '5-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '5-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
        {
          key: '6',
          label: 'Contractor ',
          children: [
            {
              key: '6-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '6-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '6-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
      ]}
    />
  );
  return <>
    {graphicOpen && <ModalGraphic positionModalGraphic={positionModalGraphic}/>}
    {openModalTable && <ModalFields visible={openModalTable} setVisible={setOpenModalTable}/>}
    <ModalTollgate visible={openModalTollgate}setVisible ={setOpenModalTollgate}/>
    <div>
      <div className="portafolio-head">
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <h2 style={{width:'205px'}}>
              <Dropdown overlay={menu} trigger={['click']} overlayClassName="drop-menu-header" placement="bottomRight">
                <div className="select-area">
                  <a onClick={e => e.preventDefault()} style={{marginLeft:'2%'}}>
                    South Watershed &nbsp;<DownOutlined style={{fontSize:'14px'}}/>
                  </a>
                </div>
              </Dropdown>
            </h2>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{textAlign:'center'}}>
            <Button className={optionSelect=== 'List' ? "btn-view btn-view-active": "btn-view"} onClick={()=>{setOptionSelect('List')}}>
              List
            </Button>
            <Button className={optionSelect=== 'Phase' ? "btn-view btn-view-active": "btn-view"}  onClick={()=>{setOptionSelect('Phase')}}>
              Phase
            </Button>
            <Button className={optionSelect=== 'Schedule' ? "btn-view btn-view-active": "btn-view"}  onClick={()=>{setOptionSelect('Schedule')}}>
              Schedule
            </Button>

          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{textAlign:'right'}}>
            <Button className="btn-filter-k ">
              <CheckCircleOutlined style={{color: '#cdcbd6', fontSize: '16px'}} /> My Projects
            </Button>
            {/* <span style={{color:'#DBDBE1'}}>|</span> */}
            <Button className="btn-filter-k">
              <HeartOutlined style={{color: '#cdcbd6', fontSize: '16px'}}  /> Favorites
            </Button>
            {/* <span style={{color:'#DBDBE1'}}>|</span> */}
            <Button className={openFilters ? "btn-filter-k btn-filter-k-active":"btn-filter-k" } onClick={()=>{setOpenFilters(true)}}>
              <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-73.svg') no-repeat center", backgroundColor: '#bfbcc9' }} src=""/>&nbsp;Filter
            </Button>
            {/* <Button className=" btn-filter-k" onClick={()=>{setOpenFilters(true)}}>
              <ToTopOutlined style={{fontSize: '16px', color: '#706b8a'}}/>
            </Button> */}
            {/* <span style={{color:'#DBDBE1'}}>|</span> */}
          </Col>
        </Row>
      </div>
      <div className="work-body portafolio">
        <div style={{position: 'absolute',right: '5px', zIndex:'3', marginTop:'15px'}}>
          {/* {optionSelect === 'List' &&
            <Button  style={{border:'1px solid transparent', color:'#29C499'}} onClick={()=>{setOpenModalTable(true)}}>
              <SettingFilled />
              Customize table
            </Button>
          } */}
          {(optionSelect === 'Phase' || optionSelect === 'Schedule') && <div>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#5E5FE2'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Done</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#047CD7'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Current</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#D4D2D9'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Not Started</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#F5575C'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Overdue</span>
                </span>
                  {/* <Button style={{paddingLeft:'0px',border: '1px solid transparent', color: '#11093C', opacity: '0.6', paddingRight: '10px'}} onClick={() => {setOpenModalTollgate(true)}}>
                    <CalendarOutlined /> Edit Dates
                  </Button>
                  
                  {optionSelect === 'Schedule' && <><span style={{marginRight:'10px', color:'#DBDBE1'}}> |</span>
                  <ZoomInOutlined style={{marginRight:'12px', color: '#11093C', opacity: '0.6'}} onClick={() => setZoomTimeline(zoomTimeline -1)}/>
                  <ZoomOutOutlined  style={{color: '#11093C', opacity: '0.6', marginRight:'15px'}} onClick={() => setZoomTimeline(zoomTimeline +1)}/></>} */}
              </div>}
        </div>
        <Tabs defaultActiveKey={displayedTabKey[1]}
          activeKey={tabKey}
            onChange={(key) => setTabKey(key)} className="tabs-map">
            {
              displayedTabKey.map((tk: string) => (
                <TabPane style={{marginBottom:'0px'}} tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="topLeft" overlayClassName="tabs-style" style={{marginLeft:'-15px'}}>{tk} </Popover> </span>} key={tk}>
                  <div className="protafolio-body">
                    {openFilters && <Filters openFilters={openFilters} setOpenFilters={setOpenFilters}/>}
                  <Row>
                    <Col xs={{ span: 10 }} lg={{ span: 5 }}>
                      <Search searchRef={searchRef} tableRef={tableRef} setOpenTable={setOpenTable} openTable={openTable} hoverTable={hoverTable} setHoverTable={setHoverTable} phaseRef={phaseRef} scheduleRef={scheduleRef} rawData={rawData}/>
                    </Col>
                    <Col xs={{span:34}} lg={{span:19}}>
                      {optionSelect === 'List' && <TablePortafolio divRef={tableRef} searchRef={searchRef} openTable={openTable} hoverTable={hoverTable} setHoverTable={setHoverTable}/>}
                      {optionSelect === 'Phase'  && <PhaseView openTable={openTable} phaseRef={phaseRef} searchRef={searchRef} graphicOpen={graphicOpen} setGrapphicOpen={setGrapphicOpen} positionModalGraphic={positionModalGraphic} setPositionModalGraphic={setPositionModalGraphic}/>}
                      {optionSelect === 'Schedule'  && <CalendarView rawData={rawData} openTable={openTable} moveSchedule={zoomTimeline} scheduleRef={scheduleRef} searchRef={searchRef} graphicOpen={graphicOpen} setGrapphicOpen={setGrapphicOpen} positionModalGraphic={positionModalGraphic} setPositionModalGraphic={setPositionModalGraphic}/>}
                    </Col>
                  </Row>
                  </div>
                </TabPane>
              ))
            }
          </Tabs>
        </div>
    </div>
  </>
};

export default PortafolioBody;