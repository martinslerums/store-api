const login = async (req, res) => {
  const {email, password} = req.body
  console.log(req.body)

  res.send(`This is login route, user = ${email} and ${password}`)
};

export default login
