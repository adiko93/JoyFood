import Head from "next/head";
import Footer from "./Footer";
import Navigation from "./Navigation";
import style from "../../styles/Layout/Layout.module.css";

export default function Layout({ title, activeNav, children }) {
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
}
