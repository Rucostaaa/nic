import bcrypt from'bcrypt';
import jwt from'jsonwebtoken';
import Admin  from'../models/Admin.js';
export const loginAdmin=async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne();

    let user;

    if (!existingAdmin) {
      // 👉 First user becomes ADMIN
      user = await Admin.create({
        username,
        password,
        role: "admin",
      });
    } else {
      // 👉 Everyone else becomes normal user (or you can block this if needed)
      user = await Admin.create({
        username,
        password,
        role: "user",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Registration Successful",
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCurrent = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  
  const admin=req.user
  res.status(200).json(admin);
};
export const deleteAdmins = async (req, res) => {
  try {
    await Admin.deleteMany({});

    res.status(200).json({ message: "All admins deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};