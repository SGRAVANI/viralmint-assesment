import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  let navigate=useNavigate()
let [loginStatus,setLoginStatus]=useState(false)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form data:', formData);

    let payload = {
        email: formData.email,
        password: formData.password,
    };

    fetch("http://localhost:8000/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': "application/json",
        },
    })
    .then((res)=>{
      //  console.log(res.status)
        
        return res.json()

    })
    .then((d)=>{
        //console.log(d)
        console.log(d.message)
        setLoginStatus(d.message)
        window.localStorage.setItem("user",JSON.stringify(d.user))
        navigate('/blogs')
       // if
    })
    .catch((e)=>{
        console.log(e.message)
    })
    
      };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email or Username Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email or Username</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              required 
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              placeholder="Enter your email or username"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              required 
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              placeholder="Enter your password"
            />
          </div>

         
           <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
                <p className=' '>
                    Don't Have an account?
                </p>
              
             <NavLink to="/signup" className=' text-indigo-600'>SignUp</NavLink>
            </div> 
            </div>

            {/* <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div> */}
          {/* </div> */}

          {/* Submit Button */}
          <div>
            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none">
              Sign In
            </button>
          </div>
         
        </form>
        {loginStatus&&<div>{loginStatus}</div>}
      </div>
     
    </div>
  );
}
