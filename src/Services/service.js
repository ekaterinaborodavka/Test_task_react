const headers = {
  'content-type': 'application/json',
};

export const getProducts = async () => {
  return fetch( 'http://localhost:3000/products' ).then((res) => res.json())
      .then((res) => {
        return res;
      });
};

export const deleteItem = async (id) => {
  return fetch( ['http://localhost:3000/products', id].join('/'),
   {headers, method: 'DELETE'})
};

export const updateCard= async (id, item) => {
  return fetch( ['http://localhost:3000/products', id].join('/'),
   {headers, body: JSON.stringify(item),  method: 'PATCH'})
};

export const createCard = async (item) => {
  const result = await fetch( 'http://localhost:3000/products',
      { headers, body: JSON.stringify(item), method: 'POST' } );
  let data ={};
  if (result.ok) {
    data = await result.json();
  } else {
    throw new Error('Description cannot be empty');
  }
  return {
    data,
  };
};