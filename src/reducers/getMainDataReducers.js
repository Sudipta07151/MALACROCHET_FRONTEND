const getMainDataReducers = (allData = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_DATA":
      return action.payload;
    case "FETCH_ACCESSORIES_DATA":
      return allData;
    case "FETCH_GIFTS_DATA":
      return allData
    case "DATA_UPLOAD_ACTION":
      return [...allData, action.payload];
    default:
      return allData;
  }
};

export default getMainDataReducers;
