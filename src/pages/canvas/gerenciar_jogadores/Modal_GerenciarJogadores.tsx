import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GridCloseIcon } from '@mui/x-data-grid'
import { EnumModalMode } from '@/rules/Enums'
import { useTranslation } from 'react-i18next'
import SearchDownList from '@/components/Utils/SearchDownList'
import { 
    Visibility,
    VisibilityOff,
    Replay
} from '@mui/icons-material'
import { 
    Box, 
    Typography,
    Grid,
    TextField,
    Checkbox,
    Button,
    InputAdornment,
    IconButton,
    ModalProps,
    Modal,
    Tooltip,
    Chip
} from '@mui/material'

type CloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick' | 'sucessChanges' | 'cancelButtonClick';
type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
interface ModalCustomProps extends ModalProps {
    onClose: (reason: CloseReason) => void;
    value?: number | undefined
}

export default function Modal_GerenciarJogadores({open, onClose , title, value, ...props} : ModalCustomProps) {
    
    const [formData, setFormData] = useState({                
        idJogador: 0,
        nomeJogador: '',
        apelidoJogador: '',
        statusJogador: true,
    })
    const modoModal = EnumModalMode?.[title as keyof typeof EnumModalMode]
    const {t} = useTranslation()

    //Propriedades do Modal
    const [modalProperties, setModalProperties] = useState({
        idJogador: value ? value : 0,
        tituloMsg: t(`titulo.${title}.jogador`),
        botaoMsg: t(`botao.${title}.jogador`),
        chipMsg: t(`mensagem.sucesso.${title}.jogador`),
        showChip: false,
        buttonColor: (modoModal > 1 ? 'error' : 'primary') as ButtonColor,
    })

    // Lista de Erros presentes no Modal
    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})

    //Define o modus operandi do modal (Criação ou Edição)
    useEffect(() => {
        if(modoModal > 0){
            getJogador()
        }else{
            setFormData({
                idJogador: 0,
                nomeJogador: '',
                apelidoJogador: '',
                statusJogador: true,
            })
        }
    }, []);

    // PUXA o usuário do banco
    const getJogador = () => {
        axios.get("/api/jogadores/read", {
            params: {
                idJogador: modalProperties.idJogador,
            }
        })
            .then((response: any) => {
                console.log("Data", response)
                setFormData({
                    ...formData,
                    idJogador: response.data[0].id_jogador,
                    nomeJogador: response.data[0].nome_jogador,
                    apelidoJogador: response.data[0].apelido_jogador,
                    statusJogador: response.data[0].status
                })
            })
            .catch(err => {
                console.log("Erro ", err)
            })
    }

    // Ao MUDAR formulário . . .
    const handleChangeForm = (e : any) => {
        const { name, value } = e.target
        //Atualizando o formulário 
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };
 
    // INSERE O Usuário no banco
    const setJogador = async (e: any) => {
        try {
          setModalProperties({ ...modalProperties, showChip: true})
          const response = await axios.post("/api/jogadores/upsert", {
                data: {
                    id_jogador: formData.idJogador,
                    nome_jogador: formData.nomeJogador,
                    apelido_jogador: formData.apelidoJogador,
                    status: modoModal !== 3 ? (modoModal === 2 ? false : formData.statusJogador) : true,
                }
          });
          console.log("Upsert Response:", response);
          setTimeout(() => {
            onClose('sucessChanges'); 
            setModalProperties({ ...modalProperties, showChip: false})
          }, 600)
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
        width: '480px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal open={open}>
            <Box sx={modal_style}>
                <Typography textAlign='center' variant="h6" component="h2" marginBottom="30px">
                    {modalProperties.tituloMsg}
                </Typography>
                <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={() => onClose('closeButtonClick')}>
                    <GridCloseIcon />
                </IconButton>
                <Grid container justifyContent="center" spacing={4} marginBottom={2}>
                    {modoModal < 2 ? (
                        <>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    label="Nome do Jogador"
                                    name="nomeJogador"
                                    value={formData.nomeJogador}
                                    onChange={handleChangeForm}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    label="Apelido do Jogador"
                                    name="apelidoJogador"
                                    value={formData.apelidoJogador}
                                    onChange={handleChangeForm}
                                />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item xs={12}>
                                <Typography textAlign='center' >
                                    Deseja mesmo {title?.toLowerCase()} "{formData.nomeJogador}"?
                                </Typography>
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12} textAlign='center'>
                        <Button onClick={() => setJogador(formData)} type="submit" variant="contained" color={modalProperties.buttonColor}>
                            {modalProperties.botaoMsg}
                        </Button>
                        {modoModal > 1 && (
                            <>
                                <Button onClick={() => onClose('cancelButtonClick')} type="submit" variant="contained" color="primary" sx={{marginLeft: "20px"}}>
                                    Cancelar
                                </Button>
                            </>
                        )}
                        {modalProperties.showChip && (
                            <Chip label={modalProperties.chipMsg} color='success' size='small' sx={{marginTop: "12px", display: "flex", position: "absolute", justifyContent: "center", alignItems: "center" }} />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}