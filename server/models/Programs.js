module.exports = (sequelize, DataTypes) => {
    const Programs = sequelize.define("Programs", {
        program: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    })
    return Programs
}