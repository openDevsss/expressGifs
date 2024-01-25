import { RequestHandler } from "express";
import { User } from "../../models/User";

export const updateUserAfterRegistration: RequestHandler = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { phone, lastName, firstName, bio, location } = req.body;
  const currentUser = await User.findByPk(currentUserId);

  const updatedInfo = await currentUser?.update({
    phone,
    lastName,
    firstName,
    bio,
    location,
  });

  return res.json(updatedInfo);
};
