import { GridColDef } from "@mui/x-data-grid";

export default function NoRowsLabel(text : string) : readonly GridColDef<any>[] {

return ([
    {
        field:' ',
        headerName: text,
        flex: 1,
        headerAlign: 'center',
        hideSortIcons: true,
        disableColumnMenu : true,
    }
])

}