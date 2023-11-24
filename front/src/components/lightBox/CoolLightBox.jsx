import React from "react";
import Lightbox from "react-spring-lightbox";
import styled from "styled-components";

import { LightBoxHeader } from "./components/lightBoxHeader/LightBoxHeader";
import { ArrowButton } from "./components/arrowButton/ArrowButton";

const StyledLightbox = styled(Lightbox)`
  background-color: rgba(0, 0, 0, 0.71);
`;

const CoolLightBox = ({
  isOpenLightbox,
  photos,
  currentImageIndex,
  setCurrentIndex,
  setIsOpenLightbox,
  onClose,
}) => {
  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < photos.length &&
    setCurrentIndex(currentImageIndex + 1);

  return (
    <StyledLightbox
      isOpen={isOpenLightbox}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      images={photos}
      currentIndex={currentImageIndex}
      /* Add your own UI */
      renderHeader={() => (
        <LightBoxHeader
          currentIndex={currentImageIndex}
          images={photos}
          setIsOpenLightbox={setIsOpenLightbox}
        />
      )}
      // renderFooter={() => (<CustomFooter />)}
      renderPrevButton={(prop) => (
        <ArrowButton position="left" prop={prop} clickHandler={gotoPrevious} />
      )}
      renderNextButton={(prop) => (
        <ArrowButton position="right" prop={prop} clickHandler={gotoNext} />
      )}
      // renderImageOverlay={() => (<ImageOverlayComponent >)}

      /* Add styling */
      // className="cool-class"
      // style={{ background: "grey" }}

      /* Handle closing */
      onClose={onClose}

      /* Use single or double click to zoom */
      // singleClickToZoom

      /* react-spring config for open/close animation */
      // pageTransitionConfig={{
      //   from: { transform: "scale(0.75)", opacity: 0 },
      //   enter: { transform: "scale(1)", opacity: 1 },
      //   leave: { transform: "scale(0.75)", opacity: 0 },
      //   config: { mass: 1, tension: 320, friction: 32 }
      // }}
    />
  );
};

export default CoolLightBox;
