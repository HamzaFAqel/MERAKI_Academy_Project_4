const lecture = require("../models/lecture");
const lectureModel = require("../models/lecture");

const creatLecture = (req, res) => {
  const { title, video, image, price, grade, Teacher } = req.body;
  const comment=[]
  const newLecture = new lectureModel({
    title,
    video,
    image,
    price,
    grade,
    Teacher,
    comment
  });
  newLecture
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "lecture created",
        lecture: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

const getLectureByTeacher = (req, res) => {
  const teacherId = req.params.teacher;
  console.log("teacherId", teacherId);
  lectureModel
    .find({
      Teacher: teacherId,
    }).populate(["comment",{path:"Teacher" , select :["firstName","lastName"]}])
    .then((lectures) => {
      console.log(lectures);
      {
        lectures.length
          ? res.status(200).json({
              success: true,

              message: `All the lectures for the teacher : ${teacherId}`,

              lectures: lectures,
            })
          : res.status(404).json({
              success: false,
              message: `The teacher => ${teacherId} has no lectures`,
            });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,

        message: "Server Error",

        err: err.message,
      });
    });
};

const updateLectureById = (req, res) => {
  const { title, video, image, price, grade } = req.body;
  const { id } = req.params;
  lectureModel
    .findByIdAndUpdate(
      { _id: id },
      { title, video, image, price, grade },
      { new: true }
    )
    .then((result) => {
       res.status(200).json({
              success: true,
              message: "lecture updated",
              lecture: result,
            })
          
      }
    )
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err.message,
      });
    });
};
const deletelectureById = (req, res) => {
  
  const { id } = req.params;
  lectureModel
    .findByIdAndDelete({ _id: id })
    .then((result) => {
      {
        result
          ? res.status(200).json({ success: true, message: "lecture deleted " })
          : res.status(404).json({
              success: false,
              message: "lecture not found ",
            });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error ",
        err: err.message,
      });
    });
};

const getLectureById = (req, res) => {
  
  console.log('req.query', req.query)
  const { id } = req.query;
  lectureModel
    .findOne({ _id: id })
    .populate("Teacher","firstName -_id")
    .then((result) => {
      {
        result
          ? res.status(200).json({ success: true, lecture: result })
          : res
              .status(404)
              .json({ seccess: false, message: "lecture not found" });
      }
    }).catch((err)=>{
      res.status(500).json({
        seccess:false,
        message:"server error",
        err : err.message
      })
    })
};



const getLectureByTitle = (req, res) => {
  
  const { title } = req.params;
  lectureModel
    .find({ title: title })
    .populate("Teacher","firstName -_id")
    .then((result) => {
      {
        result.length
          ? res.status(200).json({ success: true, lecture: result })
          : res
              .status(404)
              .json({ seccess: false, message: "lecture not found" });
      }
    }).catch((err)=>{
      res.status(500).json({
        seccess:false,
        message:"server error",
        err : err.message
      })
    })
};


const deleteLectureByTeacher = (req, res) => {
  const teacherId = req.params.teacher;
  lectureModel
    .deleteMany({
      Teacher: teacherId,
    })
    .then((result) => {
      {result.deletedCount?res.status(200).json({
        success: true,
      message: `Deleted lecture for the teacher ${teacherId} `
      }):res.status(404).json({
        success: false,
        message: `not found lecture  for the teacher => ${teacherId} `
      })}
     
    })
    .catch((err) => {
      res.status(500).json({
        success: false,

        message: "Server Error",

        err: err.message,
      });
    });
};


const getLectureByGrade = (req, res) => {
  
  const { grade } = req.params;
  lectureModel
    .find({ grade: grade })
    .populate("Teacher","firstName -_id")
    .then((result) => {
      {
        result.length
          ? res.status(200).json({ success: true, lecture: result })
          : res
              .status(404)
              .json({ seccess: false, message: "lecture not found for this grade" });
      }
    }).catch((err)=>{
      res.status(500).json({
        seccess:false,
        message:"server error",
        err : err.message
      })
    })
};


const getFreeLecture=(req,res) =>{
  lectureModel.find({price:0}).then((result)=>{
    res.status(200).json({
      success:true,
      message:"free lecture",
      freeLecture: result
    })
  }).catch((err)=>{
    res.status(500).json({
      success:false,
      message:"server error",
      err :err.message
    })
  })
}
module.exports = {
  creatLecture,
  getLectureByTeacher,
  updateLectureById,
  deletelectureById,
  getLectureById,
  getLectureByTitle,
  deleteLectureByTeacher,
  getLectureByGrade,
  getFreeLecture
};
