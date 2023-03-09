import React from "react";
import { Space, Table, Tag } from "antd";
import "./style.scss";
import moment from "moment";
import { TblPagination } from "../../../common";

const BloodPressureTable = ({ data, dateFormat }) => {
  const columns = [
    {
      title: "Ngày",
      dataIndex: "EXAM_DATE",
      key: "EXAM_DATE",
      render: (text) => moment(text).format(dateFormat),
      width: "33.33%",
      align: "center",
    },
    {
      title: "Chỉ số tâm thu",
      key: "SYSTOLIC",
      render: (_, record) => <>{record?.SYSTOLIC?.toFixed()}</>,
      width: "33.33%",
      align: "center",
    },
    {
      title: "Chỉ số tâm trương",
      render: (_, record) => <>{record?.DIASTOLE?.toFixed()}</>,
      key: "DIASTOLE",
      width: "33.33%",
      align: "center",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={TblPagination}
      loading={data ? false : true}
    />
  );
};

export default BloodPressureTable;
