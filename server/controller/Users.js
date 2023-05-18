const {Users, Programs} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require("fs");

const updateUser = async (req,res) => {
    try {
        if (req.files === null) {
            return res.send({ message: 'No File' })
        }
        const file = req.files.image

        const {firstname,lastname,email,phone,position,date_graduated,program,userEmail, userImage } = req.body
        if(!firstname || !lastname || !email || !phone || !position || !date_graduated || !program || !userEmail || !userImage) return res.json({message:'All fields are required!'})
        file.mv(`${__dirname}/../../client/public/uploads/${email}_${file.name}`, err => {
            if (err) {
                console.log(err)
                return res.send({ message: "Can't upload file" })
            }
        })
        fs.unlink(`${__dirname}/../../client/public/uploads/${userImage}`, (err) => {
            if (err) {
                return res.send({message:`error deletion of file:"${err}`})
            }
        })
        await Users.update({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone:phone,
            position:position,
            date_graduated:date_graduated,
            image:`${email}_${file.name}`,
            program:program
        }, {
            where: {
                email:userEmail
            }
        })

        return res.json({ message: 'Created user' })
    } catch (error) {
        return res.json({message:'Error add User'})
    }
}

const registerUser = async (req,res) => {
    try {
        if (req.files === null) {
            return res.send({ message: 'No File' })
        }
        const file = req.files.image

        const {email,password,firstname,lastname,phone,position,date_graduated,program,role} = req.body

        if (!email || !password || !firstname || !lastname || !phone || !position || !date_graduated || !program || !role) {
            return res.send({ message: 'All fields are required' })
        }

        const userExist = await Users.findOne({ where: {
            email: email
        } 
        })
        if (userExist) {
            return res.send({ message: 'Email already taken' })
        }
        file.mv(`${__dirname}/../../client/public/uploads/${req.body.email}_${req.files.image.name}`, err => {
            if (err) {
                console.log(err)
                return res.send({ message: "Can't upload file" })
            }
        })

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
        await Users.create({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname,
            phone : phone,
            position : position,
            date_graduated : date_graduated,
            program : program,
            role : role,
            image: `${req.body.email}_${req.files.image.name}`
        })

        return res.status(201).json('New User Created');
    } catch (err) {
        console.log(err)
        return res.status(400).json('Registration Error');
    }
}
const loginUser = async (req,res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'All fields are required' })
    }
    const user = await Users.findOne({ where: {
        email: req.body.email
    } 
    })
    try {
       
        if (!user) {
            return res.status(400).send({ message: 'No existing User' })
        }
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password,
        );
        if (!isPasswordCorrect) {
            return res.status(400).send({ message: 'Password is incorrect' })
        }
        const payload = {
            id: user.id,
            email: user.email,
            firstname:user.firstname, 
            lastname:user.lastname, 
            phone:user.phone, 
            position:user.position, 
            date_graduated:user.date_graduated, 
            program:user.program,
            image: user.image, 
            role: user.role
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        return res
            .cookie('access_token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                //process.env.NODE_ENV === 'production'
            })
            .status(200)
            .json({ message: 'login success' });
    } catch (err) {
        console.log(err)
        throw new Error({ message: 'Login Error' })
    }
}

const logout = async (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'logout success' });
};

const isLoggedIn = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.json({loggedIn:false});
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({loggedIn:false});
        }
        req.user = decoded
        return res.json({loggedIn:true, userInfo: req.user});
    });
};
const getUsers = async (req, res) => {
    Users.hasOne(Programs, {foreignKey : 'program', sourceKey: 'program'});
    Programs.belongsTo(Users, {foreignKey : 'program', targetKey: 'program'});
    const result = await Users.findAll({where: {role : '2'}, attributes: ['id', 'email', 'firstname', 'lastname', 'phone', 'position', 'date_graduated', 'program', 'role'], 
                                        include: [{
                                            model: Programs,
                                            required: false,
                                            attributes: ['name']
}]})
    res.json({result})
}

const getPrograms = async (req, res) => {
    const result = await Programs.findAll({attributes: ['program', 'name']})
    res.json({result})
}

module.exports = {
    registerUser,
    loginUser,
    logout,
    isLoggedIn,
    updateUser,
    getUsers,
    getPrograms
}

