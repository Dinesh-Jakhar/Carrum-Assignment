
import React from 'react';
import backgroundImage from '../assets/home1.webp'

function Home() {
    return (
      <div>
        <div className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        </div>
    );
}

export default Home;
