import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Dropdown, Menu, Row, Space, Table } from 'antd';
import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import AddAmountModal from 'Components/Shared/Modals/AddAmountModal';
import { useFinancialDispatch, useFinancialState } from 'hook/financialHook';
// import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
const Financials = ({ projectId }: { projectId: any }) => {
  const { financialInformation } = useFinancialState();
  const { getFinancialData } = useFinancialDispatch();

  const [openModalAmount, setOpenModalAmount] = useState(false);
  const [finalData, setFinalData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [dropdownPhase, setDropdownPhase] = useState<any>([]);
  const [dropdownPartner, setDropdownPartner] = useState<any>([]);
  const [viewDropdown, setViewDropdow] = useState({
    income: true,
    expense: true,
  });
  const [openDrop, setOpenDrop] = useState(false);
  const [openDropPhatner, setOpenPhatner] = useState(false);
  const [openDropPhase, setOpenDropPhase] = useState(false);
  const [filters, setFilters] = useState<any>([]);
  const [phase, setPhase] = useState<any>();
  const [partner, setPartner] = useState<any>();
  const [income, setIncome] = useState([0, 0, 0, 0]);
  const [expense, setExpense] = useState([0, 0, 0, 0]);
  useEffect(() => {
    getFinancialData(projectId, []);
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    income[0] = 0
    income[1] = 0
    income[2] = 0
    income[3] = 0
    expense[0] = 0
    expense[1] = 0
    expense[2] = 0
    expense[3] = 0
    setIncome([0, 0, 0, 0]);
    setExpense([0, 0, 0, 0]);
    financialInformation.sort((e1: any, e2: any) =>
      e1.sortValue > e2.sortValue ? 1 : e1.sortValue < e2.sortValue ? -1 : 0,
    );
    const mappingDataForDataSource = financialInformation.map((element: any, index: number) => {
      const key = `${index}`;
      const agreement = [element?.agreement_number, ''];
      const amendment =
        element?.amendment_number.includes('ORIGINAL') || element?.amendment_number === null
          ? ''
          : element?.amendment_number;
      const partner = element?.project_partner_name || '';
      const partnerId =
        // todo update 0 business_associates_id to mhfd partner id
        element?.business_associates_id || element?.business_associates_id === 0 ? element?.business_associates_id : '';
      const phase = element?.code_phase_type?.name || '';
      const phaseId = element?.code_phase_type_id || '';
      const phaseSortValue = element?.code_phase_type?.sort_value || 0;
      const projected = [element?.projected ? formatter.format(element?.projected?.cost) : '$0', element?.projected && element?.projected.cost !== 0 ? element?.projected?.is_income ? 'green' : 'red' : 'purple'];
      const encumbered = [element?.encumbered ? formatter.format(element?.encumbered?.cost) : '$0', element?.encumbered && element?.encumbered.cost !== 0 ? element?.encumbered?.is_income ? 'green' : 'red' : 'purple'];
      const tyler = [element?.tyler_encumbered ? formatter.format(element?.tyler_encumbered?.cost) : '$0', element?.tyler_encumbered && element?.tyler_encumbered.cost !== 0 ? element?.tyler_encumbered?.is_income ? 'green' : 'red' : 'purple'];
      const available = ['$0', 'purple'];
      if (element?.projected?.is_income) {
        income[0] += element?.projected?.cost || 0;
      } else {
        expense[0] += element?.projected?.cost || 0;
      }
      if (element?.encumbered?.is_income) {
        income[1] += element?.encumbered?.cost || 0;
      } else {
        expense[1] += element?.encumbered?.cost || 0;
      }
      if (element?.tyler_encumbered?.is_income) {
        income[2] += element?.tyler_encumbered?.cost || 0;
      } else {
        expense[2] += element?.tyler_encumbered?.cost || 0;
      }

      return { key, agreement, amendment, partner, phase, projected, encumbered, tyler, available, partnerId, phaseId, phaseSortValue };
    });

    setIncome(income)
    setExpense(expense)
    setFinalData(mappingDataForDataSource);

    if (filters.length === 0) {
      setInitialData(mappingDataForDataSource);
      const dropdownPhase = mappingDataForDataSource.map((element: any) => {
        if (element?.phase) {
          const key = element?.phaseId;
          const label = <span>{element?.phase}</span>;
          const sortValue = element?.phaseSortValue;
          return { key, label, sortValue };
        }
      });

      const dropdownPhaseFiltered = dropdownPhase.filter((element: any) => {
        return element !== undefined || element !== null;
      });

      const uniquedropdownPhase = dropdownPhaseFiltered.filter(
        (value: any, index: any, self: any) => index === self.findIndex((t: any) => t?.key === value?.key),
      );

      uniquedropdownPhase.sort((e1: any, e2: any) => (e1.sortValue > e2.sortValue ? 1 : e1.sortValue < e2.sortValue ? -1 : 0));

      const dropdownPartner = mappingDataForDataSource.map((element: any) => {
        if (element.partner) {
          const key = element?.partnerId;
          const label = <span>{element?.partner}</span>;
          const name = element?.partner;
          return { key, label, name };
        }
      });

      const dropdownPartnerFiltered = dropdownPartner.filter((element: any) => {
        return element !== undefined || element !== null;
      });

      const uniquedropdownPartner = dropdownPartnerFiltered.filter(
        (value: any, index: any, self: any) => index === self.findIndex((t: any) => t?.key === value?.key),
      );

      uniquedropdownPartner.sort((e1: any, e2: any) => (e1.name > e2.name ? 1 : e1.name < e2.name ? -1 : 0));

      setDropdownPartner(uniquedropdownPartner);
      setDropdownPhase(uniquedropdownPhase);
    }
  }, [financialInformation]);

  useEffect(() => {
    income[0] = 0
    income[1] = 0
    income[2] = 0
    income[3] = 0
    expense[0] = 0
    expense[1] = 0
    expense[2] = 0
    expense[3] = 0
    setIncome([0, 0, 0, 0]);
    setExpense([0, 0, 0, 0]);
    getFinancialData(projectId, filters);
  }, [filters[0], filters[1], filters[2]]);

  const columns = [
    {
      title: 'Agreement',
      dataIndex: 'agreement',
      key: 'agreement',
      render: (agreement: any, index: any) => <p className={'table-' + agreement[1]}>{agreement[0]}</p>,
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
      render: (phase: any) => <span className={phase !== '' ? 'span-Phase' : 'span'}>{phase}</span>,
    },
    {
      title: 'Projected',
      dataIndex: 'projected',
      key: 'projected',
      render: (projected: string[]) => <p className={'table-' + projected[1]}>{projected[0]}</p>,
    },
    {
      title: 'Encumbered',
      dataIndex: 'encumbered',
      key: 'encumbered',
      render: (encumbered: string[]) => <p className={'table-' + encumbered[1]}>{encumbered[0]}</p>,
    },
    {
      title: 'Tyler Encumbered',
      dataIndex: 'tyler',
      key: 'tyler',
      render: (tyler: string[]) => <p className={'table-' + tyler[1]}>{tyler[0]}</p>,
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
      render: (available: string[]) => <p className={'table-' + available[1]}>{available[0]}</p>,
    },
  ];
  const reset = () => {
    income[0] = 0
    income[1] = 0
    income[2] = 0
    income[3] = 0
    expense[0] = 0
    expense[1] = 0
    expense[2] = 0
    expense[3] = 0
    setIncome([0, 0, 0, 0]);
    setExpense([0, 0, 0, 0]);
    getFinancialData(projectId, []);
    setFilters([]);
    setPhase('');
    setPartner('');
    setViewDropdow({
      income: true,
      expense: true,
    });
  };
  const menu = (
    <Menu
      className="menu-density"
      // onClick={(e) => (setNormalTimeline(e.key === 'Normal' ? true: false))}
      items={[
        {
          label: (
            <Checkbox
              onChange={() => {
                if (viewDropdown.income && !viewDropdown.expense) {
                  setViewDropdow({ expense: true, income: false });
                  filters[2] = { expense: true, income: false };
                } else {
                  setViewDropdow({ ...viewDropdown, income: !viewDropdown.income });
                  filters[2] = { ...viewDropdown, income: !viewDropdown.income };
                }
              }}
              checked={viewDropdown.income}
            >
              Income
            </Checkbox>
          ),
          key: 'Compact',
        },
        {
          label: (
            <Checkbox
              onChange={() => {
                if (!viewDropdown.income && viewDropdown.expense) {
                  setViewDropdow({ expense: false, income: true });
                  filters[2] = { expense: false, income: true };
                } else {
                  setViewDropdow({ ...viewDropdown, expense: !viewDropdown.expense });
                  filters[2] = { ...viewDropdown, expense: !viewDropdown.expense };
                }
              }}
              checked={viewDropdown.expense}
            >
              Expense
            </Checkbox>
          ),
          key: 'Normal',
        },
      ]}
    />
  );

  const findFilterName = (value: any, type: string) => {
    const name = initialData.find((element: any) => {
      if (type === 'phase') {
        if (parseInt(value) === parseInt(element?.phaseId)) {
          return element?.phase;
        }
      } else {
        if (parseInt(value) === parseInt(element?.partnerId)) {
          return element?.partner;
        }
      }
    });
    return name;
  };

  const partnerValidator = (partner: any) => {
    if (partner.length > 30) {
      return (partner.substring(0, 30) + '...')
    } else {
      return partner
    }
  }
  const menu2 = (
    <Menu
      className="menu-density"
      onClick={e => ((filters[0] = e.key), setPartner(findFilterName(e.key, 'partner')))}
      items={dropdownPartner}
    />
  );
  const menu3 = (
    <Menu
      className="menu-density"
      onClick={e => ((filters[1] = e.key), setPhase(findFilterName(e.key, 'phase')))}
      items={dropdownPhase}
    />
  );

  return (
    <>
      <AddAmountModal visible={openModalAmount} setVisible={setOpenModalAmount} />

      <Row>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 24 }}
          style={{ display: 'flex', alignItems: 'center' }}
          className="subtitle-detail"
        >
          <h3 style={{ paddingBottom: '15px', paddingTop: '20px', marginRight: '35px' }} id="project-financials">
            PROJECT FINANCIALS
          </h3>
          <div className="line-01" style={{ marginBottom: '15px', marginTop: '20px', width: '73%' }}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Dropdown
            overlayClassName="dropdown-view-menu"
            overlay={menu}
            placement="bottomLeft"
            trigger={['click']}
            onVisibleChange={() => {
              setOpenDrop(!openDrop);
            }}
            getPopupContainer={(trigger: any) => trigger.parentNode}
          >
            <Space
              className="dropdown-view-income"
              style={viewDropdown.expense && viewDropdown.income ? { borderLeft: '4px solid #9faeb1' } : {}}
            >
              <div>
                View:{' '}
                {viewDropdown.expense && viewDropdown.income ? 'All' : viewDropdown.expense ? 'Expense' : 'Income'}
              </div>
              {!openDrop ? <UpOutlined style={{ color: '#251863' }} /> : <DownOutlined style={{ color: '#251863' }} />}
            </Space>
          </Dropdown>
          <Dropdown
            overlayClassName="dropdown-view-menu"
            overlay={menu2}
            placement="bottomLeft"
            trigger={['click']}
            onVisibleChange={() => {
              setOpenPhatner(!openDropPhatner);
            }}
            getPopupContainer={(trigger: any) => trigger.parentNode}
          >
            <Space className="dropdown-view-partner">
              <div>{partnerValidator(partner?.partner || 'Partner')}</div>
              {!openDropPhatner ? (
                <UpOutlined style={{ color: '#251863' }} />
              ) : (
                <DownOutlined style={{ color: '#251863' }} />
              )}
            </Space>
          </Dropdown>
          <Dropdown
            overlayClassName="dropdown-view-menu"
            overlay={menu3}
            placement="bottomLeft"
            trigger={['click']}
            onVisibleChange={() => {
              setOpenDropPhase(!openDropPhase);
            }}
            getPopupContainer={(trigger: any) => trigger.parentNode}
          >
            <Space className="dropdown-view-phase">
              <div>{phase?.phase ? phase.phase : 'Phase'}</div>
              {!openDropPhase ? (
                <UpOutlined style={{ color: '#251863' }} />
              ) : (
                <DownOutlined style={{ color: '#251863' }} />
              )}
            </Space>
          </Dropdown>
          <Button className="btn-clear" onClick={reset}>
            <DeleteOutlined />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-financials-modal" style={{ paddingRight: '8px' }}>
          <div style={{ width: '100%', overflowX: 'hidden' }}>
            <Table dataSource={finalData} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 350 }} />
            <div style={{ display: 'flex', paddingTop: '5px', borderTop: '1px solid #d7d3e2', marginTop: '5px' }}>
              <p style={{ color: '#28c499', fontWeight: '400', width: '50%' }}>Subtotal Income</p>
              <p style={{ color: '#28c499', fontWeight: '400', width: '12.5%' }}>{formatter.format(income[0])}</p>
              <p style={{ color: '#28c499', fontWeight: '400', width: '12.5%' }}>{formatter.format(income[1])}</p>
              <p style={{ color: '#28c499', fontWeight: '400', width: '12.5%' }}>{formatter.format(income[2])}</p>
              <p style={{ color: '#28c499', fontWeight: '400' }}>{formatter.format(income[3])}</p>
            </div>
            <div style={{ display: 'flex', paddingTop: '5px' }}>
              <p style={{ color: 'rgb(255 55 55)', fontWeight: '400', width: '50%' }}>Subtotal Expense</p>
              <p style={{ color: 'rgb(255 55 55)', fontWeight: '400', width: '12.5%' }}>{formatter.format(expense[0])}</p>
              <p style={{ color: 'rgb(255 55 55)', fontWeight: '400', width: '12.5%' }}>{formatter.format(expense[1])}</p>
              <p style={{ color: 'rgb(255 55 55)', fontWeight: '400', width: '12.5%' }}>{formatter.format(expense[2])}</p>
              <p style={{ color: 'rgb(255 55 55)', fontWeight: '400' }}>{formatter.format(income[3])}</p>
            </div>
            <div
              style={{ display: 'flex', paddingTop: '5px', borderBottom: '1px solid #d7d3e2', paddingBottom: '5px' }}
            >
              <p style={{ color: '#11093c', fontWeight: 'bolder', width: '50%' }}>Total</p>
              <p style={{ color: '#11093c', fontWeight: 'bolder', width: '12.5%' }}>{formatter.format(income[0] - expense[0])}</p>
              <p style={{ color: '#11093c', fontWeight: 'bolder', width: '12.5%' }}>{formatter.format(income[1] - expense[1])}</p>
              <p style={{ color: '#11093c', fontWeight: 'bolder', width: '12.5%' }}>{formatter.format(income[2] - expense[2])}</p>
              <p style={{ color: '#11093c', fontWeight: 'bolder' }}>{formatter.format(income[3] - expense[3])}</p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Financials;
