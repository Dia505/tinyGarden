import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Your plant data (replace this with your actual data)
const bestSellerPlants = [
    { id: 1, name: 'Snake plant', image: 'src/assets/foliage/snake.jpeg' },
    { id: 2, name: 'Pothos', image: 'src/assets/foliage/pothos.jpg' },
    { id: 3, name: 'Golden Barrel Cactus', image: 'src/assets/cacti/golden barrel cactus.webp' },
    { id: 4, name: 'Echeveria', image: 'src/assets/succulent/echeveria.webp' },
    { id: 5, name: 'White orchid', image: 'src/assets/flowering/orchid.webp' },
    { id: 6, name: 'Rosemary', image: 'src/assets/herb/rosemary.jpg' },
    { id: 7, name: 'Christmas Cactus', image: 'src/assets/cacti/christmas cactus.webp' },
];

const BestSellerCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7, // Number of slides to show at a time
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            {bestSellerPlants.map((plant) => (
                <div key={plant.id}>
                    <img src={plant.image} alt={plant.name} />
                    <p>{plant.name}</p>
                </div>
            ))}
        </Slider>
    );
};

export default BestSellerCarousel;