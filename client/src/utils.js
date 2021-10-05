import opencage from 'opencage-api-client';

export const getPositionFromAddress = async (address) => {
  const requestObj = {
    key: process.env.REACT_APP_OPENCAGE_API_KEY,
    q: address,
  };

  try {
    const res = await opencage.geocode(requestObj);
    return res.results[0].geometry;
  } catch (err) {
    console.log(err.message);
  }
};
