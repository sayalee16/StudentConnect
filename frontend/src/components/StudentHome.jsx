import { useEffect, useState } from "react";
import StudentNavbar from "./StudentNavbar";

const StudentHome = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [message, setMessage] = useState("");
  const [filters, setFilters] = useState({
    GOAL: false,
    TIME: false,
  });

  console.log("user is",user);
  const [assignedMentorName, setAssignedMentorName] = useState("");

  useEffect(() => {
    const fetchAssignedMentor = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/request/${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          const acceptedRequest = data.find((req) => req.status === "ACCEPTED");

          if (acceptedRequest) {
            setAssignedMentorName(acceptedRequest.mentor.name);
          }
        }
      } catch (error) {
        console.error("Error fetching assigned mentor:", error);
      }
    };

    if (user?.id) {
      fetchAssignedMentor();
    }
  }, [user?.id]);

  const fetchMentors = async (activeFilters) => {
    try {
      const params = new URLSearchParams();
      params.append("studentId", user.id);
      params.append("strategies", "BASIC"); 
      if (activeFilters.GOAL) params.append("strategies", "GOAL");
      if (activeFilters.TIME) params.append("strategies", "TIME");

      const response = await fetch(
        `http://localhost:8080/api/match?${params.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setMentors(data);
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchMentors(filters);
    }
  }, [user?.id, filters]);

  const toggleFilter = (type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleOnClick = (mentorId) => {
    const studentId = Number(user.id);

    if (!studentId || !mentorId) {
      console.error(
        "Invalid IDs - Student ID:",
        studentId,
        "Mentor ID:",
        mentorId
      );
      alert("Error: Invalid user or mentor information");
      return;
    }

    const payload = {
      studentId: studentId,
      mentorId: mentorId,
      message:
        message || "Hello, I would like to connect with you for mentorship.",
    };

    try {
      fetch("http://localhost:8080/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.ok) {
            setSelectedMentor(null);
            setMessage("");
            alert("Request sent successfully to mentor!");
            window.location.reload();
          } else {
            return response.json().then((data) => {
              throw new Error(data.message || "Failed to send request");
            });
          }
        })
        .catch((error) => {
          console.error("Error sending request:", error);
          alert("An error occurred while sending the request.");
        });
    } catch (error) {
      console.error("Error sending request:", error);
      alert("An error occurred while sending the request.");
    }
  };

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome {user.name || "to StudentConnect"}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Start meaningful connections that fuel your journey.
            </p>
            {assignedMentorName && (
  <div className="w-full px-4 py-3 rounded-lg bg-white shadow-md text-gray-900 text-lg font-medium text-center">
    You're now connected with{" "}
    <span className="font-semibold">
      <em>{assignedMentorName}</em>
    </span>
    .
    <br />
    You’re connected with a senior who’s here to help — go ahead and say hi.
  </div>
)}

          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 md:mb-0">
                Your Matched Mentors
              </h2>

             
              <div className="flex gap-3">
                <span className="text-xl mt-0.5 text-gray-800 font-medium">
                  Filter by:
                </span>
                <button
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                    filters.GOAL
                      ? "bg-black text-white border-black shadow-sm"
                      : "bg-white text-black border-gray-400 hover:border-black"
                  }`}
                  onClick={() => toggleFilter("GOAL")}
                >
                  Goal
                </button>
                <button
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                    filters.TIME
                      ? "bg-black text-white border-black shadow-sm"
                      : "bg-white text-black border-gray-400 hover:border-black"
                  }`}
                  onClick={() => toggleFilter("TIME")}
                >
                  Time
                </button>
              </div>
            </div>

            {mentors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {mentor.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <p className="text-gray-600">
                          <span className="font-medium">Email:</span>{" "}
                          {mentor.email}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">College:</span>{" "}
                          {mentor.college}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600">
                          <span className="font-medium">Branch:</span>{" "}
                          {mentor.branch}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Current Year:</span>{" "}
                          {mentor.currentYear}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-4">
                      <div className="text-gray-600">
                        <span className="font-medium">Expertise:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {mentor.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Available Time:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {mentor.availableTime.map((time, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {selectedMentor === mentor.id ? (
                      <div className="space-y-4">
                        <textarea
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                          rows="3"
                          placeholder="Enter your message to the mentor..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <button
                            className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                            onClick={() => handleOnClick(mentor.id)}
                          >
                            Send Request
                          </button>
                          <button
                            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                            onClick={() => {
                              setSelectedMentor(null);
                              setMessage("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                        onClick={() => setSelectedMentor(mentor.id)}
                      >
                        Request Mentorship
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                No matched mentors found at the moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHome;
