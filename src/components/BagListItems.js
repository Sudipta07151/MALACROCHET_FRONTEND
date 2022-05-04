import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { ListItemAvatar } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./wishlistitems.css";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "80%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SelectedListItem({ items, removeAllBagListItems }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleListItemCheckout = (event, index) => {
    navigate("/checkout");
  };
  const renderList = () => {
    return items.map((item, index) => {
      console.log(item.image_url);
      return (
        <div>
          <ListItem key={index} button>
            <div className="list_wrapper">
              <div>
                <img
                  src={item.image_url}
                  alt="img"
                  className="wishlist_image"
                />
              </div>
              <div>
                <ListItemIcon>
                  <RemoveIcon />
                </ListItemIcon>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
              </div>
            </div>
          </ListItem>
        </div>
      );
    });
  };

  return (
    <div className={classes.root}>
      {items.length > 0 && (
        <React.Fragment>
          <List component="nav" aria-label="main mailbox folders">
            {items.length > 0 ? renderList() : ""}
          </List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folder">
            <ListItem button className="addtobag" style={{ margin: "20px" }}>
              <ListItemText
                primary="REMOVE ALL BAG ITEMS"
                onClick={removeAllBagListItems}
              />
            </ListItem>
            <ListItem
              button
              onClick={(event) => handleListItemCheckout(event, 3)}
              className="addtobag"
              style={{ margin: "20px" }}
            >
              <ListItemText primary="CHECKOUT" />
            </ListItem>
          </List>
        </React.Fragment>
      )}
    </div>
  );
}
