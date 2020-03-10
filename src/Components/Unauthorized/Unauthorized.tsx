import React, { useState } from "react";
import { getToken } from '../../Config/datasets'
import { Redirect } from "react-router-dom";
export default () => {
    const [redirect, setRedirect] = useState<boolean>(false);
    const [second, setSecond] = useState<number>(20);
    const exit = setTimeout(() => {
        setRedirect(true);
    }, 20000);
    const seg = setTimeout(() => {
        const value = second - 1;
        setSecond(value);
    }, 1000)
    if(redirect) {
        if(getToken()) {
            return <Redirect to="/profile-view" />
        } else {
            return <Redirect to="/login" />
        }
    }
    return <>
        {second}
        <div> Not found 404 </div>
    </>
}