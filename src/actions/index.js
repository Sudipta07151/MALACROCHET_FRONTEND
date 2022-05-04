import uploadEndpoint from "../api/uploadEndpoint";
import { encryptPassword } from "../authentication/encrpyption";
export const fetchAllData = () => {
  return async (dispatch, getState) => {
    const response = await uploadEndpoint.get("/");
    dispatch({
      type: "FETCH_ALL_DATA",
      payload: JSON.parse(response.data),
    });
  };
};

export const fetchAccessoriesData = () => {
  return {
    type: "FETCH_ACCESSORIES_DATA",
    payload: [],
  };
};

export const fetchGiftsData = () => {
  return {
    type: "FETCH_GIFTS_DATA",
    payload: [],
  };
};

export const dataUploadAction = ({ url, tag }) => {
  console.log("ACTION DATA UPLOAD: ", url, tag);
  return {
    type: "DATA_UPLOAD_ACTION",
    payload: { url, tag },
  };
};

export const fetchSingleItemData = (oid) => {
  return async (dispatch, getState) => {
    const url = "/singlefile/" + oid;
    console.log("url:", url);
    const response = await uploadEndpoint.get(url);
    console.log(response);
    dispatch({
      type: "FETCH_SINGLE_ITEM_DATA",
      payload: JSON.parse(response.data),
    });
  };
};

export const signup = ({ name, isAdmin, password, email }) => {
  return async (dispatch, getState) => {
    const url = "/signup";
    console.log("url:", url);
    const enc_password = encryptPassword(password);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("isAdmin", isAdmin);
    formData.append("password", enc_password);

    const response = await uploadEndpoint.post(url, formData);
    console.log(response);
    dispatch({
      type: "SIGN_UP_USER",
      // payload: JSON.parse(response.data),
      payload: response.data,
    });
  };
};

export const databaseUploadStatus = (status) => {
  return {
    type: "DATABASE_RESPONSE",
    payload: status,
  };
};

export const login = ({ password, email }) => {
  return async (dispatch, getState) => {
    const url = "/login";
    console.log("url:", url);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await uploadEndpoint.post(url, formData);
    if (response.data.login === true) {
      localStorage.setItem("password", password);
      localStorage.setItem("email", email);
    }
    console.log(response);
    dispatch({
      type: "LOGIN_USER",
      // payload: JSON.parse(response.data),
      payload: response.data,
    });
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: "LOGOUT_USER",
    payload: null,
  };
};

export const addToWishlist = (item) => {
  console.log("wishlist action called", item);
  let returnList;
  if (!localStorage.getItem("wishlist")) {
    console.log("if called");
    const list = [];
    list.push(item);
    localStorage.setItem("wishlist", JSON.stringify(list));
    returnList = JSON.parse(localStorage.getItem("wishlist"));
  } else {
    console.log("else called");
    const list = JSON.parse(localStorage.getItem("wishlist"));
    list.push(item);
    console.log("wishlish items:", list);
    localStorage.setItem("wishlist", JSON.stringify(list));
    returnList = JSON.parse(localStorage.getItem("wishlist"));
  }
  console.log("return wish list: ", returnList);

  return {
    type: "WISHLIST_ITEMS",
    payload: returnList,
  };
};

export const clearWishlist = () => {
  localStorage.removeItem("wishlist");
  return {
    type: "CLEAR_WISHLIST_ITEMS",
    payload: [],
  };
};

export const addToBag = (item) => {
  console.log("wishlist action called", item);
  let returnList;
  if (!localStorage.getItem("bag")) {
    console.log("if called");
    const list = [];
    list.push(item);
    localStorage.setItem("bag", JSON.stringify(list));
    returnList = JSON.parse(localStorage.getItem("bag"));
  } else {
    console.log("else called");
    const list = JSON.parse(localStorage.getItem("bag"));
    list.push(item);
    console.log("bag items:", list);
    localStorage.setItem("bag", JSON.stringify(list));
    returnList = JSON.parse(localStorage.getItem("bag"));
  }
  console.log("return bag list: ", returnList);

  return {
    type: "BAG_ITEMS",
    payload: returnList,
  };
};

export const clearBag = () => {
  localStorage.removeItem("bag");
  return {
    type: "CLEAR_BAG_ITEMS",
    payload: [],
  };
};

export const placeOrder = (
  { fname, lname, address, phone, city, landmark, state, pin },
  products,
  userId
) => {
  return async (dispatch, getState) => {
    const url = "/placeorder";
    console.log("url:", url);
    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("landmark", landmark);
    formData.append("state", state);
    formData.append("pin", pin);
    formData.append("products", JSON.stringify(products));
    formData.append("userid", userId);
    console.log("passed products:", JSON.stringify(products));
    const response = await uploadEndpoint.post(url, formData);
    console.log(response);
    dispatch({
      type: "CREATE_ORDER",
      // payload: JSON.parse(response.data),
      payload: response.data,
    });
  };
};

export const startLoaderForOrder = () => {
  return {
    type: "START_ORDER",
    payload: null,
  };
};