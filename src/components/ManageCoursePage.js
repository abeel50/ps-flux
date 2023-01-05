import React, { useState } from "react";
import { Prompt } from "react-router-dom";
import { toast } from 'react-toastify';

import CourseForm from "./CourseForm";

import * as courseApi from "../api/courseApi";


const ManageCoursePage = props => {
    const [errors, setErrors] = useState({});
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

    function formIsValid() {
        const _errors = {};
        if (!course.title) _errors.title = "Title is required";
        if (!course.authorId) _errors.authorId = "Author is required";
        if (!course.category) _errors.category = "Category is required";

        setErrors(_errors);
        // form is valid if error has no properties
        return Object.keys(_errors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        courseApi.saveCourse(course).then(() => {
            props.history.push("/courses");
            toast.success('course saved');
        });
    }




    return (
        <>
            <h2>Manage Course</h2>
            {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
            {/* {props.match.params.slug} */}
            <CourseForm
                course={course}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />

        </>
    )
}

export default ManageCoursePage;