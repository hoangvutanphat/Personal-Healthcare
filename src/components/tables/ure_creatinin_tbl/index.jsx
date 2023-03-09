import React from "react";
import "./lipidBloodTbl.scss";
import { Table } from "antd";
import moment from "moment";
import { TblPagination } from "../../../common";

const UreCreatininTable = ({ data, dateFormat }) => {
  const columns = [
    {
      title: "Ngày",
      dataIndex: "EXAM_DATE",
      key: "EXAM_DATE",
      render: (text) => moment(text).format(dateFormat),
      width: "33%",
      align: "center",
    },
    {
      title: "Chỉ số Ure",
      dataIndex: "UREA_RESULT",
      key: "UREA_RESULT",
      width: "33%",
      align: "center",
    },
    {
      title: "Chỉ số Creatinin",
      dataIndex: "CREATINE_RESULT",
      key: "CREATINE_RESULT",
      width: "33%",
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

export default UreCreatininTable;
