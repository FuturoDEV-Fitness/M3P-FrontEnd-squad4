import { Button, Menu, MenuItem } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useApiUsuario } from "../../../hooks/useApiUsuario";
import { getCookie } from "../../../hooks/useCookies";
import { isTokenValid } from "../../../hooks/useValidaToken";

function ExerciseOpenAirHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout } = useApiUsuario();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout(getCookie("usuarioLogado"));
        setAnchorEl(null);
    };


    return (
        <div className="header">
            <div className="navbar">
                <span className="logoHeader">
                    <Link className="labelHome" to="/home">
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
                            <MenuItem disabled>{getCookie("usuarioLogado")}</MenuItem>
                            <MenuItem onClick={handleLogout}>Sair</MenuItem>
                        </Menu>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ExerciseOpenAirHeader;
