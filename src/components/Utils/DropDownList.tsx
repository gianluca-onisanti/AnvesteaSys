import React from 'react'
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

interface DDLProps {
    name?: string
    label?: string
    route?: string
    options: { key: string | number | boolean, value: string}[]
    item: string | number
    defaultItem? : string
    onChange?: (e : any) => void
}

export const DropDownList: React.FC<DDLProps> = (props) => {

    const {
        name,
        label,
        route,
        options,
        item,
        defaultItem,
        onChange,
    } = props

    return(
    <FormControl fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
            name={name}
            defaultValue={defaultItem}
            value={item}
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            >
            {options.map((item : any) => (
                <MenuItem key={item.key} value={item.value}>
                {item.value}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
    );
}

export default DropDownList