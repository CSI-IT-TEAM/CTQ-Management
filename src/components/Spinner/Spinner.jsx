import { Box } from "@mui/material";
import "./Spinner.scss";

const width = window.innerWidth;

const Spinner = () => {
    return (
        <>
            <Box className="spinner" sx={{minWidth: width}}>
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </Box>
        </>
    )
}

export default Spinner;