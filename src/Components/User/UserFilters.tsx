import React from 'react';
import { Dropdown, Button, Input } from 'antd';

export default ({ menu, option, setOption, search } : {menu: any , option: {name: string, organization: string, serviceArea: string, designation: string} , setOption: Function, search: Function}) => {
    const { Search } = Input;
    return (
        <div className="user-filter">
            <div>
                <Search
                placeholder="Search by Name"
                onSearch={value => {
                    const auxOption = {...option};
                    auxOption.name = value;
                    setOption(auxOption);
                    console.log(auxOption);
                    
                    search(auxOption);
                }}
                style={{ width: 240 }}
                />
            </div>

            <div>
                <Dropdown overlay={menu}>
                <Button>
                    Organization <img src="Icons/icon-12.svg" alt=""/>
                </Button>
                </Dropdown>
            </div>
            <div>
                <Dropdown overlay={menu}>
                <Button>
                    Service Area <img src="Icons/icon-12.svg" alt=""/>
                </Button>
                </Dropdown>
            </div>

            <div>
                <Dropdown overlay={menu}>
                <Button>
                    User Designation <img src="Icons/icon-12.svg" alt=""/>
                </Button>
                </Dropdown>
            </div>

            <div>
                <Button className="f-btn">Reset</Button>
            </div>

            <div className="btn-r">
                <label>Sort by:</label>
                <Dropdown overlay={menu}>
                <Button>
                    Approval Date <img src="Icons/icon-14.svg" alt=""/>
                </Button>
                </Dropdown>
            </div>
            </div>
    )
}
