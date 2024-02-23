import "../css-files/Home.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeaderUser from "./HeaderUser.tsx";
import React, {useEffect, useState} from "react";
import HeaderUserBeforeLogin from "./HeaderUserBeforeLogin.tsx";
import {Link} from "react-router-dom";

function Home() {
    const bestSellerPlants = [
        {name: 'Snake plant', image: 'src/assets/foliage/snake.jpeg' },
        {name: 'Pothos', image: 'src/assets/foliage/pothos.jpg' },
        {name: 'Golden Barrel Cactus', image: 'src/assets/cacti/golden barrel cactus.webp' },
        {name: 'Echeveria', image: 'src/assets/succulent/echeveria.webp' },
        {name: 'White orchid', image: 'src/assets/flowering/orchid.webp' },
        {name: 'Rosemary', image: 'src/assets/herb/rosemary.jpg' },
        {name: 'Christmas Cactus', image: 'src/assets/cacti/christmas cactus.webp' },
    ];

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    const homeSliderImages = [
        "src/assets/home/homeSlider4.jpg",
        "src/assets/home/homeSlider5.jpg",
        "src/assets/home/homeSlider1.jpg",
        "src/assets/home/homeSlider6.jpg",
        "src/assets/home/homeSlider7.jpg",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === homeSliderImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [homeSliderImages.length]);

    return (
        <>
            {localStorage.getItem("loggedInUserId")? <HeaderUser/>:<HeaderUserBeforeLogin/>}

            <div className={"centre-home"}>
                <div className={"home-heading-container"}>
                    <div className={"home-heading"}>
                        <p className={"home-heading-main-text"}>Welcome to The Tiny Garden</p>
                        <p className={"home-heading-subtext"}>Harmony in Every Leaf, Serenity in Every Seed</p>
                        <div className={"gif-button-container"}>
                            <img className={"home-gif"} src={"src/assets/home/homeGif.gif"}/>
                            <Link to={"/categories"}><button className={"shop-now-button"}>Shop now</button></Link>
                        </div>
                    </div>

                    <div className={"home-image-slider"}>
                        <img
                            src={homeSliderImages[currentImageIndex]}
                            alt="slider"
                            className="slider-image"
                        />
                    </div>
                </div>


                {/*<div className={"home-heading-container"}>*/}
                {/*    <div className={"home-heading-img-container1"}>*/}
                {/*        <img className={"home-heading-img1"} src={"src/assets/home/home heading.png"}/>*/}
                {/*    </div>*/}
                {/*    <div className={"home-heading"}>*/}
                {/*        <p className={"home-heading-main-text"}>Welcome to The Tiny Garden</p>*/}
                {/*        <p className={"home-heading-subtext"}>Harmony in Every Leaf, Serenity in Every Seed</p>*/}
                {/*    </div>*/}
                {/*    <div className={"home-heading-img-container2"}>*/}
                {/*        <img className={"home-heading-img2"} src={"src/assets/home/home heading 2.png"}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={"about-home"}>
                    <p className={"why-choose-home"}>Why choose us?</p>
                    <div className={"home-points-container"}>
                        <div className={"home-point"}>
                            <div className={"home-point-quality"}>
                                <img className={"home-quality2"}src={"src/assets/home/quality2.png"}/>
                                <img className={"home-quality1"} src={"src/assets/home/quality1.png"}/>
                                <img className={"home-quality2"}src={"src/assets/home/quality2.png"}/>
                            </div>
                            <p className={"home-point-maintext"}>Quality assurance and a variety of plants</p>
                        </div>

                        <div className={"home-point"}>
                            <img className={"home-sustainability"} src={"src/assets/home/sustainability.png"}/>
                            <p className={"home-point-maintext"}>Sustainably grown poison ivies</p>
                        </div>

                        <div className={"home-point"}>
                            <div className={"home-point-price"}>
                                <img className={"home-money"}src={"src/assets/home/money1.png"}/>
                                <img className={"home-purse"} src={"src/assets/home/purse.png"}/>
                                <img className={"home-money"}src={"src/assets/home/money2.png"}/>
                            </div>
                            <p className={"home-point-maintext"}>Sustainably grown poison ivies</p>
                        </div>
                    </div>
                </div>

                <div className={"best-seller-home"}>
                    <p className={"best-seller-text"}>Our Bestsellers</p>

                    <div className={"carousel-container"}>
                        <Slider {...settings}>
                        {bestSellerPlants.map((p) => (
                            <div className={"best-seller-container"}>
                                <img className={"best-img"} src={p.image}/>
                                <p className={"best-name"}>{p.name}</p>
                            </div>
                        ))}
                        </Slider>
                    </div>
                </div>

                <div className={"home-at-tinyGarden-container"}>
                    <div className={"home-at-tinyGarden-text-img"}>
                        <div className={"home-at-tinyGarden-text-container"}>
                            <p className={"home-at-tinyGarden-maintext"}>Plants Make People Happy | The Tiny Garden</p>
                            <p className={"home-at-tinyGarden-subtext"}>At The Tiny Garden, we live off the mantra that, "Plants Make You Happy." Find live plants that will make you happy! Buy large plants, small plants or pet-friendly plants online today!</p>
                        </div>

                        <div className={"home-plants-advantages"}>
                            <div className={"home-air-purify-container"}>
                                <img className={"home-air-purify"} src={"src/assets/home/air purify.png"}/>
                                <p>Indoor plants are known for their ability to filter out pollutants and enhance air quality. </p>
                            </div>
                            <div className={"home-positivity-container"}>
                                <img className={"home-meditate"} src={"src/assets/home/meditation.png"}/>
                                <p>Studies have shown that the presence of indoor plants can positively impact mental health and well-being. </p>
                            </div>
                            <div className={"home-productivity-container"}>
                                <img className={"home-productive"} src={"src/assets/home/productive.png"}/>
                                <p>The greenery and natural elements contribute to a more pleasant and conducive environment for focused work or study. </p>
                            </div>
                        </div>
                    </div>

                    <img className={"home-at-tinyGarden-img"} src={"src/assets/home/at tinyGarden.webp"}/>
                </div>

                <div className={"home-location"}>
                    <img className={"home-shop-img"} src={"src/assets/home/plant shop.jpg"}/>
                    <div className={"home-shop-text-container"}>
                        <p className={"visit-us"}>Visit Us In A Store Near You</p>
                        <p className={"kathmandu-store"}>Our stores around Kathmandu are open for plant shopping and curbside pickup.</p>
                        <p className={"store-contact"}>Contact us: 98123456</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home;