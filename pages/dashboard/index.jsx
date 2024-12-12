"use client"
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono, DM_Serif_Text } from "next/font/google";

import React, { useState, useEffect, useRef } from 'react';

import { ArrowLeft, Check, ChevronsUpDown, CircleArrowLeft, Facebook, FacebookIcon, Heart, Minus, Music2Icon, MusicIcon, Plus, Quote, RemoveFormatting, X } from "lucide-react"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

import { useRouter } from "next/router";
import { getAllData } from "@/lib/api";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const dmSerifText = DM_Serif_Text({
    variable: "--font-dm-serif-text",
    subsets: ["latin"],
    weight: "400",
});

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Home = () => {
    const router = useRouter();
    const [datalist, setDataslist] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getAllData().then((data) => {
            setDataslist([...data]);
            // Wait for 2 seconds after the data is fetched
            setTimeout(() => {
                setLoading(false); // Stop loading after 2 seconds
            }, 2000);
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="text-center">
                    <img src="/logo.png" alt="Picture of the Celebrant" className="w-3/5 m-auto" />
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${geistSans.className} ${dmSerifText.className}`}>
            <Head>
                <title>Let’s Make Her Day Unforgettable!</title>
                <meta name="description" content="Celebrate with fun, stories, and memories! Let’s make her day unforgettable!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <meta property="og:title" content="Let’s Make Her Day Unforgettable!" />
                <meta property="og:description" content="Celebrate with fun, stories, and memories!" />
                <meta property="og:image" content="https://sarahjane.vercel.app/thumbnail.jpg" />
                <meta property="og:url" content="https://sarahjane.vercel.app" />
                <meta property="og:type" content="website" />

            </Head>
            <div className='h-full flex-grow flex flex-col justify-center max-w-md m-auto p-5'>
                <img src="/logo.png" alt="Picture of the Celebrant" className="w-3/5 m-auto" />
                <div className='w-full h-full flex-col max-screen-xl sm:p-10'>
                    <Swiper
                        spaceBetween={20}
                        modules={[Autoplay, EffectCoverflow]}
                        speed={1000}
                        loop={true}
                        effect="coverflow"
                        autoplay={{
                            delay: 500, // Auto-scroll delay (3 seconds)
                            disableOnInteraction: false,
                        }}
                        centeredSlides={true}
                        slidesPerView={3}
                        coverflowEffect={{
                            rotate: 50, // Rotation angle
                            stretch: 0, // Spacing between slides
                            depth: 10, // Depth perspective
                            modifier: 2, // Effect multiplier
                            slideShadows: false, // Enable shadows
                        }}
                    >

                        {datalist.map((data, index) => {
                            return (
                                <SwiperSlide>
                                    <div className="flex flex-col items-center">
                                        <Image src={`/carousel_${Math.floor(Math.random() * 5) + 1}.png`} alt="Image 1" width={500} height={300} />

                                        <p>{data.attributes.one_word}</p>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>



                    <h2 className="mt-5 text-xl">Stories/Testimony</h2>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        modules={[Pagination]}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        touchRatio={1}
                    >
                        {shuffleArray(datalist).map((data, index) => {
                            return (
                                <SwiperSlide>
                                    <div className="flex flex-col items-center">
                                        <blockquote className="w-full rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                                            <div className=" flex items-center gap-4">
                                                <img
                                                    alt=""
                                                    src={data.attributes.image.data ? data.attributes.image.data.attributes.url : "/default.jpg"}
                                                    className="size-14 rounded-full object-cover"
                                                />

                                                <div>
                                                    <div className="flex justify-center gap-0.5">
                                                        <Heart className="h-5 text-transparent" fill="pink" />
                                                        <Heart className="h-5 text-transparent" fill="pink" />
                                                        <Heart className="h-5 text-transparent" fill="pink" />
                                                        <Heart className="h-5 text-transparent" fill="pink" />
                                                        <Heart className="h-5 text-transparent" fill="pink" />
                                                    </div>


                                                    <p className="mt-0.5 text-lg font-medium text-gray-900">{data.attributes.name}</p>
                                                </div>
                                            </div>

                                            <p className="mt-4 text-gray-700 font-sans">
                                                {data.attributes.inspire}
                                            </p>
                                        </blockquote>
                                    </div>
                                </SwiperSlide>)
                        }
                        )}
                    </Swiper>

                    <h2 className="mt-5 text-xl">Birthday Messages</h2>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        modules={[Pagination]}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        touchRatio={1}
                    >

                        {shuffleArray(datalist).map((data, index) => {
                            return (
                                <SwiperSlide>
                                    <div className="flex flex-col items-center">
                                        <blockquote className="w-full  rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    alt=""
                                                    src={data.attributes.image.data ? data.attributes.image.data.attributes.url : "/default.jpg"}
                                                    className="size-14 rounded-full object-cover"
                                                />

                                                <div>

                                                    <div className="flex justify-center gap-0.5 text-violet">
                                                        <Quote className="h-5" />
                                                        <Quote className="h-5" />
                                                    </div>

                                                    <p className="mt-0.5 text-lg font-medium text-gray-900">{data.attributes.name}</p>
                                                </div>
                                            </div>

                                            <p className="mt-4 text-gray-700 font-sans">
                                                {data.attributes.message}
                                            </p>
                                        </blockquote>
                                    </div>
                                </SwiperSlide>)
                        }
                        )}

                    </Swiper>


                    <h2 className="mt-5 text-xl">Playlist Challenge</h2>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        modules={[Pagination]}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        touchRatio={1}
                    >
                        {shuffleArray(datalist).map((data, index) => {
                            return (
                                <SwiperSlide>
                                    <div className="w-full flex flex-col items-center">
                                        <blockquote className="w-full rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    alt=""
                                                    src={data.attributes.image.data ? data.attributes.image.data.attributes.url : "/default.jpg"}
                                                    className="size-14 rounded-full object-cover"
                                                />

                                                <div>
                                                    <div className="flex justify-center gap-0.5 text-darkBlue">
                                                        <MusicIcon className="h-5" />
                                                        <MusicIcon className="h-5" />
                                                        <MusicIcon className="h-5" />
                                                        <MusicIcon className="h-5" />
                                                        <MusicIcon className="h-5" />
                                                    </div>

                                                    <p className="mt-0.5 text-lg font-medium text-gray-900">{data.attributes.name}</p>
                                                </div>
                                            </div>

                                            <p className="mt-4 text-gray-700 font-sans">
                                                {data.attributes.playlist}
                                            </p>
                                        </blockquote>
                                    </div>
                                </SwiperSlide>)
                        }
                        )}
                    </Swiper>

                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://sarah-jane.vercel.app/dashboard")}&quote=${encodeURIComponent("Happy Birthday")}&hashtag=${encodeURIComponent("#HappyBirthday")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center mt-20"
                    >
                        <Facebook />
                        Share on Facebook
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;