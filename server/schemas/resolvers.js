const { User } = require("../models");
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async () => {
      return User.findOne({});
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
    saveBook: async (parent, { thoughtId }) => {
      return Thought.findOneAndDelete({ _id: thoughtId });

    },
  },
};

module.exports = resolvers;
