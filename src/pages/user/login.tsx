import AuthLayout from "../../components/User/AuthLayout";
import styles from "../../styles/User/Login.module.scss";
import { Form, Input, Button, Checkbox, Result } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import OauthButton from "../../components/UI/OauthButton";
import SVG from "../../utility/Svg";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  setRemember,
  getRememberState,
  logIn,
  isLoading,
  getIsAuthorized,
} from "../../state/authSlice";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const rememberState = useSelector(getRememberState);
  const loadingState = useSelector(isLoading);
  const isAuthorized = useSelector(getIsAuthorized);
  const router = useRouter();

  const eventHandler = async (event: any) => {
    await dispatch(
      logIn({
        email: event.email,
        password: event.password,
        remember: event.remember,
      })
    );
    router.replace("/");
  };

  if (isAuthorized) {
    return (
      <Layout title="Log In" activeNav="home">
        <div className={styles.login}>
          <Result
            style={{ width: "100%", alignSelf: "center" }}
            status="success"
            title="You are already logged in"
            subTitle={`You can enjoy all the features`}
            extra={[
              <Button
                onClick={() => {
                  router.push("/");
                }}
                key="Button"
              >
                Go home
              </Button>,
            ]}
          ></Result>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Log in" activeNav="login">
      <AuthLayout>
        <div className={styles.login}>
          <div className={styles.loginTitle}>Log In</div>
          <div className={styles.loginDescription}>
            Unlock all the features for free!
          </div>
          <Form
            name="normal_login"
            className={styles.login_form}
            initialValues={{ remember: true }}
            onFinish={eventHandler}
            style={{ marginTop: "1.5rem", marginBottom: ".1rem" }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your E-Mail!" },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
              style={{ marginBottom: "1.5rem" }}
            >
              <Input
                size="large"
                prefix={<MailOutlined />}
                placeholder="E-Mail"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
              style={{ marginBottom: "1.2rem" }}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "1rem" }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox
                  checked={rememberState}
                  onChange={(e) => dispatch(setRemember(e.target.checked))}
                >
                  Remember me
                </Checkbox>
              </Form.Item>

              <a className={styles.loginForgot} href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item className={styles.loginBottom}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginButton}
                loading={loadingState}
              >
                Log in
              </Button>
              <br />
              Don&apos;t have an account?{" "}
              <Link href="/user/register">Register now!</Link>
            </Form.Item>
          </Form>
          <div className={styles.loginOauth}>
            <OauthButton style={styles.loginOauthFacebook}>
              <SVG id="#icon-facebook" />
              Login with facebook
            </OauthButton>
            <OauthButton
              color="google"
              style={styles.loginOauthGoogle}
              href="http://forkify.tk:1337/connect/google"
            >
              <SVG id="#icon-google" />
              Login with Google
            </OauthButton>
          </div>
        </div>
      </AuthLayout>
    </Layout>
  );
};

export default Login;
