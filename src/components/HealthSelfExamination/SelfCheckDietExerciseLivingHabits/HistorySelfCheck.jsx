import React from "react";
import { Space, Table, Tag } from "antd";

const HistorySelfCheck = () => {
  const columns = [
    {
      title: "Ngày kiểm tra",
      dataIndex: "PHYSICAL_DATE",
      key: "PHYSICAL_DATE",
      render: (text) => <a>{text}</a>,
      align: "center",
    },
    {
      title: "Xem kết quả tự kiểm tra",
      key: "action",
      render: () => <a style={{ color: "blue" }}> Xem chi tiết</a>,
      align: "center",
    },
  ];
  const data = [
    {
      PHYSICAL_DATE: "10/03/2021",
    },
    {
      PHYSICAL_DATE: "10/03/2022",
    },
    {
      PHYSICAL_DATE: "13/04/2023",
    },
  ];
  return (
    <>
      <h3>Lịch sử tự kiểm tra của bạn </h3>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default HistorySelfCheck;
