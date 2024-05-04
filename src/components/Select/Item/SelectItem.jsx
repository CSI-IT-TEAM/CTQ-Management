import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography, Stack } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SelectItem = ({ title, name, data, placeholder, cValue, handleEvent, isValidate, message, isShown = true }) => {

    const handleChange = (event: SelectChangeEvent) => {
        handleEvent(name, event.target.value);
    };

    return (
        <>
            <Stack marginBottom={2} direction={{ xs: "row", sm: "row" }} alignItems={{ xs: "center", sm: "center" }} className="b-text-input">
                {isShown && 
                    <Typography variant="h6" className="b-text-input__title flex italic">
                        {title} <span>(*)</span>
                    </Typography>
                }
                <Stack sx={{ width: "100%" }}>
                    <FormControl fullWidth disabled={false}>
                        <Select
                            value={cValue}
                            onChange={handleChange}
                            displayEmpty
                            className="b-select"
                        >
                            <MenuItem value="" disabled className="b-select__item">
                                <p>{placeholder}</p>
                            </MenuItem>
                            {data?.map(item => {
                                return (
                                    <MenuItem key={item.CODE} value={item.CODE} className="b-select__item">{item.NAME}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    {!isValidate && <Typography className='b-validate'><HighlightOffIcon sx={{width: '17px', height: '17px'}} />{message}</Typography> }
                </Stack>
            </Stack>
        </>
    );
}

export default SelectItem;