import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import Title from "antd/lib/typography/Title";
import Layout from "../../../components/Layout/Layout";
import styles from "../../../styles/User/Profile/Profile.module.css";
import {
  BellOutlined,
  UserOutlined,
  MailOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Favourite from "../../../components/User/Profile/Favourite";

const Profile = () => {
  const [currentPage, setCurrentPage] = useState("Profile");

  const handlePageChange = (page) => {
    let component;
    switch (page) {
      case "favourite":
        component = <Favourite />;
        break;
      case "details":
        break;
    }
    return component;
  };
  return (
    <Layout activeNav="login" title="My profile">
      <div className={styles.container}>
        <Menu mode="inline" className={styles.menu}>
          <SubMenu key="account" title="Account" icon={<UserOutlined />}>
            <Menu.Item key="11">Your details</Menu.Item>
            <Menu.Item key="12">Change Password</Menu.Item>
          </SubMenu>
          <SubMenu key="recipes" title="Recipes" icon={<ReadOutlined />}>
            <Menu.Item key="21" onClick={() => setCurrentPage("favourite")}>
              Favourtie
            </Menu.Item>
            <Menu.Item key="22">Bookmarked</Menu.Item>
            <Menu.Item key="23">Your Recipes</Menu.Item>
          </SubMenu>
          <SubMenu key="messages" title="Messages" icon={<MailOutlined />}>
            <Menu.Item key="31">Inbox</Menu.Item>
            <Menu.Item key="32">Outbox</Menu.Item>
            <Menu.Item key="33">Archived</Menu.Item>
          </SubMenu>
          <Menu.Item key="40" icon={<BellOutlined />}>
            Notifications
          </Menu.Item>
        </Menu>
        <div className={styles.content}>{handlePageChange(currentPage)}</div>
      </div>
    </Layout>
  );
};

export default Profile;
