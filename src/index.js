import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Login/Login';

import AdminApp from './Admin/Admin_App';
import AdminDashboard from './Admin/Dashboard';

import UserList from './Admin/UserList';
import AddUser from './Admin/users/addUser';
import EditUser from './Admin/users/editUser';

import SubjectList from './Admin/SubjectList';
import AddSubject from './Admin/subject/addSubject';
import EditSubject from './Admin/subject/editSubject';

import CourseSchedule from './Admin/CourseSchedule';
import AddCSchedule from './Admin/registCourse/addCSchedule';

import UserApp from './User/User_App';
import UserDashboard from './User/Dashboard';
import WorkLoad from './User/WorkLoad';
import TimeAttendance from './User/TimeAttendance';
import CalculateAttendance from './User/Calculate_Attendance';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminApp />}>
          <Route index element={<AdminDashboard />} />
          <Route path='dashboard' element={<AdminDashboard />} />

          <Route path='userlist' element={<UserList />} />
          <Route path='userlist/add' element={<AddUser />} />
          <Route path='userlist/edit/:id' element={<EditUser />} />

          <Route path='subjectlist' element={<SubjectList />} />
          <Route path='subjectlist/add' element={<AddSubject />} />
          <Route path='subjectlist/edit/:id' element={<EditSubject />} />

          <Route path='courseschedule' element={<CourseSchedule />} />
          <Route path='courseschedule/add' element={<AddCSchedule />} />
          {/* <Route path='courseschedule/edit/:id' element={<EditSubject />} /> */}

        </Route>

        <Route path="/user" element={<UserApp />}>
          <Route index element={<UserDashboard />} />
          <Route path='dashboard' element={<UserDashboard />} />

          <Route path='workload' element={<WorkLoad />} />
          <Route path='workload/add/:id' element={<TimeAttendance />} />
          <Route path='workload/calculate/:id' element={<CalculateAttendance />} />

        </Route>

      </Routes>
    </BrowserRouter>

    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
