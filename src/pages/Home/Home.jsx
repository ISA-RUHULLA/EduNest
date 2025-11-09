import React from 'react';
import Hero from '../../components/Hero';
import CourseCard from '../../components/CourseCard';
import Teachers from '../../components/Teachers';

const Home = () => {
    return (
        <div>
            <Hero />
            <CourseCard />
            <Teachers />
        </div>
    );
};

export default Home;