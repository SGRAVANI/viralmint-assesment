import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    let navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        location: ''
    });
let [signupStatus,setSignUpStatus]=useState({color:'',msg:''})
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignUpStatus({msg:"",color:""})
        console.log('Signup form data:', formData);

        // Validate the form data (optional)
        if (Object.values(formData).some(field => field.trim() === '')) {
            alert('All fields are required');
            return;
        }

        // Make the API request to signup
        try {
            const response = await fetch('http://localhost:8000/api/v1/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
               // alert('User registered successfully');
                console.log(result);
                
                setSignUpStatus({color:"green",msg:"user Registerd successfully"})
                setTimeout(()=>{
                    navigate("/")
                },500)

            } else {
                //alert(result.message || 'Signup failed');
                setSignUpStatus({color:"red",msg:"Signup Failed"})
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form 
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="location">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Sign Up
                </button>
                {signupStatus.msg &&<p style={{color:signupStatus.color,paddingTop:"0.5rem"}}>{signupStatus.msg}</p>}
            </form>
           
        </div>
    );
};

export default SignUp;
