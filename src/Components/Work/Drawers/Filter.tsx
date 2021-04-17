import React, { useEffect, useState } from "react";
import { Drawer, Button, Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default ({ visible, setVisible, data, jurisdictionFilterList, csaFilterList, setJS, setCS, l }: {
  visible: boolean,
  setVisible: Function,
  data: any[],
  jurisdictionFilterList: string[],
  csaFilterList: string[],
  setJS: Function,
  setCS: Function,
  l: any
}) => {
  const [jurisdictionSelected, setJurisdictionSelected] = useState<any[]>([]);
  const [csaSelected, setCsaSelected] = useState<any[]>([]);

  useEffect(() => {
    setJurisdictionSelected(jurisdictionFilterList.map(r => true));
    setCsaSelected(csaFilterList.map(r => true));
  }, [jurisdictionFilterList, csaFilterList])

  const applyFilters = () => {
    let js = jurisdictionFilterList.filter((_, index) => {
      return jurisdictionSelected[index];
    });
    setJS(js)
    let cs = csaFilterList.filter((_, index) => {
      return csaSelected[index];
    })
    setCS(cs)
  }

  let label;
  if (l.type === 'COUNTY') {
    label = 'COUNTY';
  } else if (l.type === 'SERVICE_AREA') {
    label = 'SERVICE AREA';
  }

  return (
    <Drawer
      title={<h5>
              <img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> FILTER
              <Button className="btn-transparent"><CloseOutlined /></Button>
             </h5>}
      placement="right"
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="work-utilities"
    >
      <div className="filter-plan">
        <div className="head-f-p">JURISDICTION</div>
        <div className="body-f-p">
          {
            jurisdictionFilterList.map((cn: string, index: number) => (
              <p>
                {cn}
                <span>
                <Checkbox checked={jurisdictionSelected[index]} onChange={e => {
                  let v = e.target.checked;
                  setJurisdictionSelected(jurisdictionSelected.map((w, i) => {
                    if (i === index) {
                      return v;
                    }
                    return w;
                  }))
                }} />
                </span>
              </p>
            ))
          }
        
        </div>
      </div>

      <div className="filter-plan">
        <div className="head-f-p">{label}</div>
        <div className="body-f-p">
          {
            csaFilterList.map((cn: string, index: number) => (
              <p>
                {cn}
                <span>
                <Checkbox checked={csaSelected[index]} onChange={e => {
                  let v = e.target.checked;
                  setCsaSelected(csaSelected.map((w, i) => {
                    if (i === index) {
                      return v;
                    }
                    return w;
                  }))
                }} />
                </span>
              </p>
            ))
          }
        </div>
      </div>
      <div className="footer-drawer">
        <Button className="btn-purple" onClick={applyFilters}>
          Apply
        </Button>
      </div>
    </Drawer>
  )
}
