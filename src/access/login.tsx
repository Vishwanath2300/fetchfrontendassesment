import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
  // Trim whitespace
  email = email.trim();

  // Must contain exactly one "@"
  const parts = email.split('@');
  if (parts.length !== 2) return false;

  const [local, domain] = parts;

  // Local and domain parts must not be empty
  if (!local || !domain) return false;

  // Domain must contain at least one "."
  const domainParts = domain.split('.');
  if (domainParts.length < 2) return false;

  return true;
};

// Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
// Validate form data
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
// API call to login
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        // Assuming the login is successful, redirect to the search page
        navigate('/search');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.log('An error occurred. Please try again.', err);    
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Render the login form
  return (

    
    <div className="min-h-screen h-full w-full fixed inset-0 flex items-center justify-center bg-gradient-to-br bg-amber-50 ">
      <div className="max-w-md w-full shadow-amber-200  shadow-2xl space-y-8 p-8 rounded-2xl relative z-10">
        <div className="justify-center flex flex-col items-center">
          <div className="flex justify-center mb-0">
            {/* <span className="text-5xl">🐕</span> */}
            <img 
                src="src/assets/logo.svg" 
                alt="Dog Icon" 
                className="w-40 h-40 object-contain "
              />
          </div>
          <h2 className="text-3xl mt-[-30px] font-bold text-orange-600">
            Welcome to Pawsome
          </h2>
          <p className="mt-2 text-yellow-600">Find your perfect furry friend</p>
        </div>
        
        {/* Form for user input */}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-md bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-orange-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-yellow-300 placeholder-gray-400 text-gray-900 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-orange-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-yellow-300 placeholder-gray-400 text-gray-900 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="group relative w-[250px] flex justify-center py-3 px-4 border border-transparent text-sm font-medium
                     bg-[#e1e7e1] text-black p-2  rounded-4xl shadow-lg hover:bg-yellow-500"
            >
              Start Finding Dogs
            </button>
          </div>

          <div className="text-center text-sm text-orange-600">
            Enter your details to start browsing adorable dogs
          </div>
        </form>

        
      </div>
    </div>
    
  );
};

export default Login;