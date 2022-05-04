const getPlacedOrderReducers = (order = null, action) => {
  switch (action.type) {
    case "CREATE_ORDER":
      return { ...action.payload, loader: false };
    case "START_ORDER":
      return { ...action.payload, loader: true };
    default:
      return { ...order, loader: false };
  }
};

export default getPlacedOrderReducers;
