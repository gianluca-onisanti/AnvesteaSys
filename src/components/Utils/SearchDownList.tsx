import { Autocomplete, TextField } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";

interface Data {
    key: number
    value: string
}

interface SDLProps<T extends Data>{
    name?: string
    label?: string
    route: string
    filter?: { [key: string]: any };
    value?: number
    onChange: (e : any, f : any) => void
}

export const SearchDownList: React.FC<SDLProps<Data>> = (props) => {

    let {
        name,
        label,
        route,
        value,
        filter,
        onChange,
    } = props


    const [ddlData, setDdlData] = useState<Data[]>([])
    const [selectedData, setSelectedData] = useState<Data | null>(null);

    useEffect(() => {
        getDDLPerfis()
    }, []);

    // PUXA dropdown de perfis no banco
    const getDDLPerfis = () => {
        const filterParams = { ...props.filter }
        axios.get(`/api/dropdownlists/${route}`, {params: filterParams})
            .then((response: any) => {
                console.log("Data", response)
                setDdlData(response.data)
            })
            .catch(err => {
                console.log("Erro ", err)
            })
    }

    useEffect(() => {
        const initialPerfil = ddlData?.find((data : Data) => data.key === value);
        setSelectedData(initialPerfil ? { value: initialPerfil.value, key: initialPerfil.key } : null);
        console.log(selectedData)
    }, [ddlData, value]);

    return(
        <Autocomplete
            filterSelectedOptions={false}
            options={(ddlData || [])?.map((data: Data) => ({
                value: data.value,
                key: data.key
            }))}
            value={selectedData ? selectedData : null}
            isOptionEqualToValue={(option, value) => option.key === value.key}
            onChange={onChange}
            getOptionLabel={(option) => option.value ? option.value : ""}
            renderInput={(params: any) => <TextField {...params} label={label} />}
            loading={!ddlData}
        />
    )
}

export default SearchDownList