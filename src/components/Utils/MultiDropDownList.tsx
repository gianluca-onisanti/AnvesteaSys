import React from 'react'
import { Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

interface MDDLProps {
    name?: string
    label?: string
    route?: string
    options: { key: string, value: string}[]
    items: string[]
    onChange?: (e : any) => void
}

export const MultiDropDownList: React.FC<MDDLProps> = (props) => {

    const {
        name,
        label,
        route,
        options,
        items,
        onChange,
    } = props

    return(
    <FormControl fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
            multiple
            name={name}
            value={items}
            onChange={onChange}
            renderValue={(e) => e ? e.join(', ') : ''}
            input={<OutlinedInput label={label} />}
            >
            {options.map((item : any) => (
                <MenuItem key={item.key} value={item.value}>
                <Checkbox checked={items.includes(item.value)} />
                {item.value}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
    );
}

export default MultiDropDownList