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
    Button
} from "@mui/material";
import "./index.css";
import { useState } from "react";
import { useApiLocal } from "../../../hooks/useApiLocal";
import { useNavigate, useLocation } from "react-router-dom";
import MapaForm from "../MapaForm";
import { useEffect } from "react";

function CardLocalForm({ dadosLocal }) {
    const { removerLocal } = useApiLocal();
    const navigate = useNavigate();
    const atividadesTrue = Object.entries(dadosLocal.atividades)
        .filter(([key, value]) => value === true)
        .map(([key, value]) => key);
    const location = useLocation();
    const [visivel, setVisivel] = useState(true);

    function editarLocalSelecionado(idSelecionado) {
        navigate(`/cadastroLocal/${idSelecionado}`);
    }

    useEffect(() => {
        console.log(location.pathname == "/dashboard");
        if (location.pathname == "/dashboard") {
            setVisivel(false);
        } else {
            setVisivel(true);
        }
    }, []);

    return (
        <>
            <Card className="cardContainer" sx={{ boxShadow: 4 }}>
                <Grid
                    className="containerMapa"
                    height={352}
                    width={300}
                    mr={2}
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <MapaForm {...dadosLocal} />
                </Grid>

                <Box className="boxDados">
                    <CardContent className="containerDados">
                        <Typography component="div" variant="h4" className="nomeLocal">
                            {dadosLocal.nomeLocal}
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
                        {atividadesTrue.map((atividade, index) => (
                            <Chip
                                label={atividade[0].toUpperCase() + atividade.slice(1)}
                                key={index}
                            />
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
