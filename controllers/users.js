const Users = require('../models/users.js')
const validate = require('./validations.js')

module.exports.homePage = async (req, res, next) => {

  try {
    const users = await Users.FindAll();
    res.render('index', {
      title: 'Persistence Layer',
      "users":users
    })

  } catch(err){
    res.status(500).json({
      msg: "Sorry an error occured while finding the users.",
      error:err
    })
  }
}


module.exports.getUsers = async (req, res, next) => {

  try {
    const users = await Users.FindAll();

    res.json(users)

  } catch (err) {

    res.status(500).json({
      msg: "Sorry an error occured while finding the users.",
      error:err
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

    if (email === '' || givenName === '' || familyName === '') {
      return res.status(400).json({
        msg: 'Please make sure you included a giveName, familyName and email'
      });

    } else {

      const users =  await Users.CreateUser(email, givenName, familyName, created);
      res.json({
        msg: "User Added",

      })
    }

  } catch (err) {
    res.status(500).json({
      msg: 'There was an issue creating  this user.',
      error:err
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
    res.json(user)

  } catch (err) {
    res.json({
      msg: "Unable to find this user.",
      error:err
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

    if (email === '' || givenName === '' || familyName === '') {
      return res.status(400).json({
        msg: 'Please make sure you included a giveName, familyName and email'
      });

    } else {

      const user = await Users.UpdateUser(userId, email, givenName, familyName);
      res.json({
        msg: 'User updated'
      })
    }

  } catch (err) {
    res.status(500).json({
      msg: 'There was an issue updating this user',
      error:err
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

    res.json({
      msg: 'User information deleted succefully '
    })

  } catch (err) {
    res.status(500).json({
      msg: 'There was an issue when deleting user',
      error:err
    });

  }

}