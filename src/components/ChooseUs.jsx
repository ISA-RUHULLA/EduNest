import React from 'react';

const ChooseUs = () => {
    return (
        <div>
            <div className='text-center'>
                <h2 className='text-3xl font-bold'>Why Choose Us</h2>
                <p>Discover the benefits of learning with EduNest and how we stand out from the rest.</p>
            </div>
            <div className='grid grid-cols-3 gap-6 justify-center m-8'>
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions justify-end">
                            <button className="btn">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions justify-end">
                            <button className="btn">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions justify-end">
                            <button className="btn">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChooseUs;