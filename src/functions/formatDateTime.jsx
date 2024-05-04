const getDate = () => {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let ymd = date.getFullYear().toString() + ((month > 9 ? '' : '0') + month).toString() + ((day > 9 ? '' : '0') + day).toString();

    return ymd;
}

const getTime = () => {
    let date = new Date();

    let hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
    let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    let seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    let hms = hours + minutes + seconds;

    return hms;
}

const getDateFormat = (date) => {
    return date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
}

const getTimeFormat = (date) => {
    return date.replace(/(\d{2})(\d{2})(\d{2})/g, '$1:$2:$3');
}

const formatDate = (value) => {
    let date = value;
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let ymd = date.getFullYear().toString() + ((month > 9 ? '' : '0') + month).toString() + ((day > 9 ? '' : '0') + day).toString();

    return ymd;
}

const getDateTime = () => {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let ymd = date.getFullYear().toString() + ((month > 9 ? '' : '0') + month).toString() + ((day > 9 ? '' : '0') + day).toString();

    let hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
    let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    let seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    let hms = hours + minutes + seconds;

    return ymd + ' ' + hms;
}

const addDays = (value) => {
    let date = new Date((value).valueOf() + 1000*3600*24);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let ymd = date.getFullYear().toString() + "-" + ((month > 9 ? '' : '0') + month).toString() + "-" + ((day > 9 ? '' : '0') + day).toString();

    return ymd;
}

export { getDate, getTime, getDateTime, getDateFormat, getTimeFormat, formatDate, addDays }