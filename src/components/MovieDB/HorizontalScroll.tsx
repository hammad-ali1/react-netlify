import {
  PropsWithChildren,
  createRef,
  useState,
  useEffect,
  useRef,
} from "react";

import { Wrapper, Content } from "../../styles/MovieDB/HorizontalScroll.styles";

type PropTypes = {
  children?: React.ReactNode;
};
function HorizontalScroll({ children }: PropsWithChildren<PropTypes>) {
  return (
    <Wrapper>
      <Content className="content">{children}</Content>
    </Wrapper>
  );
}

export default HorizontalScroll;
