
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

export const postDataMultipart = (url: any, body: any, token?: any) => {
    console.log('my body ', body);
    const headers = token ? MultiPartOptions(token) : MultiPart();
    return fetch(url, {
        method: 'POST',
        headers,
        body: body
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

export const getDataOctet = (url: any, token: any) => {
    const headers = JSONOptions(token);
    return fetch(url, {
        method: 'GET',
        headers
    })
    .then(response => {
        const data = response.text().then( data1 => {
                return data1;
            }
        );
        return data;
    }).then(data => {
        return data;
    })
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

export const JSONOptionsOctet = (token?: any) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/octet-stream');
    headers.append('Accept', 'application/octet-stream');
    if (token) {
        headers.append('Authorization', 'Bearer ' + token);
    }
    return headers;
}

export const JSONOptions = (token?: any) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) {
        headers.append('Authorization', 'Bearer ' + token);
    }
    return headers;
}
export const MultiPartOptions = (token?: any) => {
    let headers = new Headers();
    // headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'multipart/form-data');
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
    headers.append('Content-Type', 'application/json');
    return headers;
}

export const MultiPart = () => {
    let headers = new Headers();
    // headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'multipart/form-data');
    return headers;
}

export const logout = () => {
    localStorage.removeItem('mfx-token');
    sessionStorage.removeItem('mfx-token');
}