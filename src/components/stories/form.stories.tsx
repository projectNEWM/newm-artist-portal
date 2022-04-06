import { Box } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { FilledButton, Typography } from "elements";
import * as Yup from "yup";
import TextInputField from "../form/TextInputField";

export default {
  title: "Form",
};

interface FormValues {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}

/**
 * Validation schema using Yup
 */
const ExampleSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const mockHandleSubmit = (
  values: FormValues,
  actions: FormikHelpers<FormValues>
) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 1000);
};

export const Example = () => {
  return (
    <Box maxWidth="312px">
      <Box mb={ 2 }>
        <Typography variant="xxl">My Form</Typography>
      </Box>

      <Formik
        initialValues={ { firstName: "", lastName: "", email: "" } }
        validationSchema={ ExampleSchema }
        onSubmit={ mockHandleSubmit }
      >
        { () => (
          <Form>
            <Box mb={ 2 }>
              <TextInputField name="firstName" placeholder="First name" />
            </Box>

            <Box mb={ 2 }>
              <TextInputField name="lastName" placeholder="Last name" />
            </Box>

            <Box mb={ 2 }>
              <TextInputField name="email" placeholder="Email" />
            </Box>

            <FilledButton type="submit">Submit</FilledButton>
          </Form>
        ) }
      </Formik>
    </Box>
  );
};