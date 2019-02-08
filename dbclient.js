//mongodb://<dbuser>:<dbpassword>@ds223685.mlab.com:23685/demodb

var mongoose = require('mongoose');
mongoose.connect('mongodb://umashankar:uma123@ds223685.mlab.com:23685/demodb');

module.exports = {
  finduser : finduser
}

var UserSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String
  });

var usermodel = mongoose.model('user', UserSchema); 

var fisrtuser = new usermodel({name : "kumar"})


/*
fisrtuser.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
*/

function finduser(userobj){
  return new Promise((resolve, reject)=>{
    usermodel.findOne(userobj, function (err, userdoc) {
     if(err){
       reject(err)
     }
     resolve(userdoc)
  });
  })
}
   



