const { User } = require("../models");
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context.user)
      if(context.user){
        return User.findOne({ _id: context.user._id });
      }
        
      throw AuthenticationError;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
    const user = await User.findOne({ email })

      if (!user) {
        throw AuthenticationError
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({username, email, password});
        const token = signToken(user);
        return { token, user };
    },
    saveBook: async (parent, {userId, book}) => {
      return User.findOneAndUpdate(
        {_id: userId},
        {
          $addToSet: { 
            savedBooks: book
          }
        },
        { new: true,
          runValidators: true 
        }
      )
    },
    removeBook: async (parent, {bookId}, context) => {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: {bookId: bookId} } },
        { new: true }
      )
    },
  },
};

module.exports = resolvers;
