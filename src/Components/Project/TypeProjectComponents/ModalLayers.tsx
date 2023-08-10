import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Modal } from "antd"
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import React from "react"

const ModalLayers = ({
  visible,
  setVisible,
  }:{
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  }
) =>{
  const plainOptions  = [
    { label: <>Projects <InfoCircleOutlined style={{opacity:0.35}}/></>, value: 'Projects' },
    { label: <>Problems <InfoCircleOutlined style={{opacity:0.35}}/></>, value: 'Problems' },
    { label: <>Action Items <InfoCircleOutlined style={{opacity:0.35}}/></>, value: 'Action Items' },
    { label: <>Layer 4 <InfoCircleOutlined style={{opacity:0.35}}/></>, value: 'Layer 4' },
    { label: <>Layer 5 <InfoCircleOutlined style={{opacity:0.35}}/></>, value: 'Layer 5' },
  ];
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };
  return (
    <Modal
        visible={visible}
        // onOk={()=>{setVisible(false)}}
        // onCancel={()=>{setVisible(false)}}
        className="map-modal-layers"
      > 
      <p>
      Select some or all layers recommended when creating a Capital Project.
      </p>
      <Checkbox.Group
        options={plainOptions}
        defaultValue={['Apple']}
        onChange={onChange}
      />
      <div className="btn-footer-modal-layers">
        <Button className="btn-transparent" onClick={() =>{setVisible(false)}}>Close</Button>
        <Button className="btn-purple" onClick={() =>{setVisible(false)}}>Apply Layers</Button>
      </div>

    </Modal>
  )
}

export default ModalLayers;