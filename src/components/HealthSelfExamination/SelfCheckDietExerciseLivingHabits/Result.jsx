import { Button, Col, Divider, Image, Radio, Row, Slider } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import {
  motiveState,
  nutritionState,
  otherHabitState,
  resultState,
} from "../../../recoil/atom/selfCheckState";
const marks = {
  0: "0",
  20: {
    label: <strong>20</strong>,
  },
};

const Result = ({
  setIsChange,
  setIsResult,
  setIsOtherHabits,
  setIsNutrition,
  setIsMotive,
}) => {
  const [dataNutrition, setDataNutrition] = useRecoilState(nutritionState);
  const [dataMotive, setDataMotive] = useRecoilState(motiveState);
  const [dataOtherHabits, setDataOtherHabits] = useRecoilState(otherHabitState);
  const [dataResult, setDataResult] = useRecoilState(resultState);

  const handleSave = () => {
    setIsChange(true);
    setIsResult(false);
    setIsOtherHabits(false);
    setIsNutrition(false);
    setIsMotive(false);
    setDataNutrition(undefined);
    setDataMotive(undefined);
    setDataOtherHabits(undefined);
    // setDataResult(undefined);
  };

  return (
    <div>
      <Row justify="center" gutter={[0, 24]}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <h3>Dinh dưỡng</h3>
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>1.Số ly nước trung bình bạn uống trong một ngày?</p>
              <Slider
                marks={marks}
                value={dataNutrition?.VALUE_WATER}
                className="self-check-slider"
                max={20}
              />
              {dataNutrition && dataNutrition?.VALUE_WATER < 8 ? (
                <span>
                  Bạn không uống đủ tám (8) ly nước (mỗi ly 200 ml nước) được
                  khuyến nghị mỗi ngày. Cố gắng uống nhiều nước hơn bằng cách
                  mang theo một bình nước cá nhân để uống trong ngày.
                </span>
              ) : (
                <span>
                  Hãy giữ thói quen uống nước thường xuyên để có sức khỏe tốt
                  bạn nhé.
                </span>
              )}
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Nước là dung môi của hầu hết các chất chuyển hoá dưới dạng
                  hoà tan trong nước đảm bảo quá trình bình thường của cơ thể,
                  nước còn tham gia vào nhiều phản ứng hoá học quan trọng.
                </span>
                <span>
                  - Nước rất cần thiết cho cơ thể trong điều hoà thân nhiệt, giữ
                  cho thân nhiệt chỉ dao động trong giới hạn hẹp khi nhiệt độ
                  của môi trường sống thay đổi.
                </span>
                <span>
                  - Nước còn làm giảm độ quánh của máu, giúp cho máu tuần hoàn
                  dễ dàng.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>2.Lượng ngũ cốc trung bình bạn ăn trong 1 ngày?</p>
              <Slider
                className="self-check-slider"
                marks={marks}
                value={dataNutrition?.VALUE_CEREAL}
                max={20}
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Ngũ cốc sẽ cung cấp cho bạn nhiều các chất đa lượng và các
                  vitamin khoáng chất rất cần thiết cho cơ thể, trong đó glucid
                  (chất bột đường) chiếm phần lớn và là nguồn năng lượng chính
                  cho hoạt động của cơ, não bộ.
                </span>
                <span>
                  - Ngũ cốc là thành phần chính trong chế độ dinh dưỡng của loài
                  người, cung cấp nguồn tinh bột chính cho nhu cầu năng lượng
                  hàng ngày. Ngoài ra, ngũ cốc còn chứa lượng chất xơ, vitamin
                  và khoáng chất đảm bảo các chức năng cơ bản của cơ thể như:
                  vitamin B1 trong cám gạo, sắt trong gạo lứt, iot trong hạt
                  kê,…
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>3.Lượng rau củ bạn ăn trung bình trong một ngày?</p>
              <Slider
                className="self-check-slider"
                marks={marks}
                value={dataNutrition?.VALUE_VEGETALE}
                max={20}
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Rau là nguồn cung cấp vitamin, khoáng chất và chất xơ giúp
                  đào thải chất độc cholesterol ra khỏi cơ thể và chống táo bón.
                  Một số rau gia vị còn có tác dụng chữa bệnh nhờ có các tinh
                  dầu và kháng sinh thực vật. Các loại rau màu xanh thẫm như rau
                  ngót, rau cải, rau muống... chứa nhiều vitamin C, vitamin K,
                  folate,…
                </span>
                <span>
                  - Các loại rau quả màu sắc như rau giền, rau cải tím, bông
                  cải, ớt chuông... giàu vitamin C, beta-carotene và các
                  flavonoids - được chứng minh là có vai trò mạnh mẽ trong giảm
                  quá trình oxy hóa, tăng cường sức đề kháng cho cơ thể, ngăn
                  ngừa bệnh tật.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>4.Lượng quả trung bình bạn ăn trong một ngày?</p>
              <Slider
                className="self-check-slider"
                marks={marks}
                value={dataNutrition?.VALUE_FRUIT}
                max={20}
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Chất xơ từ trái cây, giúp giảm lượng cholesterol trong máu
                  và có thể giảm nguy cơ mắc bệnh tim. Chất xơ rất quan trọng
                  đối với chức năng của ruột, giúp giảm táo bón và bệnh túi
                  thừa. Thực phẩm chứa chất xơ như trái cây giúp mang lại cảm
                  giác no lâu với ít calo hơn.
                </span>
                <span>
                  - Trái cây là nguồn cung cấp nhiều chất dinh dưỡng thiết yếu
                  bao gồm kali, chất xơ, vitamin C và folate (axit folic).
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>
                5.Lượng thực phẩm chứa nhiều chất đạm như thịt/thủy
                sản/trứng/đậu đỗ trung bình bạn ăn trong 1 ngày?
              </p>
              <Slider
                className="self-check-slider"
                marks={marks}
                value={dataNutrition?.VALUE_FOOD}
                max={20}
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Chất đạm nên được bổ sung đa dạng nhiều nguồn khác nhau, nên
                  bổ sung kết hợp đạm động vật và thực vật. Đạm động vật có đầy
                  đủ axít amin cần thiết còn đạm thực vật thường thiếu một hoặc
                  nhiều axit amin cần thiết và ở tỷ lệ không cân đối. Vì vậy,
                  nên dùng đạm động vật để hỗ trợ cho đạm thực vật hoặc phối hợp
                  những đạm thực vật với nhau.
                </span>
                <span>
                  - Người trưởng thành năng lượng protein từ động vật từ 30 -
                  50% tổng năng lượng protein, tuổi càng cao thì nguồn protein
                  từ động vật càng ít. Lượng bổ sung hợp lý với người lớn bình
                  thường là 1/3 đạm động vật và 2/3 đạm thực vật.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>
                6.Số ly sữa/chế phẩm sữa trung bình bạn uống/ăn trong 1 ngày?
              </p>
              <Slider
                className="self-check-slider"
                marks={marks}
                value={dataNutrition?.VALUE_MILK}
                max={20}
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Sữa và chế phẩm sữa là những thực phẩm có giá trị dinh dưỡng
                  cao, trong thành phần có đầy đủ các chất đạm, chất béo, đường,
                  vitamin và chất khoáng giúp cơ thể phát triển, khỏe mạnh và
                  phòng chống bệnh tật.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>7.Lượng dầu mỡ bạn tiêu thụ trong 1 ngày?</p>
              <Slider
                className="self-check-slider"
                marks={marks}
                value={dataNutrition?.VALUE_LIPID}
                max={20}
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Chất béo không bão hòa (có trong cá, bơ và các loại hạt, và
                  trong dầu hướng dương, đậu nành, dầu ô liu) thích hợp hơn chất
                  béo bão hòa (có trong thịt mỡ, bơ, cọ và dầu dừa, kem, phô
                  mai, và mỡ lợn) và transfat - tất cả các loại, bao gồm cả chất
                  béo chuyển hóa được sản xuất công nghiệp (có trong thực phẩm
                  nướng và chiên, và đồ ăn nhẹ và thực phẩm đóng gói sẵn) chất
                  béo chuyển hóa (tìm thấy trong thịt và thực phẩm từ sữa động
                  vật).
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>8.Số lượng đường trung bình bạn uống/ăn trong 1 ngày?</p>
              <Slider
                className="self-check-slider"
                marks={marks}
                value={dataNutrition?.VALUE_SUGAR}
                max={20}
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Ðường hấp thụ nhanh và thẳng vào máu nên có tác dụng trong
                  trường hợp hạ đường huyết. Tuy nhiên, không nên ăn đường quá
                  mức, đặc biệt đối với người lớn tuổi vì rất có thể dẫn đến
                  bệnh tiểu đường. Không nên ăn bánh kẹo, không được uống đồ
                  ngọt trước bữa ăn. Mỗi tháng chỉ nên ăn bình quân khoảng 500g
                  đường mỗi người.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>9.Số lượng muối trung bình bạn ăn trong 1 ngày?</p>
              <Slider
                className="self-check-slider"
                marks={marks}
                value={dataNutrition?.VALUE_SALT}
                max={20}
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Muối ăn là loại gia vị thường dùng hằng ngày, nhưng chỉ cần
                  1 lượng rất ít. Các nhà khoa học cho biết: càng ăn mặn thì tỷ
                  lệ cao huyết áp càng tăng, do đó nên hạn chế muối ăn.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
        </Col>
      </Row>
      <Row justify="center" gutter={[0, 24]}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <h3>Vận động</h3>
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://nubesttall.vn/public/upload/motasanpham/images/vi-sao-van-dong-anh-huong-den-chieu-cao-hinh1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>
                1.Bạn dành bao nhiêu thời gian cho các hoạt động thể lực cường
                độ vừa trong một ngày?{" "}
              </p>
              <Slider
                marks={marks}
                value={dataMotive?.VALUE_STRENGTH}
                max={20}
                className="self-check-slider"
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Những hoạt động thể lực góp phần giúp cho xương khớp khỏe
                  mạnh, làm giảm các dấu hiệu và triệu chứng của trầm cảm và lo
                  lắng, có thể làm giảm nguy cơ mắc nhiều bệnh phổ biến bao gồm:
                  Bệnh tim, một số bệnh ung thư, bao gồm ung thư vú và ung thư
                  ruột kết, bệnh tiểu đường loại 2, loãng xương.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
        </Col>
      </Row>
      <Row justify="center" gutter={[0, 24]}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <h3>Thói quen khác</h3>
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>1.Bạn có thường ăn bữa sáng không? </p>
              <div>
                <Radio.Group
                  value={dataOtherHabits?.VALUE_BREAKFAST}
                  className="self-check-slider"
                >
                  <Radio value={1}>Có</Radio>
                  <Radio value={2}>Không</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Bữa ăn sáng cung cấp cho cơ thể năng lượng và các chất dinh
                  dưỡng cần thiết cho lao động sau một đêm dài bụng đói. Tình
                  trạng giảm đường huyết (do đói) trong khi lao động có thể gây
                  ra những tai nạn, nhất là khi làm việc trên cao.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>
                2.Khoảng cách trung bình giữa các bữa sáng, trưa, tối trong một
                ngày của bạn là bao nhiêu?{" "}
              </p>
              <Slider
                className="self-check-slider"
                marks={marks}
                value={dataOtherHabits?.VALUE_DISTANCE}
                max={20}
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              phút
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Các bữa ăn giữa giờ (bữa trưa) tuy nhẹ nhưng phải cân đối
                  chứ không chỉ giải quyết về nhu cầu năng lượng, đủ cho no
                  bụng. Bữa ăn giữa giờ không nên quá nặng, gây buồn ngủ và
                  không nên dùng bia, rượu.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>3. Bạn thường ăn tối trước khi đi ngủ bao lâu? </p>
              <Slider
                className="self-check-slider"
                marks={marks}
                value={dataOtherHabits?.VALUE_DINNER}
                max={20}
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              phút
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                {/* <span>
                  - Nước là dung môi của hầu hết các chất chuyển hoá dưới dạng
                  hoà tan trong nước đảm bảo quá trình bình thường của cơ thể,
                  nước còn tham gia vào nhiều phản ứng hoá học quan trọng.
                </span>
                <span>
                  - Nước rất cần thiết cho cơ thể trong điều hoà thân nhiệt, giữ
                  cho thân nhiệt chỉ dao động trong giới hạn hẹp khi nhiệt độ
                  của môi trường sống thay đổi.
                </span>
                <span>
                  - Nước còn làm giảm độ quánh của máu, giúp cho máu tuần hoàn
                  dễ dàng.
                </span> */}
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>4. Bạn có thường xuyên sử dụng các đồng uống có cồn không? </p>
              <div>
                <Radio.Group
                  className="self-check-slider"
                  value={dataOtherHabits?.VALUE_ANCOL}
                >
                  <Radio value={1}>Có</Radio>
                  <Radio value={2}>Không</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Rượu có hại đối với sức khỏe do đó cần phải hạn chế. Sau khi
                  vào cơ thể, hàm lượng rượu ở tổ chức não cao gấp hai lần ở
                  máu. Lúc đầu rượu gây hưng phấn, kích thích nhưng sau đó gây
                  ức chế, mệt mỏi, buồn ngủ. Người lao động, đặc biệt là người
                  lái các phương tiện vận tải, lao động trên cao, tuyệt đối
                  không được uống rượu trong ngày lao động.
                </span>
                <span>
                  - Uống bia vừa phải, uống nhiều có thể thừa cân mà cũng không
                  nên uống trong giờ lao động. Cần duy trì chế độ ăn uống hợp lý
                  và nếp sống điều độ, lành mạnh để giữ gìn khả năng lao động và
                  sức sống trẻ trung của mình.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>5. Bạn có hút thuốc lá không? </p>
              <div>
                <Radio.Group
                  className="self-check-slider"
                  value={dataOtherHabits?.VALUE_CIGARETTE}
                >
                  <Radio value={1}>Có</Radio>
                  <Radio value={2}>Không</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Hút thuốc lá là một yếu tố làm tăng nguy cơ mắc các bệnh
                  nhiễm trùng đường hô hấp và làm tăng mức độ nghiêm trọng của
                  các bệnh về đường hô hấp. Hút thuốc lá có thể gây ung thư với
                  mọi cơ quan trong cơ thể của bạn: phổi, bàng quang, máu, cổ tử
                  cung, đại tràng, thực quản, thận, vòm họng, gan, tụy, dạ dày.
                  Hút thuốc cũng gây ra: Bệnh tim mạch, đột quỵ, bệnh phổi như
                  khí phế thũng và viêm phế quản.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>6. Bạn dành bao nhiêu tiếng để ngủ trong một ngày? </p>
              <Slider
                className="self-check-slider"
                marks={marks}
                value={dataOtherHabits?.VALUE_SLEEP}
                max={20}
              />
            </Col>
            <Col span={1} offset={1} className="unit">
              tiếng
            </Col>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 style={{ paddingBottom: 10 }}>Thông tin thêm</h4>
                <span>
                  - Giấc ngủ rất quan trọng đối với các khía cạnh khác nhau của
                  chức năng não, bao gồm nhận thức, sự tập trung, năng suất và
                  hiệu suất. các kỹ năng giải quyết vấn đề và hiệu suất nhớ được
                  chứng minh là có sự cải thiện khi bạn ngủ đủ giấc.
                </span>
                <span>
                  - Chất lượng và thời gian ngủ có thể ảnh hưởng lớn sức khỏe.
                  Đây là các yếu tố được cho là nguyên nhân gây ra các bệnh mãn
                  tính, bao gồm cả bệnh tim. Chất lượng giấc ngủ kém và rối loạn
                  giấc ngủ có thể dẫn đến các vấn đề sức khỏe tâm thần, chẳng
                  hạn như trầm cảm. Giấc ngủ kém có liên quan mạnh mẽ đến các
                  bệnh viêm ruột và có thể làm tăng nguy cơ tái phát bệnh.
                </span>
              </Col>
            </Row>
          </Row>
          <Divider />
          <Row>
            <Col span={2} push={10}>
              <Button onClick={handleSave}>LƯU KIỂM TRA</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Result;
