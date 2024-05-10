// create token and saving that in cookies
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const { password, ...userWithoutPassword } = user.toObject(); // Exclude the password field
  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user: userWithoutPassword,
    token,
  });
};

const sendAdminToken = (admin, statusCode, res) => {
  const adminToken = admin.getJwtToken();
  const { password, ...adminWithoutPassword } = admin.toObject(); // Exclude the password field
  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("adminToken", adminToken, options).json({
    success: true,
    admin: adminWithoutPassword,
    adminToken,
  });
};

export { sendToken, sendAdminToken };
