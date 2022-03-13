export const saveInfo= function(username,email,roles,regno,atoken) {
    const object = {
        username: username,
        email: email,
        roles: roles,
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