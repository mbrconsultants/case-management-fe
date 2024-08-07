import React, { Fragment, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import { Context, ContextProvider } from "./context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NetworkCheck } from "@mui/icons-material";
import FileType from "./components/CustomPages/Users/FileType";

import CaseType from "./components/CustomPages/Users/CaseType";
import Parties from "./components/CustomPages/Users/Parties";
import LegalOfficerlist from "./components/CustomPages/Users/LegalOfficerlist";
import CourtRoster from "./components/CustomPages/Users/CourtRoster";
import TestRoster from "./components/CustomPages/Users/TestRoster";
import Courts from "./components/CustomPages/Courts/Courts";
import Divisions from "./components/CustomPages/Courts/Divisions";

const Switcherlayout = React.lazy(() => import("./components/switcherlayout"));

//App
const App = React.lazy(() => import("./components/app"));
const Custompages = React.lazy(() => import("./components/custompages"));

//Dashboard
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
//Widgets
const Widgets = React.lazy(() => import("./components/Widgets/Widgets"));
//Components
const CardDesign = React.lazy(() =>
  import("./components/Components/CardDesign/CardDesign")
);
const ContentScrollBar = React.lazy(() =>
  import("./components/Components/ContentScrollBar/ContentScrollBar")
);
const Counters = React.lazy(() =>
  import("./components/Components/Counters/Counters")
);
// const DefaultCalendar = React.lazy(()=>import("./components/Components/DefaultCalendar/DefaultCalendar"));
const DefaultChat = React.lazy(() =>
  import("./components/Components/DefaultChat/DefaultChat")
);
const FullCalendar = React.lazy(() =>
  import("./components/Components/FullCalendar/FullCalendar")
);
const Loader = React.lazy(() =>
  import("./components/Components/Loaders/Loaders")
);

const Notifications = React.lazy(() =>
  import("./components/Components/Notifications/Notifications")
);
const RangeSlider = React.lazy(() =>
  import("./components/Components/RangeSlider/RangeSlider")
);
const Rating = React.lazy(() =>
  import("./components/Components/Rating/Rating")
);
const SweetAlerts = React.lazy(() =>
  import("./components/Components/SweetAlerts/SweetAlerts")
);
const Timeline = React.lazy(() =>
  import("./components/Components/Timeline/Timeline")
);
const Treeview = React.lazy(() =>
  import("./components/Components/Treeview/Treeview")
);
//Elements
const Alerts = React.lazy(() => import("./components/Elements/Alerts/Alerts"));
const AvatarRounded = React.lazy(() =>
  import("./components/Elements/AvatarRounded/AvatarRounded")
);
const AvatarSquares = React.lazy(() =>
  import("./components/Elements/AvatarSquares/AvatarSquares")
);
const AvatarRadius = React.lazy(() =>
  import("./components/Elements/AvatarRadius/AvatarRadius")
);
const Badges = React.lazy(() => import("./components/Elements/Badges/Badges"));
const Buttons = React.lazy(() =>
  import("./components/Elements/Buttons/Buttons")
);
const Breadcrumbs = React.lazy(() =>
  import("./components/Elements/Breadcrumbs/Breadcrumbs")
);
const Colors = React.lazy(() => import("./components/Elements/Colors/Colors"));
const DropDowns = React.lazy(() =>
  import("./components/Elements/DropDowns/DropDowns")
);
const List = React.lazy(() => import("./components/Elements/List/List"));
const Navigation = React.lazy(() =>
  import("./components/Elements/Navigation/Navigation")
);
const Paginations = React.lazy(() =>
  import("./components/Elements/Paginations/Paginations")
);
const Panels = React.lazy(() => import("./components/Elements/Panels/Panels"));
const Tags = React.lazy(() => import("./components/Elements/Tags/Tags"));
const Thumbnails = React.lazy(() =>
  import("./components/Elements/Thumbnails/Thumbnails")
);
const Typography = React.lazy(() =>
  import("./components/Elements/Typography/Typography")
);
//Advanced-Elements
const Mediaobject = React.lazy(() =>
  import("./components/Advanced-Elements/Mediaobject/Mediaobject")
);
const Accordions = React.lazy(() =>
  import("./components/Advanced-Elements/Accordion/Accordions")
);
const Carousels = React.lazy(() =>
  import("./components/Advanced-Elements/Carousel/Carousels")
);
const Charts = React.lazy(() =>
  import("./components/Advanced-Elements/Charts/Charts")
);
const Cryptocurrencies = React.lazy(() =>
  import("./components/Advanced-Elements/Crypto-currencies/Crypto-currencies")
);
const Footer = React.lazy(() =>
  import("./components/Advanced-Elements/Footers/Footers")
);
const Header = React.lazy(() =>
  import("./components/Advanced-Elements/Headers/Headers")
);
const Modal = React.lazy(() =>
  import("./components/Advanced-Elements/Modal/Modal")
);
const Progress = React.lazy(() =>
  import("./components/Advanced-Elements/Progress/Progress")
);
const Search = React.lazy(() =>
  import("./components/Advanced-Elements/Search/Search")
);
const Tabs = React.lazy(() =>
  import("./components/Advanced-Elements/Tabs/Tabs")
);
const UserList = React.lazy(() =>
  import("./components/Advanced-Elements/UserList/UserList")
);
const TooltipandPopover = React.lazy(() =>
  import("./components/Advanced-Elements/TooltipandPopover/TooltipandPopover")
);
//Charts
const ChartJs = React.lazy(() => import("./components/Charts/ChartJs/ChartJs"));
const PieCharts = React.lazy(() =>
  import("./components/Charts/PieCharts/PieCharts")
);
const Echarts = React.lazy(() => import("./components/Charts/Echarts/Echarts"));
const Nvd3charts = React.lazy(() =>
  import("./components/Charts/Nvd3Charts/Nvd3charts")
);
//Table
const DefaultTables = React.lazy(() =>
  import("./components/Table/DefaultTables/DefaultTables")
);
const DataTables = React.lazy(() =>
  import("./components/Table/DataTables/DataTables")
);
//Form
const RegisterationForm = React.lazy(() =>
  import("./components/Form/FormElements/RegisterationForm")
);
const InsuranceForm = React.lazy(() =>
  import("./components/Form/FormElements/InsuranceForm")
);
const Drivers = React.lazy(() =>
  import("./components/Form/FormElements/Drivers")
);
const Coupon = React.lazy(() =>
  import("./components/Form/FormElements/Coupon")
);
const FillingStation = React.lazy(() =>
  import("./components/Form/FormElements/FillingStation")
);

const FormAdvanced = React.lazy(() =>
  import("./components/Form/FormAdvanced/FormAdvanced")
);
const FormEditor = React.lazy(() =>
  import("./components/Form/FormEditor/FormEditor")
);
const FormValidation = React.lazy(() =>
  import("./components/Form/FormValidation/FormValidation")
);
const FormWizard = React.lazy(() =>
  import("./components/Form/FormWizard/FormWizard")
);
//Icons
const FontAwesome = React.lazy(() =>
  import("./components/Icons/FontAwesomes/FontAwesomes")
);
const MaterialDesignIcons = React.lazy(() =>
  import("./components/Icons/MaterialDesignIcons/MaterialDesignIcons")
);
const SimpleLineIcons = React.lazy(() =>
  import("./components/Icons/SimplelineIcons/SimplelineIcons")
);
const FeatherIcons = React.lazy(() =>
  import("./components/Icons/FeatherIcons/FeatherIcons")
);
const IonicIcons = React.lazy(() =>
  import("./components/Icons/IonicIcons/IonicIcons")
);
const FlagIcons = React.lazy(() =>
  import("./components/Icons/FlagsIcons/FlagsIcons")
);
const Pe7Icons = React.lazy(() =>
  import("./components/Icons/Pe7Icons/Pe7Icons")
);
const ThemifyIcons = React.lazy(() =>
  import("./components/Icons/ThemifyIcons/ThemifyIcons")
);
const TypiconsIcons = React.lazy(() =>
  import("./components/Icons/TypiconsIcons/TypiconsIcons")
);
const WeatherIcons = React.lazy(() =>
  import("./components/Icons/WeatherIcons/WeatherIcons")
);
//pages
const Profile = React.lazy(() => import("./components/pages/Profile/Profile"));

const EditProfile = React.lazy(() =>
  import("./components/pages/EditProfile/EditProfile")
);
const MailInbox = React.lazy(() =>
  import("./components/pages/MailInbox/MailInbox")
);
const MailCompose = React.lazy(() =>
  import("./components/pages/MailCompose/MailCompose")
);
const Gallery = React.lazy(() => import("./components/pages/Gallery/Gallery"));
const AboutCompany = React.lazy(() =>
  import("./components/pages/AboutCompany/AboutCompany")
);
const Services = React.lazy(() =>
  import("./components/pages/Services/Services")
);
const FAQS = React.lazy(() => import("./components/pages/FAQS/FAQS"));
const Terms = React.lazy(() => import("./components/pages/Terms/Terms"));
const Invoice = React.lazy(() => import("./components/pages/Invoice/Invoice"));
const PricingTables = React.lazy(() =>
  import("./components/pages/PricingTables/PricingTables")
);
const Empty = React.lazy(() => import("./components/pages/Empty/Empty"));
const UnderConstruction = React.lazy(() =>
  import("./components/pages/UnderConstruction/UnderConstruction")
);
//Blog
const Blog = React.lazy(() => import("./components/pages/Blog/Blog/Blog"));
const BlogDetails = React.lazy(() =>
  import("./components/pages/Blog/BlogDetails/BlogDetails")
);
const BlogPost = React.lazy(() =>
  import("./components/pages/Blog/BlogPost/BlogPost")
);
//Maps
const LeafletMaps = React.lazy(() =>
  import("./components/Maps/LeafletMaps/LeafletMaps")
);
const VectorMaps = React.lazy(() =>
  import("./components/Maps/VectorMaps/VectorMaps")
);
//E-Commerce
const Shop = React.lazy(() =>
  import("./components/pages/E-Commerce/Shop/Shop")
);
const Checkout = React.lazy(() =>
  import("./components/pages/E-Commerce/Checkout/Checkout")
);
const ProductDetails = React.lazy(() =>
  import("./components/pages/E-Commerce/ProductDetails/ProductDetails")
);
const ShoppingCarts = React.lazy(() =>
  import("./components/pages/E-Commerce/ShoppingCarts/ShoppingCarts")
);
const Wishlist = React.lazy(() =>
  import("./components/pages/E-Commerce/Wishlist/Wishlist")
);
//FileManger
const FileManager = React.lazy(() =>
  import("./components/pages/FileManager/FileManager/FileManager")
);
const FileAttachments = React.lazy(() =>
  import("./components/pages/FileManager/FileAttachments/FileAttachments")
);
const FileDetails = React.lazy(() =>
  import("./components/pages/FileManager/FileDetails/FileDetails")
);
const FileManagerList = React.lazy(() =>
  import("./components/pages/FileManager/FileManagerList/FileManagerList")
);

//custom Pages
const Login = React.lazy(() => import("./components/CustomPages/Login/Login"));
const Register = React.lazy(() =>
  import("./components/CustomPages/Register/Register")
);
const ForgotPassword = React.lazy(() =>
  import("./components/CustomPages/ForgotPassword/ForgotPassword")
);
const ForgotRequest = React.lazy(() =>
  import("./components/CustomPages/ForgotPassword/ForgotRequest")
);
const PasswordReset = React.lazy(() =>
  import("./components/CustomPages/ForgotPassword/PasswordReset")
);

const CreateModule = React.lazy(() =>
  import("./components/CustomPages/Module/CreateModule")
);
const CreateRole = React.lazy(() =>
  import("./components/CustomPages/Module/CreateRole")
);
// const CreateCadre = React.lazy(() =>
//   import("./components/CustomPages/Cadre/CreateCadre")
// );

const AssignUserToRole = React.lazy(() =>
  import("./components/CustomPages/Module/AssignUserToRole")
);
const AssignModuleToRole = React.lazy(() =>
  import("./components/CustomPages/Module/AssignModuleToRole")
);
const CreateSubmodule = React.lazy(() =>
  import("./components/CustomPages/Module/CreateSubmodule")
);
const CreateStatus = React.lazy(() =>
  import("./components/CustomPages/Setting/CreateStatus")
);
const CreateOperation = React.lazy(() =>
  import("./components/CustomPages/Setting/CreateOperation")
);

const CreateUserType = React.lazy(() =>
  import("./components/CustomPages/Setting/CreateUserType")
);
const CreateRoleFunction = React.lazy(() =>
  import("./components/CustomPages/Setting/CreateRoleFunction")
);

const LockScreen = React.lazy(() =>
  import("./components/CustomPages/LockScreen/LockScreen")
);

//hr custom pages
const CreateUser = React.lazy(() =>
  import("./components/CustomPages/Auth/CreateUser")
);
const NewUser = React.lazy(() =>
  import("./components/CustomPages/Users/NewUser")
);

const NewLegalOfficer = React.lazy(() =>
  import("./components/CustomPages/Users/NewLegalOfficer")
);
const CreateRoster = React.lazy(() =>
  import("./components/CustomPages/Users/CreateRoster")
);
const CaseAssignmentHistory = React.lazy(() =>
  import("./components/CustomPages/Cases/CaseAssignmentHistory")
);

const NewCase = React.lazy(() =>
  import("./components/CustomPages/Cases/NewCase")
);
const EditCase = React.lazy(() =>
  import("./components/CustomPages/Cases/EditCase")
);
const CaseReport = React.lazy(() =>
  import("./components/CustomPages/Cases/CaseReport")
);
const CaseList = React.lazy(() =>
  import("./components/CustomPages/Cases/CaseList")
);
const ClosedCaseList = React.lazy(() =>
  import("./components/CustomPages/Cases/ClosedCaseList")
);
const SingleCase = React.lazy(() =>
  import("./components/CustomPages/Cases/SingleCase")
);
const SingleCaseReports = React.lazy(() =>
  import("./components/CustomPages/Cases/SingleCaseReports")
);
const SingleClosedCase = React.lazy(() =>
  import("./components/CustomPages/Cases/SingleClosedCase")
);
const ReopenCase = React.lazy(() =>
  import("./components/CustomPages/Cases/ReopenCase")
);
const CaseComment = React.lazy(() =>
  import("./components/CustomPages/Cases/CaseComment")
);
const SingleUser = React.lazy(() =>
  import("./components/CustomPages/Users/SingleUser")
);
const SingleLegalOfficer = React.lazy(() =>
  import("./components/CustomPages/Users/SingleLegalOfficer")
);
const LegalOfficerList = React.lazy(() =>
  import("./components/CustomPages/Users/LegalOfficerlist")
);

const NewChamber = React.lazy(() =>
  import("./components/CustomPages/Users/NewChamber")
);
const EditChamber = React.lazy(() =>
  import("./components/CustomPages/Users/EditChamber")
);
const ChamberList = React.lazy(() =>
  import("./components/CustomPages/Users/ChamberList")
);
// const Courts = React.lazy(() =>
//   import("./components/CustomPages/Court/Courts")
// );
// const Divisions = React.lazy(() =>
//   import("./components/CustomPages/Court/Divisions")
// );
const SingleChamber = React.lazy(() =>
  import("./components/CustomPages/Users/SingleChamber")
);
const Users = React.lazy(() =>
  import("./components/CustomPages/Users/AllUsers")
);
const UserProfile = React.lazy(() =>
  import("./components/CustomPages/Auth/UserProfile")
);
const AllUsers = React.lazy(() =>
  import("./components/CustomPages/Auth/AllUsers")
);

//Errorpages
const Errorpage400 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/400/400")
);
const Errorpage401 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/401/401")
);
const Errorpage403 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/403/403")
);
const Errorpage500 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/500/500")
);
const Errorpage503 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/503/503")
);

