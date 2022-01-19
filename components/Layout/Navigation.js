import { Input, Menu } from "antd";
import styles from "../../styles/Layout/Navigation.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { rerenderFilters, rerenderFiltersFalse } from "../../state/listSlice";
const { Search } = Input;

export default function Navigation({ active }) {
  const router = useRouter();
  const dispatch = useDispatch();

  //  <>
  //           <Menu.Item style={{ fontWeight: "600" }}>
  //             <Avatar
  //               src={`${SITE_BACKEND_URL}/assets/${data?.users_me?.avatar.id}`}
  //               style={{ marginRight: "1rem" }}
  //             ></Avatar>
  //             <Link href="/">{String(data?.users_me?.nickname)}</Link>
  //           </Menu.Item>
  //         </>

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
              <Menu.Item key="login">
                <Link href="/user/login">Log In</Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </header>
    </>
  );
}
