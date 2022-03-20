export const saveInfo= function(username,email,roles,reg_no,atoken) {
    const object = {
        username: username,
        email: email,
        roles: roles,
        atoken: atoken,
        reg_no:reg_no
    }

    sessionStorage.setItem("info",JSON.stringify(object))
    return
};

export const deleteInfo= ()=>{
    sessionStorage.removeItem("info")
    return
}