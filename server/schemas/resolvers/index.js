const {User} = require("../../models")

const resolvers = {
    Query:{
        user: async (parent,{username})=>{
            const user = await User.findOne({username:username})
            return user;
        },
        users: async (parent, {filters})=>{
            if(!filters){
                filters = {}
            }
            let users = await User.find(filters)
            return users
        }
    },
    Mutation:{
        addUser: async (parent, {username, email, password})=>{
            const user = await User.create({username, email, password})
            return user
        }
    },

}

module.exports=resolvers