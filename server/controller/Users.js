const {Users} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req,res) => {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.send({ message: 'All fields are required' })
        }

        const userExist = await Users.findOne({ where: {
            email: req.body.email
        } 
        })
        if (userExist) {
            return res.send({ message: 'Email already taken' })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT));
        await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role:req.body.role
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
            username: user.username,
            email: user.email,
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
            .json({ username: user.username, email: user.email, role: user.role, message: 'login success' });
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

module.exports = {
    registerUser,
    loginUser,
    logout,
    isLoggedIn
}