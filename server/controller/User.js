
const getUser = async (req, res) => {
    try {
        const result = await User.findById(req.user.id).select('username email role')
        return res.json({ result })
    } catch (err) {
        return res.json({message:'Error User'})
    }
};

module.exports = {
    getUser
}