import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, message, Popover, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';

const { Step } = Steps;

const PhaseView = ({openTable}:{openTable:boolean[]}) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return <div className="phaseview-body">
    <div className="phaseview-content">
      <div className="phaseview-title">
        <p>Draft</p>
        <p>Work Request (WR)</p>
        <p>Work Plan (WP)</p>
        <p>Startup</p>
        <p>Funding</p>
        <p>Consultant Procurement</p>
        <p>Conceptual Design</p>
        <p>Preliminary Design</p>
        <p>Final Design</p>
        <p>Construction Contracting</p>
        <p>Construction</p>
        <p>Documenta tion</p>
        <p>Establishment</p>
        <p>Closeout</p>
        <p>Closed</p>
      </div>
      <div className="container-timeline">
      <div className="header-timeline"></div>
      <div className="phaseview-timeline" style={!openTable[0] ? {paddingBottom:'6px'}:{}}>
        {openTable[0] && <><Steps>
          <Step status="finish" icon={<span className="border-active"><span className="active">3</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">9</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">8</span></span>}/>
          <Step status="process" icon={<span className="border-final"><span className="final">6</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">13</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
        </Steps>
        <Steps>
          <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">15</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">7</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
          <Step status="finish" icon={<span className="border-final"><span className="final">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">20</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">6</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
        </Steps>
        <Steps>
          <Step status="finish" icon={<span className="border-active"><span className="active">3</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">9</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">8</span></span>}/>
          <Step status="process" icon={<span className="border-final"><span className="final">6</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">13</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
        </Steps>
        <Steps>
          <Step status="finish" icon={<span className="border-active"><span className="active">3</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">9</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">8</span></span>}/>
          <Step status="process" icon={<span className="border-final"><span className="final">6</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">13</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
        </Steps>
        <Steps>
          <Step status="finish" icon={<span className="border-active"><span className="active">3</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">9</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">8</span></span>}/>
          <Step status="process" icon={<span className="border-final"><span className="final">6</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">13</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
        </Steps>
        <Steps>
          <Step status="finish" icon={<span className="border-active"><span className="active">3</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">9</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">8</span></span>}/>
          <Step status="process" icon={<span className="border-final"><span className="final">6</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">13</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
        </Steps>
        <Steps>
          <Step status="finish" icon={<span className="border-active"><span className="active">3</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">9</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
          <Step status="finish" icon={<span className="border-active"><span className="active">8</span></span>}/>
          <Step status="process" icon={<span className="border-final"><span className="final">6</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">13</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
          <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
        </Steps></>}
      </div>
      <div className="header-timeline"></div>
        <div className="phaseview-timeline"  style={!openTable[0] ? {paddingBottom:'6px'}:{}}>
          {openTable[1] && <><Steps>
            <Step status="finish" icon={<span className="border-active"><span className="active">3</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">9</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">8</span></span>}/>
            <Step status="process" icon={<span className="border-final"><span className="final">6</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">13</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          </Steps>
          <Steps>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">15</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">7</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-final"><span className="final">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">20</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">6</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
            </Steps></>}
        </div>
        <div className="header-timeline"></div>
        <div className="phaseview-timeline" style={!openTable[0] ? {paddingBottom:'6px'}:{}}>
          {openTable[2] && <><Steps>
            <Step status="finish" icon={<span className="border-active"><span className="active">3</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">9</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">8</span></span>}/>
            <Step status="process" icon={<span className="border-final"><span className="final">6</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">13</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          </Steps>
          <Steps>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">15</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">7</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-final"><span className="final">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">20</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">6</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
          </Steps>
          <Steps>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">15</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">4</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">7</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
            <Step status="finish" icon={<span className="border-final"><span className="final">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">20</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">8</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">6</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">11</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">2</span></span>}/>
            <Step status="wait" icon={<span className="border-wait"><span className="wait">7</span></span>}/>
            </Steps></>}
        </div>
      </div>
    </div>
  </div>
};

export default PhaseView;