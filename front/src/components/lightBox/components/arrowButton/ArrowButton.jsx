import React from "react";
import styled from "styled-components";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "../button/Button";

const CloseButton = styled(Button)`
  color: ${({ disabled }) => (disabled ? "grey" : "white")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: transparent;
`;

export const ArrowButton = ({ position, prop, clickHandler }) => {
  return (
    <CloseButton
      type="button"
      disabled={position === "left" ? !prop.canPrev : !prop.canNext}
      onClick={clickHandler}
    >
      {position === "left" ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
    </CloseButton>
  );
};
