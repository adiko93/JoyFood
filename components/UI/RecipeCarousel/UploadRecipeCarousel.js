// import React, { useState, useEffect, useCallback } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import styles from "../../../styles/UI/RecipeCarousel/RecipeCarousel.module.css";
// import { Button, Image } from "antd";
// import { Upload, message } from "antd";
// import { InboxOutlined, PlusCircleOutlined } from "@ant-design/icons";
// import { SITE_BACKEND_URL } from "../../../utility/globals";
// import { useSelector } from "react-redux";
// import { getJWTState } from "../../../state/authSlice";

// const { Dragger } = Upload;

// const UploadRecipeCarousel = () => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
//   const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
//     containScroll: "keepSnaps",
//     selectedClass: "",
//     dragFree: true,
//   });
//   const [forceRefresh, setForceRefresh] = useState(true);

//   function uploadHandler(event) {
//     message.success(`${event.file.name} file uploaded successfully.`);
//     const newSlidesArray = slides;
//     newSlidesArray.unshift(event.file.response.data.id);
//     setSlides(newSlidesArray);
//     setSelectedIndex(slides.length - 2);
//     setForceRefresh(!forceRefresh);
//     console.log(slides);
//   }

//   const [slides, setSlides] = useState(["upload"]);
//   const JWTToken = useSelector(getJWTState);
//   const props = {
//     name: "file",
//     multiple: true,
//     action: `${SITE_BACKEND_URL}/files?access_token=${JWTToken}`,
//     data: (file) => {
//       return {
//         title: file.name,
//       };
//     },
//     onChange(info) {
//       const { status } = info.file;
//       if (status !== "uploading") {
//         console.log(info.file, info.fileList);
//       }
//       if (status === "done") {
//         uploadHandler(info);
//       } else if (status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     onDrop(e) {
//       console.log("Dropped files", e.dataTransfer.files);
//     },
//   };

//   const onThumbClick = useCallback(
//     (index) => {
//       if (!embla || !emblaThumbs) return;
//       if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
//     },
//     [embla, emblaThumbs]
//   );

//   const onSelect = useCallback(() => {
//     if (!embla || !emblaThumbs) return;
//     setSelectedIndex(embla.selectedScrollSnap());
//     emblaThumbs.scrollTo(embla.selectedScrollSnap());
//   }, [embla, emblaThumbs, setSelectedIndex]);

//   useEffect(() => {
//     if (!embla) return;
//     onSelect();
//     embla.on("select", onSelect);
//   }, [embla, onSelect]);
//   return (
//     <>
//       <div className={styles.wraper}>
//         <div className={styles.carousel}>
//           <div className={styles.viewport} ref={mainViewportRef}>
//             <div className={styles.container}>
//               {slides.map((img, index) => (
//                 <div className={styles.slide} key={index}>
//                   <img
//                     className={styles.slide__img}
//                     src={`${SITE_BACKEND_URL}/assets/${img}`}
//                     alt="Recipe image"
//                   />
//                 </div>
//               ))}
//               {/* <div className={styles.slide} key={6}>
//                 <Dragger {...props} className={styles.slide__img}>
//                   <p className="ant-upload-drag-icon">
//                     <InboxOutlined />
//                   </p>
//                   <p className="ant-upload-text">
//                     Click or drag file to this area to upload
//                   </p>
//                   <p className="ant-upload-hint">
//                     Support for a single or bulk upload. Strictly prohibit from
//                     uploading company data or other band files
//                   </p>
//                 </Dragger>
//               </div> */}
//             </div>
//           </div>
//         </div>

//         <div className={`${styles.thumb}`}>
//           <div className={`${styles.viewport}`} ref={thumbViewportRef}>
//             <div className={`${styles.container} ${styles.container__thumb}`}>
//               {slides.map((img, index) => (
//                 <div
//                   className={`${styles.slide} ${styles.slide__thumb} ${
//                     index === selectedIndex ? styles.is_selected : ""
//                   }`}
//                   key={index}
//                 >
//                   <button
//                     onClick={() => onThumbClick(index)}
//                     className={`${styles.slide__inner} ${styles.slide__inner__thumb}`}
//                     type="button"
//                   >
//                     <img
//                       className={styles.slide__thumbnail}
//                       src={`${SITE_BACKEND_URL}/assets/${img}?key=card`}
//                       alt="Recipe image"
//                     />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//           wtf
//         </div>
//       </div>
//       <Upload {...props} style={{ width: "auto" }}>
//         <Button>Upload</Button>
//       </Upload>
//     </>
//   );
// };

// export default UploadRecipeCarousel;
