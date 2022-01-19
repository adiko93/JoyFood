import { Avatar, Input, Menu, Spin } from "antd";
import { useEffect, useState } from "react";
import styles from "../../styles/Layout/Navigation.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { rerenderFilters, rerenderFiltersFalse } from "../../state/listSlice";
import { getIsAuthorized, getJWTState } from "../../state/authSlice";
import { useLazyQuery, useQuery } from "@apollo/client";
import { store } from "../../state/store";
import { SITE_BACKEND_URL } from "../../utility/globals";
import { USER_DETAILS } from "../../apollo/queries";

const { Search } = Input;

export default function Navigation({ active }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(getJWTState);
  // const { data, loading, error } = useQuery();
  // console.log(store.getState().auth.JWTToken);
  const [userData, { data, error, loading }] = useLazyQuery(USER_DETAILS, {
    context: {
      clientName: "system",
    },
  });
  const [loginState, setLoginState] = useState(
    <Menu.Item key="login">
      <Link href="/user/login">Log In</Link>
    </Menu.Item>
  );

  useEffect(() => {
    if (isAuthorized) userData();
  }, [isAuthorized]);

  const authorizedState = isAuthorized && !loading ? <>
          <Menu.Item style={{ fontWeight: "600" }}>
            <Avatar
              src={`${SITE_BACKEND_URL}/assets/${data?.users_me?.avatar.id}`}
              style={{ marginRight: "1rem" }}
            ></Avatar>
            <Link href="/">{String(data?.users_me?.nickname)}</Link>
          </Menu.Item>
        </>:
        <Menu.Item key="login">
          <Link href="/user/login">Log In</Link>
        </Menu.Item>

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
            <Menu selectedKeys={active} mode="horizontal">
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
              {loading ? <Spin></Spin> : authorizedState}
            </Menu>
          </div>
        </div>
      </header>
    </>
  );
}
