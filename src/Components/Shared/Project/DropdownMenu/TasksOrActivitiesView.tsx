import React from "react";
import { Input, Button, Col, Row, Dropdown } from "antd";

import MenuTaskView from "./MenuTaskView";
import { TASK } from "../../../../constants/constants";


export default ({subType, tasks, setTasks} : {subType: string, tasks: Array<string>, setTasks: Function}) => {
    const deleteTask = (pos: number) => {
        const auxTask = [...tasks];
        auxTask.splice(pos, 1);
        setTasks(auxTask);
    }
    return <> 
        {subType !== 'restoration' ? (
          <div key={'tasks'} className="input-maint">
            {tasks.map( (item: string, index: number) => {
              return <div key={index}><label className="label-new-form" htmlFor="">#{index + 1}</label>
                <Input size={"large"} placeholder="" value={item} onChange={(event) => {
                  const auxItem = [...tasks];
                  auxItem[index] = event.target.value;
                  setTasks(auxItem);
                }} />
                { index !== 0 && <img className="img-maint" src="/Icons/icon-16.svg" alt="" onClick={() => { deleteTask(index); }} />}
              </div>
            })}
          </div>
        ) : (
            <div key={'activities'} className="gutter-example user-tab all-npf">
              {tasks.map( (item: string, index: number) => {
                return <Row key={index} gutter={16} className="input-maint">
                  <Col className="gutter-row" span={12}>
                    <Dropdown overlay={MenuTaskView(TASK, tasks, setTasks, index)}>
                      <Button>
                       {TASK.filter((subTask) => subTask.id === item)[0] ? TASK.filter((subTask) => subTask.id === tasks[index])[0].name : '- Select -'} <img src="/Icons/icon-12.svg" alt="" />
                      </Button>
                    </Dropdown>
                    { index !== 0 && <img className="img-maint" src="/Icons/icon-16.svg" alt="" onClick={() => { deleteTask(index); }} />}
                  </Col>
                </Row>
              })}
            </div>
          )}
    </>  
}