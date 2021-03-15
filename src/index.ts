import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import * as jwt from 'express-jwt';
import schema from './schema/schema';

const app = express();

app.use(
  '/protected',
  jwt({
    secret: process.env.JWT_PASS as string,
    algorithms: ['HS256'],
  }),
  (req, res) => {
    if (req.user) return res.send(`Welcome, ${JSON.stringify(req.user)}`);
  }
);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
});
