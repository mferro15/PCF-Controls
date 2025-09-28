/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    BoundAttribute: ComponentFramework.PropertyTypes.Property;
    ActionText: ComponentFramework.PropertyTypes.StringProperty;
    Id: ComponentFramework.PropertyTypes.StringProperty;
    SendId: ComponentFramework.PropertyTypes.EnumProperty<"1" | "0">;
    Width: ComponentFramework.PropertyTypes.StringProperty;
    EnableButtonOnDisabledForm: ComponentFramework.PropertyTypes.EnumProperty<"1" | "0">;
    BackColor: ComponentFramework.PropertyTypes.StringProperty;
    BorderColor: ComponentFramework.PropertyTypes.StringProperty;
    Color: ComponentFramework.PropertyTypes.StringProperty;
    HoverBackColor: ComponentFramework.PropertyTypes.StringProperty;
    HoverBorderColor: ComponentFramework.PropertyTypes.StringProperty;
    HoverColor: ComponentFramework.PropertyTypes.StringProperty;
    PressedBackColor: ComponentFramework.PropertyTypes.StringProperty;
    PressedBorderColor: ComponentFramework.PropertyTypes.StringProperty;
    PressedColor: ComponentFramework.PropertyTypes.StringProperty;
    IconName: ComponentFramework.PropertyTypes.StringProperty;
    ToolTip: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    BoundAttribute?: any;
}
