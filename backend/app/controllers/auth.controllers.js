const Users = require('../models/users');
const bcrypt = require('bcrypt');


const signIn = async(req, res) =>{
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ username: username });

        if (!user)
            return res.status(401).send({ message: `Credenciales no válidas, inténtelo nuevamente` });
        else if (!bcrypt.compareSync(password, user.password))
            return res.status(401).send({ message: `Credenciales no válidas, inténtelo nuevamente` });
        else if (user) {
            return res.status(200).send({ verify: true });
        }

    } catch (error) { res.status(500).send({ message: `Error auth ${error}` }); }
}

module.exports = { signIn }