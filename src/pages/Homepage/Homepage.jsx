import { useState, useEffect } from 'react';
import { Box, Container, Grid, Stack, Typography} from '@mui/material';
import { SelectItem, EmptyCard, InfoCard, FormInput } from '../../components';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { dataAction } from '../../redux/dataSlice';

import { downloadURL, uploadURL } from '../../api';
import { dataConfig, downloadConfig, uploadConfig } from '../../data';
import { isNull, isNullOrEmpty, fetchData } from '../../functions';

import styles from "./Homepage.module.scss";
import thumb from "../../assets/images/not-found.png";
const width = window.innerWidth;
const height = window.innerHeight - 130;

const Homepage = () => {

    ///// React-Redux
    const dispatch = useDispatch();
    const colSpacing = width > 479 ? 2 : 1;
    let _userData = JSON.parse(sessionStorage.getItem('userData'));
    let _lastLocate = JSON.parse(localStorage.getItem('userLocate'));

    ///// Base Data
    const [data, setData] = useState(dataConfig(_userData?.PLANT_CD ? _userData?.PLANT_CD : "2110"));
    const [dataLine, setDataLine] = useState(null);
    const [dataMLine, setDataMLine] = useState(null);
    const [dataStyle, setDataStyle] = useState(null);
    const [dataCheck, setDataCheck] = useState(null);
    const [dataCTQ, setDataCTQ] = useState(null);
    const [isFirst, setIsFirst] = useState(true);

    ///// Handle Download
    const fetchDownload = async (url, dataConfig, type) => {
        const result = await fetchData(url, dataConfig);

        if(result){
            if(result.length > 0){
                switch (type) {
                    case 'Q_LINE':
                        setDataLine(prevData => result);
                        break;
                    case 'Q_MLINE':
                        setDataMLine(prevData => result);
                        break;
                    case 'Q_STYLE':
                        setDataStyle(prevData => result);
                        break;
                    case 'Q_CTQ_NEW':
                        setDataCTQ(prevData => result);
                        break;
                    case 'Q_CHECK_NEW':
                        setDataCheck(prevData => result);
                        break;
                    default:
                        break;
                }
            }else{
                switch (type) {
                    case 'Q_LINE':
                        setDataLine(prevData => null);
                        break;
                    case 'Q_MLINE':
                        setDataMLine(prevData => null);
                        break;
                    case 'Q_STYLE':
                        setDataStyle(prevData => null);
                        setDataCTQ(prevData => null);
                        break;
                    case 'Q_CTQ_NEW':
                        setDataCTQ(prevData => null);
                        break;
                    case 'Q_CHECK_NEW':
                        setDataCheck(prevData => null);
                        break;
                    default:
                        break;
                }
            }
        }
        else{
            dispatch(dataAction.setTypeNotice("connect-failed"));
            dispatch(dataAction.openNotice());
        }
    }

    useEffect(() => {
        fetchDownload(downloadURL, downloadConfig("Q_LINE", _userData?.PLANT_CD ? _userData?.PLANT_CD : "2110", "", ""), "Q_LINE");

        if(!isNull(_lastLocate)){
            handleDefault();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDefault = async() => {
        await fetchDownload(downloadURL, downloadConfig("Q_MLINE", _userData?.PLANT_CD ? _userData?.PLANT_CD : "2110", _lastLocate.LINE_CD, ""), "Q_MLINE");
        await fetchDownload(downloadURL, downloadConfig("Q_STYLE", _userData?.PLANT_CD ? _userData?.PLANT_CD : "2110", _lastLocate.LINE_CD, _lastLocate.MLINE_CD), "Q_STYLE");

        setData(prevData => {
            return {
                ...prevData,
                LINE_CD: _lastLocate.LINE_CD,
                MLINE_CD: _lastLocate.MLINE_CD,
            }
        });
    }

    useEffect(() => {
        if(!isNullOrEmpty(data.MLINE_CD) && !isNull(dataStyle)){
            fetchDownload(downloadURL, downloadConfig("Q_CTQ_NEW", data.PLANT_CD, data.LINE_CD, data.MLINE_CD, dataStyle[0].CODE), "Q_CTQ_NEW");
            fetchDownload(downloadURL, downloadConfig("Q_CHECK_NEW", data.PLANT_CD, data.LINE_CD, data.MLINE_CD, dataStyle[0].CODE), "Q_CHECK_NEW");
            setIsFirst(prevData => false);
            setData(prevData => {
                return {
                    ...prevData,
                    STYLE_CD: dataStyle[0].CODE,
                    STYLE_NM: dataStyle[0].STYLE_NM,
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data.MLINE_CD, dataStyle])

    ////// Handle Change Select
    const handleChangeSelect = async (name, value) => {
        switch (name) {
            case "LINE_CD":
                await fetchDownload(downloadURL, downloadConfig("Q_MLINE", data.PLANT_CD, value, ""), "Q_MLINE");
                setData(prevData => {
                    return {
                        ...prevData,
                        [name]: value,
                        "MLINE_CD": "",
                        "STYLE_CD": "",
                        "STYLE_NM": "",
                    }
                });
                setIsFirst(prevData => true);
                setDataCTQ(prevData => null);
                setDataCheck(prevData => null);
                setDataStyle(prevData => null);
                break;
            case "MLINE_CD":
                await fetchDownload(downloadURL, downloadConfig("Q_STYLE", data.PLANT_CD, data.LINE_CD, value), "Q_STYLE");
                setData(prevData => {
                    return {
                        ...prevData,
                        [name]: value,
                        "STYLE_CD": "",
                        "STYLE_NM": "",
                    }
                });
                setIsFirst(prevData => true);
                setDataCTQ(prevData => null);
                setDataCheck(prevData => null);
                break;
            case "STYLE_CD":
                await fetchDownload(downloadURL, downloadConfig("Q_CTQ_NEW", data.PLANT_CD, data.LINE_CD, data.MLINE_CD, value), "Q_CTQ_NEW");
                await fetchDownload(downloadURL, downloadConfig("Q_CHECK_NEW", data.PLANT_CD, data.LINE_CD, data.MLINE_CD, value), "Q_CHECK_NEW");
                setIsFirst(prevData => false);

                let _data_val = dataStyle.filter((item) => item.CODE === value);

                setData(prevData => {
                    return {
                        ...prevData,
                        [name]: value,
                        "STYLE_NM": dataStyle?.length > 0 ? _data_val[0].STYLE_NM : "",
                    }
                });
                break;
            default:
                break;
        }
    }

    ///// Handle CTQ List
    const handleCTQ = (ctqCode, value) => {
        setDataCTQ(dataCTQ.map(item => {
            if (item.CODE === ctqCode) {
                // Create a *new* object with changes
                return { ...item, QTY: value };
            } else {
                // No changes
                return item;
            }
        }));
    }

    ///// Handle Check If not Type Yet
    const handleValidate = async() => {
        const _arr = await dataCTQ.filter(item => item.QTY !== 0);
        return _arr?.length ? true : false;
    }

    ///// Handle Submit
    const handleSubmit = async() => {
        const _isValidate = await handleValidate();

        if(_isValidate){
            dispatch(dataAction.openLoad());

            let _uploadConfig = "", _result = "";
            for (let iCount = 0; iCount < dataCTQ.length; iCount++) {
                _uploadConfig = await uploadConfig(data.PLANT_CD, data.LINE_CD, data.MLINE_CD, data.STYLE_CD, dataCTQ[iCount].CODE, dataCTQ[iCount].QTY, _userData?.EMPID);
                _result = await handleUpload(uploadURL, _uploadConfig);

                if (!_result) {
                    break;
                }
            }

            dispatch(dataAction.closeLoad());

            if (_result) {
                dispatch(dataAction.setTypeNotice("success"));
                dispatch(dataAction.openNotice());
                await fetchDownload(downloadURL, downloadConfig("Q_CHECK_NEW", data.PLANT_CD, data.LINE_CD, data.MLINE_CD, data.STYLE_CD), "Q_CHECK_NEW");
                setDataCTQ(dataCTQ.map(item => {
                    return { ...item, QTY: 0 };
                }));
                localStorage.setItem("userLocate", JSON.stringify({ LINE_CD: data.LINE_CD, MLINE_CD: data.MLINE_CD }));
            } else {
                dispatch(dataAction.setTypeNotice("error"));
                dispatch(dataAction.openNotice());
            }
        }else{
            dispatch(dataAction.setTypeNotice("invalid"));
            dispatch(dataAction.openNotice());
        }
    }

    const handleUpload = async (url, dataConfig) => {
        let _res = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            dataType: "json",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataConfig),
        });

        if (_res && _res.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <>
            <Box className={styles["s-home"]} sx={{ minHeight: height }}>
                <Container>
                    <form>
                        <Grid container spacing={colSpacing}>
                            <Grid item xs={6}>
                                <SelectItem
                                    title="Xưởng"
                                    name="LINE_CD"
                                    data={dataLine}
                                    placeholder={width > 479 ? "Chọn Xưởng" : "Xưởng"}
                                    cValue={data.LINE_CD}
                                    handleEvent={handleChangeSelect}
                                    isValidate={true}
                                    message="Dữ liệu không được để trống" />
                            </Grid>
                            <Grid item xs={6}>
                                <SelectItem
                                    title="Chuyền"
                                    name="MLINE_CD"
                                    data={dataMLine}
                                    placeholder="Chọn Chuyền"
                                    cValue={data.MLINE_CD}
                                    handleEvent={handleChangeSelect}
                                    isValidate={true}
                                    message="Dữ liệu không được để trống"
                                    isShown={false} />
                            </Grid>
                        </Grid>
                        <Stack
                            marginBottom={2} 
                            marginTop={colSpacing}
                            direction={{xs: "row", sm:"row"}} 
                            alignItems={{xs: "normal", sm:"center"}} 
                            className="b-text-input">
                                <Typography variant="h6" className="b-text-input__title b-italic italic flex">
                                    Mã hàng <span>(*)</span>
                                </Typography>
                                <Grid container spacing={colSpacing}>
                                    <Grid item xs={12} md={3}>
                                        <SelectItem
                                            title=""
                                            name="STYLE_CD"
                                            isShown={false}
                                            data={dataStyle}
                                            placeholder="Chọn mã hàng"
                                            cValue={data.STYLE_CD}
                                            handleEvent={handleChangeSelect}
                                            isValidate={true}
                                            message="Dữ liệu không được để trống" />
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <FormInput
                                            title=""
                                            placeholder="Tên mã hàng"
                                            isShown={false}
                                            value={data.STYLE_NM}
                                            disable={true}
                                            inputProp={{ inputMode: 'text' }}
                                            name="STYLE_CD"
                                            isValidate={true}
                                            bg="#fff"
                                            isDefault={true} />
                                    </Grid>
                                </Grid>
                        </Stack>
                        <Box className={styles["s-home-check"]}>
                            <Box className={dataCheck?.[0]?.CHECK_YN === "Y" ? `${styles["s-check"]} ${styles["cheked"]}` : `${styles["s-check"]}`}>1<span>st</span> Checking</Box>
                            <Box className={dataCheck?.[1]?.CHECK_YN === "Y" ? `${styles["s-check"]} ${styles["cheked"]}` : `${styles["s-check"]}`}>2<span>nd</span> Checking</Box>
                        </Box>
                    </form>
                    {isNull(dataCTQ) && !isFirst &&
                        <EmptyCard thumb={thumb} />
                    }
                    {!isNull(dataCTQ) &&
                        <>
                            <Box className={styles["s-home-bot"]}>
                                <Grid container spacing={colSpacing}>
                                    {dataCTQ?.map((item) => {
                                        return (
                                            <Grid item md={4} sm={6} xs={12} key={item.CODE}>
                                                <InfoCard
                                                    itemID={item.CODE}
                                                    title={item.NAME}
                                                    nameEN={item.NAME_EN}
                                                    nameVN={item.NAME_VN}
                                                    value={item.QTY}
                                                    handleStar={handleCTQ} />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Box>
                            <Box className={styles["s-home-btn"]}>
                                <Box className="btn-secondary" onClick={handleSubmit}>
                                    <Box className="btn-secondary-title"><SendIcon />Xác nhận</Box>
                                </Box>
                            </Box>
                        </>
                    }
                </Container>
            </Box>
        </>
    )
}

export default Homepage;