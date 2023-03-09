import { Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const LabelCard = ({ title, content, link, width, show = false }) => {
  return (
    <Space className="card-box card-wrapper" style={{ width: width }}>
      <Typography.Title>{title}</Typography.Title>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <Link to={link}>Xem chi tiết</Link>
      {show && (
        <>
          <div className="card__divider"></div>
          <Typography.Text className="card__pagination">
            <span className="card__pagination-current">1</span>/4
          </Typography.Text>
        </>
      )}
    </Space>
  );
};
export default LabelCard;
