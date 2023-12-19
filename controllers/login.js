const schema = require("../models/userschema");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await schema.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Please register yourself' });
    }
    

    console.log("user is find")

    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid username or password' });

    } else {
      // Redirect the user to the dashboard if login is successful
      req.session.username=username;
      req.session.isLoggedIn=true;
      return res.sendFile('/dashboard');
      // return res.json(
      //   {
      //     message:"authenticated"
      //   }
      // )
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};