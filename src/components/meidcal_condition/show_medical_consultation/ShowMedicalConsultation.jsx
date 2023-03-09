// import { Tabs } from "antd";
// import React from "react";
// import { useRecoilValue } from "recoil";
// import { authState } from "../../../recoil/atom/authState";
// import { employeeState } from "../../../recoil/atom/employeeState";
// import BreadcrumbProvider from "../../globals/Breadcrumb";
// import BannerBot from "../../home/banners/bot_banner/index.";
// import OtherMedicalConsultation from "./OtherMedicalConsultation";
// import ShowConsultationDisease from "./ShowConsultationDisease";
// import "./style.scss";

// const ShowMedicalConsultation = () => {
//   const { profile } = useRecoilValue(authState);
//   const employeeList = useRecoilValue(employeeState);

//   const employeeUser = employeeList.filter(
//     (item) => item.USER_ID === profile?.id
//   );

//   return (
//     <div className="container-wrapper employee-health-handbook">
//       <BreadcrumbProvider adrress="Tư vấn bệnh lý của bạn" />
//       <div className="employee-health-handbook__healtHandbook">
//         <div className="container-fluid">
//           <div className="container health-container ">
//             <div className="medical-consultation-container">
//               <h1>Tư vấn bệnh lý của bạn</h1>
//               <Tabs defaultActiveKey="1" centered style={{ marginTop: 40 }}>
//                 <Tabs.TabPane
//                   tab={
//                     <p className="title-tabs">
//                       Thông tin tư vấn sức khoẻ dự trên bệnh lý của bạn
//                     </p>
//                   }
//                   key="1"
//                 >
//                   <ShowConsultationDisease />
//                 </Tabs.TabPane>
//                 <Tabs.TabPane
//                   tab={
//                     <p className="title-tabs">Thông tin tư vấn bệnh lý khác</p>
//                   }
//                   key="2"
//                 >
//                   <OtherMedicalConsultation />
//                 </Tabs.TabPane>
//               </Tabs>
//             </div>
//           </div>
//         </div>
//       </div>
//       <BannerBot />
//     </div>
//   );
// };

// export default ShowMedicalConsultation;
