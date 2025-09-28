import * as React from "react";
import { IChoicesOption, IChoicesSelectorProps } from "./IChoicesSelectorProps";
import { v4 as uuidv4 } from 'uuid';

import {

  makeStyles,
  IdPrefixProvider,
  FluentProvider,
  Input,
} from "@fluentui/react-components";
import { Tag } from '@fluentui/react-tags';
import {   
  
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup, } from '@fluentui/react-tag-picker';

const _useStyles = makeStyles({
    root: {
        width: "100%",
    }
});

export const ChoicesSelectorControl : React.FunctionComponent<IChoicesSelectorProps> = (props) => {
   
    const [placeholder, setPlaceholder] = React.useState<string>("---");
    const [selectedOptions, setSelectedOptions] = React.useState<IChoicesOption[]>(props.selectedValues || []);

    const styles = _useStyles();
    const myTheme = props.isDisabled ? {
        ...props.theme,
        colorCompoundBrandStroke: props.theme?.colorNeutralStroke1,
        colorCompoundBrandStrokeHover: props.theme?.colorNeutralStroke1Hover,
        colorCompoundBrandStrokePressed: props.theme?.colorNeutralStroke1Pressed,
        colorCompoundBrandStrokeSelected: props.theme?.colorNeutralStroke1Selected,
        backgroundColor: props.theme?.colorNeutralBackground3,
        }
        :
        props.theme;


  const onOptionSelect: TagPickerProps["onOptionSelect"] = (e, data) => {

    setSelectedOptions((prevSelectedOptions) => {
      // const newSelectedOptions = [...prevSelectedOptions];
      // const optionIndex = newSelectedOptions.findIndex(
      //   (selectedOption) => selectedOption.value.toString() === data.value
      // );

      // if (optionIndex > -1) {
      //   // If the option is already selected, remove it
      //   newSelectedOptions.splice(optionIndex, 1);
      // } else {
      //   // If the option is not selected, add it
      //   newSelectedOptions.push({
      //     text: props.availableOptions.find((option => option.value.toString() === data.value))?.text || "",
      //     value: parseInt(data.value),
      //     key : parseInt(data.value)
      //   });
      // }

      const newSelectedOptions = data.selectedOptions.map((val) => ({
          text: props.availableOptions.find((option => option.value.toString() === val))?.text || "",
          value: parseInt(val),
          key : val
        }));

      props.onChange(newSelectedOptions);
      return newSelectedOptions;
    })
  }
  const tagPickerOptions = props.availableOptions.filter(
    (option) => !selectedOptions.find(so => so.key == option.key)
  );
  
  return (
     <div className={styles.root}>
          <IdPrefixProvider value={"csc_" +  uuidv4()}>
              <FluentProvider theme={myTheme} className={styles.root}>
              {props.isDisabled?
              <Input
                  value={props.selectedValues?.map((option) => option.text).join(", ") ?? placeholder}          
                  appearance='filled-darker'
                  className={styles.root}
                  readOnly={true}        
                  /> 
              :
            
               <TagPicker
                onOptionSelect={onOptionSelect}
                selectedOptions={selectedOptions.map(option => (option.key))}
                appearance='filled-darker'
                size="large"
              >
                <TagPickerControl> 
                  <TagPickerGroup aria-label="Selected Options">
                    {selectedOptions.map(option => (
                      <Tag
                        key={option.key}
                        shape="rounded"
                        appearance="brand"
                        value={option.key}
                      >
                        {option.text}
                      </Tag>
                    ))}
                  </TagPickerGroup>  
                </TagPickerControl>
                <TagPickerList 
                  multiselect={true}               
                  >
                  {
                   tagPickerOptions.length > 0 ? ( tagPickerOptions.map(option => (
                      <TagPickerOption
                        value={option.key}
                        key={option.key}
                      >
                        {option.text}
                        </TagPickerOption>
                    ))):(
                        <TagPickerOption value="no-options">
                          No options available
                        </TagPickerOption>

                    )
                  }
                </TagPickerList>
              </TagPicker>
              }
              </FluentProvider>
          </IdPrefixProvider>
   </div>
  );
}