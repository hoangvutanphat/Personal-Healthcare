import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

const useConfirmDelete = (onDelete, title) => {
  const { confirm } = Modal;

  const showDeleteConfirm = (id) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc muốn xóa mục này?",
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        onDelete(id);
      },
    });
  };
  return {
    confirm: showDeleteConfirm,
  };
};

export default useConfirmDelete;
