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
        await User.update({
            code: data.code,
            name: data.name,
            birthday: data.birthday,
            photo: data.photo,
        },{
            where: {
                code: code,
            },
        });

        const user = await User.findOne({
            where: {
                code: data.code,
            },
        })

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