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
import StudentPage from "../pages/Student/StudentOverview/index.jsx";
import secureLocalStorage from "react-secure-storage";
import { MANAGER_SESSION, STORAGE_KEY } from "../utils/const.js";
import {
  getCategories,
  getCourseDetail,
  getCourses,
} from "../services/courseService.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ManagerHomePage />,
  },
  {
    path: "/manager/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/manager/sign-up",
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
        element: <ManagerHomePage />,
      },
      {
        path: "/manager/courses",
        loader: async () => {
          const data = await getCourses();

          console.log(data);

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

          return { categories, course };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: "/manager/courses/:id",
        element: <ManageCourseDetailPage />,
      },
      {
        path: "/manager/courses/:id/create",
        element: <ManageContentCreatePage />,
      },
      {
        path: "/manager/courses/:id/preview",
        element: <ManageCoursePreviewPage />,
      },
      {
        path: "/manager/students",
        element: <ManageStudentPage />,
      },
    ],
  },
  {
    path: "/student",
    element: <LayoutDashboard isAdmin={false} />,
    children: [
      {
        index: true,
        element: <StudentPage />,
      },
      {
        path: "/student/detail-course/:id",
        element: <ManageCoursePreviewPage />,
      },
    ],
  },
]);

export default router;
