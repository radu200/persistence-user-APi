const  connection = require('../config/db.js');


const FindAll= async() => {
   
    try{
        const db = await connection;
        
        const [users] = await db.query('SELECT id,email,givenName,familyName,created FROM users');
       
        return users;
    
        } catch (err){
            console.log({msg:"Error occurred while executing FindAll users"}, err)
      }
}


const CreateUser = async(email,givenName,familyName,created) => {
   
    try{
        const db = await connection;
        
       const sql =  await db.query('INSERT INTO users SET email = ?, givenName = ?, familyName = ?, created = ?',[email,givenName,familyName,created]);
       
        return sql;
    
        } catch (err){
            console.log({msg:"Error occurred while executing CreateUsers"}, err)
      }
}



const FindUserById = async(userId) => {
   
    try{
        const db = await connection;
        
        const [user] = await db.query('SELECT email, givenName,familyName,created FROM users WHERE  id = ?', [userId]);
        
        return user[0];
    
        } catch (err){
            console.log({msg:"Error occurred while executing FindUserById"}, err)
      }
}


const UpdateUser = async(userId,email,givenName,familyName) => {
   
    try{
        const db = await connection;
        
         const sql =  await db.query('UPDATE users SET email = ?, givenName = ?,familyName = ?  WHERE  id = ?', [email,givenName,familyName,userId]);
          return sql;
    
        } catch (err){
            console.log({msg:"Error occurred while executing UpdateUser"}, err)
      }
}

const DeleteUser = async(userId) => {
   
    try{
        const db = await connection;
        
         const sql = await db.query('DELETE FROM users WHERE  id = ?', [userId]);
         return sql;
    
        } catch (err){
            console.log({msg:"Error occurred while executing DeleteUser"}, err)
      }
}

module.exports = {
    FindAll,
    CreateUser,
    FindUserById,
    UpdateUser,
    DeleteUser
}