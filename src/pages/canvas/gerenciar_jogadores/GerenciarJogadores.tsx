import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import "dayjs/locale/pt-br";
import { EnumStatus } from '@/rules/Enums';
import { useTranslation } from 'react-i18next';
import DropDownList from '@/components/Utils/DropDownList';
import ListView from '@/components/Utils/ListView';
import Modal_GerenciarJogadores from './Modal_GerenciarJogadores';
import {
  Container,
  Box,
  Grid,
  TextField,
  Typography,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Archive, ModeEdit, Unarchive } from '@mui/icons-material';

export default function GerenciarJogadores() {

  const theme = useTheme()
  const { t } = useTranslation()
  const [data, setData] = useState([])
  const [open, setOpen] = React.useState({create: false, edit: false, archive: false})
  const [idToEdit, setIdToEdit] = useState<number | undefined>()

  const [filtros, setFiltros] = useState({
    nomeApelido: '',
    statusJogador: ''
  })

  const opcoesStatus : {key: string, value: string}[]= [
    {key: '2', value: 'Todos'},
    {key: '1', value: 'Ativos'},
    {key: '0', value: 'Inativos' },
  ];

  const handleChange = (e: any) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    })
  };

  const handleOpen = (modalFunction : 'create' | 'edit' | 'archive', userId? : number) => {
    setOpen({
      create: modalFunction === 'create',
      edit: modalFunction === 'edit',
      archive: modalFunction === 'archive',
    })
    setIdToEdit(userId)
  }

  const handleClose = (modalFunction: 'create' | 'edit' | 'archive') => {
    setOpen({
      ...open,
      [modalFunction]: false,
    })
    getData()
  }

  useEffect(() => {
    getData();
  }, [filtros]);

  const getData = () => {
    axios.get("/api/jogadores/read", {
      params: {
        nomeJogador: filtros.nomeApelido.toUpperCase(),
        statusJogador: filtros.statusJogador !== 'Todos' ? EnumStatus?.[filtros.statusJogador as keyof typeof EnumStatus] : undefined
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
      field: 'nome_jogador',
      headerName: 'Nome do Jogador',
      flex: 2.5,
    },
    {
      field: 'apelido_jogador',
      headerName: 'Apelido',
      flex: 2.5,
    },
    {
      field: 'data_insert',
      headerName: 'Criado em',
      flex: 1.5,
      valueFormatter: (params: any) => dayjs(params.value).format('DD/MM/YY - HH:mm'),
    },
    {
      field: 'data_update',
      headerName: 'Atualizado em',
      flex: 1.5,
      valueFormatter: (params: any) => dayjs(params.value).format('DD/MM/YY - HH:mm'),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      valueFormatter: (params: any) => params.value ? 'Ativo' : 'Inativo',
    },
    {
      field: ' ',
      headerName: ' ',
      type: 'actions',
      flex: 1,
      renderCell: (params : any) => (
        <div>
          <Tooltip title={t('botao.editar.jogador')}>
            <IconButton disabled={!params.row.status} sx={{color: theme.palette.primary.main}} onClick={() => handleOpen('edit', params.row.id_jogador)}><ModeEdit /></IconButton>
          </Tooltip>
          {open.edit && params.row.id_jogador === idToEdit && (
            <>
              <Modal_GerenciarJogadores value={idToEdit} title="editar" open={open.edit} onClose={() => handleClose('edit')}>
                <></>
              </Modal_GerenciarJogadores>
          </>
          )}
          <Tooltip title={t(`botao.${params.row.status ? 'arquivar' : 'desarquivar'}.jogador`)}>
            <IconButton sx={{color: theme.palette.primary.main}} onClick={() => handleOpen('archive', params.row.id_jogador)}>{params.row.status ? <Archive /> : <Unarchive />}</IconButton>
          </Tooltip>
          {open.archive && params.row.id_jogador === idToEdit && (
            <>
              <Modal_GerenciarJogadores value={idToEdit} title={params.row.status ? "arquivar" : "desarquivar"} open={open.archive} onClose={() => handleClose('archive')}>
                <></>
              </Modal_GerenciarJogadores>
          </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
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
      <Box sx={{ backgroundColor: theme.palette.boxColor.main, padding: '40px' }}>
        <Grid container spacing={3} marginBottom={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Nome/Apelido do Jogador"
              name="nomeApelido"
              value={filtros.nomeApelido}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DropDownList
              name="statusJogador"
              label='Status de Jogador'
              options={opcoesStatus}
              defaultItem={filtros.statusJogador}
              item={filtros.statusJogador}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <ListView
          data={data}
          columns={columns}
          id={(e: any) => e.id_jogador}
        />
      </Box>
    </Container>
  )
}