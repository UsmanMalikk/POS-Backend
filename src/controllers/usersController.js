// controllers/usersController.js
const User = require('../models/addUser');
const Admin = require('../models/admin');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        // Retrieve regular users from the "User" schema
        const regularUsers = await User.find().populate('role', 'roleName');

        // Retrieve administrators from the "Admin" schema
        const adminUsers = await Admin.find();

        // Combine the results from both queries
        const allUsers = [...regularUsers, ...adminUsers];

        res.status(200).json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    const userData = req.body;

    try {
        const newUser = await User.create(userData);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    try {
        // Try to update the user in the User schema
        let updatedUser = await User.findByIdAndUpdate(userId, userData);

        if (!updatedUser) {
            // If not found in the User schema, try updating in the Admin schema
            updatedUser = await Admin.findByIdAndUpdate(userId, userData);

            if (!updatedUser) {
                return res.status(404).json({ message: 'User or Admin not found' });
            }
        }

        res.status(200).json({ message: 'User or Admin updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for GET /User /:id
exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        // Try to find the user in the User schema
        let user = await User.findById(userId).populate('role', 'roleName');

        if (!user) {
            // If not found in the User schema, try finding in the Admin schema
            user = await Admin.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User or Admin not found' });
            }
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUserProfileById = async (req, res) => {

    const userId = req.user.userId;
    // console.log(userId)
    try {
        // Try to find the user in the User schema
        let user = await User.findById(userId);

        if (!user) {
            // If not found in the User schema, try finding in the Admin schema
            user = await Admin.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User or Admin not found' });
            }
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a userProfile
exports.updateUserProfileById = async (req, res) => {
    const userId = req.user.userId;
    const userData = req.body;
  
    try {
      // First, find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        // If the user is not found in the User schema, try finding in the Admin schema
        const admin = await Admin.findById(userId);
  
        if (!admin) {
          return res.status(404).json({ message: 'User or Admin not found' });
        } else {
          // If found in the Admin schema, update the entire admin data
          admin.set(userData);
          await admin.save();
        }
      } else {
        // If found in the User schema, update the entire user data
        user.set(userData);
        await user.save();
      }
  
      res.status(200).json({ message: 'User or Admin updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Update a userProfile
exports.updateUserProfilePassword = async (req, res) => {
    const userId = req.user.userId;
    const { currPassword, password, cPassword } = req.body;

    try {
        // Try to update the user in the User schema
        let user = await User.findById(userId);

        if (!user) {
            // If not found in the User schema, try updating in the Admin schema
            let admin = await Admin.findById(userId);
            if (!admin) {
                return res.status(404).json({ message: 'User or Admin not found' });
            } else {
                // Check the old password
                if (admin.password !== currPassword) {
                    return res.status(400).json({ message: 'Old password is incorrect' });
                }

                // Check if the new password and confirm password match
                if (password !== cPassword) {
                    return res.status(400).json({ message: "New password and confirm password don't match" });
                }

                // Update the password
                admin.password = password;
                admin.cpassword = cPassword;
                await admin.save();

                res.status(200).json({ message: 'Password changed successfully' });
            }


        } else {
            // Check the old password
            if (user.password !== currPassword) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }

            // Check if the new password and confirm password match
            if (password !== cPassword) {
                return res.status(400).json({ message: "New password and confirm password don't match" });
            }
            // Update the password
            user.password = password;
            user.cPassword = cPassword;

            await user.save();

            res.status(200).json({ message: 'Password changed successfully' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


