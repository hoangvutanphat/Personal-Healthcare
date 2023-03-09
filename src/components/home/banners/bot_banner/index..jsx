import React from "react";
import { authState } from "../../../../recoil/atom/authState";
import { useRecoilValue } from "recoil";
import arrowNext from "../../../../assets/images/arrowNext.svg";
import banner_03 from "../../../../assets/images/banner_03.svg";
import LabelTitleBottom from "../../../LabelTitles/LabelTitleBottom";
import "./style.scss";

const BannerBot = ({ isShow }) => {
  const auth = useRecoilValue(authState);
  return (
    <div className="container-fluid">
      <div className="banner-wrapper">
        <div className="banner-img">
          <img src={banner_03} alt="" />
        </div>
        <div className="banner-content">
          {isShow ? (
            ""
          ) : (
            <div className="large-title">
              <h1>
                <span>
                  {auth?.profile?.FIRST_NAME} {auth?.profile?.LAST_NAME}{" "}
                </span>
                nhớ tự kiểm tra sức khoẻ định kỳ của mình nhé.
              </h1>
            </div>
          )}

          <p>
            Đoạn giới thiệu ngắn, Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          {isShow ? (
            ""
          ) : (
            <LabelTitleBottom
              content="KIỂM TRA SỨC KHOẺ"
              Icon_arrow={arrowNext}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerBot;
