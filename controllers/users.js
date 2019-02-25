const Users = require('../models/users.js')
const validate = require('./validations.js')

module.exports.homePage = async (req, res, next) => {
  res.render('index', {
    title: 'Persistence Layer'
  })
}


module.exports.getUsers = async (req, res, next) => {

  try {
    const users = await Users.FindAll();
   
    if (users.length === 0) {
      res.json({
        success:false,
        code:404,
        msg: 'No users found'
      })


    } else {
      res.json({users})
    }

  } catch (err) {
    res.status(500).json({
      error: "Sorry an error occured while finding the user."
    })
  }

}

module.exports.createUser = async (req, res, next) => {


  const {
   email,
    givenName,
    familyName
  } = req.body

  const created = new Date();
 



  try {
    await Users.CreateUser(email, givenName, familyName, created);
    res.redirect('/user')
  
  } catch (err) {
    res.status(500).json({
      error: 'There was an issue creating  this user.',
    });
  }

}

module.exports.getUserById = async (req, res, next) => {



  const userId = req.params.id;

  if (!validate.validateUserId(userId, res)) {
    return;
  }

  try {
    const user = await Users.FindUserById(userId);


    if (user.length === 0) {

      res.json({
        success:false,
        code:404,
        msg: 'User not found'
      })
      return false;

    } else {
      res.json({
        User: user
      })
    }

  } catch (err) {
    res.json({
      error: "Unable to find this user."
    })

  }

}


module.exports.updateUser = async (req, res, next) => {


  const userId = req.params.id;
  const {
    email,
    givenName,
    familyName
  } = req.body

  if (!validate.validateUserId(userId, res)) {
    return;
  }


  try {
   await Users.UpdateUser(userId, email, givenName, familyName);
   
   res.redirect('/user')

  } catch (err) {
    res.status(500).json({
      error: 'There was an issue updating this user',
    });
  }

}


module.exports.deleteUser = async (req, res, next) => {


  const userId = req.params.id;

  if (!validate.validateUserId(userId, res)) {
    return;
  }

  try {
    await Users.DeleteUser(userId);
   
    res.status(204).json({
      msg: 'User information deleted succefully '
    })

  } catch (err) {
    res.status(500).json({
      error: 'There was an issue when deleting user',
    });

  }

}


