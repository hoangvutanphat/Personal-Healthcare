import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

const useConfirm = (onDelete, title, onOpen) => {
  const { confirm } = Modal;

  const showDeleteConfirm = (id, data) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: "Dữ liệu không thể được khôi phục",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Tiếp tục",
      onOk() {
        onDelete(id, data);
      },
      onCancel() {
        onOpen()
      },
      width: 800
    });
  };
  return {
    confirm: showDeleteConfirm,
  };
};

export default useConfirm;
