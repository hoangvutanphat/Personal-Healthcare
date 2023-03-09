import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

const useConfirmHealthHis = (onCreate, title) => {
  const { confirm } = Modal;

  const showHealthHisConfirm = (data) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        onCreate(data);
      },
    });
  };
  return {
    confirmCreate: showHealthHisConfirm,
  };
};

export default useConfirmHealthHis;
