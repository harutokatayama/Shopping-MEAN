const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminUser = require('../models/admin');
const User = require('../models/user');

exports.createAdminUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const adminUser = new AdminUser({
        email: req.body.email,
        password: hash
      });
      adminUser.save()
        .then(result => {
          res.status(201).json({
            message: 'Admin User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'Invalid authentication credentials'
          });
        });
    })
}

exports.adminUserLogin = (req, res, next) => {
  let fetchedAdminUser = 
  AdminUser.findOne({ email: req.body.email })
    .then(adminUser => {
      if (!adminUser) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedAdminUser = adminUser;
      return bcrypt.compare(req.body.password, adminUser.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign({
        email: fetchedAdminUser.email,
        password: fetchedAdminUser.password
      }, process.env.JWT_KEY, {
        expiresIn: '5h'
      });
      res.status(200).json({
        token: token,
        expiresIn: 18000,
        adminUserId: fetchedAdminUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Invalid authentication credentials'
      });
    });
}

exports.getUsers = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const userQuery = User.find();
  let fetchedUsers;
  if (pageSize && currentPage) {
    userQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  userQuery
    .then(documents => {
      fetchedUsers = documents;
      return User.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: 'Users fetched successfully!',
        users: fetchedUsers,
        maxUsers: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching users failed!'
      });
    });
}
