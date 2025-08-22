import { apiInstanceAuth } from "../utils/axios";

export const getStudents = async () =>
  apiInstanceAuth.get("/students").then((res) => res.data);

export const getDetailStudents = async (id) =>
  apiInstanceAuth.get(`/students/${id}`).then((res) => res.data);

export const createStudent = async (data) =>
  apiInstanceAuth
    .post("/students", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

// apiInstanceAuth
// .get(`/students/${id}${isPreview ? "?preview=true" : ""}`)
// .then((res) => res.data);
