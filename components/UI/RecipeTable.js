import { Image, Popconfirm, Space, Table, Tag } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_BACKEND_URL } from "../../utility/globals";
import styles from "../../styles/UI/RecipeTable.module.css";

function RecipeTable({ recipes, deleteHandler }) {
  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (text) => <Checkbox />,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return (
          <div className={styles.imageContainer}>
            <Image src={image} className={styles.image} />
          </div>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: ([text, id]) => <Link href={`/recipes/${id}`}>{text}</Link>,
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (categories) =>
        categories?.map((category, index) => <Tag key={index}>{category}</Tag>),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "date",
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (tags) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (text) => (
        <Popconfirm
          title="Are you sure you want to delete this?"
          onConfirm={() => deleteHandler(text.id)}
          okText="Yes"
          cancelText="No"
          placement="topRight"
        >
          <Space size="middle">
            <a>Delete</a>
          </Space>
        </Popconfirm>
      ),
    },
  ];
  const data = recipes?.map((recipe) => {
    return {
      id: recipe.id,
      image: `${SITE_BACKEND_URL}/assets/${recipe?.images[0]?.directus_files_id.id}`,
      title: [recipe.title, recipe.id],
      categories: recipe.categories.map(
        (category) => category.category_id.title
      ),
      status: recipe.status,
      date: new Date(recipe.date_created).toUTCString(),
    };
  });

  const tableProps = {
    columns,
    dataSource: data,
    pagination: {
      pageSizeOptions: [10, 20, 50, 100],
      style: {
        marginRight: "1rem",
      },
    },
  };

  return (
    <div>
      <Table {...tableProps}></Table>
    </div>
  );
}

export default RecipeTable;
