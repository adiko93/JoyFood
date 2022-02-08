import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Pagination,
  Popconfirm,
  Rate,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import styles from "../../../styles/Recipe/Single/Reviews.module.css";
import { UserOutlined } from "@ant-design/icons";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_REVIEW, DELETE_REVIEW } from "../../../apollo/mutations";
import { SITE_BACKEND_URL } from "../../../utility/globals";
import formatDate from "../../../utility/formatDate";
import { getIsAuthorized, getUserID } from "../../../state/authSlice";
import { useSelector } from "react-redux";
import client from "../../../apollo/client";
import { useState } from "react";
import axios from "axios";
import { getJWTState } from "../../../state/authSlice";
import { USER_DETAILS } from "../../../apollo/queries";

function Reviews({ recipe, forceRefresh }) {
  const [currentPage, setCurrentPage] = useState(1);

  const userID = useSelector(getUserID);
  const jwtToken = useSelector(getJWTState);
  const authenticated = useSelector(getIsAuthorized);

  const [refreshToken] = useLazyQuery(USER_DETAILS, {
    context: {
      clientName: "system",
    },
  });

  axios.interceptors.request.use(
    async function (config) {
      refreshToken();
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  const handleReviewSend = async (event) => {
    try {
      await axios({
        method: "post",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        url: `${SITE_BACKEND_URL}/rating/create?title=${event.title}&description=${event.description}&value=${event.rating}&recipe=${recipe.id}`,
      });
      forceRefresh();
      message.success("Successfully added review!");
    } catch (err) {
      message.error(`There was an error proccessing request. ${err}`);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await axios({
        method: "post",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        url: `${SITE_BACKEND_URL}/rating/delete?id=${id}&recipe=${recipe.id}`,
      });
      forceRefresh();
    } catch (err) {
      message.error(`There was an error proccessing request. ${err}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Reviews:</div>
      {recipe?.reviews.length > 0 ? (
        recipe.reviews.map((review, index) => {
          if ((currentPage - 1) * 5 <= index && index <= currentPage * 5 - 1)
            return (
              <div className={styles.review}>
                <div className={styles.reviewLeft}>
                  <Avatar
                    size="large"
                    className={styles.reviewAvatar}
                    src={
                      review?.user_created?.avatar?.id
                        ? `${SITE_BACKEND_URL}/assets/${review.user_created.avatar.id}`
                        : null
                    }
                    icon={
                      !review?.user_created?.avatar?.id ? (
                        <UserOutlined />
                      ) : null
                    }
                  />{" "}
                  <a className={styles.reviewNickname}>
                    {review?.user_created?.username}
                  </a>{" "}
                  <span className={styles.reviewDate}>{`${formatDate(
                    new Date(review.date_created)
                  )}`}</span>{" "}
                  {userID === review.user_created.id ? (
                    <Popconfirm
                      title="Are you sure you want to delete this review?"
                      onConfirm={() => handleDeleteReview(review.id)}
                      okText="Yes"
                      cancelText="No"
                      placement="topRight"
                    >
                      <a className={styles.reviewDelete}>[ Delete ]</a>
                    </Popconfirm>
                  ) : null}
                </div>

                <div className={styles.reviewInfo}>
                  <Rate
                    className={styles.reviewRate}
                    disabled
                    value={review.rating}
                    size="small"
                  />
                </div>
                <div className={styles.reviewTitle}>{review.title}</div>
                <div className={styles.reviewMessage}>{review.description}</div>
              </div>
            );
        })
      ) : (
        <div className={styles.review} style={{ textAlign: "center" }}>
          No reviews
        </div>
      )}
      {recipe?.reviews.length > 5 ? (
        <Pagination
          className={styles.pagination}
          size="small"
          current={currentPage}
          pageSize={5}
          total={recipe.reviews.length}
          onChange={(page) => setCurrentPage(page)}
        />
      ) : null}
      {recipe.reviews.some((review) => review.user_created.id === userID) ||
      !authenticated ? null : (
        <>
          <Divider type="horizontal" />
          <Form
            className={styles.form}
            layout="vertical"
            onFinish={(e) => handleReviewSend(e)}
          >
            <Form.Item
              label="Title:"
              name="title"
              className={styles.inputTitle}
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Rating:"
              name="rating"
              className={styles.rating}
              rules={[{ required: true, message: "Please select rating!" }]}
            >
              <Rate allowHalf />
            </Form.Item>
            <Form.Item
              label="Description:"
              name="description"
              className={styles.inputDescription}
              rules={[{ required: true, message: "Please input decsription!" }]}
            >
              <Input.TextArea style={{ minHeight: "20rem" }} />
            </Form.Item>
            <Form.Item style={{ textAlign: "right", gridColumn: "7/9" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "15rem" }}
              >
                {" "}
                Send{" "}
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
}

export default Reviews;
