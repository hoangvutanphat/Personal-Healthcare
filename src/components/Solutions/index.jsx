import { Carousel, Typography } from "antd";
import React from "react";
import arrowNext from "../../assets/images/arrowNext.svg";
import banner_02 from "../../assets/images/banner_02.svg";
import BlogCard from "../cards/blog_card";
import LabelCard from "../cards/label_card";
import LabelTitleBottom from "../LabelTitles/LabelTitleBottom";
import { authState } from "../../recoil/atom/authState";
import { useRecoilValue } from "recoil";

const Solutions = () => {
  const auth = useRecoilValue(authState);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <div className="solutions container-fluid">
      <div className="container large-title">
        <Typography.Title>
          Giải pháp sức khoẻ từ chuyên gia dành riêng cho
          <Typography.Text>
            {" "}
            {auth?.profile?.FIRST_NAME} {auth?.profile?.LAST_NAME}
          </Typography.Text>
        </Typography.Title>
      </div>
      <div className="solutions__banner">
        <img src={banner_02} alt="banner" />
        <LabelCard
          width={"30%"}
          show={true}
          title="Title 1"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          link="#"
        />
      </div>
      <div className="solutions__content">
        <div>
          <Typography.Title className="solutions__content-title">
            CÁC BÀI VIẾT KHÁC
          </Typography.Title>

          <div className="solutions__content-list">
            <Typography.Text className="list-select">Tất cả</Typography.Text>
            <Typography.Text className="list-select">
              Giải pháp sức khỏe
            </Typography.Text>
            <Typography.Text className="list-select">
              Tư vấn dinh dưỡng
            </Typography.Text>
            <Typography.Text className="list-select">
              Đào tạo kiến thức
            </Typography.Text>
          </div>
          <Carousel
            className="card-contents container"
            {...settings}
          >
            <BlogCard />
            <BlogCard title="Ajinomoto Viet Nam 1" />
            <BlogCard />
            <BlogCard title="Ajinomoto Viet Nam 2" />
            <BlogCard />
          </Carousel>
          <div className="solutions__content-tags">
            <Typography.Text className="tag">#Tag1</Typography.Text>
            <Typography.Text className="tag">#Tag2</Typography.Text>
            <Typography.Text className="tag">#Tag3</Typography.Text>
            <Typography.Text className="tag">#Tag4</Typography.Text>
          </div>
          <div className="solutions__content-link">
            <LabelTitleBottom content="XEM TẤT CẢ" Icon_arrow={arrowNext} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
