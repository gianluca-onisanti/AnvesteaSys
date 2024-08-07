import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React from 'react'

interface DateSelectProps {
    label?: string
    value: dayjs.Dayjs
    minDate?: dayjs.Dayjs
    maxDate?: dayjs.Dayjs
    onChange?: (e : any) => void
}

const DateSelect: React.FC<DateSelectProps> = (props) => {

    const {
        label,
        value,
        minDate,
        maxDate,
        onChange,
    } = props

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
            <DatePicker
            label={label}
            value={value}
            minDate={minDate}
            maxDate={maxDate}
            onChange={onChange}
            />
      </LocalizationProvider>        
    )
}

export default DateSelect