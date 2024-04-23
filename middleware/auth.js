import jwt from 'jsonwebtoken';
import Users from '../models/userModel';
import Vendors from '../models/vendorModel';

const auth = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(400).json({ err: 'Invalid Authentication' });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) return res.status(400).json({ err: 'Invalid Authentication' });

        let authenticatedUserOrVendor;

        // Check if the decoded token corresponds to a user
        authenticatedUserOrVendor = await Users.findById(decoded.id);
        
        // If the token doesn't correspond to a user, check if it corresponds to a vendor
        if (!authenticatedUserOrVendor) {
            authenticatedUserOrVendor = await Vendors.findById(decoded.id);
        }

        // If neither user nor vendor is found, return an error
        if (!authenticatedUserOrVendor) {
            return res.status(400).json({ err: 'User or vendor does not exist!' });
        }

        // Attach the authenticated user or vendor to the request object for further processing
        req.authenticatedUserOrVendor = authenticatedUserOrVendor;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(500).json({ err: error.message });
    }
};

export default auth;
