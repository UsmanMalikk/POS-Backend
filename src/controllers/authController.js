// controllers/authController.js
const Admin = require('../models/admin');
const User = require('../models/addUser');
const Role = require('../models/roles');
const jwt = require('jsonwebtoken');

// Login
// exports.login = async (req, res) => {
//     const { userName, password } = req.body;

//     try {
//         const user = await Admin.findOne({ userName });

//         if (!user || user.password !== password) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Authentication successful
//         return res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };



exports.login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // console.log(req.body)
        // Check if the user exists in either Admin or User schemas
        const user = await Admin.findOne({ userName }).lean();
        const userInUserSchema = await User.findOne({ userName }).lean();

        if (!user && !userInUserSchema) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        let roleModel;
        let role;
        // Check if the provided password matches in either Admin or User schemas
        if (user && user.password === password) {
            // Authentication successful for Admin
            // return res.status(200).json({ message: 'Login successful for Admin' });
            role = 'Admin';
            Id = user._id

            const token = jwt.sign(
                { userId: user._id, Id, userName, role, ...(roleModel && { roleModel })  },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            return res.status(200).send({ message: 'Login successful for Admin', token });
        }
        else if (userInUserSchema && userInUserSchema.password === password) {
            // Authentication successful for User
            // return res.status(200).json({ message: 'Login successful for User' });
            role = 'User';
            if (userInUserSchema.role) {
                roleModel = await Role.findById(userInUserSchema.role);
                // console.log(roleModel)
                if (!roleModel) {
                    return res.status(401).json({ message: 'Invalid role' });
                }
            } else {
                return res.status(401).json({ message: 'No role assigned to user' });
            }
            Id = userInUserSchema._id

            const token = jwt.sign(
                { userId: userInUserSchema._id ,Id, userName, role, ...(roleModel && { roleModel }) },
                process.env.JWT_SECRET,
                { expiresIn: '60d' }
            );
            return res.status(200).send({ message: 'Login successful for User', token });
        }
        else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// Register
exports.register = async (req, res) => {
    const registrationData = req.body;
    // console.log(registrationData)
    try {
        const newRegistration = await Admin.create(registrationData);
        res.status(201).json({ message: 'Registration successful', user: newRegistration });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Update an existing admin by ID
exports.updateAdmin = async (req, res) => {
    const adminId = req.user.userId; 
    const updateData = req.body; 

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Get a single admin by ID
exports.getAdminById = async (req, res) => {
    const adminId = req.user.userId; // Get the ID from the request parameters

    try {
        const admin = await Admin.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};