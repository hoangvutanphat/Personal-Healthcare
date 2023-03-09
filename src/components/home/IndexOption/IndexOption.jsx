import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.scss";

const IndexOption = ({
  title,
  title1,
  title2,
  title3,
  title4,
  title5,
  value,
  value1,
  value2,
  value3,
  value4,
  percent,
}) => {
  return (
    <div className="indexOption-container">
      <div className="indexInfo">
        <p className="indexInfo__title">{title}</p>
        <div className="indexInfo__value">
          <p className="indexInfo__value--value">
            {value ? (
              <div className="index">
                <span className="index-title">{title1 + ": "} </span>
                <span className="index-value">{value}</span>
              </div>
            ) : (
              <LoadingOutlined />
            )}
            {Number(value1) !== 0 && (
              <div className="index">
                <span className="index-title">{title2 && title2 + ":"} </span>
                <span className="index-value">{value1}</span>
              </div>
            )}
            {Number(value2) !== 0 && (
              <div className="index">
                <span className="index-title">{title3 && title3 + ":"} </span>
                <span className="index-value">{value2}</span>
              </div>
            )}
            {Number(value3) !== 0 && (
              <div className="index">
                <span className="index-title">{title4 && title4 + ":"} </span>
                <span className="index-value">{value3}</span>
              </div>
            )}
            {Number(value4) !== 0 && (
              <div className="index">
                <span className="index-title">{title5 && title5 + ":"} </span>
                <span className="index-value">{value4}</span>
              </div>
            )}
          </p>
          <p className="indexInfo__value--percent">{percent}</p>
        </div>
      </div>
      <div className="chartInfo"></div>
    </div>
  );
};

export default IndexOption;
