import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = "helloworld";

const signup = async (req, res) => {
  const { name, password, email, role } = req.body;
  try {
    console.log(req.body)
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await userModel.create({
        name: name,
        password: hashedPassword,
        email: email,
        role: role,
      });
      const token = jwt.sign(
        { email: result.email, role: result.role, id: result._id },
        SECRET_KEY
      );
      res.status(201).json({ user: result, token: token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        role: existingUser.role,
        id: existingUser._id,
      },
      SECRET_KEY
    );

    res.status(201).json({ role:existingUser.role, name: existingUser.name ,id: existingUser._id,token: token });

    // res.status(201).json({ role:existingUser.role, name: existingUser.name ,token: token });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const showUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export { signup, signin , showUsers };
