import * as jsonwebtoken from 'jsonwebtoken';

const generateToken = (id: string, email: string) => {
  return jsonwebtoken.sign(
    {
      id,
      email,
    },
    'very long json web token pass phrase (){}/=`12',
    { expiresIn: '1y' }
  );
};

export default generateToken;
