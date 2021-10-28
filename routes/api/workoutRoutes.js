// const logger = require("morgan");
const router = require('express').Router();
// const mongoose = require("mongoose");
const {Workout} = require('../../models')

// const db = require("./models");

router.get("/", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
                
              }
        }])
      .then(workouts => {
        res.json(workouts);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.post("/", ({body}, res) => {
    Workout.create(body)
      
      .then(exercises => {
        res.json(exercises);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.put("/:id", (req, res) => {
    Workout.findOneAndUpdate({_id:req.params.id},{$push:{exercises:req.body}})
      
      .then(exercises => {
        res.json(exercises);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.get("/range", (req, res) => {
    Workout.find({})
      .then(workouts => {
        res.json(workouts);
      })
      .catch(err => {
        res.json(err);
      });
  });

  module.exports = router;