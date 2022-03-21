/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Footer from "./Footer";
import Navigation from "./Navigation";
import style from "../../styles/Layout/Layout.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  getCategoriesLoading,
} from "../../state/utilitySlice";
import { Spin } from "antd";

const Layout: React.FC<{
  title: string;
  activeNav: string;
  children: React.ReactElement;
}> = ({ title, activeNav, children }) => {
  const [loadingDefaults, setLoadingDefaults] = useState(true);

  const loadingCategories = useSelector(getCategoriesLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingCategories) {
      setLoadingDefaults(false);
    } else {
      setLoadingDefaults(true);
    }
  }, [loadingCategories]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="container">
      <Spin size="large" spinning={loadingDefaults}>
        <Head>
          <title>{title && `${title} - `}Joy Food</title>
          <meta name="description" content="Best recipe app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navigation active={[activeNav]} />
        <main>
          <div className={style.container}>{children}</div>
        </main>
        <Footer />
      </Spin>
    </div>
  );
};

export default Layout;
