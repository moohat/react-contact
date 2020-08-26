const authUser = async (req, res) => {
    res.send('Halaman Autentikasi User')
}

const loginUser = async (req, res) => {
    res.send('Halaman Login User')
}

module.exports = {
    authUser,
    loginUser
}