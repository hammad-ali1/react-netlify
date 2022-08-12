//Styles
import { Wrapper, Content, Text } from "../../styles/MovieDB/HeroImage.styles";

//Types
type PropTypes = {
  image: string;
  title: string;
  text: string;
};
function HeroImage({ image, title, text }: PropTypes) {
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
