"use client"

import Image from "next/image";
import { Geist, Geist_Mono, DM_Serif_Text } from "next/font/google";
import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';

import { ArrowLeft, Check, ChevronsUpDown, CircleArrowLeft, Minus, Plus, RemoveFormatting, X } from "lucide-react"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { useRouter } from "next/router";
import { register, uploadImageRequest } from "@/lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif-text",
  subsets: ["latin"],
  weight: "400",
});

const Home = () => {
  const swiperRef = useRef(null);
  const swiper = useSwiper();
  const router = useRouter();
  const [nameCall, setNameCall] = useState("Sarah");
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    oneWord: '',
    image: '',
    inspire: '',
    playlist: '',
    message: '',
    score: "OVERWORKED"
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value.length > 200) {
      alert('Maximum character limit is 200 Letters.');
      return;
    }

    if (name === 'oneWord') {
      if (value.split(' ').length <= 1) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const registerUser = async () => {
    setImageLoading(true);
    console.log("Registering User", formData);
    const response = await register(formData.name, formData.oneWord, formData.image, formData.inspire, formData.playlist, formData.message, formData.score);
    console.log(response)
    if (response) {
      proceedToNextSlide();
      setImageLoading(false);
    } else {
      router.push('/error');
    }
    setImageLoading(false);
  }

  const handleImageUploadChange = async (event) => {
    try {
      setImageLoading(true);
      console.log("Image Upload", event.target.files[0]);
      const file = event.target.files[0];

      if (!file) return;
      // Check file size (in bytes)
      const maxSizeMB = 15; // Example: 5 MB
      const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
      if (file.size > maxSizeBytes) {
        alert(`File size exceeds the maximum allowed size of ${maxSizeMB} MB.`);
        return;
      }

      const formData = new FormData();
      formData.append("files", file);

      const response = await uploadImageRequest(formData);
      console.log("UI", response);

      setFormData((prevData) => ({
        ...prevData,
        image: response.data[0].id
      }));
      setImageURL(response.data[0].url);


    } catch (error) {
      console.error("Error Upload Image", error);
      // Handle error if needed
    } finally {
      setImageLoading(false);
    }
  };

  const proceedToNextSlide = () => {
    const currentSlideIndex = swiperRef.current?.swiper?.activeIndex - 2;

    if (currentSlideIndex !== undefined) {
      const currentSlideData = [
        formData.name,
        formData.oneWord,
        formData.image,
        formData.inspire,
        formData.playlist,
        formData.message,
        formData.score
      ];

      if (currentSlideData[currentSlideIndex] === '' && currentSlideIndex !== 2) {
        alert('Please fill out the required field before proceeding.' + currentSlideIndex);
        return;
      }
    }

    if (swiperRef.current && swiperRef.current.swiper) {
      window.scrollTo(0, 0);
      swiperRef.current.swiper.slideNext();
    }
  };

  const proceedToPrevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      window.scrollTo(0, 0);
      swiperRef.current.swiper.slidePrev();
    }
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
        <meta property="og:image" content="https://sarah-jane.vercel.app/thumbnail.jpg" />
        <meta property="og:url" content="https://sarah-jane.vercel.app" />
        <meta property="og:type" content="website" />

      </Head>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200  z-50">
          <img src="/logo.png" alt="Picture of the Celebrant" className="w-3/5 m-auto" />
        </div>
      )}

      {imageLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>
      )}



      <div className='h-full flex-grow flex flex-col justify-center max-w-md m-auto border-2 p-5'>
        <img src="/logo.png" alt="Picture of the Celebrant" className="w-1/3 m-auto" />
        <button onClick={proceedToPrevSlide}><ArrowLeft className="h-10 absolute top-5 left-5" /></button>
        <div className='w-full h-full flex-col max-screen-xl p-5'>
          <Swiper
            ref={swiperRef}
            spaceBetween={50}
            slidesPerView={1}
            allowTouchMove={false}
          >
            <SwiperSlide>
              <div className="w-full flex flex-col items-center">
                <img src="/image_one.png" alt="Picture of the Celebrant" className="w-3/5" />
                <h2 className="text-xl my-2">Welcome</h2>
                <p className="text-justify font-sans mb-5">This special site is dedicated to the amazing woman who has brought so much love, joy, and inspiration into our lives. Whether you're family, a dear friend, or someone whose life she’s touched, this is your place to celebrate her in a meaningful and fun way.</p>
                <p className="text-justify font-sans mb-5">
                  Explore the questionnaire, share heartfelt stories, and leave a message that will make her day unforgettable. Let’s fill this space with the warmth, laughter, and love that she so effortlessly gives to everyone around her.</p>
                <p className="text-justify font-sans mb-5">
                  Thank you for being here to honor someone so extraordinary. Let’s make this celebration as bright and beautiful as she is!
                </p>
                <button
                  onClick={proceedToNextSlide}
                  className="w-full inline-block shrink-0 border bg-lightPink px-12 py-2 text-md font-medium text-black transition hover:bg-opacity-5 focus:outline-none rounded-lg"
                >
                  Proceed
                </button>

                <button
                  onClick={()=>{router.push("/dashboard")}}
                  className="w-full inline-block shrink-0 bg-white px-12 py-2 text-md font-medium text-black transition hover:bg-opacity-5 focus:outline-none rounded-lg"
                >
                  View Messages
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full flex flex-col items-center">
                <h2 className="text-xl my-5 text-center">"What Do You Call Her?"
                </h2>
                <p className="text-justify font-sans mb-5">Share the special name you use to describe her—mom, nay, mentor, or something uniquely yours!</p>
                <input
                  name="name"
                  value={nameCall}
                  onChange={(e) => setNameCall(e.target.value)}
                  type="text"
                  placeholder="Your Name"
                  className="w-full border text-center mb-5 border-gray-300 px-3 py-2 text-md font-medium text-black transition focus:outline-none rounded-lg font-sans"
                />
                <button
                  onClick={proceedToNextSlide}
                  className="w-full inline-block shrink-0 border bg-lightPink px-12 py-2 text-md font-medium text-black transition hover:bg-opacity-5 focus:outline-none rounded-lg"
                >
                  Proceed
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full flex flex-col items-center">
                <h2 className="text-xl my-5 text-center">What's Your Name? <br />
                  Feel Free to Be Mysterious, {nameCall}'s Got Your Back!
                </h2>
                <p className="text-justify font-sans mb-5">You don't have to use your real name—stay anonymous or go with the name {nameCall} knows you by. After all, a little mystery never hurt anyone! 😄</p>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name"
                  className="w-full border text-center mb-5 border-gray-300 px-3 py-2 text-md font-medium text-black transition focus:outline-none rounded-lg font-sans"
                />
                <button
                  onClick={proceedToNextSlide}
                  className="w-full inline-block shrink-0 border bg-lightPink px-12 py-2 text-md font-medium text-black transition hover:bg-opacity-5 focus:outline-none rounded-lg"
                >
                  Proceed
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full flex flex-col items-center">
                <img src="/image_three.png" alt="Picture of the Celebrant" className="w-full mt-5" />
                <h2 className="text-xl my-5 text-center">"One Word for {nameCall}"</h2>
                <p className="text-justify font-sans mb-5">Share the one word that best captures {nameCall}'s spirit and personality.</p>
                <input
                  name="oneWord"
                  value={formData.oneWord}
                  onChange={handleChange}
                  type="text"
                  placeholder="Type Here"
                  className="w-full border text-center mb-5 border-gray-300 px-3 py-2 text-md font-medium text-black transition focus:outline-none rounded-lg font-sans"
                />
                <button
                  onClick={proceedToNextSlide}
                  className="w-full inline-block shrink-0 border bg-lightPink px-12 py-2 text-md font-medium text-black transition hover:bg-opacity-5 focus:outline-none rounded-lg"
                >
                  Proceed
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full flex flex-col items-center">
                <img src="/image_two.png" alt="Picture of the Celebrant" className="w-full mt-5" />
                <h2 className="text-xl my-5 text-center">“Upload Your Favorite Photo of You and {nameCall} <br /> (Let's Reminisce Together!)”</h2>
                <p className="text-justify font-sans mb-5">Your photo will be posted on her Album Wall, creating a beautiful tribute to the cherished moments you shared. 📸✨
                </p>



                {!imageURL && (
                  <div className="relative overflow-hidden inline-block w-full h-16 mb-5">
                    <div className='w-full h-full border-slate-400 border-2 border-dotted flex items-center justify-center'>Click Here To Upload</div>
                    <input type="file"
                      onChange={handleImageUploadChange}
                      name="files"
                      accept="image/png, image/jpeg"
                      className="top-0 left-0 absolute opacity-0 w-full h-full cursor-pointer" />
                  </div>
                )}

                {imageURL && (
                  <img
                    // Ensure each element has a unique key
                    alt={imageURL} // Use optional chaining to avoid errors if attributes is undefined
                    className="aspect-square w-full rounded-md object-cover border-2 border-slate-400 my-5"
                    height="300"
                    src={imageURL} // Use optional chaining to avoid errors if attributes is undefined
                    width="300"
                  />
                )}



                <button
                  onClick={proceedToNextSlide}
                  className="w-full inline-block shrink-0 border bg-lightPink px-12 py-2 text-md font-medium text-black transition hover:bg-opacity-5 focus:outline-none rounded-lg"
                >
                  Proceed
                </button>
                <button
                  onClick={proceedToNextSlide}
                  className="w-full inline-block shrink-0 mt-2 bg-transparent px-12 py-2 text-md font-medium text-black"
                >
                  dont have photo?
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full flex flex-col items-center">
                <img src="/image_four.png" alt="Picture of the Celebrant" className="w-2/3 mt-5" />
                <h2 className="text-xl my-5 text-center">“Letter from the Heart”</h2>
                <p className="text-justify font-sans mb-5">Tell us how {nameCall} managed to teach, inspire, and make life way more fun! Share your favorite memories, lessons learned, and the moments that made you smile. 💌💕
                </p>

                <textarea
                  name="inspire"
                  value={formData.inspire}
                  onChange={handleChange}
                  placeholder="Write here"
                  className="w-full border mb-5 border-gray-300 px-3 py-2 text-md font-medium text-black transition focus:outline-none rounded-lg font-sans h-32"
                />

                <button
                  onClick={proceedToNextSlide}
                  className="w-full inline-block shrink-0 border bg-lightPink px-12 py-2 text-md font-medium text-black transition hover:bg-opacity-5 focus:outline-none rounded-lg"
                >
                  Proceed
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full flex flex-col items-center min-h-screen">
                <img src="/image_five.png" alt="Picture of the Celebrant" className="w-2/3 mt-5" />
                <h2 className="text-xl my-5 text-center">“The Ultimate Playlist Challenge"</h2>
                <p className="text-justify font-sans mb-5">Suggest one song that reminds you of her and let’s create the perfect playlist of good vibes and memories! 🎶🎉
                </p>

                <input
                  name="playlist"
                  value={formData.playlist}
                  onChange={handleChange}
                  type="text"
                  placeholder="Type Here"
                  className="w-full border text-center mb-5 border-gray-300 px-3 py-2 text-md font-medium text-black transition focus:outline-none rounded-lg font-sans"
                />

                <button
                  onClick={proceedToNextSlide}
                  className="w-full inline-block shrink-0 border bg-lightPink px-12 py-2 text-md font-medium text-black transition hover:bg-opacity-5 focus:outline-none rounded-lg"
                >
                  Proceed
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full flex flex-col items-center">
                <img src="/image_six.png" alt="Picture of the Celebrant" className="w-2/3 m-auto mt-5" />
                <h2 className="text-xl my-5 text-center">“A Space for Heartfelt Birthday Wishes”</h2>
                <p className="text-justify font-sans mb-5">Leave Your Messages of Love and Joy for {nameCall}'s Special Day 🎂🎈
                </p>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write here"
                  className="w-full border mb-5 border-gray-300 px-3 py-2 text-md font-medium text-black transition focus:outline-none rounded-lg font-sans h-32"
                />

                <button
                  onClick={registerUser}
                  className="w-full inline-block shrink-0 border bg-lightPink px-12 py-2 text-md font-medium text-black transition hover:bg-opacity-5 focus:outline-none rounded-lg"
                >
                  Proceed
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full flex flex-col items-center">
                <img src="/image_seven.png" alt="Picture of the Celebrant" className="w-2/3 m-auto mt-5" />
                <h2 className="text-xl my-5 text-center">“Thank You for Being Part of the Celebration!”</h2>
                <p className="text-justify font-sans mb-5">We’re so grateful for your participation in making this celebration extra special! Your fun quizzes, heartfelt messages, and music suggestions have brought this space to life.
                  It wouldn’t have been the same without you!</p>
                <p className="text-justify font-sans mb-5">
                  Thank you for taking the time to share your memories, love, and laughter. You’ve truly helped create a joyful and unforgettable experience for everyone.
                </p>
                <p className="text-justify font-sans mb-5">
                  Here’s to more moments like this—full of love, connection, and fun!
                </p>

                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full inline-block shrink-0 border bg-lightPink px-12 py-2 text-md font-medium text-black transition hover:bg-opacity-5 focus:outline-none rounded-lg"
                >
                  View Full Site
                </button>

              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

    </div>
  );
};

export default Home;