/* eslint-disable */
import {
    Box,
    Divider,
    Card,
    CardContent,
    Typography,
    Chip,
    Grid,
    CardActions,
    CardHeader,
    IconButton,
    Button
} from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import "./index.css";
import { useState } from "react";
import { useApiLocal } from "../../../hooks/useApiLocal";
import { useNavigate, useLocation } from "react-router-dom";
import MapaForm from "../MapaForm";
import { useEffect } from "react";

function CardLocalForm({ dadosLocal, visivel }) {
    const { removerLocal } = useApiLocal();
    const navigate = useNavigate();

    const listaAtividades = dadosLocal.atividades.map(
        (atividade) => atividade.nomeAtividade
    );

    const location = useLocation();
    // const [visivel, setVisivel] = useState(true);
    console.log("ATIVIDADES: " + JSON.stringify(dadosLocal.atividades));
    function editarLocalSelecionado(idSelecionado) {
        navigate(`/cadastroLocal/${idSelecionado}`);
    }

    //  useEffect(() => {
    //   console.log(location.pathname == "/home");
    //   if (location.pathname == "/home") {
    //    setVisivel(false);
    //   } else {
    //    setVisivel(true);
    //   }
    //  }, []);

    return (
        <>
            <Card className="cardContainer" sx={{ boxShadow: 4 }}>
                <Grid
                    className="containerMapa"
                    height={352}
                    width={300}
                    mr={2}
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <MapaForm {...dadosLocal} />
                    <IconButton
                        onClick={() => window.open(dadosLocal.linkmap, "_blank")}
                        size="large"
                        className="buttonLinkMap"
                        disableRipple
                        sx={{
                            position: "absolute",
                            bottom: 10,
                            left: 10,
                            zIndex: 1000,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            border: 3
                        }}>
                        <MapOutlinedIcon fontSize="large" />
                    </IconButton>
                </Grid>
                <Box className="boxDados">
                    <CardContent className="containerDados">
                        <Typography component="div" variant="h4" className="nomeLocal">
                            {dadosLocal.nome}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" className="descricao">
                            {dadosLocal.descricao}
                        </Typography>
                        <Divider className="dividerEndereco">Endereço</Divider>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            className="endereco">
                            Logradouro: {dadosLocal.logradouro}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            className="municipio">
                            Município/Estado: {dadosLocal.municipio} / {dadosLocal.uf}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Latitude: {dadosLocal.latitude}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Longitude: {dadosLocal.longitude}
                        </Typography>
                    </CardContent>

                    <Divider className="dividerAtividades">Atividades</Divider>

                    <Grid
                        className="containerAtividades"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            marginTop: "10px",
                            gap: "20px"
                        }}>
                        {listaAtividades.map((element, index) => (
                            <Typography key={index}>
                                {element.charAt(0).toUpperCase() + element.slice(1)}
                            </Typography>
                        ))}
                    </Grid>
                    <Divider
                        sx={{
                            marginTop: "15px"
                        }}
                    />
                    {visivel && (
                        <CardActions className="cardActions">
                            <Button
                                onClick={() => editarLocalSelecionado(dadosLocal.id)}
                                size="small">
                                Editar
                            </Button>
                            <Button onClick={() => removerLocal(dadosLocal.id)} size="small">
                                Excluir
                            </Button>
                        </CardActions>
                    )}
                </Box>
            </Card>
        </>
    );
}

export default CardLocalForm;
