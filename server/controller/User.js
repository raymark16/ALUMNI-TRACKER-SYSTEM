const {Users} = require('../models')
const getUser = async (req, res) => {
    try {
        const result = await Users.findOne({where:{email:req.user.email}}).select('username email role')

        return res.json({ result })
    } catch (err) {
        return res.json({message:'Error User'})
    }
};

module.exports = {
    getUser
}