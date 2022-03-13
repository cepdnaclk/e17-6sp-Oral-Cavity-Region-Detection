export const saveInfo= function(username,email,status,regno,atoken) {
    const object = {
        username: username,
        email: email,
        status: status,
        atoken: atoken,
        regno:regno
    }

    sessionStorage.setItem("info",JSON.stringify(object))
    return
};

export const deleteInfo= ()=>{
    sessionStorage.removeItem("info")
    return
}

export const getUser= ()=>{
    if(sessionStorage.getItem("info"))
        return JSON.parse(sessionStorage.getItem("info")).status
}
