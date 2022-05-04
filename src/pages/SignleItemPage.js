import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleItemData } from "../actions";
import ItemCards from "../components/ItemCards";
import "./singleitem.css";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { addToBag } from "../actions";
import { addToWishlist } from "../actions";

function SignleItemPage({
  allData,
  fetchSingleItemData,
  addToBag,
  addToWishlist,
}) {
  const { oid } = useParams();
  console.log(allData);
  useEffect(() => {
    fetchSingleItemData(oid);
  }, fetchSingleItemData);

  const handleClickFav = (event, item) => {
    event.stopPropagation();
    addToWishlist(item);
  };

  const handleClickAddToBag = (event, item) => {
    event.stopPropagation();
    addToBag(item);
  };

  const renderItems = () => {
    return (
      <div className="item_cards_wrapper_signle">
        <ItemCards
          key={allData._id.$oid}
          item={allData}
          className="card_component_single"
        />
        <div className="button_group_wrapper">
          <button
            className="addtobag"
            onClick={(e) => {
              handleClickAddToBag(e, allData);
            }}
          >
            ADD TO BAG <ShoppingCartIcon />
          </button>
          <button
            className="addtowishlist"
            onClick={(e) => {
              handleClickFav(e, allData);
            }}
          >
            <LoyaltyIcon />
          </button>
        </div>
        {/* <div key={allData._id.$oid} className="card_component_single">
      <div>
        <Paper>
        <img src={allData.image_url} alt="item" />
        </Paper>
      </div>
    </div> */}
      </div>
    );
  };

  return <div>{allData.length !== 0 ? renderItems() : ""}</div>;
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    allData: state.getSingleItemReducers,
  };
};

export default connect(mapStateToProps, {
  fetchSingleItemData,
  addToBag,
  addToWishlist,
})(SignleItemPage);
