import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Form, Input, Skeleton, Space, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useOrg } from "../../hooks/org";

// import { GoogleLogin } from "react-google-login";
// import { useJwt } from "../../hooks/jwt";
// import { useSetRecoilState } from "recoil";
// import { authState } from "../../recoil/atom/authState";
// import axiosUser from "../../utils/axiosUser";
// import FacebookLogin from "react-facebook-login";
// import { useSnackbar } from "notistack";
// import axiosApiInstance from "../../utils/axiosClient";
// import { useOrg } from "../../hooks/org";
// import logo from "../../assets/images/logo.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { getOrgByDomain, loading: loadingLogo } = useOrg();
  const [org, setOrg] = useState();

  const handleGetOrgByDomain = async () => {
    let domain = window.location.href.slice(0, -1);
    domain = domain.slice(0, domain.indexOf('/auth'))
    const data = await getOrgByDomain(domain);
    if (data) {
      setOrg(data);
    }
  };

  useEffect(() => {
    handleGetOrgByDomain();
  }, []);

  console.log("org: ", org);

  const onFinish = async (values) => {
    await login(values);
  };

  return (
    <>
      <div className="page-wrapper full-page-login">
        <div className="page-center">
          <Spin spinning={loading}>
            <div
              className="page-content form-wrapper d-flex justify-content-center"
            >
              <div className="row w-100 mx-0 auth-page">
                <div className="col-md-6 col-xl-4 mx-auto">
                  <div className="card">
                    <div className="row justify-content-center">
                      <div className="col-md-12 ps-md-0">
                        <div className="auth-form-wrapper px-4 py-5">
                          <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                          >
                            <Link to="/" className="noble-ui-logo d-block mb-2">
                              <img
                                style={{
                                  height: 70,
                                  display: "block",
                                  margin: "0 auto",
                                }}
                                src={org && org?.LOGO_NAME}
                                alt="logo"
                              />
                            </Link>
                            <h5 className="text-muted text-center fw-normal mb-4">
                              Welcome back! Log in to your account.
                            </h5>
                          </Stack>
                          <Form
                            className="login-form"
                            name="basic"
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                          >
                            <Form.Item
                              // label={"Username"}
                              name="USER_NAME"
                              rules={[
                                {
                                  // required: true,
                                  message: "Please input your username!",
                                },
                              ]}
                            >
                              <Input
                                bordered={false}
                                size="large"
                                prefix={
                                  <UserOutlined className="site-form-item-icon login-form-icon" />
                                }
                                placeholder="Username"
                                autoFocus={true}
                              />
                            </Form.Item>

                            <Form.Item
                              // label={"Password"}
                              name={"USER_PW"}
                              rules={[
                                {
                                  // required: true,
                                  message: "Please input your password!",
                                },
                              ]}
                            >
                              <Input.Password
                                bordered={false}
                                size="large"
                                prefix={
                                  <LockOutlined className="site-form-item-icon login-form-icon" />
                                }
                                type="password"
                                placeholder="Password"
                              />
                            </Form.Item>

                            <Form.Item>
                              <Button
                                className="login-form-button w-100"
                                htmlType="submit"
                                // loading={isLoading}
                                type="primary"
                              >
                                Login
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Link className="login-form-link" to="/auth/forgot-password">
                                Forgotten password?
                              </Link>
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default Login;
