import React, { useState, useEffect } from "react";
import { Result, Button } from 'antd';
import { getToken } from '../../Config/datasets'
import { Redirect, Link } from "react-router-dom";
import store from "../../store";
export default () => {
    const [redirect, setRedirect] = useState<boolean>(false);
    const [second, setSecond] = useState<number>(10);
    const user = store.getState().appUser;
    useEffect(() => {
        const timer = setTimeout(() => {
            setRedirect(true);
        }, 10000);
        return () => clearTimeout(timer);
      }, []);
    if(redirect) {
        if(getToken() && user.activated) {
            return <Redirect to="/profile-view" />
        } else {
            return <Redirect to="/login" />
        }
    }
    return <>
        <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
        <Button className="btn-error">Back Home</Button>}
      />
      <div className="error-404">The page will be redirected in {second} seconds</div>
    </>
}
