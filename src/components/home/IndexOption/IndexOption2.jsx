import React from "react";

const IndexOption2 = ({ title, value, percent }) => {
  return (
    <div className="indexOption-container">
      <div className="indexInfo">
        <p className="indexInfo__title">{title}</p>
        <div className="indexInfo__value">
          <p className="indexInfo__value--value">{value}</p>
          <p className="indexInfo__value--percent">{percent}</p>
        </div>
      </div>
      <div className="chartInfo"></div>
    </div>
  );
};

export default IndexOption2;
