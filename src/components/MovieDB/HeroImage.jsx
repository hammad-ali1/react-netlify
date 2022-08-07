import React from "react";

//Styles
import { Wrapper, Content, Text } from "../../styles/MovieDB/HeroImage.styles";

function HeroImage({ image, title, text }) {
  return (
    <Wrapper image={image}>
      <Content>
        <Text>
          <h2>{title}</h2>
          <p>{text}</p>
        </Text>
      </Content>
    </Wrapper>
  );
}

export default HeroImage;
