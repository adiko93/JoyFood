import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import OauthButton from "../UI/OauthButton";
import SVG from "../../utility/Svg";
import style from "../../styles/Home/Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthorized, logIn } from "../../state/authSlice";
import { useRouter } from "next/router";

export default function LoginBox(props) {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(getIsAuthorized);
  const router = useRouter();

  const eventHandler = async (event) => {
    await dispatch(
      logIn({
        email: event.email,
        password: event.password,
        remember: event.remember,
      })
    );
  };
  if (isAuthorized) return null;

  return (
    <div className={style.loginBox}>
      <div className={style.loginTitle}>Log In</div>
      <div className={style.loginDescription}>
        Unlock all the features for free!
      </div>
      <Form
        name="normal_login"
        className={style.login_form}
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
          <Input size="large" prefix={<MailOutlined />} placeholder="E-Mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
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
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className={style.login_form_forgot} href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item className={style.loginBottom}>
          <Button
            type="primary"
            htmlType="submit"
            className={style.loginButton}
            style={{ marginBottom: "1rem" }}
          >
            Log in
          </Button>
          <br />
          Don't have an account?{" "}
          <a onClick={() => router.push("/user/register")}>Register now!</a>
        </Form.Item>
      </Form>
      <div className={style.oauth}>
        <OauthButton style={style.facebook}>
          <SVG id="#icon-facebook" />
          Login with facebook
        </OauthButton>
        <OauthButton
          color="google"
          style={style.google}
          href="http://forkify.tk:1337/connect/google"
        >
          <SVG id="#icon-google" />
          Login with Google
        </OauthButton>
      </div>
    </div>
  );
}
