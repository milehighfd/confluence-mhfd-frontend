import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Button, Checkbox } from 'antd';

const Filter = ({ visible, setVisible, jurisdictionFilterList, csaFilterList,
  setJS, setCS, setPS, l, selJS, selCS, selPS
}: {
  visible: boolean,
  setVisible: Function,
  jurisdictionFilterList: string[],
  csaFilterList: string[],
  setJS: Function,
  setCS: Function,
  setPS: Function,
  l: any,
  selJS: string[],
  selCS: string[],
  selPS: string[]
}) => {
  const priorityFilterList = useMemo(() => ['1', '2', '3', 'Over 3', 'Work Plan'], []);
  const [jurisdictionSelected, setJurisdictionSelected] = useState<any[]>([]);
  const [csaSelected, setCsaSelected] = useState<any[]>([]);
  const [prioritySelected, setPrioritySelected] = useState<any[]>([]);

  useEffect(() => {
    setJurisdictionSelected(jurisdictionFilterList.map(r => true));
    setCsaSelected(csaFilterList.map(r => true));
    setPrioritySelected(priorityFilterList.map(r => true));
  }, [jurisdictionFilterList, csaFilterList, priorityFilterList]);

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
    setPrioritySelected(
      priorityFilterList.map((j) => {
        return selPS.includes(j);
      })
    );
  }, [selJS, selCS, selPS])

  const applyFilters = () => {
    let js = jurisdictionFilterList.filter((_, index) => {
      return jurisdictionSelected[index];
    });
    setJS(js)
    let cs = csaFilterList.filter((_, index) => {
      return csaSelected[index];
    })
    setCS(cs)
    let ps = priorityFilterList.filter((_, index) => {
      return prioritySelected[index];
    });
    setPS(ps);
  }
  const reset = (value:boolean) => {
    setJurisdictionSelected(jurisdictionSelected.map( elem => value));
    setCsaSelected(csaSelected.map(elem => value));
    setPrioritySelected(prioritySelected.map(elem => value));
    setJS(jurisdictionFilterList);
    setCS(csaFilterList);
    setPS(priorityFilterList);
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
        <h5><img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> FILTER</h5>
      }
      placement="right"
      closable={true}
      onClose={() => setVisible(false)}
      visible={visible}
      className="work-utilities"
      mask={false}
    >

<div className="filter-plan">
        <div className="head-f-p">WORK REQUEST PRIORITY</div>
        <div className="body-f-p">
          {
            priorityFilterList.map((cn: string, index: number) => (
              <p key={`filter-ps${index}`}>
                {cn}
                <span>
                <Checkbox checked={prioritySelected[index]} onChange={e => {
                  let v = e.target.checked;
                  setPrioritySelected(prioritySelected.map((w, i) => {
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
     
      <div className="footer-drawer" style={{position: 'fixed', bottom: '50px', right: '19px', backgroundColor: 'white', 'width': '277px'}}>
        <div> 
          <h4 className="resetFilter" style={{ float: 'left', marginTop: '0.8rem'}} onClick={()=> reset(true)}>Reset | </h4>
          <h4 className="resetFilter" style={{ float: 'left', marginTop: '0.8rem', marginLeft: '3px'}} onClick={()=> reset(false)}>Clear all</h4>
        <Button className="btn-purple" onClick={applyFilters}>
          Apply
        </Button>
        </div>
      </div>
    </Drawer>
  )
};

export default Filter;
