export async function request({url, method='get', params, data, html,}) {
  // if(params && Array.isArray(params)) {
  //   url = `${url}?${params.join('&')}`
  // } else
  if(params) {
    const paramsString = Object.entries(params).map(([key, value], i, arr) => {
      let res = `${key}=${value}`;
      i !== arr.length-1 ? res += '&' : '';
      return res
    }).join('');

    url = `${url}?${paramsString}`
  }

  const options = {method};

  if(data) {
    options.headers = {'Content-Type': 'application/json'}
    options.body = JSON.stringify(data)
  }

  return fetch(url, options)
    .then(
      res => {
        if(res.ok) {
          return html ? res.text() : res.json()
        } else {
          throw new Error(res.statusText)
        }
      },
    );
}
