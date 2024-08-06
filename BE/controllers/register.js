const register = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404);
  }

  const {email, password} = req.body

  res.send(`This is register route, user: ${email} and ${password}`)

};

export default register;
