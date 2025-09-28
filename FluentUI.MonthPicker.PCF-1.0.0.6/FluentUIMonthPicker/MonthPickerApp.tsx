import { FluentProvider, Input, Popover, PopoverSurface, PopoverTrigger, webLightTheme,  makeStyles, shorthands, PositioningImperativeRef, IdPrefixProvider, InputProps, PopoverProps, webDarkTheme } from '@fluentui/react-components'
import { CalendarMonth20Regular  } from "@fluentui/react-icons"
import { Calendar, DateRangeType } from "@fluentui/react-calendar-compat"
import { useEffect, useMemo, useRef, useState } from 'react'
import { datesAreEqual, getSelectedMonthInfo, ISelectedMonthInfo } from './dateUtils'




export const useStyles = makeStyles({
  icon: {  
    ...shorthands.outline(0),
  },
  root: {
    display: 'flex',
    width: '100%'
  }
})

export interface IMonthPickerProps {
    instanceId: string
    dateValue: Date | undefined
    minDateValue: Date | undefined
    maxDateValue: Date | undefined
    monthDisplayFormat: Intl.DateTimeFormatOptions["month"]
    yearDisplayFormat: Intl.DateTimeFormatOptions["year"]
    localeDisplayFormat: string
    isDarkMode: boolean
    
 
    disabled: boolean
    masked: boolean
 
    //Callback function : => PCF
    onMonthChange: (selectedMonthInfo : ISelectedMonthInfo) => void
 }


const MonthPickerApp = (props:IMonthPickerProps): JSX.Element => {

    

    const [open, setOpen] = useState(false)
    const handleOpenChange: PopoverProps["onOpenChange"] = (e, data) =>{
      setOpen(data.open || false)
    } 

    
    const [selectedDate, setSelectedDate] = useState<Date|undefined>(props.dateValue)
    const prevDateValueRef = useRef<Date | undefined>();

      

    const inputRef = useRef<HTMLInputElement>(null);
    const positioningRef = useRef<PositioningImperativeRef>(null);

    const onSelectMonth = (date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
      

      const selectedMonthInfo = getSelectedMonthInfo(date);
      
      setSelectedDate(selectedMonthInfo.startDate)
      props.onMonthChange(selectedMonthInfo)
      setOpen(false)
    }

    const selectedMonthStr = useMemo(() => 
      props.masked ? '*******' : 
        selectedDate?.toLocaleDateString(props.localeDisplayFormat, { month: props.monthDisplayFormat, year: props.yearDisplayFormat }) ?? 
        '---', 
      [selectedDate, props.localeDisplayFormat, props.monthDisplayFormat, props.yearDisplayFormat, props.masked]
    );

    useEffect(() => {
      if (inputRef.current) {
        positioningRef.current?.setTarget(inputRef.current)
      }
    }, [inputRef, positioningRef])


  

     // If value is changed from outside the PCF
    useEffect(() => {

      if (!datesAreEqual(prevDateValueRef.current, props.dateValue)) {
        const selectedMonthInfo = getSelectedMonthInfo(props.dateValue); 
        setSelectedDate(selectedMonthInfo.startDate)
        props.onMonthChange(selectedMonthInfo)

        prevDateValueRef.current = props.dateValue;
         
      }
    }); // No dependency array - runs every render but with custom logic


    const onChange: InputProps["onChange"] = (ev, data) => {
      // value was cleared by the user
      if (data.value.length == 0) {
        const selectedMonthInfo = getSelectedMonthInfo(undefined); 
        setSelectedDate(selectedMonthInfo.startDate)
        props.onMonthChange(selectedMonthInfo)
      }
    };
   
    const styles = useStyles();
    return (
        
      <IdPrefixProvider value={`month-picker-${props.instanceId}-`}>
        <FluentProvider theme={props.isDarkMode ? webDarkTheme : webLightTheme} >
          <Popover positioning={{ positioningRef }} open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger disableButtonEnhancement>
              <Input
                  className={styles.root}
                  ref={inputRef}
                  appearance='filled-darker'
                  //placeholder='---'
                  disabled={props.disabled}
                  value={selectedMonthStr}
                  onChange={onChange}
                  contentAfter={
                    <PopoverTrigger disableButtonEnhancement>
                      <CalendarMonth20Regular className={styles.icon} />
                    </PopoverTrigger>
                  }
              />   
            </PopoverTrigger>

            <PopoverSurface tabIndex={-1}>
              <Calendar
                dateRangeType={DateRangeType.Month}
                showGoToToday={false}
                highlightSelectedMonth
                isDayPickerVisible={false}
                onSelectDate={onSelectMonth}
                minDate={props.minDateValue}
                maxDate={props.maxDateValue}
                value={selectedDate}
              />
            </PopoverSurface>
          </Popover>  
        </FluentProvider>
      </IdPrefixProvider >  
    )
}

export default MonthPickerApp
