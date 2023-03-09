import React from "react";
import Redirects from "../../redirects";
import "./style.scss";
import { ROUTES } from "../../../constant/router";

const ContentIndex = ({
  content,
  description,
  name,
}) => {
  return (
    <>
      <div className="info-result-content">
        <Redirects
          content="Thông tin sức khoẻ nhân viên"
          path={ROUTES.HEALTH_HANDBOOK.EMPLOYEE_HEALTH_INFORMATION.path}
        />
        <div className="title">
          <p>{content}<span className="green-title"> {name}</span></p>
        </div>
        <p className="description">{description}</p>
      </div>
    </>
  );
};

export default ContentIndex;
