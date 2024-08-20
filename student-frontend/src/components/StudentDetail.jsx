import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(id === 'new');
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dob: '',
        course: ''
    });

    useEffect(() => {
        if (id !== 'new') {
            axios.get(`/api/students/${id}`)
                .then(response => {
                    setStudent(response.data);
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the student details!', error);
                });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        const request = id === 'new'
            ? axios.post(`/api/students/`, formData)
            : axios.patch(`/api/students/${id}/`, formData);

        request
            .then(response => {
                navigate('/');
                console.log(`Student ${id === 'new' ? 'added' : 'updated'} successfully`);
            })
            .catch(error => {
                console.error(`There was an error ${id === 'new' ? 'adding' : 'updating'} the student!`, error);
            });
    };

    const handleDelete = () => {
        axios.delete(`/api/students/${id}/`)
            .then(() => {
                navigate('/');
                console.log('Student deleted successfully');
            })
            .catch(error => {
                console.error('There was an error deleting the student!', error);
            });
    };

    return (
        // <div>
        //     {student || id === 'new' ? (
        //         <div>
        //             <h2>{id === 'new' ? 'Add New Student' : isEditing ? 'Edit Student' : 'Student Details'}</h2>
        //             <label>
        //                 Name:
        //                 <input
        //                     type="text"
        //                     name="name"
        //                     value={formData.name}
        //                     onChange={handleInputChange}
        //                     readOnly={!isEditing}
        //                 />
        //             </label>
        //             <br/>
        //             <label>
        //                 Age:
        //                 <input
        //                     type="number"
        //                     name="age"
        //                     value={formData.age}
        //                     onChange={handleInputChange}
        //                     readOnly={!isEditing}
        //                 />
        //             </label>
        //             <br />
        //             <label>
        //                 Date of Birth:
        //                 <input
        //                     type="date"
        //                     name="dob"
        //                     value={formData.dob}
        //                     onChange={handleInputChange}
        //                     readOnly={!isEditing}
        //                 />
        //             </label>
        //             <br />
        //             <label>
        //                 Course:
        //                 <input
        //                     type="text"
        //                     name="course"
        //                     value={formData.course}
        //                     onChange={handleInputChange}
        //                     readOnly={!isEditing}
        //                 />
        //             </label>
        //             {id === 'new' ? (
        //                 <div>
        //                     <button onClick={handleSave}>Save</button>
        //                     <button onClick={() => navigate('/')}>Cancel</button>
        //                 </div>
        //             ) : isEditing ? (
        //                 <div>
        //                     <button onClick={handleSave}>Save</button>
        //                     <button onClick={() => setIsEditing(false)}>Cancel</button>
        //                 </div>
        //             ) : (
        //                 <div>
        //                     <button onClick={() => setIsEditing(true)}>Edit</button>
        //                     <button onClick={handleDelete}>Delete</button>
        //                     <button onClick={() => navigate('/')}>Back to List</button>
        //                 </div>
        //             )}
        //         </div>
        //     ) : (
        //         <p>Loading...</p>
        //     )}
        // </div>
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
  {student || id === 'new' ? (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {id === 'new' ? 'Add New Student' : isEditing ? 'Edit Student' : 'Student Details'}
      </h2>
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-4 py-2 border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isEditing && 'bg-gray-100'
            }`}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Age:</span>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-4 py-2 border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isEditing && 'bg-gray-100'
            }`}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Date of Birth:</span>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-4 py-2 border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isEditing && 'bg-gray-100'
            }`}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Course:</span>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-4 py-2 border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isEditing && 'bg-gray-100'
            }`}
          />
        </label>
      </div>

      <div className="mt-6 flex space-x-4">
        {id === 'new' ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Back to List
            </button>
          </>
        )}
      </div>
    </div>
  ) : null}
</div>

    );
};

export default StudentDetail;
