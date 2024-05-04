//////Cancel Fetch API After Timeout
const Timeout = (time) => {
    let controller = new AbortController();
    setTimeout(() => controller.abort(), time * 1000);
    return controller;
};

export const fetchData = async (url, dataConfig) => {
    try {
        const response = await fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataConfig),
                    signal: Timeout(5).signal,
                });

        if(response.ok){
            const json = await response.json();
            return json;
        }
        else{
            return false;
        }
    } catch (error) {
        return false;
    }
};

// export const fetchConnect = async() =>{
//     try {
//         const response = await fetch(imgUploadURl, {
//                     method: 'GET',
//                     mode: 'cors',
//                     dataType: "json",
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     signal: Timeout(5).signal,
//                 });
//         return response.status === 200 ? true : false;
//     } catch (error) {
//         return false;
//     }
// }

// export const fetchPostImg = async (galleryConfig) => {
//     try{
//         ///////// Only upload 1 image
//         const options = {
//             method: "POST",
//             body: galleryConfig,
//         };

//         const response = await fetch(imgUploadURl_v2, options);
//         return response.status === 200 ? true : false;
//     }
//     catch{
//         return false;
//     }
// }

// export const fetchPostData = async(url, dataConfig) => {
//     try{
//         const response = await fetch(url, {
//             method: 'POST',
//             mode: 'cors',
//             dataType: "json",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(dataConfig),
//         });

//         return response.status === 200 ? true : false;
//     }
//     catch{
//         return false;
//     }
// }