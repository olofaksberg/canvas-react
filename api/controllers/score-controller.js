/** @format */
import { scoreModel } from "../models/score-model.js";

export const create_score = async (req, res) => {
  console.log(req.body);
  try {
    const newScore = await new scoreModel(req.body);

    newScore.save((err, data) => {
      if (err) {
        return res.json({
          message: "Score failed: " + err,
          success: false,
          data: null,
        });
      } else {
        return res.json({
          message: "Score success",
          success: true,
          data: data,
        });
      }
    });
  } catch (err) {
    return res.json({
      message: "Score failed: " + err,
      success: false,
      data: null,
    });
  }
};

export const get_all_scores = async (req, res) => {
  try {
    const scores = await scoreModel.find({}).exec();
    const sortedScores = scores.sort((a, b) => b.score - a.score);

    return res.json({
      message: "Find scores success",
      success: true,
      data: sortedScores,
    });
  } catch (err) {
    return res.json({
      message: "Find scores failed: " + err,
      success: false,
      data: null,
    });
  }
};

export const get_top_scores = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const scores = await scoreModel
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([["score", -1]])
      .exec();
    const count = await scoreModel.countDocuments();
    return res.json({
      message: "Find scores success",
      success: true,
      data: {
        scores: scores,
        totalPages: Math.ceil(count / limit),
        page: page,
      },
    });
  } catch (err) {
    return res.json({
      message: "Find scores failed: " + err,
      success: false,
      data: null,
    });
  }
};

export const delete_all_scores = async (req, res) => {
  try {
    await scoreModel.deleteMany({}).exec();

    return res.json({
      message: "Delete all scores success",
      success: true,
      data: null,
    });
  } catch (err) {
    return res.json({
      message: "Delete all scores failed: " + err,
      success: false,
      data: null,
    });
  }
};

// export const update_reseller = async (req, res) => {
//   console.log(req.body.id, req.body._id);
//   try {
//     const id = req.body._id;
//     const updateValues = req.body;
//     delete updateValues._id;
//     const market = await resellerModel.findOneAndUpdate(
//       { _id: id },
//       updateValues,
//       {
//         returnDocument: "after",
//       }
//     );

//     return res.json({
//       message: "Update reseller success",
//       success: true,
//       data: reseller,
//     });
//   } catch (err) {
//     return res.json({
//       message: "Update reseller failed: " + err,
//       success: false,
//       data: null,
//     });
//   }
// };

// export const get_reseller = async (req, res) => {
//   try {
//     const id = req.params.id;
//     let reseller = await resellerModel.findById(id).exec();

//     return res.json({
//       message: "Find reseller success",
//       success: true,
//       data: reseller,
//     });
//   } catch (err) {
//     return res.json({
//       message: "Find reseller failed: " + err,
//       success: false,
//       data: null,
//     });
//   }
// };
