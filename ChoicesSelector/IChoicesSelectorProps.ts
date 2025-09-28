import { Theme } from "@fluentui/react-components";

export interface IChoicesOption{
    text: string;
    key: string;
    value: number;
}

export interface IChoicesSelectorProps {
    selectedValues: IChoicesOption[] | undefined;
    availableOptions: IChoicesOption[];
    isDisabled: boolean;
    onChange: (selectedOptions?: IChoicesOption[]) => void;
    theme?: Theme
}