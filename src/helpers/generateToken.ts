import * as jsonwebtoken from 'jsonwebtoken';

const generateToken = (id: string, email: string) => {
  return jsonwebtoken.sign(
    {
      id,
      email,
    },
    process.env.JWT_PASS as string,
    { expiresIn: '1y' }
  );
};

export default generateToken;
