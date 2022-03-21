// /** @format */

// import express from "express";
// import path from "path";

// import fs from "fs";

// const app = express();

// const PORT = 5500;

// app.use(express.urlencoded());
// app.use(express.json());
// // dev
// app.use(express.static(path.resolve("./omc/public")));
// // prod
// app.use(express.static(path.resolve("./omc/build")));


// app.post("/game", async (req, res) => {
//   // ididid = req.body.id;
//   fs.appendFile(
//     "./emails/emails.txt",
//     `
// ------
// Namn: ${req.body.name}
// Email: ${req.body.email}
// ------  
// `,
//     // ID: ${req.body.id}

//     function (err) {
//       if (err) throw err;
//     }
//   );
//   const scorB = {
//     name: req.body.name,
//     // ID: req.body.id,
//     score: null,
//   };
//   fs.readFile("./public/scoreBoard.json", (err, data) => {
//     let json = JSON.parse(data);
//     json.push(scorB);

//     fs.writeFile("./public/scoreBoard.json", JSON.stringify(json), (error) => {
//       if (error) {
//         throw error;
//       }
//     });
//   });
//   // res.sendFile("game.html", { root: "./public" });
//   res.json({
//     success: true,
//   });
// });

// // app.get("/gameon/:id", async (req, res) => {
// //   res.sendFile("game.html", { root: "./public" });
// // });

// app.post("/gameover", async (req, res) => {
//   fs.readFile("./public/scoreBoard.json", (err, data) => {
//     let json = JSON.parse(data);
//     let copy = json.pop();
//     copy.score = req.body.score;

//     json.push(copy);

//     fs.writeFile("./public/scoreBoard.json", JSON.stringify(json), (error) => {
//       if (error) {
//         throw error;
//       }
//     });
//   });
//   //   res.sendFile("index.html", { root: "./public" });
//   res.json({ success: true });
// });

// app.get("/", (req, res) => {
//   res.sendFile("index.html", 
// //   dev
//   { root: "./omc/public" }

//   //   prod
// //   { root: "./omc/build" }
//   );
// });

// app.listen(PORT, () => {
//   console.log("port: ", PORT);
// });

//  to start: 1. clone repo. 2. "npm i" in rootfolder. 3. "node start.js" in root folder. 4. "localhost:5500" in browser


/** @format */

import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import path from "path";

import dotenv from "dotenv";

import index from "./api/routers/index.js";
// import protectedRouter from "./routers/protected.js";
// import { protectedMw } from "./middlewares/protectedMw.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("mongo connected");
  } catch (err) {
    process.exit();
  }
})();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// dev
app.use(express.static(path.resolve("./omc/public")));
// prod
// app.use(express.static(path.resolve("./omc/build")));

// app.use("/protected", protectedMw, protectedRouter);
app.use("/", index);

app.get("*", (req, res) =>
  res.sendFile("index.html", {
    //   dev
   root: "./omc/public" 

  //   prod
//    root: "./omc/build" 
  })
);

app.listen(process.env.PORT || 5500, () => {
  console.log("lyssnar" + 5500);
});
