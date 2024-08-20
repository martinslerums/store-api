import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // To handle error messages
  const [loading, setLoading] = useState(false); // To handle loading state

  const navigate = useNavigate()

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  axios.defaults.withCredentials = true
  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    setLoading(true);
    setError('');

    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", { email, password });
      
      if (response.data.login) {
        navigate("/dashboard")
      }
      // Handle successful response, e.g., redirect or show a success message


      
    } catch (err) {
      console.error(err);
      setError('Invalid credentials'); // Set error message for invalid credentials
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>} {/* Display error message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
            <input
              value={formData.email}
              onChange={handleChange}
              type="text"
              name="email" // Correct name attribute
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password:
            <input
              value={formData.password}
              onChange={handleChange}
              type="password"
              name="password" // Correct name attribute
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
