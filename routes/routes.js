module.exports = (app) => {

   const usersController = require('../controllers/users');
   
   
   app.get('/', usersController.homePage)
   app.get('/users', usersController.getUsers)
   app.post('/user', usersController.createUser)
   app.get('/user/:id', usersController.getUserById)
   app.put('/user/:id', usersController.updateUser)
   app.delete('/user/:id', usersController.deleteUser)
}