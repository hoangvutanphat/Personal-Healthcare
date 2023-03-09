import React from "react";
import { Space, Table, Tag } from "antd";
import "./style.scss";
import moment from "moment";
import { TblPagination } from "../../../common";

const LiverEnzymeTable = ({ data, dateFormat }) => {
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
      title: "SGPT/ALT",
      dataIndex: "SGPT_ALT_RESULT",
      key: "SGPT_ALT_RESULT",
      width: "33.33%",
      align: "center",
    },
    {
      title: "SGOT/AST",
      dataIndex: "SGOT_AST_RESULT",
      key: "SGOT_AST_RESULT",
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

export default LiverEnzymeTable;
