import React from 'react';
import Hero from '../../components/Hero';
import CourseCard from '../../components/CourseCard';
import Teachers from '../../components/TopInstructors';
import ChooseUs from '../../components/ChooseUs';

const Home = () => {
    return (
        <div>
            <Hero />
            <CourseCard />
            <ChooseUs />
            <Teachers />
        </div>
    );
};

export default Home;