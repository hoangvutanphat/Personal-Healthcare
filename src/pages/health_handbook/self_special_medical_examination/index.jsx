import { Col, Row } from 'antd';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import employeeApi from '../../../api/employeeApi';
import physicalExamApi from '../../../api/physicalExamApi';
import BreadcrumbProvider from '../../../components/globals/Breadcrumb';
// import ExaminationPackageModal from '../../../components/HealthHandbooks/SelfSpecialMedicalExamination/ExaminationPackage';
import SelfSpecialMedicalExaminationList from '../../../components/HealthHandbooks/SelfSpecialMedicalExamination/MedicalExaminationList';
import SelfSpecialMedicalExaminationModal from '../../../components/HealthHandbooks/SelfSpecialMedicalExamination/MedicalExaminationModal';
import useConfirm from '../../../hooks/useConfirm';
import { authState } from '../../../recoil/atom/authState';
import { newestClinicalDetailState } from '../../../recoil/atom/clinicalDetailState';
import { dynamicSubClinicalExamSelectState, imageDiagnosticCreateState, testDiagnosticCreateState } from '../../../recoil/atom/dynamicSubClinicalExamState';
import { examinationPackageState } from '../../../recoil/atom/examinationPackageState';
import { newestPhysicalDetailState } from '../../../recoil/atom/physicalDetailState';
import { newestPhysicalExamState, physicalExamSelectState } from '../../../recoil/atom/physicalExamState';
import { tabActiveState } from '../../../recoil/atom/tabActiveState';
import axiosApiInstance from '../../../utils/axiosClient';

const SelfSpecialMedicalExamination = () => {
    const setPhysicalExamSelect = useSetRecoilState(physicalExamSelectState);
    const setNewestPhysicalExam = useSetRecoilState(newestPhysicalExamState);
    const setNewestPhysicalDetail = useSetRecoilState(newestPhysicalDetailState);
    const setNewestClinicalDetail = useSetRecoilState(newestClinicalDetailState);
    const setDynamicSubClinicalExamSelect = useSetRecoilState(dynamicSubClinicalExamSelectState);
    const setImageDiagnosticCreate = useSetRecoilState(imageDiagnosticCreateState);
    const setTetsDiagnosticCreate = useSetRecoilState(testDiagnosticCreateState);
    const setTabActive = useSetRecoilState(tabActiveState);
    const user = useRecoilValue(authState);
    const setExaminationPackageState = useSetRecoilState(examinationPackageState);

    const { enqueueSnackbar } = useSnackbar();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState();
    const [physicalExamProcess, setPhysicalExamProcess] = useState();
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [employee, setEmployee] = useState(false);
    const [activeKey, setActiveKey] = useState("1");

    useEffect(() => {
        if (user) {
            let id = user.profile?.Employees[0]?.id;
            (async () => {
                try {
                    let res = await employeeApi.getEmployee(id);
                    if (res.data) {
                        setEmployee(res.data.elements.employee);
                    }
                } catch (error) {
                    console.log(error);
                }
            })()
        }
    }, [user]);

    useEffect(() => {
        (async () => {
            const path = `physicalExam/getAllByQuery`;
            const data = {
                USER_ID: user?.profile?.id
            }
            setLoading(true);
            try {
                const res = await axiosApiInstance.post(path, data);
                if (res.data) {
                    const selfSpecialPhysicalExamList = res.data.elements.filter(item => item.TYPE === 2 || item.TYPE === 7);
                    setPhysicalExamProcess(selfSpecialPhysicalExamList.filter(item => item.INPUT_STATUS === 0));
                    // setDataSource(selfSpecialPhysicalExamList.filter(item => item.INPUT_STATUS === 1));
                    setDataSource(selfSpecialPhysicalExamList);
                    setLoading(false);
                    setReload(false);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                setReload(false);
            }
        })();
    }, [user, reload]);

    const handleDeletePhysicalExam = async (id) => {
        try {
            let res = await physicalExamApi.deletePhysicalExam(id);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
        }
    };
    const handleOpenUpdate = (data) => {
        setPhysicalExamSelect(data);
        setExaminationPackageState(data?.TYPE === 2 ? "Tự khám" : "Đặc biệt");
        setIsModalOpen(true);
        setActiveKey("1");
        // setTabActive({
        //     personalInformation: false,
        //     medicalHistory: false,
        //     physicalExam: false,
        //     clinicalExam: false,
        //     subClinicalExam: false,
        //     conclusions: false,
        // })
    };
    const handleUpdatePhysicalExam = async (value, id) => {
        try {
            let res = await physicalExamApi.updatePhysicalExam(value, id);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" })
        }
    };

    const handleOpenModal = () => {
        // if (physicalExamProcess.length) {
        //     confirm(physicalExamProcess[0]?.id);
        // } else {
        //     setIsModalOpen(true);
        //     setActiveKey("1");
        //     setTabActive({
        //         personalInformation: false,
        //         medicalHistory: true,
        //         physicalExam: true,
        //         clinicalExam: true,
        //         subClinicalExam: true,
        //         conclusions: true,
        //     })
        // }
        setIsModalOpen(true);
        setActiveKey("1");
        setTabActive({
            personalInformation: false,
            medicalHistory: true,
            physicalExam: true,
            clinicalExam: true,
            subClinicalExam: true,
            conclusions: true,
        })
    }
    const handleOpenContinue = async () => {
        setPhysicalExamSelect(physicalExamProcess[0]);
        setIsModalOpen(true);
        setActiveKey("1");
        setTabActive({
            personalInformation: false,
            medicalHistory: true,
            physicalExam: true,
            clinicalExam: true,
            subClinicalExam: true,
            conclusions: true,
        })
    };
    const handleCancel = () => {
        setPhysicalExamSelect(undefined);
        setNewestPhysicalDetail(undefined);
        setNewestClinicalDetail(undefined);
        setNewestPhysicalExam(undefined);
        setIsModalOpen(false);

        setDynamicSubClinicalExamSelect(undefined);
        setImageDiagnosticCreate([]);
        setTetsDiagnosticCreate([]);
    }

    const { confirm } = useConfirm(
        handleDeletePhysicalExam,
        "Bạn đang có một phiếu KSK chưa hoàn thành? Bạn muốn tiếp tục nhập hay xóa?",
        handleOpenContinue
    );

    return (
        <>
            <BreadcrumbProvider
                address="Khám sức khoẻ Tự khám/Gói đặc biệt"
            />
            <div className="container-fluid page-container">
                <Row
                    justify="center"
                    gutter={[0, 24]}
                    className="top-content-box"
                >
                    {/* <Col xs={{ span: 22 }} lg={{ span: 18 }} >
                        <ExaminationPackageModal
                            isOpen={isOpen}
                            title="Chọn gói khám"
                            onCancel={() => setIsOpen(false)}
                        />
                    </Col> */}
                    <Col xs={{ span: 22 }} lg={{ span: 18 }} >
                        <SelfSpecialMedicalExaminationList
                            setModalOpen={handleOpenModal}
                            onDelete={handleDeletePhysicalExam}
                            openEdit={handleOpenUpdate}
                            data={dataSource}
                            loading={loading}
                            setReload={setReload}
                            employee={employee}
                        />
                        <SelfSpecialMedicalExaminationModal
                            isOpen={isModalOpen}
                            onCancel={handleCancel}
                            onUpdatePhysicalExam={handleUpdatePhysicalExam}
                            activeKey={activeKey}
                            setActiveKey={setActiveKey}
                            reload={() => setReload(true)}
                            employee={employee}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default SelfSpecialMedicalExamination