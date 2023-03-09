import React from "react";
import "./btnmedicalconsultation.scss";

const BtnMedicalCondition = ({
  title,
  onOk,
  icon_btn,
  bg_color,
  text_color,
  border,
}) => {
  return (
    <div
      className={`btn-medical-condition ${bg_color}  ${border}`}
      onClick={onOk}
    >
      <span className={`${text_color}`}>{title}</span>
      {icon_btn && <img src={icon_btn} alt="" />}
    </div>
  );
};

export default BtnMedicalCondition;
