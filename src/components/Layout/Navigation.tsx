import { Dropdown, Input, Menu } from "antd";
import styles from "../../styles/Layout/Navigation.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { rerenderFilters, rerenderFiltersFalse } from "../../state/listSlice";
import {
  fetchUserDetails,
  getIsAuthorized,
  getJWTState,
  getUserDetails,
  logOut,
} from "../../state/authSlice";
import { useEffect } from "react";
import Avatar from "antd/lib/avatar/avatar";
import {
  UserOutlined,
  BellOutlined,
  MailOutlined,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { SITE_BACKEND_URL } from "../../utility/globals";
import axiosStrapi from "../../query/axiosInstance";

const { Search } = Input;

const Navigation: React.FC<{ active: string[] }> = ({ active }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const jwt = useSelector(getJWTState);

  const isAuthorized = useSelector(getIsAuthorized);
  const userDetails = useSelector(getUserDetails);

  useEffect(() => {
    if (isAuthorized) {
      axiosStrapi.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      dispatch(fetchUserDetails());
    }
  }, [dispatch, isAuthorized, jwt]);

  // Check if user have avatar
  const avatarProps = userDetails?.avatar
    ? {
        src: `${SITE_BACKEND_URL}${userDetails.avatar}`,
      }
    : {
        icon: <UserOutlined />,
      };

  // Drop down menu
  const userSubMenu = (
    <Menu>
      <Menu.Item icon={<PlusOutlined />}>
        <Link href="/recipes/add">Add Recipe</Link>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item icon={<UserOutlined />}>
        <Link href="/user/profile">My Account</Link>
      </Menu.Item>

      <Menu.Item icon={<BellOutlined />}>
        <Link href="/">Notifications</Link>
      </Menu.Item>

      <Menu.Item icon={<MailOutlined />}>
        <Link href="/">Messages</Link>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item icon={<LogoutOutlined />} onClick={() => dispatch(logOut())}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  const authNavigation = isAuthorized ? (
    <Dropdown overlay={userSubMenu} placement="bottomLeft" key="loginSubMenu">
      <div>
        <Avatar {...avatarProps} className={styles.navigationMenuAuthAvatar} />
        {String(userDetails?.username)}
      </div>
    </Dropdown>
  ) : (
    <Link href="/user/login">Log In</Link>
  );

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.navbarContainer}>
          {/* LOGO */}
          <Link href="/" passHref>
            <div className={styles.logo}>
              <span className={styles.logoOrange}>JOY</span> FOOD
            </div>
          </Link>

          {/* SEARCH BAR */}
          <Search
            placeholder="Search for a recipe..."
            allowClear
            enterButton="Search"
            className={styles.search}
            onSearch={(event) => {
              router.push(`/recipes/list?search=${event}`);
            }}
          />

          {/* NAVIGATION */}
          <Menu
            selectedKeys={active}
            mode="horizontal"
            disabledOverflow
            className={styles.navigation}
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

            <Menu.Item className={styles.navigationMenuAuth} key="login">
              {authNavigation}
            </Menu.Item>
          </Menu>
        </div>
      </header>
    </>
  );
};

export default Navigation;
