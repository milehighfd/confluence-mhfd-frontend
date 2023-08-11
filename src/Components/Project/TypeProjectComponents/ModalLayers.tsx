import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Modal } from "antd"
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
  LAYERS_LABELS
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
  const getLayersOptions = (type:any) => {
   let checkedLayers: any = [];
    switch (type.type) {
      case 'CAPITAL':
        checkedLayers = [
          { label: <> {LAYERS_LABELS.BORDER} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: BORDER },
          { label: <> {LAYERS_LABELS.AREA_BASED_MASK} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: AREA_BASED_MASK },
          { label: <> {LAYERS_LABELS.PROBLEMS_TRIGGER} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: PROBLEMS_TRIGGER },
          { label: <> {LAYERS_LABELS.FLOOD_HAZARDS} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: FLOOD_HAZARDS },
          { label: <> {LAYERS_LABELS.COMPONENT_LAYERS} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: COMPONENT_LAYERS },
          { label: <> {LAYERS_LABELS.STREAMS_FILTERS} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: STREAMS_FILTERS },
        ]
        break;
      case 'MAINTENANCE':
        checkedLayers = [
          { label: <> {LAYERS_LABELS.FLOOD_HAZARDS} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: FLOOD_HAZARDS },
          { label: <> {LAYERS_LABELS.MEP_PROJECTS} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: MEP_PROJECTS },
          { label: <> {LAYERS_LABELS.ROUTINE_MAINTENANCE} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: ROUTINE_MAINTENANCE },
          { label: <> {LAYERS_LABELS.STREAMS_FILTERS} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: STREAMS_FILTERS },
        ]
        break
      case 'STUDY':
        checkedLayers = [
          { label: <> {LAYERS_LABELS.BORDER} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: BORDER },
          { label: <> {LAYERS_LABELS.AREA_BASED_MASK} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: AREA_BASED_MASK },
          { label: <> {LAYERS_LABELS.PROBLEMS_TRIGGER} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: PROBLEMS_TRIGGER },
          { label: <> {LAYERS_LABELS.STREAMS_FILTERS} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: STREAMS_FILTERS },
          { label: <> {LAYERS_LABELS.FLOODPLAINS} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: FLOODPLAINS },
          { label: <> {LAYERS_LABELS.FEMA_FLOOD_HAZARD} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: FEMA_FLOOD_HAZARD },
        ]
        break
      case 'ACQUISITION':
        checkedLayers = [
          { label: <> {LAYERS_LABELS.BORDER} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: BORDER },
          { label: <> {LAYERS_LABELS.AREA_BASED_MASK} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: AREA_BASED_MASK },
          { label: <> {LAYERS_LABELS.STREAMS_FILTERS} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: STREAMS_FILTERS },
        ]
        break
      case 'SPECIAL':
        checkedLayers = [
          { label: <> {LAYERS_LABELS.BORDER} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: BORDER },
          { label: <> {LAYERS_LABELS.AREA_BASED_MASK} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: AREA_BASED_MASK },
          { label: <> {LAYERS_LABELS.STREAMS_FILTERS} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: STREAMS_FILTERS },
          { label: <> {LAYERS_LABELS.ALERT_STATION} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: ALERT_STATION },
          { label: <> {LAYERS_LABELS.RESEARCH_MONITORING} <InfoCircleOutlined style={{opacity:0.35}}/></>, value: RESEARCH_MONITORING },

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