import React from "react";
import { Link } from "react-router-dom";
import Icon_arrowNext from "../../assets/images/arrowNext.svg";

const LabelTitleBottom = ({ content, route, onShowInfo, Icon_arrow }) => {
  return (
    <>
      {route ? (
        <Link to={route}>
          <div className="title-bottom-container" onClick={onShowInfo}>
            <p>{content}</p>
            <img src={Icon_arrow ? Icon_arrow : Icon_arrowNext} alt="" />
          </div>
        </Link>
      ) : (
        <div className="title-bottom-container" onClick={onShowInfo}>
          <p>{content}</p>
          <img src={Icon_arrow ? Icon_arrow : Icon_arrowNext} alt="" />
        </div>
      )}
    </>
  );
};

export default LabelTitleBottom;
