import { Badge, Grid, Typography } from "@mui/material";
import styles from "./DashboardPage.module.css";
import CardLocalForm from "../../components/molecules/CardLocalForm";
import { useApiLocal } from "../../hooks/useApiLocal";
import { useApiUsuario } from "../../hooks/useApiUsuario";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PeopleIcon from "@mui/icons-material/People";

function DashboardPage() {
    const { locais, totalLocais } = useApiLocal();
    const { totalOnline } = useApiUsuario();

    return (
        <Grid
            sx={{ flexDirection: "column" }}
            className={styles.containerPrincipalDashboard}>
            <Grid className={styles.info}>
                <Badge color="primary" badgeContent={totalOnline} max={999}>
                    <PeopleIcon sx={{ color: "black", fontSize: 35 }} />
                </Badge>
                <Badge color="primary" badgeContent={totalLocais} max={999}>
                    <FmdGoodIcon sx={{ color: "black", fontSize: 35 }} />
                </Badge>
            </Grid>
            <Typography className={styles.titulo}>Locais incríveis</Typography>
            <Grid className={styles.card}>
                {locais.map((local, index) => (
                    <CardLocalForm dadosLocal={local} key={index} />
                ))}
            </Grid>
        </Grid>
    );
}

export default DashboardPage;
