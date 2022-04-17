import { FunctionComponent, KeyboardEvent } from "react";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styled from "styled-components";
import theme from "theme";
import TextInput from "./TextInput";

export interface SelectProps {
  readonly disabled?: boolean;
  readonly errorMessage?: string;
  readonly label: string;
  readonly name: string;
  readonly noResultsText?: string;
  options: { id: number; name: string; value: string }[];
  readonly placeholder?: string;
  readonly required?: boolean;
}

const StyledDropdownSelectContainer = styled.div`
  position: relative;
`;

const StyledResultsList = styled.ul`
  background-color: ${theme.colors.grey500};
  border-radius: 4px;
  border: 2px solid ${theme.colors.grey400};
  list-style: none;
  margin: 4px 0 0;
  max-height: 200px;
  overflow: auto;
  padding: 0;
  position: absolute;
  width: 100%;

  li {
    cursor: pointer;
    padding: 12px 12px;

    &.Mui-focused {
      background-color: ${theme.colors.grey400};
    }
  }
`;

const StyledNoResultsText = styled.span`
  background-color: ${theme.colors.grey500};
  border-radius: 4px;
  border: 2px solid ${theme.colors.grey400};
  color: ${theme.colors.grey100};
  margin: 4px 0 0;
  padding: 12px 12px;
  position: absolute;
  width: 100%;
`;

const DropdownSelect: FunctionComponent<SelectProps> = ({
  disabled,
  errorMessage,
  label,
  name,
  noResultsText = "Nothing found",
  options,
  placeholder,
  required,
}) => {
  const {
    getInputProps,
    getListboxProps,
    getOptionProps,
    getRootProps,
    groupedOptions,
    popupOpen,
    value,
    inputValue,
  } = useAutocomplete({
    getOptionLabel: (option) => option.name,
    id: "use-autocomplete",
    options: options,
  });

  const hasResults = groupedOptions.length > 0;
  const showNoResults = !hasResults && popupOpen;

  // This prevents a form submission when input text does not match any options
  const preventFormSubmit = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && inputValue !== value?.name)
      event.preventDefault();
  };

  return (
    <StyledDropdownSelectContainer>
      <div { ...getRootProps() }>
        <TextInput
          { ...getInputProps() }
          disabled={ disabled }
          endAdornment={
            <ArrowDropDownIcon
              sx={ {
                color: theme.colors.white,
                transform: popupOpen ? "rotate(-180deg)" : "rotate(0deg)",
                transition: "transform 200ms ease-in",
              } }
            />
          }
          errorMessage={ errorMessage }
          label={ label }
          name={ name }
          placeholder={ placeholder }
          required={ required }
          onKeyDown={ preventFormSubmit }
        />
      </div>

      { hasResults ? (
        <StyledResultsList { ...getListboxProps() }>
          { (groupedOptions as typeof options).map((option, index) => (
            <li { ...getOptionProps({ option, index }) } key={ option.id }>
              { option.name }
            </li>
          )) }
        </StyledResultsList>
      ) : null }

      { showNoResults ? (
        <StyledNoResultsText>{ noResultsText }</StyledNoResultsText>
      ) : null }
    </StyledDropdownSelectContainer>
  );
};

export default DropdownSelect;