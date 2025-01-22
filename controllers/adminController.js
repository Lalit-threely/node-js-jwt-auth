const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin.js');
const z = require('zod');
// adminRegister admin 

const registerSchema = z.object({
    username: z.string().min(3, 'Username is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    
});

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});


const adminRegister = async (req, res) => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const { username, password } = validatedData;

        const user = await admin.find({ username: username });
        if (user.length > 0) {
            return res.status(400).json({ message: "user already exists. " });
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newAdmin = new admin({
            username,
            password: passwordHash
        });
        const savedadmin = await newAdmin.save();
        res.status(201).json(savedadmin);
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                errors: err.errors.map((e) => ({
                    field: e.path[0],
                    message: e.message,
                })),
            });
        }
        res.status(500).json({ error: err.message });
    }
}

// LOGGING IN 

const adminLogin = async (req, res) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const { username, password } = validatedData;
        const user = await admin.findOne({ username });
        if (!user) return res.status(401).json({ message: "user does not exist. ", success: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Wrong Password. ", success: false });
        const token = jwt.sign({ id: user._id, username, password }, process.env.SECRET_KEY);
        user.password = undefined;
        res.status(200).json({ token, user, success: true });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
              success: false,
              errors: err.errors.map((e) => ({
                field: e.path[0],
                message: e.message,
              })),
            });
          }
          res.status(500).json({ error: err.message });
    }
};

const getAllAdmins = async (req, res) => {
    try {
      // Fetch all admins from the database
      const admins = await admin.find().select('-password'); // Exclude passwords for security
      res.status(200).json({ success: true, admins });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
    }
};
const deleteAllAdmins = async (req, res) => {
    try {
      // Delete all admins from the database
      const result = await admin.deleteMany({});
  
      res.status(200).json({
        success: true,
        message: `${result.deletedCount} admin(s) deleted successfully.`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete admins',
        error: error.message,
      });
    }
  };

module.exports = { adminRegister,deleteAllAdmins, adminLogin ,getAllAdmins};