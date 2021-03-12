import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

import db from '../database/db';
import generateToken from '../helpers/generateToken';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return db()
          .select('*')
          .from('authors')
          .where('id', parent.authorId)
          .first();
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    rating: {
      type: GraphQLInt,
    },
    age: {
      type: GraphQLInt,
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  }),
});

const AuthPayloadType = new GraphQLObjectType({
  name: 'AuthpayLoad',
  fields: () => ({
    token: {
      type: GraphQLString,
    },
    message: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, { id }) {
        return db().select().from('books').where('id', id).first();
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, { id }) {
        return db().select().from('authors').where('id', id).first();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    registerUser: {
      type: AuthPayloadType,
      args: {
        username: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      async resolve(parent, { username, email, password }) {
        const id = uuidv4();
        await db('users').insert({
          id,
          username,
          email,
          password: await bcrypt.hash(password, 10),
        });

        const token = generateToken(id, email);
        return {
          token,
          user: {
            id,
            username,
            email,
          },
          message: 'User registered correctly',
        };
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
