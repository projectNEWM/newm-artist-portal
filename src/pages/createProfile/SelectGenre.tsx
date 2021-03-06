import { FunctionComponent } from "react";
import { AddProfileInformation } from "components";
import { useSelector } from "react-redux";
import { selectContent } from "modules/content";

const SelectGenre: FunctionComponent = () => {
  const { genres } = useSelector(selectContent);

  return (
    <AddProfileInformation
      fieldName="genre"
      helperText="Type or select a genre"
      placeholder="genre"
      prompt="What's your music genre?"
      tags={ genres }
    />
  );
};

export default SelectGenre;
