import { useContext } from "react";
import CardLocalForm from "../../components/molecules/CardLocalForm";
import { LocalContext } from "../../../src/context/LocalContext";
import styles from "./ListaLocalPage.module.css";
import { Grid, Typography } from "@mui/material";
import LayoutComum from "../../components/molecules/LayoutComumLocais/LayoutComumLocais";

function ListaLocalPage() {
    // const { locais } = useContext(LocalContext);

    return (
        <LayoutComum titulo="Locais criados por você - Pagina Privada" showAuthButtons={false} visivel={true} />
    );
}

//  return (
//   <>
//    <Grid
//     sx={{ flexDirection: "column" }}
//     className={styles.containerListaLocais}>
//     <Grid sx={{ flexDirection: "column" }} className={styles.containerCards}>
//      <Typography className={styles.titulo}>Locais incríveis</Typography>
//      {locais.map(
//       (local, index) => (
//        console.log(local), (<CardLocalForm dadosLocal={local} key={index} />)
//       )
//      )}
//     </Grid>
//    </Grid>
//   </>
//  );
// }

export default ListaLocalPage;
