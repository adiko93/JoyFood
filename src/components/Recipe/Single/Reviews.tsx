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
import styles from "../../../styles/Recipe/Single/Reviews.module.scss";
import { UserOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import { SITE_BACKEND_URL } from "../../../utility/globals";
import formatDate from "../../../utility/formatDate";
import { getIsAuthorized, getUserDetails } from "../../../state/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { getJWTState } from "../../../state/authSlice";
import { USER_DETAILS } from "../../../apollo/queries";
import { RecipeClassInterface } from "../../../types";
import { useMutation } from "react-query";
import {
  deleteReviewMutation,
  sendReviewMutation,
} from "../../../query/mutations";
import { queryClient } from "../../../pages/_app";

const Reviews: React.FC<{ recipe: RecipeClassInterface }> = ({ recipe }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const userDetails = useSelector(getUserDetails);
  const jwtToken = useSelector(getJWTState);
  const authenticated = useSelector(getIsAuthorized);

  const sendReview = useMutation(
    (variables: any) => sendReviewMutation(variables),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("recipeSlug");
        message.success("Review successfully added!");
      },
      onError: (error: any) => {
        message.error(
          `There was an error proccessing request. ${error.message}`
        );
      },
    }
  );

  const deleteReview = useMutation(
    (variables: any) => deleteReviewMutation(variables),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("recipeSlug");
        message.success("Review successfully deleted!");
      },
      onError: (error) => {
        message.error(`There was an error proccessing request. ${error}`);
      },
    }
  );

  const handleReviewSend = async ({
    title,
    description,
    rating,
  }: {
    title: string;
    description: string;
    rating: number;
  }) => {
    sendReview.mutate({
      title,
      description,
      rating,
      recipe: recipe.id,
      author: userDetails.id,
    });
  };

  const handleDeleteReview = async (id: string) => {
    deleteReview.mutate(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Reviews:</div>
      {recipe?.reviews!.length > 0 ? (
        recipe.reviews!.map((review: any, index: any) => {
          if ((currentPage - 1) * 5 <= index && index <= currentPage * 5 - 1)
            return (
              <div className={styles.review}>
                <div className={styles.reviewLeft}>
                  <Avatar
                    size="large"
                    className={styles.reviewLeftAvatar}
                    src={
                      review?.author?.avatar
                        ? `${review?.author?.avatar}`
                        : null
                    }
                    icon={!review?.author?.avatar ? <UserOutlined /> : null}
                  />{" "}
                  <a className={styles.reviewLeftNickname}>
                    {review?.author?.username}
                  </a>{" "}
                  <span className={styles.reviewLeftDate}>{`${formatDate(
                    new Date(review.dateCreated)
                  )}`}</span>{" "}
                  {userDetails?.id === review.author.id ? (
                    <Popconfirm
                      title="Are you sure you want to delete this review?"
                      onConfirm={() => handleDeleteReview(review.id)}
                      okText="Yes"
                      cancelText="No"
                      placement="topRight"
                    >
                      <a className={styles.reviewLeftDelete}>[ Delete ]</a>
                    </Popconfirm>
                  ) : null}
                </div>

                <div className={styles.reviewInfo}>
                  <Rate
                    className={styles.reviewInfoRate}
                    disabled
                    value={review.rating}
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
      {recipe?.reviews!.length > 5 ? (
        <Pagination
          className={styles.pagination}
          size="small"
          current={currentPage}
          pageSize={5}
          total={recipe.reviews!.length}
          onChange={(page) => setCurrentPage(page)}
        />
      ) : null}
      {recipe.reviews!.some((review) => review.author.id === userDetails?.id) ||
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
              className={styles.formInputTitle}
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
              className={styles.formInputDescription}
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
};

export default Reviews;
