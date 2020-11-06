const headers = {
  'content-type': 'application/json',
};

export const get = async (resource) => {
  return fetch( `http://localhost:3000/${resource}` ).then((res) => res.json())
      .then((res) => {
        return res;
      });
};

export const deleteItem = async (id, resource) => {
  return fetch( [`http://localhost:3000/${resource}`, id].join('/'),
      {headers, method: 'DELETE'});
};

export const updateCard= async (id, item, resource) => {
  const result = await fetch( [`http://localhost:3000/${resource}`, id].join('/'),
      {headers, body: JSON.stringify(item), method: 'PATCH'});
  let data ={};
  if (result.ok) {
    data = await result.json();
  } else {
    throw new Error('Something went wrong');
  }
  return {
    data,
  };
};

export const createCard = async (item) => {
  const result = await fetch( 'http://localhost:3000/products',
      { headers, body: JSON.stringify(item), method: 'POST' } );
  let data ={};
  if (result.ok) {
    data = await result.json();
  } else {
    throw new Error('Something went wrong');
  }
  return {
    data,
  };
};

export const addCardBasket = async (item) => {
  const result = await fetch( 'http://localhost:3000/cart',
      { headers, body: JSON.stringify(item), method: 'POST' } );
  let data ={};
  if (result.ok) {
    data = await result.json();
  } else {
    throw new Error('Something went wrong');
  }
  return {
    data,
  };
};
