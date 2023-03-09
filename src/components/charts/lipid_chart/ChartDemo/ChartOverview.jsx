import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/plots";
import { DatePicker, Space } from "antd";
import {
  ExclamationCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import icon from "../../../../assets/images/Vector.png";
import { ROUTES } from "../../../../constant/router";
import { Link } from "react-router-dom";
import { chartColor } from "../../../../common";
import { bloodLipdByUserIdState } from "../../../../recoil/atom/physicalExamState";
import { useRecoilState } from "recoil";
import {
  bloodLipidData,
  bloodLipidsByUserData,
} from "../../../../common/getAllHealthIndexApi";
import { lipidBloodByUserState } from "../../../../recoil/atom/healthIndexState";
import moment from "moment";
import Form from "antd/lib/form/Form";

const monthFormat = "MM/YYYY";

const ChartOverview = () => {
  const [form] = Form.useForm();
  const [bloodLipidsByUser, setBloodLipidByUser] = useRecoilState(
    bloodLipdByUserIdState
  );
  const [bloodLipidsByUserId, setBloodLipidsByUserId] = useRecoilState(
    lipidBloodByUserState
  );
  const [data, setData] = useState([]);
  const [listBloodLipid, setListBloodLipid] = useState([]);
  const [bloodLipidLast, setBloodLipidLast] = useState(undefined);
  const [timeSelect, setTimeSelect] = useState(undefined);
  const [timeInitial, setTimeInitial] = useState(undefined);

  useEffect(() => {
    bloodLipidData(bloodLipidsByUserId, setBloodLipidsByUserId);
  }, []);

  useEffect(() => {
    bloodLipidsByUserData(bloodLipidsByUser, setBloodLipidByUser);
  }, []);

  function unique(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      const item = new Date(arr[i]?.EXAM_DATE).getFullYear();
      if (!newArr.includes(item)) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }

  useEffect(() => {
    if (bloodLipidsByUserId) {
      setListBloodLipid(unique(bloodLipidsByUserId));
      setBloodLipidLast(bloodLipidsByUserId[bloodLipidsByUserId.length - 1]);
    }
  }, [bloodLipidsByUserId]);

  const onChange = (date) => {
    setTimeSelect(date);
  };

  //FUNCTION PUSH DATA FOR CHART
  function myFunction(array) {
    const getAll = Object.entries(array);
    const myIndex = [];
    getAll?.forEach(([key, value]) => {
      myIndex.push({
        year: new Date(value?.EXAM_DATE).toLocaleDateString("pt-PT"),
        name: "Tình trạng của bạn",
        index: value.CHOLESTEROL_RESULT,
      });
      myIndex.push({
        year: new Date(value?.EXAM_DATE).toLocaleDateString("pt-PT"),
        name: "Min",
        index: 3.9,
      });
      myIndex.push({
        year: new Date(value?.EXAM_DATE).toLocaleDateString("pt-PT"),
        name: "Max",
        index: 6.5,
      });
    });
    return myIndex;
  }

  //GET DATA FOR CHART
  useEffect(() => {
    if (timeSelect) {
      const resultData = listBloodLipid?.filter((item) => {
        const dataOflist = moment(new Date(item.EXAM_DATE)).format("MM/YYYY");
        const keywork = new Date(timeSelect)
          .toLocaleDateString("pt-PT")
          .slice(3);
        return dataOflist === keywork;
      });
      setData(() => myFunction(resultData));
    }
    if (!timeSelect && timeInitial) {
      const resultData = listBloodLipid?.filter((item) => {
        const dataOflist = moment(new Date(item.EXAM_DATE)).format("MM/YYYY");
        const keywork = new Date(timeInitial)
          .toLocaleDateString("pt-PT")
          .slice(3);
        return dataOflist === keywork;
      });
      setData(() => myFunction(resultData));
    }
    if (timeSelect === undefined) {
      setData(() => myFunction(listBloodLipid));
    }
    if (timeSelect === null) {
      setData([]);
    }
  }, [listBloodLipid, timeSelect]);

  const config = {
    data,
    xField: "year",
    yField: "index",
    seriesField: "name",
    width: 502,
    height: 290,
    yAxis: {
      label: {
        formatter: (v, item, index) => {
          return `${(v / 1).toFixed(1)}`;
        },
      },
    },
    maxLimit: 5,
    colorField: "name",
    color: ({ name }) => {
      if (name === "Min") {
        return chartColor.min;
      } else if (name === "Max") {
        return chartColor.max;
      }
      return chartColor.default;
    },
    lineStyle: {
      lineWidth: 4,
      shadowColor: "black",
    },
    legend: false,
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
    offset: 10,
    tooltip: {
      domStyles: {
        // g2-tooltip: ,
        "g2-tooltip-title": {
          fontSize: "20px",
        },
        // 'g2-tooltip-list'?: CSSProperties,
        // 'g2-tooltip-list-item'?: CSSProperties,
        // "g2-tooltip-marker": {
        //   display: "none",
        // },
        "g2-tooltip-value": {
          fontSize: "30px",
        },
        // "g2-tooltip-name": {
        //   display: "none",
        // },
      },
      reversed: true,
    },
    theme: {
      styleSheet: {
        brandColor: "red",
      },
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
  };

  return (
    <div className="chart-demo">
      <p className="title-x">
        Total visits{" "}
        <span className="title-x__Icon">
          <ExclamationCircleOutlined />
        </span>
      </p>
      {data?.length > 0 ? (
        <Line {...config} />
      ) : (
        <Space
          className="chart-info py-10"
          style={{ fontSize: "20px", padding: "20px", minHeight: 280 }}
          wrap
        >
          Không có dữ liệu
        </Space>
      )}
      <div className="chart-info">
        <div className="line-info">
          <div className="legend">
            <p className="legend__name">Tình trạng của bạn</p>
            <p
              className="legend__line"
              style={{ background: chartColor.default }}
            ></p>
          </div>
          <div className="legend">
            <p className="legend__name">Min</p>
            <p
              className="legend__line"
              style={{ background: chartColor.min }}
            ></p>
          </div>
          <div className="legend">
            <p className="legend__name">Max</p>
            <p
              className="legend__line"
              style={{ background: chartColor.max }}
            ></p>
          </div>
        </div>
        <Form form={form}>
          <Form.Item name="MONTH_SELECT">
            <DatePicker
              onChange={onChange}
              picker="month"
              format={monthFormat}
              style={{
                width: 100,
                height: 30,
                marginRight: 16,
                borderRadius: 4,
              }}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="chart_footer">
        <div className="chart_footer__img">
          <img src={icon} alt="icons" />
        </div>
        <Link to={ROUTES.HEALTH_HANDBOOK.HEALTH_ADVICE.path}>
          Xem tư vấn về bệnh lý{" "}
          <ArrowRightOutlined style={{ fontSize: 16, marginLeft: 5 }} />
        </Link>
      </div>
    </div>
  );
};

export default ChartOverview;
