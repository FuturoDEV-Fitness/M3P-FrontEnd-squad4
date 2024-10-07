/* eslint-disable */
import {
    TextField,
    Grid,
    Button,
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useForm } from "react-hook-form";
import "./index.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useApiLocal } from "../../../hooks/useApiLocal";
import useBuscaCep from "../../../hooks/useBuscaCep";
import useLatitudeLongitude from "../../../hooks/useLatitudeLongitude";
import { getCookie } from "../../../hooks/useCookies";
import { LocalContext } from "../../../context/LocalContext"

function CadastroLocalForm() {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm();
    const { atividadesDisponiveis } = useContext(LocalContext)

    const { cadastrarLocal, editarLocal, getLocalPorId } =
        useApiLocal();

    const { id } = useParams();
    const [label, setLabel] = useState("Cadastrar");

    const consultaCep = async () => {
        let cepConsulta = getValues("cep").replace(/\D/g, "");
        if (cepConsulta !== "") {
            const dadosCep = await useBuscaCep(cepConsulta);
            setValue("logradouro", dadosCep.logradouro);
            setValue("municipio", dadosCep.localidade);
            setValue("uf", dadosCep.uf);
            const dadosLatLong = await useLatitudeLongitude(cepConsulta);
            setValue("latitude", dadosLatLong.lat);
            setValue("longitude", dadosLatLong.lng);
        }
    };

    const [atividades, setAtividades] = useState({
        caminhada: false,
        trilha: false,
        musculacao: false,
        natacao: false,
        surf: false,
        ciclismo: false,
        skate: false,
        corrida: false,
        futebol: false
    });

    const getAtividadesSelecionadas = (event) => {
        console.log("atividades:", atividades);
        setAtividades({
            ...atividades,
            [event.target.name]: event.target.checked
        });
    };

    function sendLocal(formValue) {
        if (id != "" && id !== undefined) {
            editarLocal(
                {
                    ...formValue,
                    usuario: getCookie("usuarioLogado"),
                    atividades: atividades
                },
                id
            );
        } else {
            cadastrarLocal({
                ...formValue,
                usuario: getCookie("usuarioLogado"),
                atividades: atividades
            });
            window.location.href = "/home";
        }

        window.location.href = "/home";
    }

    function carregarDadosEdicao(idSelecionado) {
        getLocalPorId(idSelecionado).then((response) => {
            setValue("nome", response.nome);
            setValue("descricao", response.descricao);
            setValue("cep", response.cep);
            setValue("logradouro", response.logradouro);
            setValue("municipio", response.municipio);
            setValue("uf", response.uf);
            setValue("latitude", response.latitude);
            setValue("longitude", response.longitude);

            const novasAtividades = { ...atividades };

            response.atividades.forEach((atividade) => {
                novasAtividades[atividade.nomeAtividade] = true;
            });

            setAtividades(novasAtividades);
        });
    }

    function limparCampos() {
        setValue("nome", "");
        setValue("descricao", "");
        setValue("cep", "");
        setValue("logradouro", "");
        setValue("municipio", "");
        setValue("uf", "");
        setValue("latitude", "");
        setValue("longitude", "");
        setAtividades({
            caminhada: false,
            trilha: false,
            musculacao: false,
            natacao: false,
            surf: false,
            ciclismo: false,
            skate: false,
            corrida: false,
            futebol: false
        });
    }

    useEffect(() => {
        if (id != "" && id !== undefined) {
            carregarDadosEdicao(id);
            setLabel("Editar");
        }
        limparCampos();
    }, [id]);

    return (
        <>
            <Grid className="containerCadastroLocal">
                <Grid className="cadastroFormLocal" sx={{ flexDirection: "column" }}>
                    <form>
                        <Grid className="logoCadastroLocal">
                            <img src="/assets/logo-exercita365.png" alt="Logo Exercita365" />
                        </Grid>
                        <Grid className="gridNomeLocal" sx={{ flexDirection: "column" }}>
                            <TextField
                                type="text"
                                variant="outlined"
                                placeholder="Nome do Local"
                                error={!!errors.nomeLocal}
                                helperText={errors.nomeLocal?.message}
                                sx={{ height: "1rem" }}
                                {...register("nome", {
                                    required: "Este campo é obrigatório.",
                                    maxLength: {
                                        value: 100,
                                        message: "Este campo aceita no máximo 100 caracteres."
                                    }
                                })}
                            />

                            <TextField
                                type="text"
                                variant="outlined"
                                placeholder="Descricao do Local"
                                error={!!errors.descricao}
                                helperText={errors.descricao?.message}
                                {...register("descricao", {
                                    required: "Este campo é obrigatório.",
                                    maxLength: {
                                        value: 150,
                                        message: "Este campo aceita no máximo 100 caracteres."
                                    }
                                })}
                            />
                        </Grid>

                        <Grid className="dadosEndereco">
                            <TextField
                                placeholder="CEP"
                                variant="outlined"
                                error={!!errors.cep}
                                helperText={errors.cep?.message}
                                {...register("cep", {
                                    required: "Este campo é obrigatório.",
                                    onBlur: () => consultaCep(),
                                    maxLength: {
                                        value: 8,
                                        message: "Este campo aceita no máximo 8 caracteres."
                                    }
                                })}
                            />

                            <TextField
                                type="text"
                                variant="outlined"
                                placeholder="Logradouro"
                                error={!!errors.logradouro}
                                helperText={errors.logradouro?.message}
                                {...register("logradouro", {
                                    required: "Este campo é obrigatório.",
                                    maxLength: {
                                        value: 60,
                                        message: "Este campo aceita no máximo 30 caracteres."
                                    }
                                })}
                            />

                            <TextField
                                type="text"
                                variant="outlined"
                                placeholder="Município"
                                error={!!errors.municipio}
                                helperText={errors.municipio?.message}
                                {...register("municipio", {
                                    required: "Este campo é obrigatório.",
                                    maxLength: {
                                        value: 20,
                                        message: "Este campo aceita no máximo 20 caracteres."
                                    }
                                })}
                            />

                            <TextField
                                type="text"
                                variant="outlined"
                                placeholder="Estado"
                                error={!!errors.uf}
                                helperText={errors.uf?.message}
                                {...register("uf", {
                                    required: "Este campo é obrigatório.",
                                    maxLength: {
                                        value: 2,
                                        message: "Este campo aceita no máximo 2 caracteres."
                                    }
                                })}
                            />

                            <TextField
                                type="text"
                                variant="outlined"
                                placeholder="Latitude"
                                error={!!errors.latitude}
                                helperText={errors.latitude?.message}
                                {...register("latitude", {
                                    required: "Este campo é obrigatório.",
                                    maxLength: {
                                        value: 10,
                                        message: "Este campo aceita no máximo 10 caracteres."
                                    }
                                })}
                            />

                            <TextField
                                type="text"
                                variant="outlined"
                                placeholder="Longitude"
                                error={!!errors.longitude}
                                helperText={errors.longitude?.message}
                                {...register("longitude", {
                                    required: "Este campo é obrigatório.",
                                    maxLength: {
                                        value: 10,
                                        message: "Este campo aceita no máximo 10 caracteres."
                                    }
                                })}
                            />
                        </Grid>
                        <Grid className="containerSelecoes" sx={{ flexDirection: "column" }}>
                            <FormControl
                                required
                                component="fieldset"
                                sx={{ m: 3 }}
                                variant="standard">
                                <FormLabel component="legend" className="atividade-titulo">
                                    Atividades Esportivas
                                </FormLabel>
                                <FormGroup className="atividades">
                                    <Grid sx={{ display: "flex", flexWrap: "wrap" }}>
                                        {atividadesDisponiveis.map((atividade, index) => (
                                            <div className="atividade-item" key={index}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={atividades[atividade.nomeAtividade] || false}
                                                            onChange={getAtividadesSelecionadas}
                                                            name={atividade.nomeAtividade}
                                                        />
                                                    }
                                                    label={
                                                        atividade.nomeAtividade.charAt(0).toUpperCase() +
                                                        atividade.nomeAtividade.slice(1)
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </Grid>
                                </FormGroup>

                            </FormControl>
                        </Grid>
                    </form>

                    <Grid className="containerButtonCadastro">
                        <Link to="/home">
                            <Button className="buttonHome" variant="contained" size="medium">
                                Home
                            </Button>
                        </Link>
                        <Button
                            onClick={handleSubmit(sendLocal)}
                            className="buttonCadastrar"
                            variant="contained"
                            size="medium">
                            {label}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default CadastroLocalForm;
