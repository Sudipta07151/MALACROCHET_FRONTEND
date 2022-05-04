const getSingleItemReducers = (allData = [], action) => {
  switch (action.type) {
    case "FETCH_SINGLE_ITEM_DATA":
      return action.payload;
    default:
      return allData;
  }
};

export default getSingleItemReducers;
