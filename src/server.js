const express = require("express");
const cors = require("cors");
const modules = require("./modules/app.module.js");
const { serverPort} = require("./config/index.js");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("uploads"));


app.use("/api", modules.router);

// app.post("/multer-single", upload.single("media"), (req, res) => {
//   console.log("file: ", req.file);
//   console.log("body: ", req.body);

//   res.json("ok");
// });

// app.post("/multer-multiple", upload.array("medias"), (req, res) => {
//   console.log("file: ", req.file);
//   console.log("body: ", req.body);

//   res.json("ok");
// });



// app.post("/file-upload-multiple", (req, res) => {
//   try {
//     const file = req.files.media;

//     if (Array.isArray(file)) {
//       const files = [];

//       file.forEach((f) => {
//         const fileName = `${uuid.v4()}${path.extname(f.name)}`;

//         const uploadPath = path.join(__dirname, "../uploads", fileName);

//         const fileURL = fileServerUrl + fileName;

//         f.mv(uploadPath, (err) => {
//           if (err) {
//             res.status(400).json(err.message);
//           }
//         });

//         files.push(fileURL);
//       });

//       res.json(files);
//     } else {
//       const file = req.files.media;

//       const fileName = `${uuid.v4()}${path.extname(file.name)}`;

//       const uploadPath = path.join(__dirname, "../uploads", fileName);

//       const fileURL = fileServerUrl + fileName;

//       file.mv(uploadPath, (err) => {
//         if (err) {
//           res.status(400).json(err.message);
//         }
//       });

//       res.json(fileURL);
//     }

//     res.json("fileURL");
//   } catch (error) {
//     res.json(error.message);
//   }
// });

app.listen(serverPort, () => {
  console.log(`http://localhost:${serverPort}`);
});
