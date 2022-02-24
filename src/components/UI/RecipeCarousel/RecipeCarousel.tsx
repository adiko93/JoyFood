import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "../../../styles/UI/RecipeCarousel/RecipeCarousel.module.scss";
import { default as NextImage } from "next/image";
import { Image } from "antd";

const RecipeCarousel: React.FC<{ slides: string[] }> = ({ slides }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <div className={styles.wraper}>
        <div className={styles.carousel}>
          <div className={styles.viewport} ref={mainViewportRef}>
            <div className={styles.container}>
              <Image.PreviewGroup>
                {slides.map((img, index) => (
                  <div className={styles.slide} key={index}>
                    <Image
                      className={styles.slide__img}
                      src={img}
                      alt="Recipe image"
                      preview={{}}
                    />
                  </div>
                ))}
              </Image.PreviewGroup>
            </div>
          </div>
        </div>

        <div className={`${styles.thumb}`}>
          <div className={`${styles.viewport}`} ref={thumbViewportRef}>
            <div className={`${styles.container} ${styles.container__thumb}`}>
              {slides.map((img, index) => (
                <div
                  className={`${styles.slide} ${styles.slide__thumb} ${
                    index === selectedIndex ? styles.is_selected : ""
                  }`}
                  key={index}
                >
                  <button
                    onClick={() => onThumbClick(index)}
                    className={`${styles.slide__inner} ${styles.slide__inner__thumb}`}
                    type="button"
                  >
                    <img
                      className={styles.slide__thumbnail}
                      src={`${img}?key=card`}
                      alt="Recipe image"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCarousel;
