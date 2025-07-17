import { useEffect, useState } from "react";
import MentorNavbar from "./MentorNavbar";

const MentorRequest = () => {
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

 const handleStatusChange = async (requestId, newStatus) => {
    try {
        const payload = {
            requestId: requestId,
            status: newStatus
        };

        console.log('Sending status update:', payload);

        const response = await fetch(`http://localhost:8080/api/request/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Update local state
            setRequests(requests.map(request =>
                request.id === requestId
                    ? { ...request, status: newStatus }
                    : request
            ));
            alert(`Request ${newStatus.toLowerCase()} successfully`);
        } else {
            const error = await response.json();
            throw new Error(error.message || `Failed to ${newStatus.toLowerCase()} request`);
        }
    } catch (error) {
        console.error('Error updating request:', error);
        alert(`Failed to ${newStatus.toLowerCase()} request. Please try again.`);
    }
};
    return (
        <>
        <MentorNavbar/>
        
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-center mb-8">Your Requests</h1>

                {requests.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {requests.map((request) => (
                            <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold">Request from {request.student.name}</h2>
                                        <p className="text-gray-600 mt-2">{request.message}</p>
                                        <div className="mt-4">
                                            <span className="text-sm font-medium">Received on: </span>
                                            <span className="text-sm text-gray-600">
                                                {new Date(request.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                            ${request.status === 'PENDING' && 'bg-yellow-100 text-yellow-800'}
                                            ${request.status === 'ACCEPTED' && 'bg-green-100 text-green-800'}
                                            ${request.status === 'REJECTED' && 'bg-red-100 text-red-800'}
                                        `}>
                                            {request.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 border-t pt-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium">Student Details:</h3>
                                            <p className="text-sm text-gray-600">Email: {request.student.email}</p>
                                            <p className="text-sm text-gray-600">College: {request.student.college}</p>
                                            <p className="text-sm text-gray-600">Branch: {request.student.branch}</p>
                                            <p className="text-sm text-gray-600">Branch: {request.student.currentYear}</p>
                                        </div>
                                        {request.status === 'PENDING' && (
                                            <div className="flex gap-2">
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                                                    onClick={() => handleStatusChange(request.id, 'ACCEPTED')}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                                    onClick={() => handleStatusChange(request.id, 'REJECTED')}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-white rounded-lg shadow-md p-8">
        <div className="space-y-4">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900">
                Ready to Share Your Knowledge?
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
                Your expertise can make a difference! Once students send you mentorship requests, 
                they'll appear here. Keep checking back - your next mentee could be just around the corner.
            </p>
            <div className="mt-6 text-sm text-gray-500">
                Students are notified of your expertise and availability. 
                You'll receive requests from those who match your profile.
            </div>
        </div>
    </div>
                )}
            </div>
        </div>
        </>
        
    );
};

export default MentorRequest;