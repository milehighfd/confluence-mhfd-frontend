import React, { useEffect, useRef, useState } from "react";
import { Popover, Table, Tooltip } from "antd";
import * as datasets from 'Config/datasets';
import { SERVER } from "Config/Server.config";
import moment from "moment";
import { formatter } from "Components/Work/Request/RequestViewUtil";
import { handleAbortError } from 'store/actions/mapActions';
import { useMapState } from "hook/mapHook";
import DetailModal from 'routes/detail-page/components/DetailModal';
import { useRequestDispatch, useRequestState } from "hook/requestHook";
import { InfoCircleOutlined } from "@ant-design/icons";

const TableUpcomingProjects = ({tipe, searchValue, setCsvData, setLoading}:{tipe:string, searchValue: string, setCsvData: Function, setLoading: any}) => {
  
  const tooltipContent = (title:any, content:any) => {
    return (
      <div>
        <p className="title-tooltip">{title}</p>
        <p className="content-tooltip">{content}</p>
      </div>
    )
  }
  const [dataSource, setDataSource] = useState<any>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const actualColumns = useRef<any>([]);
  const [visible, setVisible] = useState(false);
  const [detailProject, setDetailProject] = useState<any>({});
  const {
    setFilterRequest,
    setCostRange
  } = useRequestDispatch();
  const {
    filterRequest,
    filterBy
  } = useRequestState();

  useEffect(() => {
    let filterRequestReset = filterRequest.map((f: any) => {
      f.selected = false;
      return f;
    });

    setCostRange([]);
    setFilterRequest(filterRequestReset);
  }, [filterBy]);
  const setDataForCSV = (dataFiltered: any) => {
    const dataCSV = dataFiltered.map((attribs: any) => {
      const newObject: any = {};
      actualColumns.current.forEach((column: any) => {
        // set a new variable with attrbis[column.dataindex] and if attribs[column.dataIndex] is string replace it with this str.replace(/"/g, '""'); 
        let newAttrib = attribs[column.dataIndex] && typeof attribs[column.dataIndex] === 'string' ? attribs[column.dataIndex].replace(/"/g, '""') : attribs[column.dataIndex];
        // console.log('newAttrib', newAttrib, 'attribs[column.dataIndex]', attribs[column.dataIndex], 'column.dataIndex', column.dataIndex, 'attribs', attribs);
        if (column.dataIndex === 'cost' && attribs[column.dataIndex] !== '-') {
          newAttrib = formatter.format(newAttrib);
        }
        newObject[column.displayCSV] = newAttrib;
      });
      return newObject;
    });
    const localgovernments = dataFiltered.map((attribs: any) => {
      const newObject: any = {};
      newObject['id'] = attribs.completeData?.project_local_governments[0]?.CODE_LOCAL_GOVERNMENT?.code_local_government_id;
      newObject['name'] = attribs.completeData?.project_local_governments[0]?.CODE_LOCAL_GOVERNMENT?.local_government_name;
      newObject['type'] = 'project_local_governments';
      // find in filterRequest the value with id and name and type to see the value of the selected 
      const found = filterRequest.find((element: any) => element.id === newObject['id'] && element.name === newObject['name'] && element.type === newObject['type']);
      newObject['selected'] = found ? found.selected: false;
      return newObject;
    });
    const serviceAreas = dataFiltered.map((attribs: any) => {
      const newObject: any = {};
      newObject['id'] = attribs.completeData?.project_service_areas[0]?.CODE_SERVICE_AREA?.code_service_area_id;
      newObject['name'] = attribs.completeData?.project_service_areas[0]?.CODE_SERVICE_AREA?.service_area_name;
      newObject['type'] = 'project_service_areas';
      const found = filterRequest.find((element: any) => element.id === newObject['id'] && element.name === newObject['name'] && element.type === newObject['type']);
      newObject['selected'] = found ? found.selected: false;
      return newObject;
    });
    const counties = dataFiltered.map((attribs: any) => {
      const newObject: any = {};
      newObject['id'] = attribs.completeData?.project_counties[0]?.CODE_STATE_COUNTY?.state_county_id;
      newObject['name'] = attribs.completeData?.project_counties[0]?.CODE_STATE_COUNTY?.county_name;
      newObject['type'] = 'project_counties';
      const found = filterRequest.find((element: any) => element.id === newObject['id'] && element.name === newObject['name'] && element.type === newObject['type']);
      newObject['selected'] = found ? found.selected: false;
      return newObject;
    });
    const mhfdLeads = dataFiltered.map((attribs: any) => {
      const newObject: any = {};
      // find inside project_staffs, the business_associate_contact with code_project_staff_role_type_id = 1
      const mhfdLeadStaff = attribs?.completeData?.project_staffs.find((staff: any) => staff.code_project_staff_role_type_id === 1);
      newObject['id'] = mhfdLeadStaff ? mhfdLeadStaff.business_associate_contact.business_associate_contact_id : undefined;
      newObject['name'] =  attribs.lead;
      newObject['type'] = 'mhfd_lead';
      const found = filterRequest.find((element: any) => element.id === newObject['id'] && element.name === newObject['name'] && element.type === newObject['type']);
      newObject['selected'] = found ? found.selected: false;
      return newObject;
    });
    const uniqueLocalGovernments = localgovernments.filter((v:any, i:any, a:any) => a.findIndex((t:any) => (t.id === v.id)) === i);
    const uniqueServiceAreas = serviceAreas.filter((v:any, i:any, a:any) => a.findIndex((t:any) => (t.id === v.id)) === i);
    const uniqueCounties = counties.filter((v:any, i:any, a:any) => a.findIndex((t:any) => (t.id === v.id)) === i);
    const uniqueMhfdLeads = mhfdLeads.filter((v:any, i:any, a:any) => a.findIndex((t:any) => (t.id === v.id)) === i);

    const uniqueLocalGovernmentsFiltered = uniqueLocalGovernments.filter((v:any, i:any, a:any) => (v.id !== undefined && v.name !== undefined));
    const uniqueServiceAreasFiltered = uniqueServiceAreas.filter((v:any, i:any, a:any) => (v.id !== undefined && v.name !== undefined));
    const uniqueCountiesFiltered = uniqueCounties.filter((v:any, i:any, a:any) => (v.id !== undefined && v.name !== undefined));
    const uniqueMhfdLeadsFiltered = uniqueMhfdLeads.filter((v:any, i:any, a:any) => (v.id !== undefined && v.name !== undefined));

    setFilterRequest([...uniqueLocalGovernmentsFiltered, ...uniqueServiceAreasFiltered, ...uniqueCountiesFiltered, ...uniqueMhfdLeadsFiltered]);
    setCsvData(dataCSV);
  }
  useEffect(() => {
    if (searchValue === '') {
      setFilteredDataSource(dataSource);
    } else {
      const filtered = dataSource.filter((data: any) => {
        const onBase = data.onbase ? data.onbase.toString(): '';
        const projectid = data.projectid ? data.projectid.toString(): '';
        const project = data.project ? data.project.toString(): '';
        const lead = data.lead ? data.lead.toString(): '';

        return onBase.toLowerCase().includes(searchValue.toLowerCase()) ||
          projectid.toLowerCase().includes(searchValue.toLowerCase()) ||
          project.toLowerCase().includes(searchValue.toLowerCase()) ||
          lead.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredDataSource(filtered);
      setDataForCSV(filtered);
    }
  } ,[searchValue]);
  const {
    filterProjectOptions,
  } = useMapState();
  useEffect(() => {
    setLoading(true);
    let code_project_type_id = 0;
    switch (tipe) {
      case 'Capital':
        code_project_type_id = 5;
        break;
      case 'DIP':
        code_project_type_id = 6;
        break;
      case 'Restoration':
        code_project_type_id = 7;
        break;
      case 'Study':
        code_project_type_id = 1;
        break;
      case 'Acquisition':
        code_project_type_id = 13;
        break;
      case 'R&D':
        code_project_type_id = 15;
        break;
      default:
        code_project_type_id = 0;
        break;
    }
    const controller = new AbortController();
    datasets.postData(
      SERVER.GET_LIST_PMTOOLS(code_project_type_id),
      filterProjectOptions,
      null,
      controller.signal
    ).then(data => {

      const parsedData = data.map((d: any, index: any) => {
        const mhfdLead = d.project_staffs.find((staff: any) => staff.code_project_staff_role_type_id === 1);
        const estimatedCost = d.project_costs.find((cost: any) => cost.code_cost_type_id === 1);
        let consultant = d?.consultant_phase  ? d.consultant_phase?.actual_start_date ? moment.utc(d.consultant_phase?.actual_start_date).format('MM-DD-YYYY') : '-' : '-';
        if ( tipe === 'Study') {
          consultant = d?.fundingConsultantSelectionPhase  ? d.fundingConsultantSelectionPhase?.actual_start_date ? moment.utc(d.fundingConsultantSelectionPhase?.actual_start_date).format('MM-DD-YYYY') : '-' : '-';
        }
        const contractor = d?.contractor_phase  ? d.contractor_phase?.actual_start_date ? moment.utc(d.contractor_phase?.actual_start_date).format('MM-DD-YYYY')  :'-'  : '-';
        const constructor = d?.construction_phase ? d.construction_phase?.actual_start_date ? moment.utc(d.construction_phase?.actual_start_date).format('MM-DD-YYYY') :'-' : '-';
        const localgovernment = d?.project_local_governments[0]?.CODE_LOCAL_GOVERNMENT?.local_government_name;
        const consultantSelectedValue = (d.civilContractor.length > 0 || d.currentPrimeConsultant.length > 0) ? 'Yes': 'No' ;
        if (consultantSelectedValue === 'Yes') {
          consultant = '-';
        }
        const primeConsultant = d?.project_partners.reduce((accumulator: string, pl: any) => {
          const PRIME_CONSULTANT = 13;
          const sa = pl?.business_associate?.business_name || '';
          const sa1 = pl?.code_partner_type_id || '';
          let value = accumulator;
          if (sa && sa1 === PRIME_CONSULTANT) {
            if (value) {
              value += ',';
            }
            value += sa;
          }
          return value;
        }, '');
        setLoading(false);
        return {
          key: d.project_id,
          onbase: d.onbase_project_number,
          projectid: d.project_id,
          project: d.project_name,
          lead: mhfdLead ? mhfdLead.business_associate_contact.contact_name : '-',
          description: d.description,
          cost: estimatedCost ? estimatedCost.cost : '-',
          consultant,
          consultantSelected: primeConsultant || '-',
          contractor,
          constructor,
          localgovernment: localgovernment ? localgovernment : '-',
          completeData: d
        }
      });
      // sort parsedData by consultant 
      parsedData.sort((b:any, a:any) => {
        return moment(a.consultant !== '-' ? a.consultant : '01-01-1900').diff(moment(b.consultant !== '-' ?  b.consultant : '01-01-1900'));
      });
      setDataSource(parsedData);
      setFilteredDataSource(parsedData);
      setDataForCSV(parsedData);
    }).catch(handleAbortError);
    return () => {
      controller.abort();
      setDataSource([]);
    };
  }, [tipe, filterProjectOptions]);
  function onTableChange(pagination: any, filter: any, sorter: any, anyvalue: any){
    if(anyvalue.currentDataSource) {
      setDataForCSV(anyvalue.currentDataSource);
    }
  };
  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'project',
      key: 'project',
      width:'17%',
      sorter: (a:any, b:any) => {
        if (a.project < b.project)
          return -1;
        if ( a.project > b.project)
          return 1;
        return 0;
      },
      displayCSV: 'Project Name'
    },
    {
      title: 'MHFD Lead',
      dataIndex: 'lead',
      key: 'lead',
      sorter: (a:any, b:any) => {
        if (a.lead < b.lead)
          return -1;
        if ( a.lead > b.lead)
          return 1;
        return 0;
      },
      displayCSV: 'MHFD Lead'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      render: (text:any, record:any) => <Tooltip placement="top" title={tooltipContent(record.project, text)} overlayClassName="upcoming-tooltip-table"><p>{text}</p></Tooltip>,
      sorter: (a:any, b:any) => {
        if (a.description < b.description)
          return -1;
        if ( a.description > b.description)
          return 1;
        return 0;
      },
      displayCSV: 'Description'
    },
    {
      title: <p style={{textAlign:'center'}}>Project<br/>Estimated<br/>Cost</p>,
      render: (text: any, record: any) => <p> { text !== '-' ? formatter.format(text): text}</p> ,
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a:any, b:any) => a.cost - b.cost,
      displayCSV: 'Project Estimated Cost'
    },
    {
      title: <p style={{textAlign:'center'}}>Local<br/>Government</p>,
      dataIndex: 'localgovernment',
      key: 'localgovernment',
      sorter: (a:any, b:any) => {
        if (a.localgovernment < b.localgovernment)
          return -1;
        if ( a.localgovernment > b.localgovernment)
          return 1;
        return 0;
      },
      displayCSV: 'Local Government'
    },
    {
      title: <p style={{textAlign:'center'}}>Prime<br/>Consultant</p>,
      dataIndex: 'consultantSelected',
      key: 'consultantSelected',
      sorter: (a:any, b:any) => {
        if (a.consultantSelected < b.consultantSelected)
          return -1;
        if ( a.consultantSelected > b.consultantSelected)
          return 1;
        return 0;
      },
      displayCSV: 'Consultant Selected'
    },
    {
      title: <p style={{textAlign:'center'}}>Consultant<br/>Selection<br/>Date&nbsp;
      <Popover
        overlayClassName="project-popover"
        placement="top"
        content={<div className="popver-info popver-project"><b>Prime Consultant Selection Date: </b>Selection and Start Dates are estimates and subject to change at any time without notice.</div>}
        >
          <InfoCircleOutlined style={{opacity:'0.3'}} className="information-ico"/>
        </Popover></p>,
      dataIndex: 'consultant',
      key: 'consultant',
      sorter: (a:any, b:any) => {
        return moment(a.consultant !== '-' ? a.consultant : '01-01-1900').diff(moment(b.consultant !== '-' ?  b.consultant : '01-01-1900'));
      },
      displayCSV: 'Consultant Selection Date'
    },

    {
      title: <p style={{textAlign:'center'}}>Contractor<br/>Selection<br/>Date&nbsp;
      <Popover
        overlayClassName="project-popover"
        placement="top"
        content={<div className="popver-info popver-project"><b>Contractor Selection Date: </b>Selection and Start Dates are estimates and subject to change at any time without notice.</div>}
      >
        <InfoCircleOutlined style={{opacity:'0.3'}} className="information-ico"/>
      </Popover></p>,
      dataIndex: 'contractor',
      key: 'contractor',
      sorter: (a:any, b:any) => {
        return moment(a.contractor !== '-' ? a.contractor : '01-01-1900').diff(moment(b.contractor !== '-' ?  b.contractor : '01-01-1900'));
      },
      displayCSV: 'Contractor Selection Date'
    },
    {
      title: <p style={{textAlign:'center'}}>Anticipated<br/>Construction<br/>Start Date</p>,
      dataIndex: 'constructor',
      key: 'constructor',
      sorter: (a:any, b:any) => {
        return moment(a.constructor !== '-' ? a.constructor : '01-01-1900').diff(moment(b.constructor !== '-' ?  b.constructor : '01-01-1900'));
      },
      displayCSV: 'Anticipated Construction Start Date'
    },
  ];
  const columnsNew = [
    {
      title: 'Project Name',
      dataIndex: 'project',
      key: 'project',
      width:'25%',
      sorter: (a:any, b:any) => {
        if (a.project < b.project)
          return -1;
        if ( a.project > b.project)
          return 1;
        return 0;
      },
      displayCSV: 'Project Name'
    },
    {
      title: 'MHFD Lead',
      dataIndex: 'lead',
      key: 'lead',
      sorter: (a:any, b:any) => {
        if (a.lead < b.lead)
          return -1;
        if ( a.lead > b.lead)
          return 1;
        return 0;
      },
      displayCSV: 'MHFD Lead'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '25%',
      render: (text:any, record:any) => <Tooltip placement="top" title={tooltipContent(record.project, text)} overlayClassName="upcoming-tooltip-table"><p>{text}</p></Tooltip>,
      sorter: (a:any, b:any) => {
        if (a.description < b.description)
          return -1;
        if ( a.description > b.description)
          return 1;
        return 0;
      },
      displayCSV: 'Description'
    },
    {
      title: <p style={{textAlign:'center'}}>Project<br/>Estimated<br/>Cost</p>,
      dataIndex: 'cost',
      key: 'cost',
      render: (text: any, record: any) => <p> { text !== '-' ? formatter.format(text): text}</p> ,
      sorter: (a:any, b:any) => a.cost - b.cost,
      displayCSV: 'Project Estimated Cost'
    },
    {
      title: <p style={{textAlign:'center'}}>Local<br/>Government</p>,
      dataIndex: 'localgovernment',
      key: 'localgovernment',
      sorter: (a:any, b:any) => {
        if (a.localgovernment < b.localgovernment)
          return -1;
        if ( a.localgovernment > b.localgovernment)
          return 1;
        return 0;
      },
      displayCSV: 'Local Government'
    },
    {
      title: <p style={{textAlign:'center'}}>Consultant<br/>Selection<br/>Date&nbsp;<Tooltip placement="top" title={<>Selection and Start Dates are estimates and subject to change at any time without notice.</>}>
      <InfoCircleOutlined style={{opacity:'0.3'}} className="information-ico"/>
    </Tooltip></p>,
      dataIndex: 'consultant',
      key: 'consultant',
      sorter: (a:any, b:any) => {
        return moment(a.consultant !== '-' ? a.consultant : '01-01-1900').diff(moment(b.consultant !== '-' ?  b.consultant : '01-01-1900'));
      },
      displayCSV: 'Consultant Selection Date'
    },
  ];
  const getDataForProject = (project_id: any) => {
    datasets.getData(SERVER.GET_PROJECT_DATA(project_id)).then(projectData => {
      if(projectData[0]) {
        setDetailProject(projectData[0]);
        setVisible(true);
      }
    })
  }
  useEffect(() => {
    if (tipe === 'Study' || tipe === 'R&D' || tipe === 'Acquisition') {
      actualColumns.current = columnsNew;
    } else {
      actualColumns.current = columns;
    }
  } ,[tipe]);
  return (
    <>
      {
        visible &&
        <DetailModal
          visible={visible}
          setVisible={setVisible}
          data={detailProject}
          type={'Projects'}
          deleteCallback={null}
          addFavorite={null}
        />
      }
       <Table
        scroll={{ y: 240 }}
        className='upcoming-table'
        dataSource={filteredDataSource}
        columns={actualColumns.current}
        pagination={false}
        showSorterTooltip={false}
        onChange={(pagination, filters, sorter, currentTable) => onTableChange(pagination, filters, sorter, currentTable)}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              if(record.projectid) {
                getDataForProject(record.projectid);
              }
            }, // click row
          };
        }}
      />
    </>
   
  );
}

export default TableUpcomingProjects;