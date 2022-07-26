// Adapated from https://www.youtube.com/watch?v=Crk_5Xy8GMA&ab_channel=PedroTech

module.exports = (sequelize, DataTypes) => {
    const UserAccount = sequelize.define("UserAccount", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            unique: true
        },
        gamesPlayed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        wonGames: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        googleID: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            unique: true
        }
    })


    return UserAccount;
}