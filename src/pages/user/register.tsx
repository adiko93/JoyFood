import { Button, Form, Input, notification } from "antd";
import AuthLayout from "../../components/User/AuthLayout";
import styles from "../../styles/User/Register.module.css";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_ACCOUNT } from "../../apollo/mutations";
import _ from "lodash";
import { useRouter } from "next/router";

export default function Register() {
  const openNotification = (type, title, text) => {
    notification[type]({
      message: title,
      description: text,
    });
  };
  const router = useRouter();
  const [createAccountQuery, { data, error, loading }] = useMutation(
    CREATE_ACCOUNT,
    {
      onCompleted: (data) => {
        console.log(data);
        if (data.create_users_item === null) {
          openNotification(
            "error",
            "Username or e-mail already exists!",
            "Please try to use diffrent username or e-mail address"
          );
        } else {
          openNotification(
            "success",
            "Account created!",
            "You've successfully createad an account. You can log in now."
          );
          _.delay(() => router.replace("/user/login"), 500);
        }
      },
      onError: (error) => {
        openNotification(
          "error",
          "Error",
          `Something went wrong. Message: ${error?.message}`
        );
      },
      context: {
        clientName: "system",
      },
    }
  );

  const eventHandler = (event) => {
    try {
      createAccountQuery({
        variables: event,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout title="Register" activeNav="login">
      <AuthLayout>
        <div className={styles.container}>
          <div className={styles.title}>Register</div>
          <div className={styles.description}>
            Unlock all the features for free!
          </div>
          <Form
            name="normal_login"
            className={styles.login_form}
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={eventHandler}
            style={{ marginTop: "1.5rem", marginBottom: ".1rem" }}
          >
            <Form.Item
              name="nickname"
              label="Username"
              tooltip="Will be also visible as author of your recipe"
              rules={[
                { required: true, message: "Please input your Username!" },
                {
                  pattern: /^[a-zA-Z0-9]+$/g,
                  message: "No special characters allowed!",
                },
              ]}
              style={{ marginBottom: "1.5rem" }}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              style={{ marginBottom: "1.5rem" }}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                {
                  min: 6,
                  message: "Password needs to be atleast 6 characters long!",
                },
              ]}
              style={{ marginBottom: "1.2rem" }}
              label="Password"
            >
              <Input.Password type="password" size="large" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              style={{ marginBottom: "1.5rem" }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item className={styles.bottom}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.button}
                style={{ marginBottom: "1rem", marginTop: "1rem" }}
                size="large"
              >
                Register
              </Button>
              <br />
              Already have an account? <Link href="/user/login">Log in!</Link>
            </Form.Item>
          </Form>
        </div>
      </AuthLayout>
    </Layout>
  );
}
