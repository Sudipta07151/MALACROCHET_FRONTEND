import React from "react";
import "./itemCard.css";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { connect } from "react-redux";
import { addToWishlist } from "../actions";

function ItemCards({ item, addToWishlist }) {
  // const whatsappURL =
  //   "https://api.whatsapp.com/send?phone=8017713044&text=" + item.name;
  const navigate = useNavigate();

  const handleClick = () => {
    // console.log(item._id.$oid);
    const url = "item/" + item._id.$oid;
    navigate(url);
  };

  const handleClickFav = (event, item) => {
    event.stopPropagation();
    addToWishlist(item);
  };
  return (
    <div className="item_cards_wrapper" onClick={handleClick}>
      <div key={item._id.$oid} className="card_component">
        <div>
          <img src={item.image_url} alt="item" />
        </div>
        {/* <p>{item.name}</p>
        <p>{item.tag}</p> */}
        {/* <Button color="primary">
          <Link href={whatsappURL} target="_blank">
            WhatsApp
          </Link>
        </Button> */}
        <FavoriteBorderIcon
          fontSize="medium"
          className="favicon"
          onClick={(e) => handleClickFav(e,item)}
        />
      </div>
    </div>
  );
}

export default connect(null, { addToWishlist })(ItemCards);
