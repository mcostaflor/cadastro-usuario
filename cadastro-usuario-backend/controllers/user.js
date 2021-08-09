const User = require("../models/user");

module.exports = {
    create: async (code, name, birthday, photo) => {
        return User.create({
            code,
            name,
            birthday,
            photo
        });
    },
    list: async () => {
        return await User.findAll();
    },
    get: async (code) => {
        return await User.findOne({
            where: {
                code
            },
        }); 
    },
    update: async (code, data) => {

        const user = await User.findOne({
            where: {
                code: code,
            },
        });
        
        user.update({
            name: data.name,
            birthday: data.birthday,
            photo: data.photo,
        });

        user.save();

        return user;
    },
    delete: async (code) => {
        try {
            await User.destroy({
                where: {
                    code
                }
            });
            
            return true;
        } catch (error) {
            return error;
        }
    }
 }