import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>
            <h1 className='text-4xl font-bold text-center'>Dashboard Feature are Coming Soon...</h1>
            <p className='text-xl font-bold text-center'>You can Explore others Option</p>
            <div className='flex justify-center mt-auto pt-4 gap-2 w-full '>
                <Link to="/" className='btn btn-primary'>Back to Home</Link>
            </div>
        </div>
    );
};

export default Dashboard;