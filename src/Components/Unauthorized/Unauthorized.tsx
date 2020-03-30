import React, { useState } from "react";
import { Result, Button } from 'antd';
import { getToken } from '../../Config/datasets'
import { Redirect, Link } from "react-router-dom";
export default () => {
    const [redirect, setRedirect] = useState<boolean>(false);
    const [second, setSecond] = useState<number>(10);
    const exit = setTimeout(() => {
        setRedirect(true);
    }, 10000);
    if(redirect) {
        clearTimeout(exit);
        if(getToken()) {
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
