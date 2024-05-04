import { useEffect } from 'react';
import { Box, Typography, Modal } from '@mui/material';

import { infoData } from '../../../data';
import { isNull } from '../../../functions';

const ModalNotice = ({ open, handleClose, type }) => {

    //Fade effects with Timeout 
    useEffect(() => {
        var timeOut = '';
        if(open){
            timeOut = setTimeout(() => {
                handleClose();
            }, 2000);
        }

        return () => {
            if(timeOut) clearTimeout(timeOut);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    let data = null;

    switch(type){
        case 'success': 
            data = infoData[0];
            break;
        case 'error': 
            data = infoData[1];
            break;
        case 'not-found': 
            data = infoData[2];
            break;
        case 'connect-failed': 
            data = infoData[3];
            break;
        case 'invalid': 
            data = infoData[4];
            break;
        default:
            break;
    }

    if(isNull(data)) return;

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="s-modal">
                    <Box className="s-modal__thumb s-mt">
                        <img src={data.thumb} alt={data.type} />
                    </Box>
                    <Typography id="modal-modal-title" variant="h5" className="s-modal__title">
                        {data.title_VN}
                    </Typography>
                    <Typography id="modal-modal-desc" variant="h6" component="h2" className="s-modal__desc">
                        {data.desc_VN}
                    </Typography>
                    <Box className="s-modal__bot s-modal__bot--center">
                        <Box className="btn-secondary" onClick={handleClose} sx={{backgroundColor: "#4caf50"}}>
                            <Box className="btn-secondary-title">OK</Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalNotice;