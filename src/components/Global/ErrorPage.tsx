import { Button, Result } from "antd";
import router from "next/router";
import React from "react";
import Layout from "../Layout/Layout";

const ErrorPage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <Layout title="Error" activeNav="home">
      <div style={{ minHeight: "70vh", display: "grid" }}>
        <Result
          style={{ width: "100%", alignSelf: "center" }}
          status="error"
          title="Something went wrong"
          subTitle={`Please try to reload the page. Error message: ${errorMessage}`}
          extra={[
            <Button key="reload" onClick={router.reload}>
              Refresh
            </Button>,
          ]}
        ></Result>
      </div>
    </Layout>
  );
};

export default ErrorPage;
