import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StudentList />} />
                <Route path="/students/:id" element={<StudentDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
