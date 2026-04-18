const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

// POST /api/events - Create a new event
router.post("/", async (req, res) => {
  try {
    const { title, description, date, location, distance, bannerImage } =
      req.body;

    // Validation
    if (!title || !description || !date || !location || distance === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      distance,
      bannerImage,
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: savedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message,
    });
  }
});

// GET /api/events - Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message,
    });
  }
});

// GET /api/events/:id - Get single event
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching event",
      error: error.message,
    });
  }
});

module.exports = router;
