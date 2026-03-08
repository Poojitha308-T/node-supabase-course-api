export const validateEnrollment = (req, res, next) => {
    const {student_name, course_id} = req.body;

    if(!student_name || !course_id){
        return res.status(400).json({
            error: "These student_name and course_id fields are required"
        });
    }
    next();
};
