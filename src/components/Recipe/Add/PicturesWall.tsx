import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getJWTState } from "../../../state/authSlice";
import axiosStrapi from "../../../query/axiosInstance";
import { useMutation } from "react-query";

// TODO: REWORK SCSS + TSX

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function PicturesWall({
  maxImages = "10",
  fileList,
  setFileList,
}: {
  maxImages: string;
  fileList: any;
  setFileList: any;
}) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const jwt = useSelector(getJWTState);

  const uploadFile = useMutation(async (variables: any) => {
    let formData = new FormData();
    formData.append("files", variables.file);
    return await axiosStrapi.post("/upload", formData);
  });

  // const [deleteFileQuery, { error: errorDelete }] = useMutation(DELETE_FILE, {
  //   context: {
  //     clientName: "system",
  //   },
  // });
  const JWTToken = useSelector(getJWTState);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }: { fileList: any }) => {
    setFileList(fileList);
  };

  // const removeHandler = async (file) => {
  //   await deleteFileQuery({
  //     variables: {
  //       id: file.response.data.id,
  //     },
  //   });
  //   if (errorDelete) {
  //     message.error(
  //       "There was a problem connecting to the database, please relogin"
  //     );
  //     return false;
  //   }
  //   return true;
  // };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        name="file"
        // action={`${SITE_BACKEND_URL}/api/upload`}
        action={async (file) => {
          let formData = new FormData();
          formData.append("files", file);
          return await axiosStrapi.post("/upload", formData);
        }}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        headers={{
          Authorization: `Bearer ${jwt}`,
        }}
        // onRemove={(file) => removeHandler(file)}
        key="upload"
        accept="image/*"
        method="POST"
        // customRequest={(props) => uploadFile.mutate(props)}
        // data={(file) => {
        //   let formData = new FormData();
        //   formData.append("files", file);
        //   return formData;
        // }}
      >
        {fileList.length >= maxImages ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}

export default PicturesWall;
