const {Users} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const updateUser = async (req,res) => {
    try {
        const {firstname,lastname,email,phone,position,date_graduated,program,userEmail } = req.body
        if(!firstname || !lastname || !email || !phone || !position || !date_graduated || !program || !userEmail ) return res.json({message:'All fields are required!'})
        await Users.update({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone:phone,
            position:position,
            date_graduated:date_graduated,
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
            role : role
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
    const result = await Users.findAll({where: {role : '2'},attributes: ['id', 'email', 'firstname', 'lastname', 'phone', 'position', 'date_graduated', 'program', 'role']})
    res.json({result})
}

module.exports = {
    registerUser,
    loginUser,
    logout,
    isLoggedIn,
    updateUser,
    getUsers
}