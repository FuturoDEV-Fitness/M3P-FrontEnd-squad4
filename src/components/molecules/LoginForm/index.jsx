import { Grid } from "@mui/material";
import { TextField, Button } from "@mui/material";
import "./index.css";
import { Link } from "react-router-dom";
import { useApiUsuario } from "../../../hooks/useApiUsuario";
import { useForm } from "react-hook-form";
function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { login } = useApiUsuario();

    function sendLogin(formValue) {
        login({
            email: formValue.email,
            password: formValue.password
        });
    }

    return (
        <>
            <Grid className="containerLogin" sx={{ flexDirection: "column" }}>
                <Grid className="loginForm" sx={{ flexDirection: "column" }}>
                    <form className="form">
                        <Grid className="logo">
                            <img src="/assets/logo-exercita365.png" alt="Logo Exercita365" />
                        </Grid>
                        <Grid className="camposEntrada" sx={{ flexDirection: "column" }}>
                            <TextField
                                className="email"
                                id="outlined-basic"
                                type="email"
                                variant="outlined"
                                name="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register("email", {
                                    required: "Este campo é obrigatório.",
                                    maxLength: {
                                        value: 100,
                                        message: "Este campo aceita no máximo 100 caracteres."
                                    }
                                })}
                            />
                            <TextField
                                className="password"
                                id="outlined-password-input"
                                type="password"
                                autoComplete="current-password"
                                name="senha"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                {...register("password", {
                                    required: "Este campo é obrigatório.",
                                    maxLength: {
                                        value: 100,
                                        message: "Este campo aceita no máximo 100 caracteres."
                                    }
                                })}
                            />
                        </Grid>
                    </form>
                    <Grid className="containerButtonLogin">
                        <Link to="/cadastroUsuario">
                            <Button className="buttonRegister" variant="contained" size="medium">
                                Registre-se
                            </Button>
                        </Link>
                        <Button
                            onClick={handleSubmit(sendLogin)}
                            className="buttonLogin"
                            variant="contained"
                            size="medium">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default LoginForm;
