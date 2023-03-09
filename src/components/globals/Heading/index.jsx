import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useRecoilValue } from "recoil";
import { Menu, Avatar, Dropdown, Space, Button, Drawer } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { routes } from "../../../routers";
import { authState } from "../../../recoil/atom/authState";
import { useAuth } from "../../../hooks/auth";
import "./style.scss";
import { DownOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons";

const Heading = () => {
  const [current, setCurrent] = useState("1");
  const [visible, setVisible] = useState(false);
  const auth = useRecoilValue(authState);
  const onClick = (e) => {
    setCurrent(e.key);
    setVisible(false);
  };

  const menu = routes.map((item) => {
    return {
      label: <Link to={item?.path}>{item.label}</Link>,
      key: item.key,
      children: item?.children?.map((x) => {
        return {
          label: <Link to={x?.path}>{x.label}</Link>,
          key: x.key,
          children: x?.children?.map((y) => {
            return {
              label: <Link to={y?.path}>{y.label}</Link>,
              key: y.key,
            };
          }),
        };
      }),
    };
  });


  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  const handleMenuClick = (e) => {
    if (e.key === '3') {
      handleLogout()
    }
  };

  const items = [
    {
      label: (
        <div className="d-flex flex-column align-items-center border-bottom px-3 py-3">
          <div className="mb-3">
            <Avatar size={64} src={auth?.profile?.AVATAR} />
          </div>
          <div className="text-center">
            <Link to={`/profile/${auth?.profile?.id}`} className="link-color">
              <p className="tx-16 fw-bolder">
                {auth?.profile?.FIRST_NAME} {auth?.profile?.LAST_NAME}
              </p>
            </Link>
            <p className="tx-16 text-muted">{auth?.profile?.EMAIL}</p>
            <p className="tx-16 text-muted">
              Roles:
              {auth?.profile?.Roles && auth?.profile?.Roles.length > 0
                ? auth?.profile?.Roles.map((role, index) => {
                  if (index > 0) {
                    return ` || ${role.NAME}`;
                  } else {
                    return ` ${role.NAME}`;
                  }
                })
                : "Not Has Roles"}
            </p>
          </div>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <Link to={`/profile/${auth?.profile?.id}`} className="nav-link tx-16">
          <span>Profile</span>
        </Link>
      ),
      key: "1",
      //   icon: <UserOutlined />
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link className="nav-link tx-16">
          <span>Logout</span>
        </Link>
      ),
      key: "3",
      //   icon: <LogoutOutlined />
    },
  ];

  return (
    <div className="container-fluid">
      <div className="header">
        <Link to='/'><img src={logo} alt="" className="header__logo horizontal-menu" /></Link>
        <div className="header__menu horizontal-menu">
          <div className="navigation">
            <Menu
              className="menu"
              mode="horizontal"
              items={menu}
              defaultSelectedKeys="1"
              onClick={onClick}
              selectedKeys={[current]}
            />
          </div>
        </div>
        <Button className='menu-btn' icon={<MenuOutlined style={{ color: 'white' }} />} onClick={() => setVisible(true)} />
        <Drawer
          title={<Link to='/'><img src={logo} alt="" className="header__logo" /></Link>}
          placement="left"
          onClose={() => setVisible(false)}
          open={visible}
          closable={false}
          extra={<CloseOutlined onClick={() => setVisible(false)} style={{ fontSize: 20 }} />}
        >
          <div className="header__menu">
            <div className="navigation">
              <Menu
                className="menu"
                mode="inline"
                items={menu}
                defaultSelectedKeys="1"
                onClick={onClick}
                selectedKeys={[current]}
                overflowedIndicator={<MenuOutlined />}
              />
            </div>
          </div>
        </Drawer>
        <div className="header__notification">
          <SearchOutlined className="icon-grey" />
          <BellOutlined className="icon-grey" />
          {auth.profile ? (
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick,
              }}
              trigger={["click"]}
              placement="bottomRight"
              className="user-account"
            >
              <Space size={24} style={{ cursor: 'pointer' }}>
                <Avatar src={auth?.profile?.AVATAR} />
                <Space>
                  <p>{auth?.profile?.FIRST_NAME} {auth?.profile?.LAST_NAME}</p>
                  <DownOutlined style={{ color: "white" }} />
                </Space>
              </Space>
            </Dropdown>
          ) : (
            <div className="user-account">
              <UserOutlined className="icon-white" />
              <p>Tài khoản</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Heading;
