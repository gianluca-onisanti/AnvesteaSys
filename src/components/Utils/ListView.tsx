import NoRowsLabel from "@/rules/NoRowsLabel"
import { Box } from "@mui/material"
import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid"
import { useTranslation } from 'react-i18next';

interface LVProps {
    className?: string
    tallerRow?: boolean | false
    id?: GridRowIdGetter<any> | undefined
    data: readonly any[]
    columns: readonly GridColDef<any>[]
    paginationOptions?: readonly (number | { value: number, label: string })[] | undefined
    itemsPerPage?: number
}

export const ListView: React.FC<LVProps> = (props) => {
    
    const {
        className,
        tallerRow,
        id,
        data,
        columns,
        paginationOptions,
        itemsPerPage
    } = props

    const {t, i18n} = useTranslation()

    return (
        <Box className='dataGridContainer'>
        <DataGrid
          autoHeight
          rowHeight={tallerRow ? 100 : 52}
          className={className || 'dataGrid'}
          getRowId={id}
          rows={data}
          columns={data.length ? columns : NoRowsLabel(t('tabela.vazia'))}
          pageSizeOptions={paginationOptions || [8, 16, 40]}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: itemsPerPage || 8,
              },
            },
          }}
          localeText={{
            MuiTablePagination: {labelRowsPerPage: t('tabela.paginador')},
            noRowsLabel: ''
          }}
        />
      </Box>
    )

}

export default ListView