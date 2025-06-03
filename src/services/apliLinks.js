const backendUrl = import.meta.env.VITE_BACKEND_URL

const apiLinks = {
    mailToAdmin: backendUrl + `/sendMailToAdmin`,
    mailToUser: backendUrl + `/sendMailToUser`,
    makeUserActive: backendUrl + `/makeUserActive`,
    removeUserActive: backendUrl + '/removeUserActive',
    deleteUser: backendUrl + '/deleteUser',
    userLogin: backendUrl + `/userLogin`,
    automaticLogin: backendUrl + `/automaticLogin`,
    getAllUsers: backendUrl + `/getAllUsers`
}

export default apiLinks;