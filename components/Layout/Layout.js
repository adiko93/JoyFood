import Head from "next/head";
import Footer from "./Footer";
import Navigation from "./Navigation";
import style from "../../styles/Layout/Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getJWTState, setJWT } from "../../state/authSlice";
import Cookies from "js-cookie";
import axios from "axios";
import { SITE_BACKEND_URL } from "../../utility/globals";
import { useEffect, useState } from "react";
import { Spin } from "antd";

export default function Layout({ title, activeNav, children }) {
  const jwtTokenState = useSelector(getJWTState);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);


  return (
    <div className="container">
      <Head>
        <title>{title && `${title} - `}Joy Food</title>
        <meta name="description" content="Best recipe app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation active={activeNav} />
      <main>
        <div className={style.container}>{children}</div>
      </main>
      <Footer />
    </div>
  );
  // <Spin spinning={isLoading}>

  // </Spin>
}
