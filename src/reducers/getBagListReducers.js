const getBagListReducers = (allBagListData = [], action) => {
    switch (action.type) {
      case "BAG_ITEMS":
        return action.payload;
      case "CLEAR_BAG_ITEMS":
        return action.payload;
      default:
        return JSON.parse(localStorage.getItem("bag"))
          ? JSON.parse(localStorage.getItem("bag"))
          : [];
    }
  };
  
  export default getBagListReducers;
  