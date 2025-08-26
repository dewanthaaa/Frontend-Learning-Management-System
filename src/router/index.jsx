import { createBrowserRouter, redirect } from "react-router-dom";
import ManagerHomePage from "../pages/Manager/home/index.jsx";
import SignInPage from "../pages/SignIn/index.jsx";
import SignUpPage from "../pages/SignUp/index.jsx";
import SuccessCheckoutPage from "../pages/SuccessCheckout/index.jsx";
import LayoutDashboard from "../components/layout.jsx";
import ManageCoursePage from "../pages/Manager/courses/index.jsx";
import ManageCreateCoursePage from "../pages/Manager/create-course/index.jsx";
import ManageCourseDetailPage from "../pages/Manager/course-detail/index.jsx";
import ManageContentCreatePage from "../pages/Manager/course-content-create/index.jsx";
import ManageCoursePreviewPage from "../pages/Manager/course-preview/index.jsx";
import ManageStudentPage from "../pages/Manager/students/index.jsx";
import ManageStudentCreatePage from "../pages/Manager/students-create/index.jsx";
import StudentPage from "../pages/Student/StudentOverview/index.jsx";
import secureLocalStorage from "react-secure-storage";
import {
  MANAGER_SESSION,
  STORAGE_KEY,
  STUDENT_SESSION,
} from "../utils/const.js";
import {
  getCategories,
  getCourseDetail,
  getCourses,
  getDetailContent,
  getStudentsCourse,
} from "../services/courseService.js";
import {
  getDetailStudents,
  getStudentCourses,
  getStudents,
} from "../services/studentService.js";
import StudentCourseList from "../pages/Manager/student-course/index.jsx";
import StudentForm from "../pages/Manager/student-course/student-form.jsx";
import { getOverviews } from "../services/overviewService.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ManagerHomePage />,
  },
  {
    path: "/manager/sign-in",
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (session && session.role === "manager") {
        throw redirect("/manager");
      }

      return true;
    },
    element: <SignInPage />,
  },
  {
    path: "/manager/sign-up",
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (session && session.role === "manager") {
        throw redirect("/manager");
      }

      return true;
    },
    element: <SignUpPage />,
  },
  {
    path: "/success-checkout",
    element: <SuccessCheckoutPage />,
  },
  {
    path: "/manager",
    id: MANAGER_SESSION,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (!session || session.role !== "manager") {
        throw redirect("/manager/sign-in");
      }

      return session;
    },
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        loader: async () => {
          const overviews = await getOverviews();

          return overviews?.data;
        },
        element: <ManagerHomePage />,
      },
      {
        path: "/manager/courses",
        loader: async () => {
          const data = await getCourses();

          return data;
        },
        element: <ManageCoursePage />,
      },
      {
        path: "/manager/courses/create",
        loader: async () => {
          const categories = await getCategories();

          return { categories, course: null };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: "/manager/courses/edit/:id",
        loader: async ({ params }) => {
          const categories = await getCategories();
          const course = await getCourseDetail(params.id);

          return { categories, course: course?.data };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: "/manager/courses/:id",
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id);

          return course?.data;
        },
        element: <ManageCourseDetailPage />,
      },
      {
        path: "/manager/courses/:id/create",
        element: <ManageContentCreatePage />,
      },
      {
        path: "/manager/courses/:id/edit/:contentId",
        loader: async ({ params }) => {
          const content = await getDetailContent(params.contentId);

          return content?.data;
        },
        element: <ManageContentCreatePage />,
      },
      {
        path: "/manager/courses/:id/preview",
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id, true);

          return course?.data;
        },
        element: <ManageCoursePreviewPage />,
      },
      {
        path: "/manager/students",
        loader: async () => {
          const student = await getStudents();

          return student?.data;
        },
        element: <ManageStudentPage />,
      },
      {
        path: "/manager/students/create",
        element: <ManageStudentCreatePage />,
      },
      {
        path: "/manager/students/edit/:id",
        loader: async ({ params }) => {
          const student = await getDetailStudents(params.id);

          return student?.data;
        },
        element: <ManageStudentCreatePage />,
      },
      {
        path: "/manager/courses/students/:id",
        loader: async ({ params }) => {
          const course = await getStudentsCourse(params.id);

          return course?.data;
        },
        element: <StudentCourseList />,
      },
      {
        path: "/manager/courses/students/:id/add",
        loader: async () => {
          const student = await getStudents();

          return student?.data;
        },
        element: <StudentForm />,
      },
    ],
  },
  {
    path: "/student",
    id: STUDENT_SESSION,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (!session || session.role !== "student") {
        throw redirect("/student/sign-in");
      }

      return session;
    },
    element: <LayoutDashboard isAdmin={false} />,
    children: [
      {
        index: true,
        loader: async () => {
          const courses = await getStudentCourses();

          return courses?.data;
        },
        element: <StudentPage />,
      },
      {
        path: "/student/detail-course/:id",
        element: <ManageCoursePreviewPage />,
      },
    ],
  },
  {
    path: "/student/sign-in",
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (session && session.role === "student") {
        throw redirect("/student");
      }

      return true;
    },
    element: <SignInPage type="student" />,
  },
]);

export default router;
