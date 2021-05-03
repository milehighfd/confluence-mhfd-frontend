import React, { useEffect, useState } from "react";
import { Drawer, Button, Checkbox } from 'antd';

export default ({ visible, setVisible, jurisdictionFilterList, csaFilterList, setJS, setCS, l, selJS, selCS }: {
  visible: boolean,
  setVisible: Function,
  jurisdictionFilterList: string[],
  csaFilterList: string[],
  setJS: Function,
  setCS: Function,
  l: any,
  selJS: string[],
  selCS: string[]
}) => {
  const [jurisdictionSelected, setJurisdictionSelected] = useState<any[]>([]);
  const [csaSelected, setCsaSelected] = useState<any[]>([]);

  useEffect(() => {
    setJurisdictionSelected(jurisdictionFilterList.map(r => true));
    setCsaSelected(csaFilterList.map(r => true));
  }, [jurisdictionFilterList, csaFilterList])

  useEffect(() => {
    setJurisdictionSelected(
      jurisdictionFilterList.map((j) => {
        return selJS.includes(j)
      })
    );
    setCsaSelected(
      csaFilterList.map((j) => {
        return selCS.includes(j)
      })
    );
  }, [selJS, selCS])

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
  if (l === 'COUNTY') {
    label = 'COUNTY';
  } else if (l === 'SERVICE_AREA') {
    label = 'SERVICE AREA';
  }

  return (
    <Drawer
      title={
        <h5>
          <img src="/Icons/work/chat.svg" alt="" className="menu-wr" />
          FILTER
        </h5>
      }
      placement="right"
      closable={true}
      onClose={() => setVisible(false)}
      visible={visible}
      className="work-utilities"
      mask={false}
    >
      <div className="filter-plan">
        <div className="head-f-p">JURISDICTION</div>
        <div className="body-f-p">
          {
            jurisdictionFilterList.map((cn: string, index: number) => (
              <p key={`filter-jp${index}`}>
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
              <p key={`filter-cp${index}`}>
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
