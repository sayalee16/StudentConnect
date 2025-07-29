import { useEffect, useState } from "react";
import StudentNavbar from "./StudentNavbar";

const Requests = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/request/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },  
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setRequests(data);
    })
    .catch(error => {
      console.error('Error fetching requests:', error);
    });
  }, [user.id]);

  const handleWithdraw = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/request/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        
        setRequests(requests.filter(request => request.id !== requestId));
        alert('Request withdrawn successfully');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to withdraw request');
      }
    } catch (error) {
      console.error('Error withdrawing request:', error);
      alert('Failed to withdraw request. Please try again.');
    }
  };
   
  return (
    <>
    <StudentNavbar/>
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Mentorship Requests</h1>
        
        {requests.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
         
{requests.map((request) => (
  <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
    <div className="grid grid-cols-2 gap-6">
      
      <div>
        <h2 className="text-xl font-semibold">Request to {request.mentor.name}</h2>
        <p className="text-gray-600 mt-2">{request.message}</p>
        <div className="mt-4">
          <span className="text-sm font-medium">Sent on: </span>
          <span className="text-sm text-gray-600">
            {new Date(request.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div>
        <div className="flex justify-end">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
            ${request.status === 'PENDING' && 'bg-yellow-100 text-yellow-800'}
            ${request.status === 'ACCEPTED' && 'bg-green-100 text-green-800'}
            ${request.status === 'REJECTED' && 'bg-red-100 text-red-800'}
          `}>
            {request.status}
          </span>
        </div>

        <div className="mt-4">
          {request.status === 'ACCEPTED' && (
            <p className="text-green-600 text-sm">
              🎉 Congratulations! Your mentor has accepted your request. 
              Feel free to reach out to them at {request.mentor.email} to begin your learning journey!
            </p>
          )}
          {request.status === 'PENDING' && (
            <p className="text-yellow-600 text-sm">
              ⏳ Your request is pending. You'll be notified when the mentor responds. 
              Meanwhile, you can prepare your learning goals!
            </p>
          )}
          {request.status === 'REJECTED' && (
            <p className="text-gray-600 text-sm">
              Don't worry! You can explore other mentors who might be a better match for your learning needs.
            </p>
          )}
        </div>
      </div>
    </div>

    <div className="mt-6 border-t pt-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium">Mentor Details:</h3>
          <p className="text-sm text-gray-600">Email: {request.mentor.email}</p>
          <p className="text-sm text-gray-600">Expertise: {request.mentor.expertise.join(', ')}</p>
        </div>
        {request.status === 'PENDING' && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            onClick={() => {
              if (window.confirm('Are you sure you want to withdraw this request?')) {
                handleWithdraw(request.id);
              }
            }}
          >
            Withdraw Request
          </button>
        )}
      </div>
    </div>
  </div>
))}
          </div>
        ) : (
          <div className="text-center bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">No requests found.</p>
          </div>
        )}
      </div>
    </div>
    </>
    
  );
}   

export default Requests;