import { Box } from "@mui/material";
import { base64ToUTF8 } from "../../../functions";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import { isNullOrEmpty } from "../../../functions";
import styles from "./InfoCard.module.scss";

const InfoCard = ({ itemID, title, nameEN, nameVN, value = 0, handleStar }) => {

    ///// Render Rating Star
    const handleRenderStar = () => {
        const rows = [];
        for (let iRow = 1; iRow <= 5; iRow++) {
            rows.push(
                <Box key={"star" + iRow}>
                    <StarRoundedIcon
                        className={iRow <= value ? `${styles["b-star"]} ${styles["star-active"]}` : `${styles["b-star"]}`}
                        onClick={() => handleStar(itemID, iRow)} />
                </Box>
            );
        }
        return rows;
    }

    return (
        <>
            <Box className={styles["b-card-2"]}>
                <Box className={styles["b-wrap"]}>
                    <Box className={styles["b-card-icon"]}>{title}</Box>
                    <Box className={styles["b-card-rate"]}>
                        <DoDisturbIcon className={styles["b-remove"]} onClick={() => handleStar(itemID, 0)} />
                        {handleRenderStar()}
                    </Box>
                    <Box className={styles["b-card-content"]}>
                        <Box>{isNullOrEmpty(nameVN) ? nameEN : base64ToUTF8(nameVN)}</Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default InfoCard;
