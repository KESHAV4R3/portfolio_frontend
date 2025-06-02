// const backendUrl = 'https://portfolio-backend-int5.onrender.com';
const backendUrl = 'http://localhost:5000'

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