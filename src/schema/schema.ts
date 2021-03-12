import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import db from '../database/db';

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

export default new GraphQLSchema({
  query: RootQuery,
});
