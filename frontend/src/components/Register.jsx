import { Handshake } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
  const navigate = useNavigate();
  const [expertise, setExpertise] = useState([]);
  const [availableTime, setAvailableTime] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      branch: e.target.branch.value,
      college: e.target.college.value,
      currentYear: parseInt(e.target.currentYear.value),
      userType: e.target.userType.value,
      expertise: expertise,
      availableTime: availableTime
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(payload)
      })

      if (response.ok) {
  alert('Registration successful!');
  window.location.href = 'http://localhost:8080/oauth2/authorization/google';
} else {
        const error = await response.json()
        alert(error.message || 'Registration failed')
      }
    } catch (err) {
      console.error('Registration failed:', err)
      alert('Registration failed')
    }
  }

  const handleExpertiseChange = (e) => {
    const value = e.target.value
    setExpertise(prev => e.target.checked ? [...prev, value] : prev.filter(item => item !== value))
  }

  const handleTimeChange = (e) => {
    const value = e.target.value
    setAvailableTime(prev => e.target.checked ? [...prev, value] : prev.filter(item => item !== value))
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Handshake className="text-black mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold text-black">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="college" className="block text-sm font-medium text-gray-900">
              College
            </label>
            <input
              id="college"
              name="college"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-900">
              Branch
            </label>
            <input
              id="branch"
              name="branch"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="currentYear" className="block text-sm font-medium text-gray-900">
              Current Year
            </label>
            <select
              id="currentYear"
              name="currentYear"
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            >
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-gray-900">
              Register as
            </label>
            <select
              id="userType"
              name="userType"
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            >
              <option value="STUDENT">Student</option>
              <option value="MENTOR">Mentor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Expertise / Goals</label>
            <div className="mt-2 space-y-2">
              {['Frontend', 'Backend', 'Mobile', 'AI/ML', 'DevOps', 'Database', 'React', 'Java', 'SQL', 'Time Management'].map((skill) => (
                <label key={skill} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    value={skill}
                    onChange={handleExpertiseChange}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="ml-2 text-sm text-gray-900">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Available Time</label>
            <div className="mt-2 space-y-2">
              {['Morning', 'Afternoon', 'Evening'].map((time) => (
                <label key={time} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    value={time}
                    onChange={handleTimeChange}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="ml-2 text-sm text-gray-900">{time}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Register
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
  Already have an account?{' '}
  <a
    href="http://localhost:8080/oauth2/authorization/google"
    className="font-semibold leading-6 text-black hover:text-gray-800"
  >
    Sign in with Google
  </a>
</p>
      </div>
    </div>
  )
}

export default Register;