import React, { useState, useEffect, useCallback, SetStateAction } from "react";
import { PrevButton, NextButton } from "./Buttons";
import useEmblaCarousel from "embla-carousel-react";
import style from "../../../styles/UI/Carousel/Carousel.module.scss";
import { useMediaQuery } from "react-responsive";
import {
  extraExtraSmallScreen,
  extraSmallScreen,
} from "../../../utility/mediaQueries";

const Carousel: React.FC = (props) => {
  const isSmallScreen = useMediaQuery(extraExtraSmallScreen);
  const isMediumScreen = useMediaQuery(extraSmallScreen);
  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: true,
    slidesToScroll: isSmallScreen ? 1 : isMediumScreen ? 2 : 3,
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList() as SetStateAction<never[]>);
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <>
      <div className={style.carousel}>
        <div className={style.viewport} ref={viewportRef}>
          <div className={style.container}>{props.children}</div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </>
  );
};

export default Carousel;
