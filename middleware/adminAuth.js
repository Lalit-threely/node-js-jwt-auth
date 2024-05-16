const jwt = require("jsonwebtoken");
const AppError = require("../utils/error");
const Admin = require("../models/admin")
const bcrypt = require("bcrypt");


const adminAuth = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(
            new AppError("Authentication credentials were not provided.", 401)
        );
    }

    let decoded;

    jwt.verify(token, process.env.SECRET_KEY, (err, dec) => {
        decoded = { ...dec };
        // console.log('decoded', decoded);
        if (err) {
            return next(err);
        }
    });

    const user = await Admin.findById(decoded.id);
    // console.log('user', user);

    if (!user) {
        return next(new AppError("The user does not exist", 401));
    }

    const isMatch = await bcrypt.compare(decoded.password, user.password);
    if (!isMatch)
        return next(new AppError("User changed password! please login again", 401));

    req.user = { name: decoded.name, id: decoded.id };

    next();
};

module.exports = adminAuth;