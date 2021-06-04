const users = []

      // username: username.value,
      // email: email.value,
      // firstName: firstName.value,
      // lastName: lastName.value,
      // password: password.value

const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      console.log(users)
      const { username, password } = req.body;
      // const salt1 = bcrypt.genSaltSync(5)
      // const passwordHash1 = bcrypt.hashSync(password, salt1)
      // console.log(passwordHash1);
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const existing = bcrypt.compareSync(password, users[i].passwordHash)
          if(existing) {
            const newSentObj = {...users[i]}
            delete newSentObj.passwordHash;
            res.status(200).send(newSentObj)
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        // console.log('Registering User')
        // console.log(req.body)
        // users.push(req.body)
        // res.status(200).send(req.body)
        const {username, email, firstName, lastName, password} = req.body;
        for (let i=0; i < users.length; i++) {
          if(users[i].username === username) {
            // console.log(users[i].username)
            res.status(400).send('user already exists');
            return
          }
        }
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)
        // console.log(passwordHash);
        const userInfoStored = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }
        users.push(userInfoStored);
        let returnObj = {username, email, firstName, lastName}
        res.status(200).send(returnObj);
        console.log(users)
    }
}