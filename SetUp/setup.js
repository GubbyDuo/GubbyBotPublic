const Discord = require("discord.js");
const Sequelize = require("sequelize");

module.exports = {

    //creating the CardUsers Database
    CreateUserCardTable: function () {
        const userCardTable = new Sequelize('database', 'username', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            storage: './Data/UserCards.sqlite'
        });
        return (userCardTable);
    },


    CreateUsers: function (userCardTable) {
        var Users = userCardTable.define('users', {
            id: {
                type: Sequelize.TEXT,
                unique: true,
                primaryKey: true
            },
            name: Sequelize.STRING,
            ownedcards: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            nextclaim: {
                type: Sequelize.DATE,
                allowNull: true
            },
            healthPoints: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true
            },
            powerPoints: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true
            },
            regenPoints: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true
            },
            armorPoints: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true
            }
        });
        return (Users);
    },

    CreateCards: function (userCardTable) {
        var Cards = userCardTable.define('cards', {
            id: {
                type: Sequelize.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: Sequelize.STRING,
            imageurl: Sequelize.STRING,
            rarity: Sequelize.STRING,
            description: Sequelize.TEXT,
            cardno: Sequelize.STRING,
            cardtype: Sequelize.STRING,
            attribute: Sequelize.STRING,
            cost: Sequelize.STRING,
            upgradecost: Sequelize.STRING,
            attack: Sequelize.STRING,
            defense: Sequelize.STRING
        });
        return (Cards);
    },

    CreateUserCards: function (userCardTable, Cards, Users) {
        var UserCards = userCardTable.define('usercards', {
            userCardId: {
                type: Sequelize.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: Sequelize.TEXT,
                foreignKey: true
            },
            cardId: {
                type: Sequelize.INTEGER,
                foreignKey: true
            }
        });

        Users.hasMany(UserCards, { foreignKey: 'userId', sourceKey: 'id' });
        Cards.hasMany(UserCards, { foreignKey: 'cardId', sourceKey: 'id' });
        UserCards.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id' });
        UserCards.belongsTo(Cards, { foreignKey: 'cardId', targetKey: 'id' });
        return (UserCards);
    },

    CreateUserDecks: function (userCardTable, Cards, Users) {
        var UserDecks = userCardTable.define('userdecks', {
            userDeckId: {
                type: Sequelize.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: Sequelize.TEXT,
                foreignKey: true
            },
            CardId: {
                type: Sequelize.INTEGER,
                foreignKey: true
            }
        });

        Users.hasMany(UserDecks, { foreignKey: 'userId', sourceKey: 'id' });
        Cards.hasMany(UserDecks, { foreignKey: 'cardId', sourceKey: 'id' });
        UserDecks.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id' });
        UserDecks.belongsTo(Cards, { foreignKey: 'cardId', targetKey: 'id' });
        return (UserDecks);
    }
}