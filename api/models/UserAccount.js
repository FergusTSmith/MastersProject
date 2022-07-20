// Adapated from https://www.youtube.com/watch?v=Crk_5Xy8GMA&ab_channel=PedroTech

module.exports = (sequelize, DataTypes) => {
    const UserAccount = sequelize.define("UserAccount", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        gamesPlayed: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        wonGames: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        googleID: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })


    return UserAccount;
}