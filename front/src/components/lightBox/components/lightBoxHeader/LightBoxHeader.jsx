import React from "react";
import styled from "styled-components";

import CloseIcon from "@mui/icons-material/Close";
import Button from "../button/Button";

const TopHeaderBar = styled.header`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: end;
  padding-top: 30px;
`;

const CloseButton = styled(Button)`
  color: white;
  display: flex;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 5px;
`;

const PageIndicator = styled.span`
  white-space: nowrap;
  min-width: 60px;
  text-align: center;
  color: white;
  font-size: 22px;
`;

const RightSideContainer = styled.div`
  width: 117px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LightBoxHeader = ({ setIsOpenLightbox, currentIndex, images }) => {
  return (
    <TopHeaderBar>
      <RightSideContainer>
        <PageIndicator>
          {currentIndex + 1} / {images.length}
        </PageIndicator>
        <CloseButton onClick={() => setIsOpenLightbox(false)} type="button">
          <CloseIcon />
        </CloseButton>
      </RightSideContainer>
    </TopHeaderBar>
  );
};
