import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Dropdown, Menu, Row, Space, Table } from "antd";
import { DeleteOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import AddAmountModal from "Components/Shared/Modals/AddAmountModal";
import { useFinancialDispatch, useFinancialState } from "hook/financialHook";
// import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
const Financials = ({ projectId }: { projectId: any }) => {
  const { financialInformation } = useFinancialState();
  const { getFinancialData } = useFinancialDispatch();

  const [openModalAmount, setOpenModalAmount] = useState(false);
  const [finalData, setFinalData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [dropdownPhase, setDropdownPhase] = useState<any>([]);
  const [dropdownPartner, setDropdownPartner] = useState<any>([]);
  const [viewDropdown, setViewDropdow] = useState(
    {
      income: true,
      expense: true
    }
  );
  const [openDrop, setOpenDrop] = useState(false);
  const [openDropPhatner, setOpenPhatner] = useState(false);
  const [openDropPhase, setOpenDropPhase] = useState(false);
  const [filters, setFilters] = useState<any>([]);
  const [phase, setPhase] = useState<any>();
  const [partner, setPartner] = useState<any>();

  useEffect(() => {
    getFinancialData(projectId, []);
  }, [])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  useEffect(() => {

    financialInformation.sort(
      (e1: any, e2: any) => (e1.sortValue > e2.sortValue) ? 1 : (e1.sortValue < e2.sortValue) ? -1 : 0);

    const mappingDataForDataSource = financialInformation.map((element: any, index: number) => {

      const key = `${index}`;
      const agreement = [element?.agreement_number, ''];
      const amendment = element?.amendment_number.includes('ORIGINAL') || element?.amendment_number === null ? '' : element?.amendment_number;
      const partner = element?.project_partner_name || '';
      const partnerId = element?.project_partner_id || '';
      const phase = element?.code_phase_type_name || '';
      const phaseId = element?.code_phase_type_id || '';

      const projected = [element?.projected ? formatter.format(element?.cost) : '$0', 'purple'];
      const encumbered = [element?.encumbered ? formatter.format(element?.cost) : '$0', 'purple'];
      const tyler = [element?.tyler_encumbered ? formatter.format(element?.cost) : '$0', 'purple'];
      const available = ['$0', 'purple'];
      return { key, agreement, amendment, partner, phase, projected, encumbered, tyler, available, partnerId, phaseId }

    });
    setFinalData(mappingDataForDataSource);
    if (filters.length === 0) {
      setInitialData(mappingDataForDataSource);
      const dropdownPhase = mappingDataForDataSource.map((element: any) => {
        if (element.phase) {
          const key = element?.phaseId;
          const label = <span >{element?.phase}</span>;
          return { key, label }
        }
      });
      const dropdownPartner = mappingDataForDataSource.map((element: any) => {
        if (element.partner) {
          const key = element?.partnerId;
          const label = <span >{element?.partner}</span>;
          return { key, label }
        }
      });
      let uniquedropdownPhase = dropdownPhase.filter((value: any, index: any, self: any) =>
        index === self.findIndex((t: any) => (
          t?.key === value?.key
        ))
      )
      let uniquedropdownPartner = dropdownPartner.filter((value: any, index: any, self: any) =>
        index === self.findIndex((t: any) => (
          t?.key === value?.key
        ))
      )
      setDropdownPartner(uniquedropdownPartner);
      setDropdownPhase(uniquedropdownPhase);
    }
  }, [financialInformation])

  useEffect(() => {
    getFinancialData(projectId, filters)
  }, [filters[0], filters[1], filters[2]])

  const columns = [
    {
      title: 'Agreement',
      dataIndex: 'agreement',
      key: 'agreement',
      render: (agreement: any, index: any) => (
        <p className={"table-" + agreement[1]}>{agreement[0]}</p>
      ),
    },
    {
      title: 'Amendment',
      dataIndex: 'amendment',
      key: 'amendment',
    },
    {
      title: 'Partner',
      dataIndex: 'partner',
      key: 'partner',
    },
    {
      title: 'Phase',
      dataIndex: 'phase',
      key: 'phase',
      render: (phase: any) => (
        <span className={phase !== '' ? 'span-Phase' : 'span'}>
          {phase}
        </span>
      ),
    },
    {
      title: 'Projected',
      dataIndex: 'projected',
      key: 'projected',
      render: (projected: string[]) => (
        <p className={"table-" + projected[1]}>{projected[0]}</p>
      ),
    },
    {
      title: 'Encumbered',
      dataIndex: 'encumbered',
      key: 'encumbered',
      render: (encumbered: string[]) => (
        <p className={"table-" + encumbered[1]}>{encumbered[0]}</p>
      ),
    },
    {
      title: 'Tyler Encumbered',
      dataIndex: 'tyler',
      key: 'tyler',
      render: (tyler: string[]) => (
        <p className={"table-" + tyler[1]}>{tyler[0]}</p>
      ),
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
      render: (available: string[]) => (
        <p className={"table-" + available[1]}>{available[0]}</p>
      ),
    },
  ];
  const reset = () => {
    getFinancialData(projectId, [])
    setFilters([])
    setPhase('')
    setPartner('')
    setViewDropdow({
      income: true,
      expense: true
    });
  }
  const menu = (
    <Menu
      className="menu-density"
      // onClick={(e) => (setNormalTimeline(e.key === 'Normal' ? true: false))}
      items={[
        {
          label:
            <Checkbox
              onChange={() => {
                if (viewDropdown.income && !viewDropdown.expense) {
                  setViewDropdow({ expense: true, income: false })
                  filters[2] = { expense: true, income: false }

                } else {
                  setViewDropdow({ ...viewDropdown, income: !viewDropdown.income })
                  filters[2] = { ...viewDropdown, income: !viewDropdown.income }
                }
              }
              }
              checked={viewDropdown.income}>Income</Checkbox>,
          key: 'Compact',
        },
        {
          label:
            <Checkbox
              onChange={() => {
                if (!viewDropdown.income && viewDropdown.expense) {
                  setViewDropdow({ expense: false, income: true })
                  filters[2] = { expense: false, income: true }
                } else {
                  setViewDropdow({ ...viewDropdown, expense: !viewDropdown.expense })
                  filters[2] = { ...viewDropdown, expense: !viewDropdown.expense }
                }
              }
              }
              checked={viewDropdown.expense}>Expense</Checkbox>,
          key: 'Normal',
        },
      ]}
    />
  );

  const findFilterName = (value: any, type: string) => {
    const name = initialData.find((element: any) => {
      if (type === 'phase') {
        if (parseInt(value) === element?.phaseId) {
          return element?.phase
        }
      } else {
        if (parseInt(value) === element?.partnerId) {
          return element?.partner
        }
      }
    });
    return name
  }

  const menu2 = (
    <Menu
      className="menu-density"
      onClick={(e) => (
        filters[0] = e.key,
        setPartner(findFilterName(e.key, 'partner'))
      )}
      items={dropdownPartner}
    />
  );
  const menu3 = (
    <Menu
      className="menu-density"
      onClick={(e) => (
        filters[1] = e.key,
        setPhase(findFilterName(e.key, 'phase'))
      )}
      items={dropdownPhase}
    />
  );

  return (
    <>
      <AddAmountModal visible={openModalAmount} setVisible={setOpenModalAmount} />

      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ display: 'flex', alignItems: 'center' }} className='subtitle-detail'>
          <h3 style={{ paddingBottom: '15px', paddingTop: '20px', marginRight: '35px' }} id="project-financials">PROJECT FINANCIALS</h3>
          <div className="line-01" style={{ marginBottom: '15px', marginTop: '20px', width: '73%' }}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Dropdown overlayClassName="dropdown-view-menu" overlay={menu} placement="bottomLeft" trigger={['click']} onVisibleChange={() => { setOpenDrop(!openDrop) }} getPopupContainer={(trigger: any) => trigger.parentNode}>
            <Space className='dropdown-view' style={viewDropdown.expense && viewDropdown.income ? { borderLeft: '4px solid #9faeb1' } : {}}>
              <div>View: {viewDropdown.expense && viewDropdown.income ? 'All' : (viewDropdown.expense ? 'Expense' : 'Income')}</div>
              {!openDrop ? <UpOutlined style={{ color: '#251863' }} /> : < DownOutlined style={{ color: '#251863' }} />}
            </Space>
          </Dropdown>
          <Dropdown overlayClassName="dropdown-view-menu" overlay={menu2} placement="bottomLeft" trigger={['click']} onVisibleChange={() => { setOpenPhatner(!openDropPhatner) }} getPopupContainer={(trigger: any) => trigger.parentNode}>
            <Space className='dropdown-view'>
              <div>{partner?.partner ? partner.partner : 'Partner'}</div>
              {!openDropPhatner ? <UpOutlined style={{ color: '#251863' }} /> : < DownOutlined style={{ color: '#251863' }} />}
            </Space>
          </Dropdown>
          <Dropdown overlayClassName="dropdown-view-menu" overlay={menu3} placement="bottomLeft" trigger={['click']} onVisibleChange={() => { setOpenDropPhase(!openDropPhase) }} getPopupContainer={(trigger: any) => trigger.parentNode}>
            <Space className='dropdown-view' >
              <div>{phase?.phase ? phase.phase : 'Phase'}</div>
              {!openDropPhase ? <UpOutlined style={{ color: '#251863' }} /> : < DownOutlined style={{ color: '#251863' }} />}
            </Space>
          </Dropdown>
          <Button className="btn-clear" onClick={reset}><DeleteOutlined /></Button>
        </Col>

      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-financials-modal" style={{ paddingRight: '8px' }}>
          <div style={{ width: '100%', overflowX: 'hidden' }}>
            <Table dataSource={finalData} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 350 }} />
            <div style={{ display: 'flex', paddingTop: '5px', borderTop: '1px solid #d7d3e2', marginTop: '5px' }}>
              <p style={{ color: '#28c499', fontWeight: '400', width: '50%' }}>Subtotal Income</p>
              <p style={{ color: '#28c499', fontWeight: '400', width: '12.5%' }}>$600,320</p>
              <p style={{ color: '#28c499', fontWeight: '400', width: '12.5%' }}>$600,320</p>
              <p style={{ color: '#28c499', fontWeight: '400', width: '12.5%' }}>$400,320</p>
              <p style={{ color: '#28c499', fontWeight: '400' }}>$400,320</p>
            </div>
            <div style={{ display: 'flex', paddingTop: '5px' }}>
              <p style={{ color: 'rgb(255 55 55)', fontWeight: '400', width: '50%' }}>Subtotal Expense</p>
              <p style={{ color: 'rgb(255 55 55)', fontWeight: '400', width: '12.5%' }}>$200,000</p>
              <p style={{ color: 'rgb(255 55 55)', fontWeight: '400', width: '12.5%' }}>$200,000</p>
              <p style={{ color: 'rgb(255 55 55)', fontWeight: '400', width: '12.5%' }}>$400,320</p>
              <p style={{ color: 'rgb(255 55 55)', fontWeight: '400' }}>$400,320</p>
            </div>
            <div style={{ display: 'flex', paddingTop: '5px', borderBottom: '1px solid #d7d3e2', paddingBottom: '5px' }} >
              <p style={{ color: '#11093c', fontWeight: 'bolder', width: '50%' }}>Total</p>
              <p style={{ color: '#11093c', fontWeight: 'bolder', width: '12.5%' }}>$400,320</p>
              <p style={{ color: '#11093c', fontWeight: 'bolder', width: '12.5%' }}>$400,320</p>
              <p style={{ color: '#11093c', fontWeight: 'bolder', width: '12.5%' }}>$400,320</p>
              <p style={{ color: '#11093c', fontWeight: 'bolder' }}>$400,320</p>
            </div>
          </div>

        </Col>
      </Row>
    </>
  )
}

export default Financials;