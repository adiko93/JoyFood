import { Dropdown, Input, Menu, Spin } from "antd";
import styles from "../../styles/Layout/Navigation.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { rerenderFilters, rerenderFiltersFalse } from "../../state/listSlice";
import { getIsAuthorized, isLoading, logOut } from "../../state/authSlice";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { USER_DETAILS } from "../../apollo/queries";
import Avatar from "antd/lib/avatar/avatar";
import {
  UserOutlined,
  BellOutlined,
  MailOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { SITE_BACKEND_URL } from "../../utility/globals";
const { Search } = Input;

export default function Navigation({ active }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const loginLoading = useSelector(isLoading);
  const isAuthorized = useSelector(getIsAuthorized);
  const [fetchUserDetails, { data, error, loading }] =
    useLazyQuery(USER_DETAILS);

  useEffect(() => {
    if (isAuthorized) {
      fetchUserDetails({
        context: {
          clientName: "system",
        },
      });
    }
  }, [isAuthorized]);

  const avatarProps = data?.users_me?.avatar.id
    ? {
        src: `${SITE_BACKEND_URL}/assets/${data?.users_me?.avatar.id}`,
      }
    : {
        icon: <UserOutlined />,
      };

  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          My Account
        </a>
      </Menu.Item>
      <Menu.Item icon={<BellOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Notifications
        </a>
      </Menu.Item>
      <Menu.Item icon={<MailOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Messages
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<LogoutOutlined />} onClick={() => dispatch(logOut())}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/">
            <div className={styles.logo}>
              <span className={styles.logoOrange}>JOY</span> FOOD
            </div>
          </Link>
          <div className={styles.search}>
            <Search
              placeholder="Search for a recipe..."
              allowClear
              enterButton="Search"
              size="medium"
              onSearch={(event) => {
                router.push(`/recipes/list?search=${event}`);
              }}
            />
          </div>
          <div className={styles.navigation}>
            <Menu
              selectedKeys={active}
              mode="horizontal"
              disabledOverflow={true}
              style={{ minWidth: "200px" }}
            >
              <Menu.Item key="home">
                <Link href="/">Home</Link>
              </Menu.Item>
              <Menu.Item
                key="recipes"
                onClick={async () => {
                  await dispatch(rerenderFilters());
                  await dispatch(rerenderFiltersFalse());
                }}
              >
                <Link href="/recipes/list" shallow>
                  Recipes
                </Link>
              </Menu.Item>

              {isAuthorized ? (
                <Dropdown overlay={menu} placement="bottomRight">
                  <Menu.Item style={{ fontWeight: "600" }}>
                    <Avatar {...avatarProps} style={{ marginRight: "1rem" }} />
                    <Link href="/">{String(data?.users_me?.nickname)}</Link>
                  </Menu.Item>
                </Dropdown>
              ) : (
                <Menu.Item key="login">
                  <Link href="/user/login">Log In</Link>
                </Menu.Item>
              )}
            </Menu>
          </div>
        </div>
      </header>
    </>
  );
}
