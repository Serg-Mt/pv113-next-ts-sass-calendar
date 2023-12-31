import OneUser from './OneUser';

const
  API_URL = 'http://localhost:3333/users/',

  config = {
    API_URL,
    columns: [
      { title: 'ID', getVal: obj => obj.id },
      { title: 'Name', getVal: ({ name }) => name, setVal: name => ({ name }) },
      { title: 'Email', getVal: ({ email }) => email,  setVal: email => ({ email }) },
      { title: 'Address', getVal: ({ address: { street, suite, city } }) => `${city}, ${street} ${suite}`, },
      { title: 'Website', getVal: ({ website }) => website },
      { title: 'Phone number', getVal: ({ phone }) => phone },
    ],
    async fetcher() {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('fetch ' + response.status);
      return await response.json();
    },
    async getInfo(id) {
      const response = await fetch(API_URL + id);
      if (!response.ok) throw new Error('fetch ' + response.status);
      return await response.json();
    },
    InfoComponent: ({ data }) => OneUser({ user: data })
  };

export default config;