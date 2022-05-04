const getWishlistReducers = (allWishedListData = [], action) => {
  switch (action.type) {
    case "WISHLIST_ITEMS":
      return action.payload;
    case "CLEAR_WISHLIST_ITEMS":
      return action.payload;
    default:
      return JSON.parse(localStorage.getItem("wishlist"))
        ? JSON.parse(localStorage.getItem("wishlist"))
        : [];
  }
};

export default getWishlistReducers;
