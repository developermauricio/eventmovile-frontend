
export const getSendRequest = async ( url ) => {
    return await window.axios.get(url)
        .then( response => {
            //console.log('response: ', response)
            return response.data
        }).catch( error => {
            console.log('error: ', error)
            return null
        })
};


export const postSendRequest = async ( url, data ) => {
    return await window.axios.post(url, data)
        .then( response => {
            return response.data
        })
        .catch( error => {
            console.log('error: ', error)
            return null
        });
}
