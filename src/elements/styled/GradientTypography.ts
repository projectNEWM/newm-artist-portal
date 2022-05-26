import styled from "styled-components";
import theme from "theme";
import Typography from "../Typography";

const GradientTypography = styled(Typography)`
  color: transparent;
  background-color: ${theme.colors.red};
  background: ${theme.gradients.artist};
  -webkit-background-clip: text;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0 0 transparent;
  padding: 0 0.5rem; // prevent some fonts getting cut off horizontally
`;

export default GradientTypography;
