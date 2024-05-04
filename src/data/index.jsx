import successImg from "../assets/images/success.png";
import warnImg from "../assets/images/warning.png";
import noWifiImg from "../assets/images/no-wifi.png";

const downloadConfig = ( type, plant = "", line = "", mline = "", model = "") => {
    return {
        ARG_TYPE: type,
        ARG_PLANT: plant,
        ARG_LINE: line,
        ARG_MLINE: mline,
        ARG_MODEL: model,
        OUT_CURSOR: "" 
    }
}

const dataConfig = (plant) => {
    return {
        PLANT_CD: plant,
        LINE_CD: "",
        MLINE_CD: "",
        STYLE_CD: "",
        STYLE_NM: "",
    }
}

const uploadConfig = (plant, line, mline, style, ctq, qty, user) => {
    return {
        ARG_PLANT  : plant,
        ARG_LINE   : line,
        ARG_MLINE  : mline,
        ARG_STYLE  : style,
        ARG_CTQ    : ctq,
        ARG_QTY    : qty,
        ARG_USER   : user
    }
}

const infoData = [
    {
        type: 'upload-success',
        title_EN: 'Success!!!',
        desc_EN: 'Data upload completed!!!',
        title_VN: 'Success!!!',
        desc_VN: 'Dữ liệu cập nhập thành công!!!',
        thumb: successImg
    },
    {
        type: 'error',
        title_EN: 'Error!!!',
        desc_EN: 'Update failed! Please try again later!!!',
        title_VN: 'Error!!!',
        desc_VN: 'Cập nhập thất bại! Vui lòng thử lại sau!!!',
        thumb: warnImg
    },
    {
        type: 'not-found',
        title_EN: 'Warning!!!',
        desc_EN: 'Requested data not found!!!',
        title_VN: 'Cảnh báo!!!',
        desc_VN: 'Số thẻ không hợp lệ!!!',
        thumb: warnImg
    },
    {
        type: 'connect-failed',
        title_EN: 'Connection Failed!!!',
        title_VN: 'Connection Failed!!!',
        desc_EN: 'Please check again your Internet connection!!!',
        desc_VN: 'Vui lòng kiểm tra kết nối Internet!!!',
        thumb: noWifiImg
    },
    {
        type: 'invalid',
        title_EN: 'Warning!!!',
        desc_EN: 'At least 1 CTQ is assessed!!!',
        title_VN: 'Warning!!!',
        desc_VN: 'Ít nhất 1 CTQ phải được đánh giá!!!',
        thumb: warnImg
    },
]

export { downloadConfig, dataConfig, uploadConfig, infoData }