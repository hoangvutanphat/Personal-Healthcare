import React from "react";
import "./lipidBloodTbl.scss";
import { Table } from "antd";
import moment from "moment";
import { TblPagination } from "../../../common";
const LipidBloodTable = ({ data, dateFormat }) => {
  const columns = [
    {
      title: "Ngày",
      dataIndex: "EXAM_DATE",
      render: (text) => moment(text).format(dateFormat),
      width: "20%",
      align: "center",
    },
    {
      title: "Cholesterol",
      dataIndex: "CHOLESTEROL_RESULT",
      width: "20%",
      align: "center",
    },
    {
      title: "LDL",
      dataIndex: "HDL_RESULT",
      width: "20%",
      align: "center",
    },
    {
      title: "HDL",
      dataIndex: "LDL_RESULT",
      width: "20%",
      align: "center",
    },
    {
      title: "Triglyceride",
      dataIndex: "TRIGLYCERIDE_RESULT",
      width: "20%",
      align: "center",
    },
  ];
  return (
    <Table
      pagination={TblPagination}
      dataSource={data}
      columns={columns}
      loading={data ? false : true}
    />
  );
};

export default LipidBloodTable;
