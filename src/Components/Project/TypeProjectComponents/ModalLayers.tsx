import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Modal, Popover } from "antd"
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import React, { useEffect, useState } from "react";
import {
  STREAMS_FILTERS,
  PROBLEMS_TRIGGER,
  COMPONENT_LAYERS,
  MEP_PROJECTS,
  ROUTINE_MAINTENANCE,
  FLOODPLAINS,
  FEMA_FLOOD_HAZARD,
  RESEARCH_MONITORING,
  BORDER,
  AREA_BASED_MASK,
  FLOOD_HAZARDS,
  ALERT_STATION,
  LAYERS_LABELS,
  popUps,
} from '../../../constants/constants';
import { useMapState } from "hook/mapHook";
import { useProjectDispatch, useProjectState } from "hook/projectHook";

const ModalLayers = ({
  type,
  selectCheckboxes,
  visible,
  setVisible,
  }:{
    type: any,
    selectCheckboxes: any,
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  }
) =>{
  const {
    selectedLayers
  } = useMapState();
  const {
    selectedLayersCP
  } = useProjectState();
  const {
    updateSelectedLayersCP,
  } = useProjectDispatch();
  const [ projectTypeLayers, setProjectTypeLayers ] =useState<any>([]);
  const [ finalCheckedLayers, setFinalCheckedLayers ] =useState<any>([]);
  
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
    setFinalCheckedLayers(checkedValues)
  };

  const convertToTitleCase =(inputString: string) => {
    const words = inputString.toLowerCase().split(' ');
    const titleCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const titleCaseString = titleCaseWords.join(' ');
    return titleCaseString;
  }

  const updateLayers = () => {
    const layers = [...new Set([...selectedLayersCP, ...finalCheckedLayers])as any];

    const uncheckedResult = projectTypeLayers
    .filter((layer:any) => !finalCheckedLayers.includes(layer.value))
    .map((layer:any) => layer.value);

    const layersResult = layers.filter(item => !uncheckedResult.includes(item));
    selectCheckboxes(layersResult);
  }
  const contentPopOver = (text: string, title?:string) => {
    return <div className="popoveer-00"><i><span style={{fontWeight: '600'}}>{title? title:''}</span>{text}</i></div>
  }
  const getLayersOptions = (type:any) => {
   let checkedLayers: any = [];
    switch (type.type) {
      case 'CAPITAL':
        checkedLayers = [
          { label: <> {LAYERS_LABELS.BORDER} <Popover key="LSWV3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.borders)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: BORDER },
          { label: <> {LAYERS_LABELS.AREA_BASED_MASK} <Popover key="sdasdasd" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.area_based_mask)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: AREA_BASED_MASK },
          { label: <> {LAYERS_LABELS.PROBLEMS_TRIGGER} <Popover key="LSWV3bqwqvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.problem_group)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: PROBLEMS_TRIGGER },
          { label: <> {LAYERS_LABELS.FLOOD_HAZARDS} <Popover key="LSWV3bvqweqYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.problem)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: FLOOD_HAZARDS },
          { label: <> {LAYERS_LABELS.COMPONENT_LAYERS} <Popover key="LSWVzx3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.component)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: COMPONENT_LAYERS },
          { label: <> {LAYERS_LABELS.STREAMS_FILTERS} <Popover key="LSWVxc3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.streams)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: STREAMS_FILTERS },
        ]
        break;
      case 'MAINTENANCE':
        checkedLayers = [
          { label: <> {LAYERS_LABELS.FLOOD_HAZARDS} <Popover key="LSWVty3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.problem)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: FLOOD_HAZARDS },
          { label: <> {LAYERS_LABELS.MEP_PROJECTS} <Popover key="LSWV3bvYghghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.mep_projects)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: MEP_PROJECTS },
          { label: <> {LAYERS_LABELS.ROUTINE_MAINTENANCE} <Popover key="LSghWV3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.routine_maintenance)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: ROUTINE_MAINTENANCE },
          { label: <> {LAYERS_LABELS.STREAMS_FILTERS} <Popover key="LSWV3bvYtyghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.streams)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: STREAMS_FILTERS },
        ]
        break
      case 'STUDY':
        checkedLayers = [
          { label: <> {LAYERS_LABELS.BORDER} <Popover key="LSWV3bvYgzxhho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.borders)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: BORDER },
          { label: <> {LAYERS_LABELS.AREA_BASED_MASK} <Popover key="LSqWV3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.area_based_mask)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: AREA_BASED_MASK },
          { label: <> {LAYERS_LABELS.PROBLEMS_TRIGGER} <Popover key="LSwWV3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.borders)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: PROBLEMS_TRIGGER },
          { label: <> {LAYERS_LABELS.STREAMS_FILTERS} <Popover key="LSWVi3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.streams)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: STREAMS_FILTERS },
          { label: <> {LAYERS_LABELS.FLOODPLAINS} <Popover key="LSWV3bvYgkhho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.floodplains)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: FLOODPLAINS },
          { label: <> {LAYERS_LABELS.FEMA_FLOOD_HAZARD} <Popover key="LSWVl3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.fema_flood_hazard_zones)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: FEMA_FLOOD_HAZARD },
        ]
        break
      case 'ACQUISITION':
        checkedLayers = [
          { label: <> {LAYERS_LABELS.BORDER} <Popover key="LSWV3bvYghhom" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.borders)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: BORDER },
          { label: <> {LAYERS_LABELS.AREA_BASED_MASK} <Popover key="LSWVk3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.area_based_mask)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: AREA_BASED_MASK },
          { label: <> {LAYERS_LABELS.STREAMS_FILTERS} <Popover key="LSWV3pbvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.streams)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: STREAMS_FILTERS },
        ]
        break
      case 'SPECIAL':
        checkedLayers = [
          { label: <> {LAYERS_LABELS.BORDER} <Popover key="LSWV3bvYghhpo" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.borders)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: BORDER },
          { label: <> {LAYERS_LABELS.AREA_BASED_MASK} <Popover key="LSWpV3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.area_based_mask)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: AREA_BASED_MASK },
          { label: <> {LAYERS_LABELS.STREAMS_FILTERS} <Popover key="LSWVp3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.streams)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: STREAMS_FILTERS },
          { label: <> {LAYERS_LABELS.ALERT_STATION} <Popover key="LSWV3bvpYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.alert_station)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: ALERT_STATION },
          { label: <> {LAYERS_LABELS.RESEARCH_MONITORING} <Popover key="LSpWV3bvYghho" arrowPointAtCenter overlayClassName="popover-filter-map" content={contentPopOver(popUps.research_monitoring)}><InfoCircleOutlined style={{opacity:0.35}} /></Popover></>, value: RESEARCH_MONITORING },

        ]
        break
    }
    setProjectTypeLayers(checkedLayers)
  }

  useEffect(() => {
    getLayersOptions(type)
  }, [type]);

  return (
    <Modal
        visible={visible}
        // onOk={()=>{setVisible(false)}}
        // onCancel={()=>{setVisible(false)}}
        className="map-modal-layers"
      > 
      <p>
      Select some or all layers recommended when creating {type.type === 'ACQUISITION' ? 'an':'a'} {type.type === 'SPECIAL' ? 'R&D' : convertToTitleCase(type.type)} Project.
      </p>
      <Checkbox.Group
        key={`checkbox-group-${type.type}`}
        options={projectTypeLayers}
        defaultValue={selectedLayersCP}
        onChange={onChange}
      />
      <div className="btn-footer-modal-layers">
        <Button className="btn-transparent" onClick={() =>{setVisible(false)}}>Close</Button>
        <Button className="btn-purple" onClick={() =>{setVisible(false); updateLayers()}}>Apply Layers</Button>
      </div>

    </Modal>
  )
}

export default ModalLayers;