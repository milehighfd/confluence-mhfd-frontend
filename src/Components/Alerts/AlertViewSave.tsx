import React, {useState, useEffect} from "react";
import { Alert,  Modal, Button, Card, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';


const stateValue = {
  visible: false
}
export const AlertViewSave = ({status}:
  {status : number} ) => {
  const [state, setState] = useState(stateValue);
  const [showSave, setShowSave] = useState(false);
  const [showNoSave, setShowNoSave] = useState(false);
  const showModal = () => {
    const auxState = {...state};
    auxState.visible = true;
    setState(auxState);
  };
  const endView = (e: any)=>{
    setShowSave(false);
    setShowNoSave(false);
  };
  useEffect(()=>{
    if(status === 1){
        setShowSave(true);
    }else{
        if(status === 0){
            setShowNoSave(true);
        }
        
    }
  },[]);
 return (
  <>
    {showSave && 
    <div>
        <div className="alert-mm">
        <Alert type="success" message="The project was saved successfully." banner closable onClose={endView} />
        </div>
    </div>}
    {showNoSave && 
    <div>
      <div className="alert-mm">
        <Alert type="error" message="The project cannot be saved." banner closable onClose={endView}   />
      </div>
    </div>}
  </>)

};
