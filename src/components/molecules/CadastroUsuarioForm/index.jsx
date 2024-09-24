import {
  Select,
  TextField,
  MenuItem,
  Grid,
  Button,
  FormControl
} from "@mui/material";
import { useForm } from "react-hook-form";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useApiUsuario } from "../../../hooks/useApiUsuario";
import useBuscaCep from "../../../hooks/useBuscaCep";

function CadastroUsuarioForm() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors }
  } = useForm();

  const { cadastrarUsuario, usuarios } = useApiUsuario();

  const navigate = useNavigate();

  function sendCadastro(formValue) {
    if (usuarios.find((usuario) => usuario.cpf === formValue.cpf)) {
      alert("Usuario ja cadastrado");

      return;
    }

    cadastrarUsuario({ ...formValue, cpf: formValue.cpf.replace(/\D/g, "") });
    navigate("/");
  }

  const consultaCep = async () => {
    let cepConsulta = getValues("cep").replace(/\D/g, "");
    if (cepConsulta !== "") {
      console.log(typeof cepConsulta.length);
      const dadosCep = await useBuscaCep(cepConsulta);
      setValue("logradouro", dadosCep.logradouro);
      setValue("municipio", dadosCep.localidade);
      setValue("uf", dadosCep.uf);
    }
  };

  return (
    <>
      <Grid className="containerCadastroUsuario">
        <Grid className="cadastroFormUsuario" sx={{ flexDirection: "column" }}>
          <form>
            <Grid className="logoCadastroUsuario">
              <img src="/assets/logo-exercita365.png" alt="Logo Exercita365" />
            </Grid>
            <Grid className="gridNomeUsuario" sx={{ flexDirection: "column" }}>
              <TextField
                type="text"
                variant="outlined"
                placeholder="Nome"
                error={!!errors.nome}
                helperText={errors.nome?.message}
                sx={{ height: "1rem" }}
                {...register("nome", {
                  required: "Este campo é obrigatório.",
                  maxLength: {
                    value: 100,
                    message: "Este campo aceita no máximo 100 caracteres."
                  }
                })}
              />
            </Grid>
            <Grid className="dadosComplementares">
              <FormControl fullWidth>
                <Select
                  defaultValue="Selecione"
                  {...register("sexo", {
                    required: "Este campo é obrigatório."
                  })}>
                  <MenuItem value="Selecione" disabled>
                    <em>Selecione o Sexo</em>
                  </MenuItem>
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Feminino">Feminino</MenuItem>
                </Select>
              </FormControl>

              <TextField
                placeholder="CPF"
                variant="outlined"
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                {...register("cpf", {
                  required: "Este campo é obrigatório.",
                  maxLength: {
                    value: 11,
                    message: "Este campo aceita no máximo 11 caracteres."
                  }
                })}
              />

              <TextField
                placeholder="Data de Nascimento"
                type="date"
                variant="outlined"
                error={!!errors.dataNascimento}
                helperText={errors.dataNascimento?.message}
                {...register("dataNascimento", {
                  required: "Este campo é obrigatório.",
                  maxLength: {
                    value: 10,
                    message: "Este campo aceita no máximo 8 caracteres."
                  }
                })}
              />

              <TextField
                type="email"
                placeholder="E-mail"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                autoComplete="username"
                {...register("email", {
                  required: "Este campo é obrigatório.",
                  maxLength: {
                    value: 60,
                    message: "Este campo aceita no máximo 60 caracteres."
                  }
                })}
              />
              <TextField
                type="password"
                autoComplete="current-password"
                placeholder="Senha"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", {
                  required: "Este campo é obrigatório.",
                  maxLength: {
                    value: 20,
                    message: "Este campo aceita no máximo 20 caracteres."
                  }
                })}
              />

              <TextField
                type="password"
                autoComplete="current-password"
                placeholder="Confirma Senha"
                error={!!errors.confirmaPassword}
                helperText={errors.confirmaPassword?.message}
                {...register("confirmaPassword", {
                  required: "Confirme a Password.",
                  validate: (value) =>
                    value === watch("password") || "As senhas não coincidem"
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
                    value: 30,
                    message: "Este campo aceita no máximo 100 caracteres."
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
                    value: 30,
                    message: "Este campo aceita no máximo 30 caracteres."
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
                placeholder="Número"
                error={!!errors.numero}
                helperText={errors.numero?.message}
                {...register("numero", {
                  required: "Este campo é obrigatório.",
                  maxLength: {
                    value: 5,
                    message: "Este campo aceita no máximo 5 caracteres."
                  }
                })}
              />

              <TextField
                type="text"
                variant="outlined"
                placeholder="Complemento"
                error={!!errors.complemento}
                helperText={errors.complemento?.message}
                {...register("complemento", {
                  maxLength: {
                    value: 100,
                    message: "Este campo aceita no máximo 100 caracteres."
                  }
                })}
              />
            </Grid>
          </form>
          <Grid
            className="containerButtonCadastroUsuario"
            sx={{ flexDirection: "column" }}>
            <Button
              onClick={handleSubmit(sendCadastro)}
              className="buttonCadastrar"
              variant="contained"
              size="medium">
              Cadastrar
            </Button>
            <Link to="/">
              <Button className="buttonVoltar" variant="contained" size="medium">
                Já Possui Cadastro?
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CadastroUsuarioForm;
