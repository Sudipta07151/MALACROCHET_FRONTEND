const getAuthenticationReducers = (userData = null, action) => {
  switch (action.type) {
    case "SIGN_UP_USER":
      return action.payload;
    case "DATABASE_RESPONSE":
      return { ...userData, upload: action.payload };
    default:
      return userData;
  }
};

export default getAuthenticationReducers;
