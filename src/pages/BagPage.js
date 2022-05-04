import React from "react";
import { connect } from "react-redux";
import SelectedListItem from "../components/BagListItems";
import { clearBag } from "../actions";

function BagPage({ bagListData,clearBag }) {
  console.log("data in wishlistpage:", bagListData);
  const removeAllBagListItems = () => {
    clearBag();
  };
  return (
    <div>
      <h1 className="title">Your Bag</h1>
      {bagListData.length > 0 ? (
        <SelectedListItem
          items={bagListData}
          removeAllBagListItems={removeAllBagListItems}
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
    bagListData: state.getBagListReducers,
  };
};

export default connect(mapStateToProps, { clearBag })(BagPage);
