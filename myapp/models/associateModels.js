// associateModels.js

const UserAccount = require('./User-Accounts');
const UserProfile = require('./User-Profiles');

UserAccount.hasOne(UserProfile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

UserProfile.belongsTo(UserAccount, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'user'
});

module.exports = {
    UserAccount,
    UserProfile
};
