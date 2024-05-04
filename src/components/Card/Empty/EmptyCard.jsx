import { Box } from "@mui/material";
import styles from "./EmptyCard.module.scss";

const EmptyCard = ({ thumb }) => {
    return (
        <>
            <Box className={styles["b-empty"]}>
                <img src={thumb} alt="Empty" />
                <Box className={styles["b-empty__desc"]}>Không tìm thấy dữ liệu!!!</Box>
            </Box>
        </>
    )
}

export default EmptyCard;