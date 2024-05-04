import * as React from "react";
import { useState } from "react";
import { TextField, Typography, Box, Stack, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { ModalNotice, ModalLoad } from "../../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { dataAction } from "../../redux/dataSlice";

import styles from "./LoginPage.module.scss";
import loginImage from "../../assets/images/sign-in.png";
import { downloadURL, imageURL } from "../../api";
import { downloadConfig } from "../../data";

const height = window.innerHeight + "px";

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lastLogin = localStorage.getItem("lastLogin") === null ? "" : localStorage.getItem("lastLogin");
    const [data, setData] = useState(lastLogin);
    const [open, setOpen] = useState(false);

    ////// Open Modal
    const openNotice = useSelector(state => state.commonData.openNotice);
    const typeNotice = useSelector(state => state.commonData.typeNotice);

    ////// Handle Modal Notice
    const handleClose = () => {
        dispatch(dataAction.closeNotice());
    }

    //////// Handle Set Controlled Data
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.value);
    };

    ////// Cancel Fetch API After Timeout
    const Timeout = (time) => {
        let controller = new AbortController();
        setTimeout(() => controller.abort(), time * 1000);
        return controller;
    };

    const handleSignIn = async() => {
        const dataConfig = await downloadConfig("Q_EMP", data);
        fetchDownload(dataConfig);
    }
    
    ////// Download User Info Data
    const fetchDownload = async (dataConfig) => {
        setOpen(open => true);

        fetch(downloadURL, {
            method: 'POST',
            mode: 'cors',
            dataType: "json",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataConfig),
            signal: Timeout(5).signal,
        }).then((response) => {
            response.json().then(async(result) => {
                if(result.length > 0){
                    await submitForm(result);
                    setOpen(open => false);
                    // Store
                    sessionStorage.setItem("userData", JSON.stringify(result[0]));
                    localStorage.setItem("lastLogin", data);
                    fetchDownloadImg();
                }else{
                    setOpen(open => false);
                    dispatch(dataAction.setTypeNotice("not-found"));
                    dispatch(dataAction.openNotice());
                }
            })  
        }).catch(error => {
            setOpen(open => false);
            dispatch(dataAction.setTypeNotice("connect-failed"));
            dispatch(dataAction.openNotice());
        });
    }

    ////// Download User Image
    const fetchDownloadImg = async () => {
        fetch(imageURL, {
            method: 'POST',
            mode: 'cors',
            dataType: "json",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ARG_EMPID" : data,
                "OUT_CURSOR" : ""
              }),
        }).then((response) => {
            response.json().then(async(result) => {
                if(result.length > 0){
                    let imgData = await arrayBufferToBase64(result[0].PHOTO.data);
    
                    if(imgData !== "" && imgData !== null){
                        sessionStorage.setItem("userImg", imgData);
                        navigate("/");
                    }
                }
            })  
        }).catch(error => {
            dispatch(dataAction.setTypeNotice("connect-failed"));
            dispatch(dataAction.openNotice());
        });
    }

    function submitForm(result) {
        // Pretend it's hitting the network.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (result.length > 0) {
                    resolve();
                } else {
                    reject();
                }
            }, 2000);
        });
    }

    //////// Get Image Base-64
    const arrayBufferToBase64 = (buffer) => {
        var base64Flag = 'data:image/jpeg;base64,';
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        
        return base64Flag + window.btoa(binary);
    };

    return (
        <>
            <Box
                className={styles["s-layout"]}
                sx={{
                    width: "100%",
                    minHeight: height,
                }}
            >
                <Box className={styles["b-box"]}>
                    <Box className={styles["s-form"]}>
                        <Box className={styles["p-title"]}>
                            Key Product <span>CTQ Management</span>
                        </Box>
                        <Box className={styles["b-thumb"]}>
                            <img src={loginImage} alt="Login" />
                        </Box>
                        <form>
                            <Stack marginBottom={1}>
                                <Typography variant="h5" className={styles["p-label"]}>
                                    Mã thẻ
                                </Typography>
                                <TextField
                                    id="userID"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    className={styles["b-input"]}
                                    placeholder="Nhập mã thẻ"
                                    value={data}
                                    onChange={handleChange}
                                    name="USER_ID"
                                    color="info"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                />
                            </Stack>
                            <Grid justifyContent="flex-end" className={styles["s-mid"]}>
                                <Box className="btn-secondary" onClick={handleSignIn}>
                                    <Box className="btn-secondary-title">LOGIN</Box>
                                </Box>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Box>
            <ModalNotice 
                open={openNotice} 
                handleClose={handleClose}
                type={typeNotice} />
            <ModalLoad open={open} />
        </>
    );
};

export default LoginPage;
