const Users = require('../models/users.js')






function validateUserId(userId, res) {
  if(isNaN(userId)) {
      res.status(500).json({
          error: 'Invalid user ID supplied'
      });
      return false;
  }
  return true;
}

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
        msg: 'No users found'
      })
      
    return false;

    } else {
        res.json({
          Users: users
        })
    }
  } catch (err) {
    next(err)
  }

}

module.exports.createUser = async (req, res, next) => {

  const email = req.body.email;
  const givenName = req.body.givenName;
  const familyName = req.body.familyName;
  const created = new Date();

  try {
     await Users.CreateUser(email, givenName, familyName, created);
    
  
  } catch (err) {
    res.status(500).json({
      error: 'There was an issue updating this user',
     });

  }

}

module.exports.getUserById = async (req, res, next) => {
   

  //i wrote req.params.id for testing purpose only
  const userId = req.params.id;
  
  if(!validateUserId(userId, res)) {
    return;
   }
   
  try {
    const user = await Users.FindUserById(userId);

    if (user[0].length === 0) {

      res.json({
        msg: 'User not found'
      })
      return false;

    } else {
        res.json({
          User: user[0]
        })
    }

  } catch (err) {
    // next(err)
    res.json({
      err:error.message
    })

  }

}


module.exports.updateUser = async (req, res, next) => {

  //i wrote req.params.id for testing purpose only
  const userId = req.params.id;
  const email = req.body.email;
  const givenName = req.body.givenName;
  const familyName = req.body.familyName;

  if(!validateUserId(userId, res)) {
    return;
   }


  try {
    await Users.UpdateUser(userId, email, givenName, familyName);
    res.json({
      msg: 'User information succefully updated'
    })

  } catch (err) {
    next(err)

  }

}


module.exports.deleteUser = async (req, res, next) => {

  //i wrote req.params.id for testing purpose only
  const userId = req.params.id;

  if(!validateUserId(userId, res)) {
    return;
   }

  try {
    await Users.DeleteUser(userId);
    res.json({
      msg: 'User information deleted succefully '
    })

  } catch (err) {
    next(err)

  }

}