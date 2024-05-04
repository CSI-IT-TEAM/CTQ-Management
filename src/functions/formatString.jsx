import { Buffer } from "buffer";

const isNullOrEmpty = (value) => {
    if(value === null || value === ""){
        return true;
    }else{
        return false;
    }
}

const isNull = (value) => {
    if(value === null){
        return true;
    }else{
        return false;
    }
}

const isEmpty = (value) => {
    if(value === ""){
        return true;
    }else{
        return false;
    }
}

const base64ToUTF8 = (base64String) => {
    // The base64 encoded input string
    let base64string = base64String;

    // Create a buffer from the string
    let bufferObj = Buffer.from(base64string, "base64");
    
    // Encode the Buffer as a utf8 string
    let decodedString = bufferObj.toString("utf8");

    return decodedString;
}

export { isNullOrEmpty, isNull, isEmpty, base64ToUTF8 }