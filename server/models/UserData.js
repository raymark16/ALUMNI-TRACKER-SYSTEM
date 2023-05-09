module.exports = (sequelize, DataTypes) => {
    const UserData = sequelize.define("UserData", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_graduated: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return UserData
}