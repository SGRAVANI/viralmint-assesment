
import React, { useEffect, useState } from 'react';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [greeting, setGreeting] = useState('');
    let userId=JSON.parse(localStorage.getItem("user"))._id
    const [newBlog, setNewBlog] = useState({
        blogTitle: '',
        image: '',
        content: '',
        subheading: '',
        labels: [],
        userId:userId
    });

    useEffect(() => {
        // Fetch blogs from the backend
        const fetchBlogs = async () => {
            const response = await fetch('http://localhost:8000/api/v1/getblogs');
            const data = await response.json();
            setBlogs(data);
        };

        // Set a greeting message
        const userName = 'User'; // Replace this with the actual user's name from login
        setGreeting(`Welcome, ${userName}!`);
        
        fetchBlogs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/v1/addblog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBlog),
        });

        if (response.ok) {
            const createdBlog = await response.json();
            setBlogs((prev) => [...prev, createdBlog]);
            setNewBlog({ blogTitle: '', image: '', content: '', subheading: '', labels: [] });
        } else {
            console.error('Failed to create blog');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{greeting}</h1>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold">Available Blogs</h2>
                <ul className="list-disc pl-5 mt-2">
                    {blogs.map((blog) => (
                        <li key={blog._id} className="mt-1">
                            <h3 className="font-bold">{blog.blogTitle}</h3>
                            <p>{blog.subheading}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Post a New Blog</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        name="blogTitle"
                        placeholder="Blog Title"
                        value={newBlog.blogTitle}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2"
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={newBlog.image}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2"
                        required
                    />
                    <textarea
                        name="content"
                        placeholder="Content"
                        value={newBlog.content}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2"
                        required
                    />
                    <input
                        type="text"
                        name="subheading"
                        placeholder="Subheading"
                        value={newBlog.subheading}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2"
                        required
                    />
                    <input
                        type="text"
                        name="labels"
                        placeholder="Labels (comma-separated)"
                        value={newBlog.labels.join(', ')}
                        onChange={(e) => handleChange({ target: { name: 'labels', value: e.target.value.split(',') } })}
                        className="border p-2 w-full mb-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Post Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Blogs;
