import { Box, Stack } from "@mui/material";
import { FilledButton, Typography } from "elements";
import { FunctionComponent, useState } from "react";
import { useAuthenticatedRedirect } from "common";
import { FormikValues, useFormikContext } from "formik";
import {
  FacebookLogin,
  GoogleLogin,
  LinkedInLogin,
  PasswordInputField,
  TextInputField,
} from "components";

const SignUp: FunctionComponent = () => {
  const { isValid, values } = useFormikContext();
  const { newPassword, confirmPassword } = values as FormikValues;
  const [maskPassword, setMaskPassword] = useState(true);
  const showEndAdornment = !!(newPassword || confirmPassword);

  const togglePasswordMask = () => {
    setMaskPassword(!maskPassword);
  };

  useAuthenticatedRedirect();

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Typography
        align="center"
        fontFamily="Raleway"
        fontWeight="extra-bold"
        marginBottom="40px"
        variant="xxxl"
      >
        Welcome
      </Typography>
      <Stack maxWidth="312px" mb={ 5 } spacing={ 1.5 } width="100%">
        <TextInputField
          aria-label="Email input field"
          name="email"
          placeholder="E-mail"
          type="email"
        />
        <PasswordInputField
          aria-label="Password input field"
          externalMaskPassword={ maskPassword }
          handlePressEndAdornment={ togglePasswordMask }
          name="newPassword"
          placeholder="Password"
          showEndAdornment={ showEndAdornment }
        />
        <PasswordInputField
          aria-label="Confirm password input field"
          externalMaskPassword={ maskPassword }
          handlePressEndAdornment={ togglePasswordMask }
          name="confirmPassword"
          placeholder="Confirm password"
          showEndAdornment={ showEndAdornment }
        />
        <FilledButton disabled={ !isValid } type="submit">
          Enter
        </FilledButton>
      </Stack>
      <Typography align="center" marginBottom="16px">
        or sign up via
      </Typography>
      <Stack direction="row" spacing={ 2 }>
        <GoogleLogin />
        <FacebookLogin />
        <LinkedInLogin />
      </Stack>
    </Box>
  );
};

export default SignUp;