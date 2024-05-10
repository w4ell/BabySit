import Admin from "../models/adminModel.js";
import Baby from "../models/babyModel.js";
import History from "../models/historyModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { sendAdminToken } from "../utils/jwtToken.js";

// login
const loginAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return next(new ErrorHandler("Admin doesn't exists!", 400));
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    sendAdminToken(admin, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//load admin
const getAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return next(new ErrorHandler("Admin doesn't exist", 400));
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// logout
const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("adminToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getBabies = catchAsyncErrors(async (req, res, next) => {
  try {
    const babies = await Baby.find();
    res.status(200).json({
      success: true,
      babies,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const addBaby = async (req, res, next) => {
  try {
    const baby = await Baby.create(req.body);
    res.status(200).json({
      success: true,
      baby,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getBaby = async (req, res, next) => {
  try {
    const baby = await Baby.findById(req.params.id);

    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }
    res.status(200).json({ baby });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const deleteBaby = async (req, res, next) => {
  const selectedBabyId = req.params.id;
  const { babyname, reason } = req.body;

  try {
    // Create history entry
    await History.create({ babyname, reason });

    // Delete the baby
    await Baby.findByIdAndDelete(selectedBabyId);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting baby:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
const getHistories = catchAsyncErrors(async (req, res, next) => {
  try {
    const histories = await History.find();
    res.status(200).json({
      success: true,
      histories,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export {
  loginAdmin,
  getAdmin,
  logoutAdmin,
  getBabies,
  addBaby,
  getBaby,
  deleteBaby,
  getHistories,
};
