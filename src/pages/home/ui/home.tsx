import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '@/components/slider/slider';
import AboutUs from '@/components/AboutUs/AboutUs';
import Gallery from '@/components/Gallery/Gallery';

const Home = () => {
    return (
        <div>
            <Slider />
            <AboutUs />
            <Gallery />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <Link to="/products">
                    <button>Продукция</button>
                </Link>
                <Link to="/how-to-buy">
                    <button>Как купить</button>
                </Link>
                <Link to="/videos">
                    <button>Видео</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
