import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

import CourseForm from "./CourseForm";

import courseStore from "../stores/courseStore";
import * as courseActions from '../actions/courseActions';


const ManageCoursePage = props => {
    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState(courseStore.getCourses());
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""

    });

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        const slug = props.match.params.slug; // from the path `/courses/:slug`
        if (courses.length === 0) {
            courseActions.loadCourses();
        }
        else if (slug) {
            setCourse(courseStore.getCourseBySlug(slug))
        }
        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length, props.match.params.slug]);

    function onChange() {
        setCourses(courseStore.getCourses());
    }

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
        courseActions.saveCourse(course).then(() => {
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