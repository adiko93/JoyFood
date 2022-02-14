import { Form, Input, Button, Checkbox, Tooltip } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import OauthButton from "../UI/OauthButton";
import SVG from "../../utility/Svg";
import style from "../../styles/Home/Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthorized, logIn } from "../../state/authSlice";
import { useRouter } from "next/router";
import { SITE_BACKEND_URL } from "../../utility/globals";
import React from "react";
import { Rule } from "antd/lib/form";

const LoginBox: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(getIsAuthorized);
  const router = useRouter();

  const loginHandler = (data: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    dispatch(
      logIn({
        email: data.email,
        password: data.password,
        remember: data.remember,
      })
    );
  };

  // Dont show if authorized
  if (isAuthorized) return null;

  // Set of rules to verify input
  const rulesSet: { [key: string]: Rule[] } = {
    email: [
      { required: true, message: "Please input your E-Mail!" },
      {
        type: "email",
        message: "The input is not valid E-mail!",
      },
    ],
    password: [{ required: true, message: "Please input your Password!" }],
  };

  return (
    <div className={style.login}>
      <div className={style.loginTitle}>Log In</div>
      <div className={style.loginDescription}>
        Unlock all the features for free!
      </div>
      <Form
        name="normal_login"
        className={style.loginForm}
        initialValues={{ remember: true }}
        onFinish={loginHandler}
      >
        <Form.Item
          name="email"
          rules={rulesSet.email}
          className={style.loginFormItem}
        >
          <Input size="large" prefix={<MailOutlined />} placeholder="E-Mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={rulesSet.password}
          className={style.loginFormItem}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className={style.loginFormItem}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className={style.loginFormItemForgotText} href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item className={style.loginFormItemBottom}>
          <Button
            type="primary"
            htmlType="submit"
            className={style.loginFormItemBottomButton}
            style={{ marginBottom: "1rem" }}
          >
            Log in
          </Button>
          <br />
          Don&apos;t have an account?{" "}
          <a onClick={() => router.push("/user/register")}>Register now!</a>
        </Form.Item>
      </Form>
      <div className={style.loginOauth}>
        {/* TODO: Implement oauth after deployment to live server  */}
        <OauthButton style={style.loginOauthFacebook}>
          <SVG id="#icon-facebook" />
          Login with facebook
        </OauthButton>
        <OauthButton
          color="google"
          style={style.loginOauthGoogle}
          href={`${SITE_BACKEND_URL}/connect/google`}
        >
          <SVG id="#icon-google" />
          Login with Google
        </OauthButton>
      </div>
    </div>
  );
};
export default LoginBox;
