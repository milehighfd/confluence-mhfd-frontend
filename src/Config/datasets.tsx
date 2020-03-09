import React, { Component } from "react";


export const postData = (url: any, body: any, token?: any) => {
    const headers = token ? JSONOptions(token) : JSONDefault();
    return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {return (data);})
    .catch((err) => {
      console.log(err);
    });
}

export const putData = (url: any, body: any, token?: any) => {
    const headers = token ? JSONOptions(token) : JSONDefault();
    return fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => (data))
    .catch((err) => {
      console.log(err);
    });
}

export const getData = (url: any, token?: any) => {
    const headers = token ? JSONOptions(token) : JSONDefault();
    return fetch(url, {
        method: 'GET',
        headers
    })
    .then(response => response.json())
    .then(data => (data))
    .catch((err) => {
      console.log(err);
    });
}
export const deleteData = (url: any, token?: any) => {
    const headers = token ? JSONOptions(token) : JSONDefault();
    return fetch(url, {
        method: 'DELETE',
        headers
    })
    .then(response => response.json())
    .then(data => (data))
    .catch((err) => {
      console.log(err);
    });
}

export const JSONOptions = (token?: any) => {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    if (token) {
        headers.append('Authorization', 'Bearer ' + token);
    }
    return headers;
}
export const getToken = () => {
    return sessionStorage.getItem('mfx-token') ? sessionStorage.getItem('mfx-token') : (localStorage.getItem('mfx-token') ? localStorage.getItem('mfx-token') : '');
}

export const JSONDefault = () => {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    return headers;
}

export const logout = () => {
    localStorage.removeItem('mfx-token');
    sessionStorage.removeItem('mfx-token');
}