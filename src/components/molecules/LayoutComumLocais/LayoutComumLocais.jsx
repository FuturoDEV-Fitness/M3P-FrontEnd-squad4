import { Badge, Grid, Typography, Button, Box } from "@mui/material";
import styles from "./LayoutComum.module.css";
import CardLocalForm from "../CardLocalForm";
import { useApiLocal } from "../../../hooks/useApiLocal";
import { useApiUsuario } from "../../../hooks/useApiUsuario";
import PeopleIcon from '@mui/icons-material/People';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Link } from "react-router-dom";




function LayoutComum({ titulo, showAuthButtons }) {
    const { locais, totalLocais } = useApiLocal();
    const { totalOnline } = useApiUsuario();

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="flex-start"  /* Garante que o título fique mais no topo */
            sx={{ minHeight: "100vh", padding: "20px" }}
            className={styles.containerPrincipalLayoutComum}
        >


            {showAuthButtons && (
                <>
                    <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
                        Junte-se à nossa rede de pessoas apaixonadas por atividades físicas!
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                        Transforme sua vida com exercícios e alcance seus objetivos de saúde e bem-estar.
                    </Typography>
                    <Grid className={styles.info}>
                        <Badge color="primary" badgeContent={totalOnline} max={999}>
                            <PeopleIcon sx={{ color: "black", fontSize: 35 }} />
                        </Badge>
                        <Badge color="primary" badgeContent={totalLocais} max={999}>
                            <FmdGoodIcon sx={{ color: "black", fontSize: 35 }} />
                        </Badge>
                    </Grid>


                    <Box mt={3}>
                        <Grid className={styles.authButtons}>
                            <Link to={`/cadastroUsuario`} style={{ textDecoration: 'none' }}>

                                <Button variant="contained" color="primary">Cadastre-se</Button>
                            </Link>
                            <Link to={`/login`} style={{ textDecoration: 'none' }}>

                                <Button variant="outlined" color="primary">Login</Button>
                            </Link>
                        </Grid>
                    </Box>
                </>
            )
            }


            <Typography variant="h4" className={styles.titulo}>{titulo}</Typography>


            <Grid className={styles.card}>
                {locais.map((local, index) => (
                    <CardLocalForm dadosLocal={local} key={index} visivel={showAuthButtons} />
                ))}
            </Grid>
        </Grid >
    );
}

export default LayoutComum;
