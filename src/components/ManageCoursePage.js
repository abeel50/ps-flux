import React, { useState } from "react";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";

const ManageCoursePage = props => {
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""

    });

    function handleChange(event) {
        const updatedCourse = { ...course, [event.target.name]: event.target.value };
        setCourse(updatedCourse);
    }



    return (
        <>
            <h2>Manage Course</h2>
            {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
            {/* {props.match.params.slug} */}
            <CourseForm course={course} onChange={handleChange} />

        </>
    )
}

export default ManageCoursePage;