import React from 'react';
import { Menu, Row, Col, Button, Dropdown, Input } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const { Search } = Input;
export default () => {
    const menuSort = (listSort: Array<{name: string, title: string}>) => {
        return <Menu className="js-mm-00">
          {listSort.map((item : {name: string, title: string}) => (
            <Menu.Item key={item.name} 
              onClick={() => {
                // if(tabActive === '0') {
                //   const auxOptions = {...optionsFilterProblems};
                //   auxOptions.column = item.name;
                //   getGalleryProblems( '&' + options(auxOptions));
                //   setOptionFilterProblems(auxOptions);
                // } else {
                //   const auxOptions = {...optionsFilterProjects};
                //   auxOptions.column = item.name;
                //   getGalleryProjects(options(auxOptions));
                //   setOptionFilterProblems(auxOptions);
                // }
              }}>
              <span className="menu-item-text">{item.title}</span>
            </Menu.Item>
          ))}
      </Menu>
    }
    return <div className="head-filter">
    <Row type="flex" justify="space-around" align="middle">
      <Col span={12}>
        <Search
          placeholder="Search..."
        //   value={tabActive === '0'? optionsFilterProblems.keyword: optionsFilterProjects.keyword}
        //   onChange={(e)=> {
        //     if(tabActive === '0') {
        //       const auxOptions = {...optionsFilterProblems};
        //       auxOptions.keyword = e.target.value;
        //       setOptionFilterProblems(auxOptions);
        //     } else {
        //       const auxOptions = {...optionsFilterProjects};
        //       auxOptions.keyword = e.target.value;
        //       setOptionFilterProjects(auxOptions);
        //     }
        //   }}
        //   onSearch={(e) => {
        //     if(tabActive === '0') {
        //       getGalleryProblems( '&' + options(optionsFilterProblems));
        //     } else {
        //       getGalleryProjects(options(optionsFilterProjects));
        //     }
        //   }}
          style={{ width: 200 }}
        />
      </Col>
      <Col style={{ textAlign: 'right' }} span={12} id="sort-map">
        {/* <div className="sort-content">
          <Dropdown trigger={['click']} 
            overlay={tabActive === '0'?
              menuSort(SORTED_PROBLEMS):
              menuSort(SORTED_PROJECTS)} 
            getPopupContainer={() => document.getElementById("sort-map" ) as HTMLElement}>
            <span className="ant-dropdown-link" style={{cursor: 'pointer'}}>
              Sort by {tabActive === '0'? SORTED_PROBLEMS.filter(element => element.name === optionsFilterProblems.column)[0]?.title :
                 SORTED_PROJECTS.filter(element => element.name === optionsFilterProjects.column)[0]?.title}
            </span>
          </Dropdown>
          <span className="sort-buttons" onClick={() => {
            if(tabActive === '0') {
              const auxOptions = {...optionsFilterProblems};
              auxOptions.order = optionsFilterProblems.order === 'asc' ? 'desc' : 'asc'
              setOptionFilterProblems(auxOptions);
              getGalleryProblems( '&' + options(auxOptions));
            } else {
              const auxOptions = {...optionsFilterProjects};
              auxOptions.order = optionsFilterProjects.order === 'asc' ? 'desc' : 'asc'
              setOptionFilterProjects(auxOptions);
              getGalleryProjects(options(auxOptions));
            }
          }}>
            <CaretUpOutlined
              className="arrow-up"
              style={{opacity: tabActive === '0'? (optionsFilterProblems.order === 'asc' ? '100%':'30%') :
              (optionsFilterProjects.order === 'asc' ? '100%':'30%')}}
            />
            <CaretDownOutlined
              className="arrow-down"
              style={{opacity: tabActive === '0'? (optionsFilterProblems.order === 'desc' ? '100%':'30%') :
              (optionsFilterProjects.order === 'desc' ? '100%':'30%')}}
            />
          </span>
        </div> */}

        {/* <Button onClick={handleToggle}>
          <img src="/Icons/icon-29.svg" alt="" /> Filters ({filterNames.length}) {tabActive}
        </Button> */}
      </Col>
    </Row>
  </div>
}