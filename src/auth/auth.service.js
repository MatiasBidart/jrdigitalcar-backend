const {loginUser}= require('./auth.controller') 
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config');

const login = (req, res) => {
    const {email, password} = req.body;
    loginUser(email, password)
    .then((data) => {
        if (!data) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
          {
            id: data.id,
            role: data.role,
          },
          jwtSecret
        );
        res.status(200).json({ token });
      })
      .catch((err) => res.status(400).json(err));
  };
  
  module.exports = {
    login
  };