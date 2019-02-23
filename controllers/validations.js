
const validateUserId = (userId, res) => {
    if(isNaN(userId)) {
        res.status(500).json({
            error: 'Invalid user ID supplied'
        });
        return false;
    }
    return true;
  }
  

  module.exports = {
      validateUserId,
  }