import Head from "next/head";
import Footer from "./Footer";
import Navigation from "./Navigation";
import style from "../../styles/Layout/Layout.module.scss";
import React from "react";

const Layout: React.FC<{
  title: string;
  activeNav: string;
  children: React.ReactElement;
}> = ({ title, activeNav, children }) => {
  return (
    <div className="container">
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
    </div>
  );
};

export default Layout;
