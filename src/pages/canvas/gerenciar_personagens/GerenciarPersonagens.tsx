import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import "dayjs/locale/pt-br";
import { EnumStatus } from '@/rules/Enums';
import { useTranslation } from 'react-i18next';
import DropDownList from '@/components/Utils/DropDownList';
import ListView from '@/components/Utils/ListView';
import Modal_GerenciarJogadores from './Modal_GerenciarPersonagens';
import {
  Container,
  Box,
  Grid,
  TextField,
  Typography,
  useTheme,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import { Archive, ModeEdit, PersonAddAlt1, Unarchive } from '@mui/icons-material';
import SearchDownList from '@/components/Utils/SearchDownList';
import getGender from '@/rules/getGender';
import setIntToDecimal from '@/rules/setIntToDecimal';
import Modal_GerenciarPersonagens from './Modal_GerenciarPersonagens';

export default function GerenciarPersonagens() {

  const theme = useTheme()
  const { t } = useTranslation()
  const [data, setData] = useState([])
  const [open, setOpen] = React.useState({create: false, edit: false,})
  const [idToEdit, setIdToEdit] = useState<number | undefined>()

  const [filtros, setFiltros] = useState({
    nomePersonagem: '',
    statusPersonagem: '',
    donoPersonagem: 0
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

  const handleOpen = (modalFunction : 'create' | 'edit', userId? : number) => {
    setOpen({
      create: modalFunction === 'create',
      edit: modalFunction === 'edit'
    })
    setIdToEdit(userId)
  }

  const handleClose = (modalFunction: 'create' | 'edit') => {
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
    axios.get("/api/personagens/read", {
      params: {
        nomeJogador: filtros.nomePersonagem.toUpperCase(),
        statusPersonagem: filtros.statusPersonagem !== 'Todos' ? EnumStatus?.[filtros.statusPersonagem as keyof typeof EnumStatus] : undefined
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
      field: 'nome_personagem',
      headerName: 'Personagem',
      flex: 4,
      renderCell: (params : any) => (
        <div>
          <Typography variant='body2' fontWeight='bold'>
            { params.value + ', ' + params.row.idade + ' anos' } 
          </Typography>
          <Typography variant='body2' fontStyle='italic'>
            AKA {params.row.apelido}
          </Typography>
          <Typography variant='caption' fontStyle='italic'>
            "{params.row.titulo}"
          </Typography>
        </div>
      )
    },
    {
      field: 'dono_personagem',
      headerName: 'Jogador',
      flex: 4,
      renderCell: (params: any) => (
        <div>
          <Typography variant='body2' fontStyle='italic'>
            Jogador: {params.row.jogador?.nome_jogador} ({params.row.jogador?.apelido_jogador})
          </Typography>
          <Typography variant='caption' fontStyle='italic'>
            Criador: {params.row.criador?.nome_jogador}
          </Typography>
        </div>
      )
    },
    {
      field: 'dados',
      headerName: 'Dados Básicos',
      flex: 4,
      renderCell: (params: any) => (
        <div>
          <Typography variant='body2' fontWeight='500'>
            {'Raça: ' + params.row.this_raca.nome + 
            (params.row.this_raca.nome_alt ? 
            (' (' + params.row.this_raca.nome_alt + ')' ) : '') } 
          </Typography>
          <Typography variant='body2' fontStyle='italic'>
            Sexo: {getGender(params.row.sexo_genero)}
          </Typography>
          <Typography variant='caption' fontStyle='italic'>
            {'Altura: ' + (params.row.altura ? setIntToDecimal(params.row.altura) : '') + ' / Peso: ' + params.row.peso + 'kg'}
          </Typography>
        </div>
      )
    },
    {
      field: 'data_insert',
      headerName: 'Log de Alteração',
      flex: 3,
      renderCell: (params: any) => (
        <div>
          <Typography variant='body2' fontStyle='italic'>
            Atualizado em {dayjs(params.row.data_update).format('DD/MM/YY')}
          </Typography>
          <Typography variant='caption' fontStyle='italic'>
            Criado em {dayjs(params.value).format('DD/MM/YY')}
          </Typography>
        </div>
      )
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
            <IconButton disabled={!params.row.status} sx={{color: theme.palette.primary.main}} onClick={() => handleOpen('edit', params.row.id_personagem)}><ModeEdit /></IconButton>
          </Tooltip>
          {open.edit && params.row.id_personagem === idToEdit && (
            <>
              <Modal_GerenciarJogadores value={idToEdit} title="editar" open={open.edit} onClose={() => handleClose('edit')}>
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
        Gerenciar Personagens
      </Typography>
      <Box sx={{ backgroundColor: theme.palette.boxColor.main, padding: '40px' }}>
        <Grid container spacing={3} marginBottom={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Nome do Personagem"
              name="nomePersonagem"
              value={filtros.nomePersonagem}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DropDownList
              name="statusPersonagem"
              label='Status do Personagem'
              options={opcoesStatus}
              defaultItem={filtros.statusPersonagem}
              item={filtros.statusPersonagem}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <SearchDownList
              name='donoPersonagem'
              label='Dono do Personagem'
              route="ddl_jogadores"
              value={filtros.donoPersonagem}
              onChange={(e: any, f: any) => {
                setFiltros({
                  ...filtros,
                  donoPersonagem: f?.key || 0,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <Tooltip title={t('botao.criar.personagem')}>
                  <Button
                    sx={{ marginTop: "10px" }} 
                    name='create' 
                    onClick={() =>
                      handleOpen('create')}>
                      <PersonAddAlt1 />
                  </Button>
                </Tooltip>
              </div>
            </Grid>
            {open.create && (
          <>
            <Modal_GerenciarPersonagens
              title='criar'
              open={open.create}
              onClose={() => 
                handleClose('create')}>
              <></>
            </Modal_GerenciarPersonagens>
          </>
        )}
        </Grid>
        <ListView
          tallerRow
          data={data}
          columns={columns}
          id={(e: any) => e.id_jogador}
        />
      </Box>
    </Container>
  )
}