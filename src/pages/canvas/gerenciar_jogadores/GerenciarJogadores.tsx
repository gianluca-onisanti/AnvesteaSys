import React, { useState, useEffect } from 'react';
import { LocalizationProvider , DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios';
import dayjs from 'dayjs';
import "dayjs/locale/pt-br";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter)
import { DataGrid } from '@mui/x-data-grid';
import {
  Container,
  Box,
  Grid,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
} from "@mui/material";

export default function GerenciarJogadores() {

  const [data, setData] = useState([]);
  const [nomeObra, setNomeObra] = useState("");
  const [siglaObra, setSiglaObra] = useState("")
  const [dataInicial, setDataInicial] = useState(dayjs().startOf('month'));
  const [dataFinal, setDataFinal] = useState(dayjs());
  const [listaUnidades, setListaUnidades] = useState<string[]>([]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setListaUnidades(value);
  };

  useEffect(() => {
    getData();
    console.log(listaUnidades)
  }, [nomeObra, siglaObra, dataInicial, dataFinal, listaUnidades]);

  const getData = () => {
    axios.get("/api/pecas_projetadas", {
      params: {
        nomeObra: nomeObra.toUpperCase(),
        siglaObra: siglaObra.toUpperCase(),
        dataInicial: new Date(dataInicial.toString()),
        dataFinal: new Date(dataFinal.toString()),
      }
    })
      .then((response: any) => {
        console.log("Data", response)
        setData(response.data)
      })
      .catch(err => {
        console.log("Erro ", err)
      })
  }

  const columns = [
    {
      field: 'sigla_obra',
      headerName: 'Sigla',
      width: 100,
    },
    {
      field: 'nome_obra',
      headerName: 'Nome da Obra',
      width: 370,
    },
    {
      field: 'data_registro',
      headerName: 'Data de Registro',
      width: 180,
      valueFormatter: (params: any) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'nome_peca',
      headerName: 'Peça',
      width: 200,
    },
    {
      field: 'cod_controle',
      headerName: 'Cod. Controle',
      width: 140,
    },
    {
      field: 'volume',
      headerName: 'Volume',
      width: 80,
    },
    {
      field: 'unidade',
      headerName: 'Unidade',
      width: 120,
    },
  ];

  return (
    <Container maxWidth="xl">
      <div>
        <Typography
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex", marginBottom: "20px" },
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Gerenciar Jogadores
        </Typography>
        <Grid container spacing={3} marginBottom={2}>
          <Grid item xs={12} sm={1}>
            <TextField
              fullWidth
              label="Sigla"
              name="siglaObra"
              value={siglaObra}
              onChange={(e) => setSiglaObra(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Nome da Obra"
              name="nomeObra"
              value={nomeObra}
              onChange={(e) => setNomeObra(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
              <DatePicker
                label="Data Inicial"
                value={dataInicial}
                maxDate={dataFinal}
                onChange={(e) => setDataInicial(dayjs(e))}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
              <DatePicker
                label="Data Final"
                value={dataFinal}
                minDate={dataInicial}
                onChange={(e) => setDataFinal(dayjs(e))}
              />
            </LocalizationProvider>

          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="unidades-label">Unidade</InputLabel>
              <Select
                multiple
                value={listaUnidades}
                onChange={handleChange}
                renderValue={(e) => e ? e.join(', ') : ''}
                input={<OutlinedInput label="Unidade" />}
              >
                {/* {opcoesUnidades.map((unidade) => (
                  <MenuItem key={unidade.key} value={unidade.value}>
                    <Checkbox checked={listaUnidades.includes(unidade.value)} />
                    {unidade.value}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'data_registro', sort: 'asc' }],
            },
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          disableColumnMenu
        />
      </Box>
    </Container>
  )
}