import { Image, Popconfirm, Space, Table, Tag } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_BACKEND_URL } from "../../utility/globals";
import styles from "../../styles/UI/RecipeTable.module.css";
import { RecipeCategories, RecipeClassInterface } from "../../types";

const RecipeTable: React.FC<{
  recipes: RecipeClassInterface[];
  deleteHandler: (id: number) => void;
}> = ({ recipes, deleteHandler }) => {
  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: () => <Checkbox />,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: any) => {
        return (
          <div className={styles.imageContainer}>
            <Image alt="" src={image} className={styles.image} />
          </div>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: ([text, slug]: [string, string]) => (
        <Link href={`/recipes/${slug}`}>{text}</Link>
      ),
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (categories: string[]) =>
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
    {
      title: "Action",
      key: "action",
      render: (text: any) => (
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
      image: `${recipe?.images![0]}`,
      title: [recipe.title, recipe.slug],
      categories: recipe.categories!.map(
        (category: RecipeCategories) => category.title
      ),
      status: recipe.publishedAt ? "published" : "draft",
      date: new Date(recipe.dateCreated!).toUTCString(),
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
};

export default RecipeTable;
