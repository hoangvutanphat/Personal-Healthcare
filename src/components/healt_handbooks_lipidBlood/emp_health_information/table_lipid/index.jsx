import React from "react";
import LipidBloodTable from "../../../tables/lipid_blood_tbl";
import "./table_lipid.scss";
const TableLipid = () => {
  return (
    <div className="box__table">
      <div className="box__table__title">
        <div className="box__table__title__left">
          <p className="box__table__title__left__p">
            Bảng theo dõi chỉ số Men gan
          </p>
        </div>
        <div className="box__table__title__right">
          <p className="box__table__title__right__p">Tải kết quả đo của bạn</p>
        </div>
      </div>
      <LipidBloodTable />
    </div>
  );
};

export default TableLipid;
