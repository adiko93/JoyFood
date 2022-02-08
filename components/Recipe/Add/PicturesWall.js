import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getIsAuthorized, getJWTState } from "../../../state/authSlice";
import { SITE_BACKEND_URL } from "../../../utility/globals";
import { useLazyQuery, useMutation } from "@apollo/client";
import { USER_DETAILS } from "../../../apollo/queries";
import { DELETE_FILE } from "../../../apollo/mutations";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function PicturesWall({ maxImages = "10", fileList, setFileList }) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fetchUserDetails, { data, error, loading }] = useLazyQuery(
    USER_DETAILS,
    {
      fetchPolicy: "network-only",
      context: {
        clientName: "system",
      },
    }
  );
  const [deleteFileQuery, { error: errorDelete }] = useMutation(DELETE_FILE, {
    context: {
      clientName: "system",
    },
  });
  const JWTToken = useSelector(getJWTState);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const removeHandler = async (file) => {
    await deleteFileQuery({
      variables: {
        id: file.response.data.id,
      },
    });
    if (errorDelete) {
      message.error(
        "There was a problem connecting to the database, please relogin"
      );
      return false;
    }
    return true;
  };

  const uploadButton = (
    <div
      onClick={async () => {
        //refresh token
        await fetchUserDetails({
          context: {
            clientName: "system",
          },
        });
      }}
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        name="file"
        action={`${SITE_BACKEND_URL}/files?access_token=${JWTToken}`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={(file) => removeHandler(file)}
        key="upload"
        accept="image/png, image/gif, image/jpeg"
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
