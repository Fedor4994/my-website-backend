import { client } from "../app";
import { User } from "../db/userModel";

export const googleLogin = async (body: { token: string }) => {
  const ticket = await client.verifyIdToken({
    idToken: body.token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const googleUser = ticket.getPayload();

  if (!googleUser) {
    return false;
  }

  const { email, name, picture } = googleUser;
  const user = await User.findOne({ email });

  if (user) {
    return { email, name, picture, _id: user._id };
  }

  const newUser = new User({ email, name, picture });
  await newUser.save();

  return newUser;
};

export const getUserById = async (userId: string) => {
  const newUser = await User.findOne({ _id: userId });

  if (!newUser) {
    return false;
  }

  return newUser;
};
