const formatUserName = (name) => {
    const arr = name.split(' ');
    return arr[arr.length - 2].trim() + ' ' + arr[arr.length - 1].trim();
}

const getLastName = (name) => {
    const arr = name.split(' ');
    return arr[arr.length - 1].toUpperCase().trim();
}

export { formatUserName, getLastName }