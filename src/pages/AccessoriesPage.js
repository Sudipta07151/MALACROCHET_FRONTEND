import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAccessoriesData } from "../actions";
import ItemCards from "../components/ItemCards";
import { useNavigate } from "react-router-dom";

function AccessoriesPage({ fetchAccessoriesData, allData }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (allData.length === 0) navigate("/");
    fetchAccessoriesData();
  }, [fetchAccessoriesData]);

  const renderItems = () => {
    return allData.map((item) => {
      return <ItemCards key={item._id.$oid} item={item} />;
    });
  };
  return (
    <div>
      <h1 className="title">Accessories Page</h1>
      <div className="renderWrapper">{renderItems()}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    allData: state.getMainDataReducers.filter(
      (item) => item.tag === "accessories"
    ),
  };
};

export default connect(mapStateToProps, { fetchAccessoriesData })(
  AccessoriesPage
);
