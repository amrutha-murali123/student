import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/StudentList.css";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const StudentList = () => {
  const [students, setStudents] = useState({ results: [], count: 0, next: null, previous: null });
  const [nameFilter, setNameFilter] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 2; // Update this if your page size is different

  const fetchStudents = async (url) => {
    try {
      const response = await axios.get(url);
      setStudents(response.data);
    } catch (error) {
      console.error("There was an error fetching the students!", error);
    }
  };

  useEffect(() => {
    const url = `/api/students/?page=${page}${nameFilter ? `&name=${nameFilter}` : ""}`;
    fetchStudents(url);
  }, [nameFilter, page]);

  const handlePagination = (pageNum) => {
    if (pageNum >= 1 && pageNum <= Math.ceil(students.count / pageSize)) {
      setPage(pageNum);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="Search by name"
          className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          <Link to="/students/new">Add New Student</Link>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Date of Birth</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {students.results.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-200">{student.id}</td>
                <td className="px-6 py-4 border-b border-gray-200">{student.name}</td>
                <td className="px-6 py-4 border-b border-gray-200">{student.age}</td>
                <td className="px-6 py-4 border-b border-gray-200">{student.dob}</td>
                <td className="px-6 py-4 border-b border-gray-200">{student.course}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-blue-600 hover:underline">
                  <Link to={`/students/${student.id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePagination(page - 1)}
              disabled={page === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePagination(page + 1)}
              disabled={!students.next}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(page * pageSize, students.count)}</span> of{' '}
                <span className="font-medium">{students.count}</span> results
              </p>
            </div>
            <div>
              <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <button
                  onClick={() => handlePagination(page - 1)}
                  disabled={page === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-disabled={page === 1}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                </button>
                {Array.from({ length: Math.ceil(students.count / pageSize) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePagination(index + 1)}
                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${index + 1 === page ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-50"}`}
                    aria-current={index + 1 === page ? "page" : undefined}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePagination(page + 1)}
                  disabled={!students.next}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-disabled={!students.next}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;