const Private = ({ children }) => {
  // const { user } = useContext(Context)
  // const authed = isauth() // isauth() returns true or false based on localStorage
  //  let redirectPath=`${process.env.PUBLIC_URL}/login`
  //   if (!user) {
  //     return <Navigate to={redirectPath} replace />;
  //   }

  return children;

  //  return user ? Component : <Navigate to={`${process.env.PUBLIC_URL}/login`}   />
  // return auth ? children  : <Navigate to="/login"   />;
};

const Loaderimg = () => {
  return (
    <div id="global-loader">
      <img
        src={require("./assets/images/loader.svg").default}
        className="loader-img"
        alt="Loader"
      />
    </div>
  );
};

const Root = () => {
  const { user } = useContext(Context);
  let redirectPath = `${process.env.PUBLIC_URL}/login`;
  // console.log(user)

  return (
    <Fragment>
      <ContextProvider>
        <BrowserRouter>
          <React.Suspense fallback={Loaderimg()}>
            {/* <AuthProvider> */}
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <Routes>
              <Route path="/login" element={<Login />} />

              <Route
                path={`${process.env.PUBLIC_URL}/`}
                element={
                  user ? (
                    <App />
                  ) : (
                    <Navigate to={`${process.env.PUBLIC_URL}/login`} />
                  )
                }
              >
                <Route index element={<Dashboard />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/dashboard`}
                  element={
                    // user ?
                    <Dashboard />
                    // :  <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                  }
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/widgets`}
                  element={<Widgets />}
                />
                <Route>
                  {/* hr links */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/create-user`}
                    element={
                      // user ?
                      <CreateUser />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/new-user`}
                    element={
                      // user ?
                      <NewUser />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/new-legal-officer`}
                    element={<NewLegalOfficer />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/new-case`}
                    element={<NewCase />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/edit-case/:id`}
                    element={<EditCase />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/reopen-case/:id`}
                    element={<ReopenCase />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/file-type`}
                    element={
                      // user ?
                      <FileType />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/case-report`}
                    element={
                      // user ?
                      <CaseReport />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/case-assignment-history`}
                    element={
                      // user ?
                      <CaseAssignmentHistory />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/case-type`}
                    element={
                      // user ?
                      <CaseType />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/create-roster`}
                    element={
                      // user ?
                      <CreateRoster />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/court-roster`}
                    element={
                      // user ?
                      <CourtRoster />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/test-roster`}
                    element={
                      // user ?
                      <TestRoster />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/parties`}
                    element={<Parties />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/cases`}
                    element={<CaseList />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/closed-cases`}
                    element={<ClosedCaseList />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/case/:id`}
                    element={<SingleCase />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/case-reports/:id`}
                    element={<SingleCaseReports />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/closed-case/:id`}
                    element={<SingleClosedCase />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/comments/:id`}
                    element={<CaseComment />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/user/:id`}
                    element={<SingleUser />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/single-legal-officer/:id`}
                    element={<SingleLegalOfficer />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/single-chamber/:id`}
                    element={<SingleChamber />}
                  />
                  {/* <Route
                    path={`${process.env.PUBLIC_URL}/edit/case/:id`}
                    element={<NewCase />}
                  /> */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/new-legal-officer/:id`}
                    element={<NewLegalOfficer />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/legal-officer-list`}
                    element={
                      // user ?
                      <LegalOfficerlist />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/new-chamber`}
                    element={
                      // user ?
                      <NewChamber />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/new-chamber/:id`}
                    element={
                      // user ?
                      <NewChamber />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/edit-chamber/:id`}
                    element={
                      // user ?
                      <EditChamber />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/chamber-list`}
                    element={
                      // user ?
                      <ChamberList />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/courts`}
                    element={
                      // user ?
                      <Courts />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/division`}
                    element={
                      // user ?
                      <Divisions />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/all-users`}
                    element={
                      // user ?
                      <Users />
                      // :
                      // <Navigate to={`${process.env.PUBLIC_URL}/login`}/>
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/users`}
                    element={<AllUsers />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/userprofile/:id`}
                    element={<UserProfile />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/assign-module-to-role`}
                    element={<AssignModuleToRole />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/submodule-list`}
                    element={<CreateSubmodule />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/role`}
                    element={<CreateRole />}
                  />
                  {/* <Route
                    path={`${process.env.PUBLIC_URL}/cadre`}
                    element={<CreateCadre />}
                  /> */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/module-list`}
                    element={<CreateModule />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/staff-status`}
                    element={<CreateStatus />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/operation-setup`}
                    element={<CreateOperation />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/usertype-setup`}
                    element={<CreateUserType />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/rolefunction-setup`}
                    element={<CreateRoleFunction />}
                  />
                  {/* end hr links */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/cardsDesign`}
                    element={
                      user ? <CardDesign /> : <Navigate to={redirectPath} />
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/form/driver`}
                    element={
                      user ? (
                        <Drivers />
                      ) : (
                        <Navigate to={`${process.env.PUBLIC_URL}/login`} />
                      )
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/form/filling-station`}
                    element={
                      user ? <FillingStation /> : <Navigate to={redirectPath} />
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/form/coupon`}
                    element={user ? <Coupon /> : <Navigate to={redirectPath} />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/form/insurance`}
                    element={
                      user ? <InsuranceForm /> : <Navigate to={redirectPath} />
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/fullCalendar`}
                    element={
                      user ? <FullCalendar /> : <Navigate to={redirectPath} />
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/defaultChat`}
                    element={
                      user ? <DefaultChat /> : <Navigate to={redirectPath} />
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/notifications`}
                    element={
                      user ? <Notifications /> : <Navigate to={redirectPath} />
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/sweetAlerts`}
                    element={
                      user ? <SweetAlerts /> : <Navigate to={redirectPath} />
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/rangeSlider`}
                    element={
                      user ? <RangeSlider /> : <Navigate to={redirectPath} />
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/contentScrollBar`}
                    element={
                      user ? (
                        <ContentScrollBar />
                      ) : (
                        <Navigate to={redirectPath} />
                      )
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/loader`}
                    element={user ? <Loader /> : <Navigate to={redirectPath} />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/counters`}
                    element={
                      user ? <Counters /> : <Navigate to={redirectPath} />
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/rating`}
                    element={user ? <Rating /> : <Navigate to={redirectPath} />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/timeline`}
                    element={
                      user ? <Timeline /> : <Navigate to={redirectPath} />
                    }
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/components/treeview`}
                    element={
                      user ? <Treeview /> : <Navigate to={redirectPath} />
                    }
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/alerts`}
                    element={user ? <Alerts /> : <Navigate to={redirectPath} />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/buttons`}
                    element={
                      user ? <Buttons /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/colors`}
                    element={user ? <Colors /> : <Navigate to={redirectPath} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/avatarSquares`}
                    element={
                      user ? <AvatarSquares /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/avatarRounded`}
                    element={
                      user ? <AvatarRounded /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/avatarRadius`}
                    element={
                      user ? <AvatarRadius /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/dropDowns`}
                    element={
                      user ? <DropDowns /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/list`}
                    element={user ? <List /> : <Navigate to={redirectPath} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/tags`}
                    element={user ? <Tags /> : <Navigate to={redirectPath} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/paginations`}
                    element={
                      user ? <Paginations /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/navigation`}
                    element={
                      user ? <Navigation /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/typography`}
                    element={
                      user ? <Typography /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/breadcrumbs`}
                    element={
                      user ? <Breadcrumbs /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/badges`}
                    element={<Badges />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/panels`}
                    element={<Panels />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/thumbnails`}
                    element={<Thumbnails />}
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/mediaObject`}
                    element={<Mediaobject />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/accordions`}
                    element={<Accordions />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/tabs`}
                    element={<Tabs />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/charts`}
                    element={<Charts />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/modal`}
                    element={<Modal />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/tooltipandPopover`}
                    element={<TooltipandPopover />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/progress`}
                    element={<Progress />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/carousels`}
                    element={<Carousels />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/headers`}
                    element={<Header />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/footers`}
                    element={<Footer />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/userList`}
                    element={
                      user ? <UserList /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/search`}
                    element={user ? <Search /> : <Navigate to={redirectPath} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/cryptoCurrencies`}
                    element={<Cryptocurrencies />}
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/charts/chartJs`}
                    element={<ChartJs />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/charts/echarts`}
                    element={<Echarts />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/charts/nvd3charts`}
                    element={<Nvd3charts />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/charts/PieCharts`}
                    element={<PieCharts />}
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/tables/defaultTables`}
                    element={<DefaultTables />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/tables/dataTables`}
                    element={<DataTables />}
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/form/add-vehicle`}
                    element={
                      user ? (
                        <RegisterationForm />
                      ) : (
                        <Navigate to={redirectPath} />
                      )
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/form/formAdvanced`}
                    element={
                      user ? <FormAdvanced /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/form/formEditor`}
                    element={<Private Component={FormEditor} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/form/formWizard`}
                    element={
                      user ? <FormWizard /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/form/formValidation`}
                    element={
                      user ? <FormValidation /> : <Navigate to={redirectPath} />
                    }
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/fontAwesome`}
                    element={
                      user ? <FontAwesome /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/materialDesignIcons`}
                    element={
                      user ? (
                        <MaterialDesignIcons />
                      ) : (
                        <Navigate to={redirectPath} />
                      )
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/simpleLineIcons`}
                    element={
                      user ? (
                        <SimpleLineIcons />
                      ) : (
                        <Navigate to={redirectPath} />
                      )
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/featherIcons`}
                    element={
                      user ? <FeatherIcons /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/ionicIcons`}
                    element={<IonicIcons />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/flagIcons`}
                    element={<FlagIcons />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/pe7Icons`}
                    element={<Private Component={Pe7Icons} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/themifyIcons`}
                    element={<ThemifyIcons />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/typiconsIcons`}
                    element={<TypiconsIcons />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/weatherIcons`}
                    element={<WeatherIcons />}
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/profile`}
                    element={
                      user ? <Profile /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/editProfile`}
                    element={
                      user ? <EditProfile /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/mailInbox`}
                    element={<Private Component={MailInbox} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/mailCompose`}
                    element={<Private Component={MailCompose} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/gallery`}
                    element={<Private Component={Gallery} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/aboutCompany`}
                    element={
                      user ? <AboutCompany /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/services`}
                    element={
                      user ? <Services /> : <Navigate to={redirectPath} />
                    }
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/faqs`}
                    element={<FAQS />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/terms`}
                    element={<Terms />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/invoice`}
                    element={<Invoice />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/pricingTables`}
                    element={<PricingTables />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/Blog/blog`}
                    element={<Blog />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/Blog/blogDetails`}
                    element={<BlogDetails />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/Blog/blogPost`}
                    element={<BlogPost />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/empty`}
                    element={<Empty />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/maps/leafletMaps`}
                    element={<Private Component={LeafletMaps} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/maps/vectorMaps`}
                    element={<Private Component={VectorMaps} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/e-commerce/shop`}
                    element={<Shop />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/e-commerce/productDetails`}
                    element={<ProductDetails />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/e-commerce/shoppingCart`}
                    element={<ShoppingCarts />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/e-commerce/wishlist`}
                    element={<Wishlist />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/e-commerce/checkout`}
                    element={<Private Component={Checkout} />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/FileManager/FileAttachments/FileAttachments`}
                    element={<Private Component={FileAttachments} />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/FileManager/FileDetails/FileDetails`}
                    element={<Private Component={FileDetails} />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/FileManagerFileManager/FileManager`}
                    element={<FileManager />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/FileManager/FileManagerList/FileManagerList`}
                    element={<FileManagerList />}
                  />
                </Route>
              </Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/themeStyle`}
                element={<Switcherlayout />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/`}
                element={<Custompages />}
              >
                <Route
                  path={`${process.env.PUBLIC_URL}/pages/underConstruction`}
                  element={
                    user ? (
                      <UnderConstruction />
                    ) : (
                      <Navigate to={redirectPath} />
                    )
                  }
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/login`}
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <Navigate to={`${process.env.PUBLIC_URL}/landing`} />
                    )
                  }
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/register`}
                  element={<Register />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/forgotPassword`}
                  element={<ForgotPassword />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/forgot-password-request-success`}
                  element={<ForgotRequest />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/reset-password/:id`}
                  element={<PasswordReset />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/custompages/lockScreen`}
                  element={<LockScreen />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage401`}
                  element={<Errorpage401 />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage403`}
                  element={<Errorpage403 />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage500`}
                  element={<Errorpage500 />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage503`}
                  element={<Errorpage503 />}
                />
                <Route path="*" element={<Errorpage400 />} />
              </Route>
            </Routes>

            {/* </AuthProvider> */}
          </React.Suspense>
        </BrowserRouter>
      </ContextProvider>
    </Fragment>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
