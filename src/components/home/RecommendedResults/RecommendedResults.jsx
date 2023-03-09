import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import IconList from "../../../assets/images/icon_list.svg";
import { Row, Col, Space } from "antd";
import icon_recommend from "../../../assets/images/Vector.png";
import { useRecoilValue } from "recoil";
import { recommendedDataState } from "../../../recoil/atom/recommendedIndexState";

const RecommendedResults = () => {
  const recommendedData = useRecoilValue(recommendedDataState);

  return (
    <div className="recommendedResults-wrapper">
      <div className="recommendedResults-container">
        <p className="recommendedResults-container__title">
          Nguyến nghị dành cho bạn:
        </p>
        {recommendedData &&
          recommendedData.map((item, index) => {
            return (
              <Row className="recommendedResultIndex-wrapper" key={index}>
                <Col span={2}>
                  <div className="recommendedResultIndex-icon">
                    <img src={icon_recommend} alt="" />
                  </div>
                </Col>
                <Col span={22}>
                  <Space className="recommendedResultIndex-title">
                    <p>Khuyến nghị dành cho bạn về: </p>
                    <p className="recommendedResultIndex-unit">{item?.NAME}</p>
                  </Space>
                  {item?.Recommended_Classification?.CONTENT ? (
                    <p className="recommended-content">
                      {item?.Recommended_Classification?.CONTENT}
                    </p>
                  ) : (
                    <p className="recommended-content">
                      Không có khuyến nghị nào cho chỉ số sức khỏe này
                    </p>
                  )}
                </Col>
              </Row>
            );
          })}
        <div className="recommendedResults-container__SeeMore">
          <div className="recommendedResults-container__SeeMore--img">
            <img src={IconList} alt="" />
          </div>
          <p>Xem thêm khuyến nghị</p>
          <span>
            <ArrowRightOutlined />
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendedResults;
