import { apiInstanceAuth } from "../utils/axios";

export const getCourses = async () =>
  apiInstanceAuth.get("/courses").then((res) => res.data);
export const getCourseDetail = async (id) =>
  apiInstanceAuth.get(`/courses/${id}`).then((res) => res.data);
export const getCategories = async () =>
  apiInstanceAuth.get("/categories").then((res) => res.data);
export const createCourse = async (data) =>
  apiInstanceAuth
    .post("/courses", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
