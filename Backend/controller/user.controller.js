const User = require("../model/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


exports.user = async (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    try {
        const user = await User.create(req.body)
        res.json({ status: 200, success: true, message: "SubCategory Created Successfully!" })
    }
    catch (err) {
        console.log(err)
    }

}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.json({ message: "User not found" })
        }
        const comparedPassword = await bcrypt.compare(password, user.password);
        if (comparedPassword) {
            var token = jwt.sign({ id: user._id }, 'shhhhh', { expiresIn: '1h' });
            console.log(token)
        }
        else {
            return res.json({ message: "password incorrect" })
        }

        res.json({ status: 200, success: true, message: "User logged in Successfully!", token })
    }
    catch (err) {
        console.log(err)
    }

}

