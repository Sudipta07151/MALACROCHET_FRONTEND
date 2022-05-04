import React from "react";
import { connect } from "react-redux";
import SelectedListItem from "../components/WishListItems";
import { clearWishlist } from "../actions";

function WishListPage({ wishlistItems, clearWishlist }) {
  console.log("data in wishlistpage:", wishlistItems);
  const removeAllWishListItems = () => {
    clearWishlist();
  };
  return (
    <div>
      <h1 className="title">Your WishList</h1>
      {wishlistItems.length > 0 ? (
        <SelectedListItem
          items={wishlistItems}
          removeAllWishListItems={removeAllWishListItems}
        />
      ) : (
        ""
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    wishlistItems: state.getWishlistReducers,
  };
};

export default connect(mapStateToProps, { clearWishlist })(WishListPage);
