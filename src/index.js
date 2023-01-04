import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router, // where are the routes are saved
  Routes, // where are route(s) is saved or the navigation links and objects are saved
  Route, // where http request points to a method
  Navigate, // if you want to navigate from one route to another or access another method into this route
  Link, // instead of an anchor tag which reloads the entire page this link does not reload the page but has the same properties
  Outlet, // shows the requires output the value is defined
useParams, // used to access items from HTTP requests
NavLink,  // direct link navigation to the method
useNavigate, // use to transfer the data to useLocation pointing to the parent function
useLocation  // use to receive the data from useNavigate 
} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
    <Route path= "/" element= {<Hello></Hello>}></Route>
    <Route path= "/myapps" element= {<Navigate replace to="/Learn"></Navigate>}></Route>
    <Route path= "/learn" element = {<Hello></Hello>}>
      <Route path = "courses" element = {<Courses/>}>
        <Route path = ":courseID" element = {<CourseID></CourseID>}></Route>
      </Route>
      <Route path = "bundles" element = {<Bundles/>}></Route>

    </Route>
    <Route path='/dashboard' element = {<DashBoard></DashBoard>}> </Route>
    </Routes>
  </Router>
);

function Hello(){
  return (
  <>
    <div>
    <Link className= "btn btn-success text-black" to="/learn/courses">Courses</Link>|
    <Link className= "btn btn-primary text-black" to="/learn/bundles">Bundle</Link>
    <Outlet></Outlet>
    </div>

  </>
  )
}
function Bundles(){
  return(
    <>
      <h1>This is the bundle list</h1>
      <h4>This is a bundle</h4>
    </>
  )
}

function Courses(){
  let courseList = ["React","Angular","Vue"]
  // console.log(courseList)
  // console.log(courseList.length)
  let randomItem = courseList[Math.floor(Math.random()*courseList.length)]
  // console.log(randomItem)

  return(
    <>
      <h1>This is the Courses list</h1>
      <h4>This is a Course</h4>

      <p>More test</p>
      <NavLink style={({isActive})=>{
        return{
          backgroundColor: isActive? "pink":"yellow"
        }
      }} to={`/learn/courses/${randomItem}`}>{randomItem}</NavLink>
      <NavLink className = "btn btn-danger" to={`/learn/courses/tests`}>tests</NavLink>
      <Outlet></Outlet>
    </>
  )
}

function CourseID(){
  const {courseID} = useParams()  
  const Navigate = useNavigate();
  return(
    <div>
      <h1>URL Params is : {courseID}</h1>
      <button
        onClick={() => {
          Navigate("/dashboard", { state: courseID });
        }}
        className="btn btn-warning"
      >
        Price
      </button>
      <Link to="/dashboard" state={"DJANGO"}>
        Test link
      </Link>
    </div>
  );
}

function DashBoard(){
  const location = useLocation();
  return (
    <div>
      <h1>Info that i got here is {location.state}</h1>
    </div>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
