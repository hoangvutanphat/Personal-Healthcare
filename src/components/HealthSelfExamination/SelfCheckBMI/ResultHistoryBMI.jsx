import { Button, Spin, Table, Typography } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { dateFormat } from "../../../common";
import { employeeData } from "../../../common/getAllApi";
import { BMIData } from "../../../common/getAllHealthIndexApi";
import { authState } from "../../../recoil/atom/authState";
import { employeeState } from "../../../recoil/atom/employeeState";
import { BMIByUserState } from "../../../recoil/atom/healthIndexState";
import BMIChart from "../../charts/bmi_chart/index";

function valueBmi(data) {
  if (data?.BMI_INDEX <= 18.5 && data?.BMI_INDEX > 0) {
    return "Thiếu cân";
  } else if (data?.BMI_INDEX <= 22.9 && data?.BMI_INDEX > 18.5) {
    return "Bình thường";
  } else if (data?.BMI_INDEX <= 24.9 && data?.BMI_INDEX > 22.9) {
    return "Tiền béo phì";
  } else if (data?.BMI_INDEX <= 29.9 && data?.BMI_INDEX > 24.9) {
    return "Béo phì độ I";
  } else if (data?.BMI_INDEX > 29.9) {
    return "Béo phì độ II";
  }
}

const convertDatas = (name, PHYSICAL_DATE, index) => {
  const getDate = moment(PHYSICAL_DATE).format(dateFormat);
  return {
    name: name,
    date: getDate,
    index: Number(index),
  };
};
const handleConvertDatas = (name, key, dataConvert) => {
  return dataConvert.map((item) =>
    convertDatas(name, item.PHYSICAL_DATE, item[key])
  );
};

const ResultHistoryBMI = () => {
  const { profile } = useRecoilValue(authState);
  const [BMIByUserId, setBMIByUserId] = useRecoilState(BMIByUserState);
  const [employeeList, setEmployeeList] = useRecoilState(employeeState);

  const [data, setData] = useState(undefined);
  const [employeeUser, setEmployeeUser] = useState([]);

  useEffect(() => {
    if (BMIByUserId) {
      setData([...handleConvertDatas("BMI", "BMI_INDEX", BMIByUserId)]);
    }
  }, [BMIByUserId]);

  useEffect(() => {
    BMIData(BMIByUserId, setBMIByUserId);
  }, []);

  const columns = [
    {
      title: "Ngày theo dõi",
      render: (_, record) => {
        const date = new Date(
          record?.EXAM_DATE ? record?.EXAM_DATE : record?.PHYSICAL_DATE
        ).toLocaleDateString("en-GB");
        return date;
      },
      key: "date",

      align: "center",
      sorter: (a, b) => new Date(a.EXAM_DATE) - new Date(b.EXAM_DATE),
    },
    {
      title: "Chỉ số BMI",
      render: (_, record) =>
        record?.VALUE ? record?.VALUE : record?.BMI_INDEX,
      align: "center",
    },
    {
      title: "Tình trạng",
      render: (_, record) => valueBmi(record),
      align: "center",
    },
  ];

  const [type, setType] = useState(true);
  const selectChart = () => {
    setType(true);
  };
  const selectTable = () => {
    setType(false);
  };

  useEffect(() => {
    if (employeeList.length === 0) {
      employeeData(employeeList, setEmployeeList);
    }
  }, [employeeList]);

  useEffect(() => {
    if (profile) {
      const employeeByUser = employeeList.filter(
        (item) => item.USER_ID === profile?.id
      );
      setEmployeeUser(employeeByUser[0]);
    }
  }, [profile, employeeList]);

  const printRef = useRef();
  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      scale: 1.5,
    });
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "px", "a4");

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = Math.floor(
      (imgProperties.height * pdfWidth) / imgProperties.width
    );

    pdf.addImage(data, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.setFontSize(8);
    pdf.setTextColor("Gray");
    pdf.text("page_01", 45, pdfHeight + 140, {
      baseline: "bottom",
      align: "right",
    });

    const nameFilePDF =
      "BMI" +
      "_" +
      employeeUser?.User?.FIRST_NAME +
      " " +
      employeeUser?.User?.LAST_NAME;
    pdf.save(`${nameFilePDF}`);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        <Typography.Title level={4}>
          Lịch sử theo dõi chỉ số BMI
        </Typography.Title>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "55%",
          }}
        >
          <Typography>Xem lịch sử</Typography>
          <Button onClick={selectChart}>Dạng biểu đồ</Button>
          <Button onClick={selectTable}>Dạng bảng</Button>
          {type === true ? (
            <Button type="primary" onClick={handleDownloadPDF}>
              Tải biểu đồ
            </Button>
          ) : (
            <Button type="primary" onClick={handleDownloadPDF}>
              Tải bảng
            </Button>
          )}
        </div>
      </div>
      <div ref={printRef}>
        {type === true ? (
          <BMIChart data={data} />
        ) : (
          <Table
            columns={columns}
            dataSource={BMIByUserId}
            className="table-toxic"
            loading={BMIByUserId.length ? false : true}
            style={{ padding: 20 }}
          />
        )}
      </div>
    </>
  );
};

export default ResultHistoryBMI;
