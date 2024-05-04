export const getItem = async item => {
  const resp = await fetch(`${process.env.API_URL}/catItem`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      item: item,
    }),
  });
  const val = await resp.json();
  console.log(val);
  return val.item;
};
