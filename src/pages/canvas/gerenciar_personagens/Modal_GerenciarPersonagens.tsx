import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GridCloseIcon } from '@mui/x-data-grid'
import { EnumClasse, EnumClasseNome, EnumModalMode, EnumSexo, EnumSexoNome } from '@/rules/Enums'
import { useTranslation } from 'react-i18next'
import SearchDownList from '@/components/Utils/SearchDownList'
import DropDownList from '@/components/Utils/DropDownList'
import TabPanel from "@/components/Utils/TabPanel"
import {
    Box,
    Typography,
    Grid,
    TextField,
    Checkbox,
    Button,
    IconButton,
    ModalProps,
    Modal,
    Divider,
    Tab,
    Tabs
} from '@mui/material'
import getLabelTypo from '@/rules/getLabelTypo'

type CloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick' | 'sucessChanges' | 'cancelButtonClick';
type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
interface ModalCustomProps extends ModalProps {
    onClose: (reason: CloseReason) => void;
    value?: number | undefined
}

export default function Modal_GerenciarPersonagens({ open, onClose, title, value, ...props }: ModalCustomProps) {

    const [tabValue, setTabValue] = useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }    

    const [formData, setFormData] = useState({
        idPersonagem: 0,
        nomePersonagem: '',
        tituloPersonagem: '',
        apelidoPersonagem: '',
        criador: '',
        jogadorAtual: 0,
        inventarioAtribuido: 0,
        sexoGenero: 5,
        idade: 0,
        altura: 0,
        peso: 0,
        raca: 0,
        profissaoFantasia: '',
        classe: 0,
        subclasse: 0,
        foto: 0,
        statusPersonagem: true,
    })
    const modoModal = EnumModalMode?.[title as keyof typeof EnumModalMode]
    const { t } = useTranslation()

    const opcoesSexo = 
        Object.entries(EnumSexo)
        .filter(([, value]) => typeof value === 'number')
        .map(([key, value]) => ({ 
            key: value.toString(),
            value: EnumSexoNome[key as 
                keyof typeof EnumSexoNome],
        }))

    const opcoesClasse = 
        Object.entries(EnumClasse)
        .filter(([, value]) => typeof value === 'number')
        .map(([key, value]) => ({ 
            key: value.toString(),
            value: EnumClasseNome[key as 
                keyof typeof EnumClasseNome],
        }))

    //Propriedades do Modal
    const [modalProperties, setModalProperties] = useState({
        idPersonagem: value ? value : 0,
        tituloMsg: t(`titulo.${title}.personagem`),
        botaoMsg: t(`botao.${title}.personagem`),
    })

    //Define o modus operandi do modal (Criação ou Edição)
    useEffect(() => {
        if (modoModal > 0) {
            getPersonagem()
        } else {
            setFormData({
                ...formData,
                idPersonagem: 0,
                nomePersonagem: '',
                tituloPersonagem: '',
                apelidoPersonagem: '',
                statusPersonagem: true,
            })
        }
    }, []);

    // PUXA o usuário do banco
    const getPersonagem = () => {
        axios.get("/api/personagens/read", {
            params: {
                idPersonagem: modalProperties.idPersonagem,
            }
        })
            .then((response: any) => {
                console.log("Data", response)
                setFormData({
                    ...formData,
                    idPersonagem: response.data[0]
                        .id_personagem,
                    nomePersonagem: response.data[0]
                        .nome_personagem,
                    apelidoPersonagem: response.data[0]
                        .apelido,
                    tituloPersonagem: response.data[0]
                        .titulo,
                    criador: (response.data[0]
                        .criador?.nome_jogador) + ' (' +
                        (response.data[0].
                            criador?.apelido_jogador) + ')',
                    jogadorAtual: response.data[0]
                        .id_jogador,
                    inventarioAtribuido: 0,//response.data[0]
                    sexoGenero: response.data[0]
                        .sexo_genero,
                    idade: response.data[0]
                        .idade,
                    altura: response.data[0]
                        .altura,
                    peso: response.data[0]
                        .peso,
                    raca: response.data[0]
                        .raca,
                    profissaoFantasia: response.data[0]
                        .profissao,
                    classe: response.data[0]
                        .classe,
                    subclasse: response.data[0]
                        .subclasse,
                    foto: response.data[0]
                        .dir_foto,
                    statusPersonagem: response.data[0]
                        .status
                })
            })
            .catch(err => {
                console.log("Erro ", err)
            })
    }

    // Ao MUDAR formulário . . .
    const handleChangeForm = (e: any) => {
        const { name, value } = e.target
        //Atualizando o formulário 
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    // INSERE O Usuário no banco
    const setPersonagem = async (e: any) => {
        try {
            const response = await axios.post("/api/personagens/upsert", {
                data: {
                    id_personagem: Number(value) || 0,
                    nome_personagem: formData.nomePersonagem,
                    apelido: formData.apelidoPersonagem,
                    titulo: formData.tituloPersonagem,
                    id_criador: Number(formData.jogadorAtual),
                    id_jogador: Number(formData.jogadorAtual),
                    profissao: formData.profissaoFantasia,
                    raca: Number(formData.raca),
                    sexo_genero: Number(formData.sexoGenero),
                    idade: Number(formData.idade),
                    altura: Number(formData.altura),
                    peso: Number(formData.peso),
                    dir_foto: '',
                    classe: Number(formData.classe),
                    subclasse: Number(formData.subclasse),
                    status: formData.statusPersonagem,
                }
            });
            console.log("Upsert Response:", response);
            setTimeout(() => {
                onClose('sucessChanges');
            }, 200)
        } catch (error) {
            console.error("Upsert Error:", error);
        }
    }

    //Estilo do Modal da Página
    const modal_style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid',
        width: '1080px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal open={open}>
            <Box sx={modal_style}>
                <Typography textAlign='center' variant="h6" component="h2" marginBottom="30px">
                    {modalProperties.tituloMsg}
                </Typography>
                <Box sx={{ width: '100%', marginBottom: '20px' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleChange}>
                            <Tab label={getLabelTypo("Personagem")} />
                            <Tab label={getLabelTypo("Atributos")} />
                            <Tab label={getLabelTypo("Inventários")} />
                        </Tabs>
                    </Box>
                </Box>
                <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={() => onClose('closeButtonClick')}>
                    <GridCloseIcon />
                </IconButton>
                <TabPanel value={tabValue} index={0}>
                    <Divider sx={{ marginBottom: '20px' }}>Básicos</Divider>
                    <Grid container spacing={4} marginBottom={5} justifyContent='center'>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Nome"
                                name="nomePersonagem"
                                value={formData.nomePersonagem}
                                onChange={handleChangeForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Título"
                                name="tituloPersonagem"
                                value={formData.tituloPersonagem}
                                onChange={handleChangeForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Apelido"
                                name="apelidoPersonagem"
                                value={formData.apelidoPersonagem}
                                onChange={handleChangeForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Criador do Personagem"
                                name="criador"
                                value={formData.criador}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <SearchDownList
                                label="Jogador Atual"
                                route='ddl_jogadores'
                                name="jogadorAtual"
                                value={formData.jogadorAtual}
                                onChange={(e: any, f: any) => {
                                    setFormData({
                                        ...formData,
                                        jogadorAtual: f?.key || 0,
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <SearchDownList
                                label="Inventário"
                                route='ddl_inventário'
                                name="inventarioAtribuido"
                                value={formData.inventarioAtribuido}
                                onChange={handleChangeForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Profissão/Fantasia"
                                name="profissaoFantasia"
                                value={formData.profissaoFantasia}
                                onChange={handleChangeForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <SearchDownList
                                label="Raça"
                                route='ddl_raca'
                                name="raca"
                                value={formData.raca}
                                onChange={(e: any, f: any) => {
                                    setFormData({
                                        ...formData,
                                        raca: f?.key || 0,
                                    });
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginBottom: '20px' }}>Informações</Divider>
                    <Grid container spacing={4} marginBottom={5} justifyContent='center'>
                        <Grid item xs={12} sm={3}>
                            <DropDownList
                                name="sexoGenero"
                                label='Sexo/Gênero'
                                options={opcoesSexo}
                                item={opcoesSexo?.
                                [Number(formData.sexoGenero)]?.
                                    value || ""}
                                onChange={(e: any) => {
                                    const selected =
                                        opcoesSexo
                                            .find((option) =>
                                                option.value === e.target.value)
                                    setFormData({
                                        ...formData,
                                        sexoGenero:
                                            Number(selected?.key)
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                fullWidth
                                label="Idade"
                                name="idade"
                                value={formData.idade}
                                onChange={handleChangeForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                fullWidth
                                label="Altura (cm)"
                                name="altura"
                                value={formData.altura}
                                onChange={handleChangeForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                fullWidth
                                label="Peso (kg)"
                                name="peso"
                                value={formData.peso}
                                onChange={handleChangeForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                disabled
                                label="Foto"
                                name="foto"
                                value={formData.foto}
                                onChange={handleChangeForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <DropDownList
                                name="classe"
                                label='Classe'
                                options={opcoesClasse}
                                item={opcoesClasse?.
                                [Number(formData.classe)]?.
                                    value || ""}
                                onChange={(e: any) => {
                                    const selected =
                                        opcoesClasse
                                            .find((option) =>
                                                option.value === e.target.value)
                                    setFormData({
                                        ...formData,
                                        classe:
                                            Number(selected?.key)
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <DropDownList
                                name="subclasse"
                                label='Subclasse'
                                options={opcoesClasse}
                                item={opcoesClasse?.
                                [Number(formData.subclasse)]?.
                                    value || ""}
                                onChange={(e: any) => {
                                    const selected =
                                        opcoesSexo
                                            .find((option) =>
                                                option.value === e.target.value)
                                    setFormData({
                                        ...formData,
                                        subclasse:
                                            Number(selected?.key)
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} textAlign='center'>
                            <Checkbox
                                onChange={handleChangeForm}
                                checked={formData.statusPersonagem}
                                name="statusPersonagem"
                            />
                            <Typography className="checkBoxText">
                                Ativo
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} marginBottom={2} justifyContent='center'>
                        <Grid item xs={12} textAlign='center'>
                            <Button onClick={() => setPersonagem(formData)} type="submit" variant="contained">
                                {modalProperties.botaoMsg}
                            </Button>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>

                </TabPanel>
                <TabPanel value={tabValue} index={2}>

                </TabPanel>
            </Box>
        </Modal>
    )
}