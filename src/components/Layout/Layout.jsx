import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dataAction } from '../../redux/dataSlice';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ModalLoad, ModalNotice, ModalInfo } from '../Modal';

const Layout = ({ children }) => {

    ////// Open Side Menu Bar
    const [logOut, setLogOut] = useState(false);
    const openNotice = useSelector(state => state.commonData.openNotice);
    const typeNotice = useSelector(state => state.commonData.typeNotice);
    const openLoad = useSelector(state => state.commonData.openLoad);

    ///// React-Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    ////// Handle Modal Notice
    const handleClose = () => {
        dispatch(dataAction.closeNotice());
    }

    ////// Handle Log Out
    const handleLogOut = () => {
        sessionStorage.removeItem('userData');
        navigate("/log-in");
    }

    const handleModal = () => {
        setLogOut(logOut => !logOut);
    }

    ////// Handle Check User
    const handleCheck = () => {
        let _userData = JSON.parse(sessionStorage.getItem('userData'));

        if(_userData === null){
            handleLogOut();
        }
    }

    useEffect(() => {
        handleCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
            <Header handleModal={handleModal} />
            <Box className="s-content">
                {children}
            </Box>
            <Footer />
            <ModalInfo open={logOut} handleClose={handleModal} handleLogOut={handleLogOut} />
            <ModalNotice 
                open={openNotice} 
                handleClose={handleClose}
                type={typeNotice} />
            <ModalLoad open={openLoad} />
        </>
    );
}

export default Layout;