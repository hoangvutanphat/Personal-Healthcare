import React from "react";
import "./axitUrictbl.scss";
import { Table } from "antd";
import moment from "moment";
import { TblPagination } from "../../../common";

const AxitUricTable = ({ data, dateFormat }) => {
  const columns = [
    {
      title: "Ngày",
      dataIndex: "EXAM_DATE",
      render: (text) => moment(text).format(dateFormat),
      width: "50%",
      align: "center",
    },
    {
      title: "Cholesterol",
      render: (_, record) => <>{record?.AXIT_URIC_RESULT?.toFixed(1)}</>,
      width: "50%",
      align: "center",
    },
  ];
  return (
    <Table
      // size="small"
      pagination={TblPagination}
      dataSource={data}
      columns={columns}
      loading={data ? false : true}
    />
  );
};

export default AxitUricTable;
