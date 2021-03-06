import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import theme from "theme";

const DashedOutline = styled(Box)`
  border-radius: 4px;
  border: 2px dashed ${theme.colors.grey400};
`;

export default DashedOutline;
