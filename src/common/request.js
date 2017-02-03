export default async function request(url, option = {}) {
  return new Promise((resolve, reject) => {
    const fetchOption = {
      ...option,
      method: 'GET',
      headers: {},
      mode: 'cors',
      type: 'json',
      responseAs: (option.responseAs && ['json', 'text', 'response'].indexOf(option.responseAs) >= 0) ? option.responseAs : 'json',
    };

    window.fetch(url, fetchOption)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          if (fetchOption.responseAs == 'response') resolve(response);
          if (response.status == 204) resolve(null);
          resolve(response[fetchOption.responseAs]());
        }
        const err = new Error(response.statusText);
        err.response = response;
        reject(err);
      });
  });
}
