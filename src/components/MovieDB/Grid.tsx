import React, { PropsWithChildren } from "react";

//Styles
import { Wrapper, Content } from "../../styles/MovieDB/Grid.styles";

//Types
type PropTypes = {
  header: string;
  children?: React.ReactNode;
};
function Grid({ header, children }: PropsWithChildren<PropTypes>) {
  return (
    <Wrapper>
      <h1>{header}</h1>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default Grid;
