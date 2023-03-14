import './style.scss';

import { Col, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { authData } from '../../../../src/common/getAllApi';
import { authState } from '../../../../src/recoil/atom/authState';
import { dateFormat } from '../../../../src/common';
import icon_grey_calendar from '../../../../src/assets/images/icon_grey_calendar.svg';
import icon_grey_gender from '../../../../src/assets/images/icon_grey_gender.svg';
import icon_grey_profile from '../../../../src/assets/images/icon_grey_profile.svg';
import icon_grey_type from '../../../../src/assets/images/icon_grey_type.svg';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import userApi from '../../../../src/api/userApi';

const Profile = (props) => {
    const [auth, setAuth] = useRecoilState(authState);
    //const [focused, setFocused] = useState(false);
    //const { label, errorMessage, onChange, id, type, ...inputProps } = props;

    const getUserById = async (id) => {
        let res = await userApi.getUser(id);
        try {
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (Object.getOwnPropertyNames(auth).length === 0) {
            authData(auth, setAuth);
        }
    }, [auth]);
    const FULL_NAME = auth?.profile?.FIRST_NAME + ' ' + auth?.profile?.LAST_NAME;
    getUserById(auth.profile.id);
    return (
        <div className="infor-page">
            <div className="personal-information">
                <h1 className="h11">Thông tin cá nhân</h1>
                <Row justify="center" gutter={[21, 21]}>
                    <Col span={7}>
                        <Space size={24} direction="vertical" style={{ width: '100%' }}>
                            <Space size={24}>
                                <img src={icon_grey_profile} alt="" />
                                <p style={{ lineHeight: '20px' }}>
                                    Họ và Tên <br /> <span style={{ fontWeight: 700 }}>{FULL_NAME ? FULL_NAME : <LoadingOutlined />}</span>
                                </p>
                            </Space>

                            <Space size={24}>
                                <img src={icon_grey_calendar} alt="" />
                                <p style={{ lineHeight: '20px' }}>
                                    Ngày sinh <br />{' '}
                                    <span style={{ fontWeight: 700 }}>
                                        {auth ? (
                                            //moment(auth?.profile?.BOD).format(dateFormat)
                                            <p>Chưa cập nhật</p>
                                        ) : (
                                            <LoadingOutlined />
                                        )}
                                    </span>
                                </p>
                            </Space>

                            <Space size={24}>
                                <img src={icon_grey_gender} alt="" />
                                <p style={{ lineHeight: '20px' }}>
                                    Giới tính <br />{' '}
                                    <span style={{ fontWeight: 700 }}>{auth ? auth?.profile?.Gender?.NAME : <LoadingOutlined />}</span>
                                </p>
                            </Space>

                            <Space size={24}>
                                <img src={icon_grey_profile} alt="" />
                                <p style={{ lineHeight: '20px' }}>
                                    Số điện thoại liên lạc <br />{' '}
                                    <span style={{ fontWeight: 700 }}>{auth ? auth?.profile.PRIMARY_PHONE : <LoadingOutlined />}</span>
                                </p>
                            </Space>
                            <Space size={24}>
                                <img src={icon_grey_profile} alt="" />
                                <p style={{ lineHeight: '20px' }}>
                                    Email <br /> <span style={{ fontWeight: 700 }}>{auth ? auth?.profile.EMAIL : <LoadingOutlined />}</span>
                                </p>
                            </Space>
                        </Space>
                    </Col>
                    <Col span={7}>
                        <Space size={24} direction="vertical" style={{ width: '100%' }}>
                            <Space size={26}>
                                <img src={icon_grey_profile} alt="" />
                                <p style={{ lineHeight: '20px' }}>
                                    Chiều cao (cm) <br /> {/* dien thong tin de cap nhat */}
                                    <span style={{ fontWeight: 700 }}>
                                        <LoadingOutlined />
                                    </span>
                                </p>
                            </Space>
                            <Space size={26}>
                                <img src={icon_grey_profile} alt="" />
                                <p style={{ lineHeight: '20px' }}>
                                    Cân nặng (kg) <br />{' '}
                                    <span style={{ fontWeight: 700 }}>
                                        <LoadingOutlined />
                                    </span>
                                </p>
                            </Space>
                        </Space>
                    </Col>
                    <Col span={7}>
                        <Space size={24} direction="vertical" style={{ width: '100%' }}>
                            <Space size={26}>
                                <img src={icon_grey_profile} alt="" />
                                <p style={{ lineHeight: '20px' }}>
                                    Chỉ số BMI <br /> {/* dien thong tin de cap nhat */}
                                    <span style={{ fontWeight: 700 }}>Cập nhật để hiển thị</span>
                                </p>
                            </Space>
                            <Space size={26}>
                                <img src={icon_grey_profile} alt="" />
                                <p style={{ lineHeight: '20px' }}>
                                    Chỉ số BMR <br /> {/* dien thong tin de cap nhat */}
                                    <span style={{ fontWeight: 700 }}>Cập nhật để hiển thị</span>
                                </p>
                            </Space>
                            <Space size={26}>
                                <img src={icon_grey_profile} alt="" />
                                <p style={{ lineHeight: '20px' }}>
                                    Chỉ số TDEE <br /> {/* dien thong tin de cap nhat */}
                                    <span style={{ fontWeight: 700 }}>Cập nhật để hiển thị</span>
                                </p>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </div>
            <div className="button12">
                <Link to="/update-info" className="btn-update">
                    Cập nhật thông tin
                </Link>
            </div>
        </div>
    );
};
export default Profile;
