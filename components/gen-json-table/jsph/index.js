const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const
  columns = [
    { title: 'ID', getVal: obj => obj.id },
    { title: 'Name', getVal: ({ name }) => name },
    { title: 'Email', getVal: ({ email }) => email },
    { title: 'Address', getVal: ({ address: { street, suite, city } }) => `${city}, ${street} ${suite}`, },
    { title: 'Website', getVal: ({ website }) => website },
    { title: 'Phone number', getVal: ({ phone }) => phone },
  ],
  fetcher = async function (params) {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
  };