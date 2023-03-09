import React from "react";
import { Space, Table, Tag } from "antd";
import moment from "moment";
import { TblPagination } from "../../../common";

const GlycemicTable = ({ data, dateFormat }) => {
  const columns = [
    {
      title: "Ngày",
      dataIndex: "EXAM_DATE",
      key: "EXAM_DATE",
      render: (text) => moment(text).format(dateFormat),
      align: "center",
    },
    {
      title: "KQ nghiệm pháp dung nạp Glucose lần 1",
      dataIndex: "GLUCOSE_1",
      key: "GLUCOSE_1",
      align: "center",
    },
    {
      title: "KQ nghiệm pháp dung nạp Glucose lần 2",
      dataIndex: "GLUCOSE_2",
      key: "GLUCOSE_2",
      align: "center",
    },
    {
      title: "KQ nghiệm pháp dung nạp Glucose lần 3",
      dataIndex: "GLUCOSE_3",
      key: "GLUCOSE_3",
      align: "center",
    },
    {
      title: "Glucose lúc đói",
      dataIndex: "GLUCOSE_HUNGRY",
      key: "GLUCOSE_HUNGRY",
      align: "center",
    },
    {
      title: "HbAC1",
      dataIndex: "HBAC1",
      key: "HBAC1",
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

export default GlycemicTable;
