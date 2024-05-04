import { Box } from '@mui/material';
import styles from "./Footer.module.scss";

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <>
            <Box className={styles["s-footer"]}>
                <Box className={styles["s-footer-title"]}>© {year} - Application is made with 😻 by VJ IT Team</Box>
            </Box>
        </>
    )
}

export default Footer;