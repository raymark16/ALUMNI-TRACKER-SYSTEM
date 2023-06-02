module.exports = (sequelize, DataTypes) => {
    const Jobs = sequelize.define("Jobs", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        job_position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_type: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        time_period: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        })
    return Jobs
}
