import { useNavigate } from "react-router-dom";
//Styles
import { Wrapper, Content, Text } from "../styles/PageNotFound.styles";
//Components
import Button from "./MovieDB/Button";
//Icons
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import P404 from "../images/p404.png";
import { useState } from "react";

function PageNotFound() {
  const navigate = useNavigate();
  const [style, setStyle] = useState<React.CSSProperties>({});
  const handleMovingBackGround: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    let x = -event.clientX / 3;
    let y = -event.clientY / 3;
    const newStyle: React.CSSProperties = {};
    newStyle.backgroundPositionX = x + "px";
    newStyle.backgroundPositionY = y + "px";
    setStyle(newStyle);
  };
  return (
    <Content style={style} img={P404} onMouseMove={handleMovingBackGround}>
      <Text>
        <h2>404</h2>
        <WarningAmberRoundedIcon className="icon" />
        <h4>Oops! Page not found</h4>
        <p>
          The page you are looking for does not exist. You may have mistyped the
          address or the page may have been moved
        </p>
        <Button
          text="BACK TO HOME"
          callback={() => {
            navigate("/", { replace: true });
          }}
        />
      </Text>
    </Content>
  );
}

export default PageNotFound;
