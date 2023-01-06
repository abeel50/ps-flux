import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import courseStore from "../stores/courseStore";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import CourseList from "./CourseList";
import { toast } from 'react-toastify';


function CoursesPage() {

    const [courses, setCourses] = useState(courseStore.getCourses());

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        if (courseStore.getCourses().length === 0) loadCourses();
        return () => courseStore.removeChangeListener(onChange); // clean up on unmount
    }, [courses.length]);

    function onChange() {
        setCourses(courseStore.getCourses());
    }

    return (
        <>
            <h2>Courses</h2>
            <Link className="btn btn-primary" to="/course">
                Add Course
            </Link>
            <CourseList courses={courses} deleteCourse={deleteCourse} />
        </>
    );
}



export default CoursesPage;