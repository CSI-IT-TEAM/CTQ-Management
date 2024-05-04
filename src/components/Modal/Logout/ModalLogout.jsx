import * as React from 'react';
import { Box, Typography, Modal } from '@mui/material';

import warningImage from "../../../assets/images/warning.png";

const ModalInfo = ({ open, handleClose, handleLogOut }) => {;
    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="s-modal">
                    <Box className="s-modal__thumb s-mt">
                        <img src={warningImage} alt="Under Construction" />
                    </Box>
                    <Typography id="modal-modal-title" variant="h5" className="s-modal__title">
                        Cảnh Báo!!!
                    </Typography>
                    <Typography id="modal-modal-desc" variant="h6" component="h2" className="s-modal__desc">
                        Bạn có muốn đăng xuất?
                    </Typography>
                    <Box className="s-modal__bot">
                        <Box className="btn-secondary" onClick={handleLogOut} sx={{backgroundColor: "#4caf50"}} >
                            <Box className="btn-secondary-title">Có</Box>
                        </Box>
                        <Box className="btn-secondary" onClick={handleClose} sx={{backgroundColor: "#d32f2f"}} >
                            <Box className="btn-secondary-title">Không</Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalInfo;