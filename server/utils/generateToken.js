import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'smart_university_jwt_super_secret_key_2026', {
    expiresIn: '30d',
  });
};

export default generateToken;
