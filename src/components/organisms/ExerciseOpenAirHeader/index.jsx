/* eslint-disable */
import { Button, Menu, MenuItem } from "@mui/material";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useApiUsuario } from "../../../hooks/useApiUsuario";

function ExerciseOpenAirHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { logout } = useApiUsuario();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout(localStorage.getItem("usuarioLogado"));
        localStorage.removeItem("usuarioLogado");

        navigate("/");
        setAnchorEl(null);
    };

    return (
        <div className="header">
            <div className="navbar">
                <span className="logoHeader">
                    <Link className="labelHome" to="/dashboard">
                        <img src="/assets/logo-exercita365.png" alt="Logo da página" />
                    </Link>
                </span>
                <ul className="menuHeader">
                    <li>
                        <Link to="/cadastroLocal">Cadastrar Local</Link>
                    </li>

                    <li>
                        <Link to="/listaLocal">Listar Locais</Link>
                    </li>
                    <li>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            className="sair">
                            <AccountCircleIcon sx={{ color: "black", fontSize: 35 }} />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem disabled>{localStorage.getItem("usuarioLogado")}</MenuItem>
                            <MenuItem onClick={handleLogout}>Sair</MenuItem>
                        </Menu>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ExerciseOpenAirHeader;
