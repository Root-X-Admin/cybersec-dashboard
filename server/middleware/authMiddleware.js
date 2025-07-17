import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Expect: Bearer <token>
    if (!token) return res.status(401).json({ message: "No token, access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, role, name }
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is invalid" });
    }
};
