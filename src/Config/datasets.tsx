import UnauthorizedError from 'Errors/UnauthorizedError';
import ServerError from '../Errors/ServerError';
import EntityError from '../Errors/EntityError';

const handleErrors = (response: any) => {
    if (response.status === 401) {
        throw new UnauthorizedError();
    }
    if (response.status === 500) {
        throw new ServerError(response.code);
    }
    if (response.status === 422) {
        throw new EntityError(response.error);
    }
    return response.json();
}

const validateSignal = (signal?: AbortSignal) => {
    if (signal && !(signal instanceof AbortSignal)) {
        throw new Error('Signal is not an instance of AbortSignal');
    }
}

export const postData = (url: any, body: any, token?: any, signal?: AbortSignal) => {
    const headers = token ? JSONOptions(token) : JSONDefault();
    validateSignal(signal);
    return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal
    })
    .then(handleErrors);
}

export const postDataAsyn = async (url: any, body: any, token?: any) => {
    const headers = token ? JSONOptions(token) : JSONDefault();
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }).then(handleErrors)
            .then(data => { return (data); })
            .catch((err) => {
                console.log(err);
            });
        return response;
    } catch (e) {
        console.log(`😱 request failed: ${e}`);
    };
}

export const postDataMultipart = (url: any, body: any, token?: any) => {
    const headers = token ? MultiPartOptions(token) : MultiPart();
    return fetch(url, {
        method: 'POST',
        headers,
        body: body
    })
    .then(handleErrors)
    .then(data => {return (data);})
    .catch((err) => {
      console.log(err);
    });
}
export const postDataMultipartWithoutCatch = (url: any, body: any, token?: any) => {
  const headers = token ? MultiPartOptions(token) : MultiPart();
  return fetch(url, {
      method: 'POST',
      headers,
      body: body
  })
  .then(handleErrors)
  .then(data => {return (data);});
}


export const putData = (url: any, body: any, token?: any) => {
    const headers = token ? JSONOptions(token) : JSONDefault();
    return fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
    })
    .then(handleErrors)
    .then(data => (data))
    .catch((err) => {
      console.log(err);
    });
}

export const getData = (url: any, token?: any, signal?: AbortSignal) => {
    const headers = token ? JSONOptions(token) : JSONDefault();
    validateSignal(signal);
    return fetch(url, {
        method: 'GET',
        headers,
        signal
    })
    .then(handleErrors);
}

export const getDataNoJSON = (url: any, token?: any) => {
    const headers = token ? JSONOptions2(token) : JSONDefault();
    return fetch(url, {
        method: 'GET',
        headers
    })
    .then(data => (data))
    .catch((err) => {
        console.log(err);
    });
}

export const getDataOctet = (url: any, token?: any) => {
    const headers = token ? JSONOptions(token) : JSONDefault();
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
    .then(handleErrors)
    .then(data => (data))
    .catch((err) => {
      console.log(err);
    });
}
export const deleteDataWithBody = (url: any, body: any, token?: any) => {
    const headers = token ? JSONOptions(token) : JSONDefault();
    return fetch(url, {
        method: 'DELETE',
        headers,
        body: JSON.stringify(body)
    })
    .then(response => response.text())
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
export const JSONOptions2 = (token?: any) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) {
        headers.append('Authorization', 'Bearer ' + token);
    }
    return headers;
}
export const MultiPartOptions = (token?: any) => {
    let headers = new Headers();
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
    return headers;
}

export const logout = () => {
    localStorage.removeItem('mfx-token');
    sessionStorage.removeItem('mfx-token');
    sessionStorage.removeItem('globalMap');
}