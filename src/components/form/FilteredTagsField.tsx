import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Field, FieldProps } from "formik";
import { OutlinedButton } from "elements";

interface FilteredTagsFieldProps {
  readonly name: string;
  readonly tags: ReadonlyArray<string>;
}

const FilteredTagsField: FunctionComponent<FilteredTagsFieldProps> = ({
  name,
  tags,
}) => (
  <Field name={ name }>
    { ({ field, form }: FieldProps) => {
      const filteredTags = tags.filter(filterTags(field.value));

      return (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          { filteredTags.map((tag) => (
            <Box key={ tag } m={ 1 }>
              <OutlinedButton onClick={ () => form.handleChange(name)(tag) }>
                { tag }
              </OutlinedButton>
            </Box>
          )) }
        </Box>
      );
    } }
  </Field>
);

/**
 * If there is no query string, display all tags. Otherwise, only show tags
 * that match the query string. Once the query string exactly matches a
 * tag, hide the remaining tag.
 */
const filterTags = (query: string) => (tag: string) => {
  if (
    query.length === 0 ||
    (tag !== query && tag.toLowerCase().includes(query.toLowerCase()))
  ) {
    return true;
  }

  return false;
};

export default FilteredTagsField;
