import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import * as jwt from 'express-jwt';
import schema from './schema/schema';

const app = express();

app.use(
  '/protected',
  jwt({
    secret: 'very long json web token pass phrase (){}/=`12',
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

app.listen(4000, () => {
  console.log('Now listening on port 4000');
});
