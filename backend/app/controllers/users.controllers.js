const Users = require('../models/users');
const bcrypt = require('bcrypt');


const getUsers = async (req, res) =>{
    await Users.find().select('-password').exec((err, users) =>{
        if(!err)
            res.status(200).json({ data: users });
        else
            res.status(500).send({ message: `Error al intentar listar usuarios ${err}` });
    })
}

const saveUsers = async (req, res) =>{
    const { name, username } = req.body;

    let newUsers = new Users({
        name,
        username,
        password: bcrypt.hashSync(req.body.password, 10)
    })

    await newUsers.save((err) =>{
        if(!err)
            res.status(200).send({ message: `Usuario agregado correctamente` });
        else
            res.status(500).send({ message: `Error al intentar agregar usuario ${err}` });
    })
}

const removeUsers = async (req, res) =>{
    const { _id } = req.params;

    await Users.findById({ _id: _id }, (err, user) =>{
        if(user){
            user.remove((err) =>{
                if(!err)
                    res.status(200).send({ message: `Usuario ${user.name} eliminado correctamente` });
                else
                    res.status(500).send({ message: `Error al intentar eliminar usuario` });
            })
        }else
            res.status(404).send({ message: `No se encontró usuario para eliminar` });
    })
}


module.exports = { getUsers, saveUsers, removeUsers }