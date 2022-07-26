// Adapated from https://www.youtube.com/watch?v=Crk_5Xy8GMA&ab_channel=PedroTech

module.exports = (sequelize, DataTypes) => {
    const GameDetails  = sequelize.define("UserAccount", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            unique: true
        },
        Score: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        gameType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Multiplayer: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            unique: true
        }
    })


    return GameDetails;
}