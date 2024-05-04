import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

import warningImage from "../../assets/images/warning.png";
import styles from "./ErrorPage.module.scss";

const height = window.innerHeight;

const ErrorPage = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        sessionStorage.removeItem('userData');
        navigate("/");
    }

    return (
        <>
            <Box className={styles["s-error"]} sx={{ minHeight: height }}>
                <Container>
                    <Box className={styles["s-error-thumb"]}>
                        <img src={warningImage} alt="Warning" />
                    </Box>
                    <Box className={styles["s-error-content"]}>
                        <Typography variant="h3" className={styles["s-error-title"]}>Oops! Trang không tìm thấy</Typography>
                        <Typography variant="h1" className={styles["s-error-sub"]}>
                            <span>4</span>
                            <span>0</span>
                            <span>4</span>
                        </Typography>
                        <Typography variant="h5" className={styles["s-error-desc"]}>Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng</Typography>
                    </Box>
                    <Box className={styles["s-error-bot"]}>
                        <Box className="btn-secondary" onClick={handleBack} sx={{backgroundColor: "#5550a5"}} >
                            <Box className="btn-secondary-title">Về trang chủ</Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default ErrorPage;