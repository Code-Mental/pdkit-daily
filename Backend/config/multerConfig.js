// const multer = require('multer');
// const path = require('path');

// // Set up storage options
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext); // Append timestamp to the filename to avoid conflicts
//   }
// });

// const upload = multer({ storage });

// module.exports = upload;