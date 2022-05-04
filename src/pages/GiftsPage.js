import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchGiftsData } from "../actions";

import { useNavigate } from "react-router-dom";
import ItemCards from "../components/ItemCards";

function GiftsPage({ fetchGiftsData, allData }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (allData.length === 0) navigate("/");
    fetchGiftsData();
  }, [fetchGiftsData]);

  const renderItems = () => {
    return allData.map((item) => {
      return <ItemCards key={item._id.$oid} item={item} />;
    });
  };
  return (
    <div>
      {" "}
      <div>
        <h1 className="title">Gifts Page</h1>
        <div className="renderWrapper">{renderItems()}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    allData: state.getMainDataReducers.filter((item) => item.tag === "gifts"),
  };
};

export default connect(mapStateToProps, { fetchGiftsData })(GiftsPage);
