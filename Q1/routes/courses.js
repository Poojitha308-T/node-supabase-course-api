import express from "express";
import supabase from "./../supabaseClient.js";
import { validateEnrollment } from "./../middleware/validateEnrollment.js";
const router = express.Router();



//get all courses

router.get("/courses", async (req, res) => {
  try {
    const { data, error } = await supabase.from("courses").select("*");

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// enroll student

router.post("/enroll", validateEnrollment, async (req, res) => {
  try {
    const { student_name, course_id } = req.body;
    const { data, error } = await supabase
      .from("enrollments")
      .insert([{ student_name, course_id }])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get enrollments for a course

router.get("/courses/:id/enrollments", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("enrollments")
      .select("student_name , course_id")
      .eq("course_id", id);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
