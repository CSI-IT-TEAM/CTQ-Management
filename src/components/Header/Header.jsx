import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, Container } from '@mui/material';

import styles from "./Header.module.scss";
import { formatUserName, isNullOrEmpty } from '../../functions';
import userImg from "../../assets/images/avatar.png";

const Header = ({ handleModal }) => {

    ///// Navigate
    const navigate = useNavigate();

    /////// Check user Thumb
    const _userData = JSON.parse(sessionStorage.getItem('userData'));
    const _userAvatar = sessionStorage.getItem('userImg');

    const _avatarImg =  !isNullOrEmpty(_userAvatar) ? _userAvatar : userImg;
    const _avatarName = _userData?.EMP_NM ? formatUserName(_userData?.EMP_NM) : "Guest User";

    ////// Handle Navigate
    const handleNavigate = () => {
        navigate("/");
    }

    return (
        <>
            <Box className={styles["s-header"]}>
                <Container>
                    <Box className="flex align-center justify-between">
                        <Box className={styles["s-header-text"]} onClick={handleNavigate}>
                            <Typography variant="h5" component="div" className={styles["s-header-logo"]}>
                                CSG
                            </Typography>
                            <span>
                                <Typography variant="h1" className={`${styles["s-header-title"]} ${styles["s-header-title__top"]}`}>
                                    Key Product
                                </Typography>
                                <Typography variant="h2" className={`${styles["s-header-title"]} ${styles["s-header-title__bot"]}`}>
                                    CTQ Management
                                </Typography>
                            </span>
                        </Box>
                        <Box className={styles["s-header-content"]}>
                            <Box className={styles["s-avatar"]} onClick={handleModal}>
                                <Avatar
                                    alt="avatar"
                                    src={_avatarImg}
                                    className={styles["s-avatar__thumb"]}
                                />
                                <span>
                                    <Typography className={styles["s-avatar__title"]}>Welcome,</Typography>
                                    <Typography className={styles["s-avatar__name"]}>{_avatarName}</Typography>
                                </span>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default Header;