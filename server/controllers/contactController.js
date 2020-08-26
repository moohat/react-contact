const getContact = async (req, res) => {
    res.send('Halaman List contact')
}

const postContact = async (req, res) => {
    res.send('add New contact')
}

const putContact = async (req, res) => {
    let  id  = req.params.id;
    console.log(id);
    res.send(`update contact by id : ${id}`)
}

const deleteContact = async (req, res) => {
    let  id  = req.params.id;
    console.log(id);
    res.send(`delete contact by id : ${id}`)
}
module.exports = {
    getContact,
    postContact,
    putContact,
    deleteContact,
}