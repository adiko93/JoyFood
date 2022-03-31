import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "../../../../styles/UI/RecipeCarousel/RecipeCarousel.module.scss";
import { Image } from "antd";
import { RecipeImages } from "../../../../types";

const RecipeCarousel: React.FC<{ slides: RecipeImages[] }> = ({ slides }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = (index: number) => {
    if (!embla || !emblaThumbs) return;
    embla.scrollTo(index);
    if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
  };

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

  useEffect(
    () => () => {
      embla?.destroy();
    },
    []
  );
  useEffect(() => {
    embla?.reInit();
  }, [slides]);
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
                      src={img.full}
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
                      src={`${img.thumbnail ? img.thumbnail : img.full}`}
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
