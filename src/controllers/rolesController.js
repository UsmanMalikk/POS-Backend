// controllers/rolesController.js
const Role = require('../models/roles');

// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new role
exports.createRole = async (req, res) => {
    const roleData = req.body;
    // console.log(req.user.userId)
    try {
        const newRole = await Role.create(roleData);
        res.status(201).json({ message: 'Role added successfully', role: newRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a role
exports.updateRole = async (req, res) => {
    const roleId = req.params.id;
    const roleData = req.body;

    try {
        await Role.findByIdAndUpdate(roleId, roleData);
        res.status(200).json({ message: 'Role updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a role
exports.deleteRole = async (req, res) => {
    const roleId = req.params.id;

    try {
        await Role.findByIdAndDelete(roleId);
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Controller for GET /role/:id
exports.getRolesById = async (req, res) => {
    const roleId = req.params.id;

    try {
        const role = await Role.findById(roleId);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};