import { createBrowserRouter } from "react-router-dom";
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
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: <ManagerHomePage />,
      },
      {
        path: "/manager/courses",
        element: <ManageCoursePage />,
      },
      {
        path: "/manager/courses/create",
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
