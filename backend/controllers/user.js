const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var userObj={}
userObj.register=(req,res,next)=>{  
    console.log(`email:${req.body.email} pwd:${req.body.pwd}`)
    console.log(`secret${process.env}`)

    if(!req.body.pwd || !req.body.email)
        next(new Error("email or passwrd can not be empty"));

    var hashedPassword = bcrypt.hashSync(req.body.pwd, 8);
    const user = new User({
    email: req.body.email,
    pwd: hashedPassword
    });

    user.save((err,user) => {
      if (err) { return next(err); }
        res.status(200).send({ "id":user._id});
    });    
}


userObj.login= (req, res , next) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    var passwordIsValid = bcrypt.compareSync(req.body.pwd, user.pwd);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, process.env.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
}

userObj.userDetails=(req, res , next) => {
  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
}

module.exports=userObj