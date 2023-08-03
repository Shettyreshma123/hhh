const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/profile",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const maxsize = 1024 * 1024 * 5;
const fileFillter = (req, file, cb) => {
  if (!file.mimetype.includes("jpg") || !file.mimetype.includes("png")) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};
const upload = multer({
  storage: storage,
  limit: { fileSize: maxsize },
  fileFillter: fileFillter,
});
module.exports = { upload };

