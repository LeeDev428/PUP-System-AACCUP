import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [images, setImages] = useState<Array<{ id: number; filepath: string }>>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Fetch images from the backend
        axios.get('/welcome-images').then((response) => {
            setImages(response.data);
        });
    }, []);

    useEffect(() => {
        if (images.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 3) % images.length);
            }, 5000); // Slide every 5 seconds

            return () => clearInterval(interval);
        }
    }, [images]);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100); // Add a slight delay for the animation
    }, []);

    const navigateToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const visibleImages = images.length > 0
        ? [
            images[currentIndex],
            images[(currentIndex + 1) % images.length],
            images[(currentIndex + 2) % images.length],
        ]
        : [];

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div
                className={`flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] transition-opacity duration-1000 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <header className="w-full bg-white shadow-md fixed top-0 left-0 z-10">
                    <div className="container mx-auto flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                            <img
                                src="/img/PUPLogo.png"
                                alt="PUP Logo"
                                className="h-12 w-12"
                            />
                            <h1 className="text-xl font-bold text-[#1b1b18]">
                                Polytechnic University of the Philippines
                            </h1>
                        </div>
                        <nav className="flex items-center gap-6">
                            <Link
                                href="#"
                                className="text-sm font-medium text-[#1b1b18] hover:text-red-600"
                            >
                                Home
                            </Link>
                            <Link
                                href="#"
                                className="text-sm font-medium text-[#1b1b18] hover:text-red-600"
                            >
                                About PUP Calauan
                            </Link>
                            <Link
                                href={route('login')}
                                className="rounded-md bg-[#800000] px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-[#660000] transition"
                            >
                                Log in
                            </Link>
                        </nav>
                    </div>
                </header>
                <div className="text-center mt-24">
                    <h1 className="text-4xl font-extrabold mb-4 text-[#1b1b18] animate-fade-in">
                        Polytechnic University of the Philippines
                    </h1>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-700 animate-fade-in">
                        PUP Calauan Campus
                    </h2>
                </div>
                {images.length > 0 ? (
                    <div className="relative w-full max-w-4xl mx-auto mt-8 overflow-hidden">
                        <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${(currentIndex / 3) * 100}%)` }}>
                            {images.map((image, index) => (
                                <div key={image.id} className="flex-shrink-0 w-1/3 px-2">
                                    <img
                                        src={`/storage/${image.filepath}`}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {Array.from({ length: Math.ceil(images.length / 3) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index * 3)}
                                    className={`h-3 w-3 rounded-full ${
                                        currentIndex / 3 === index ? 'bg-[#800000]' : 'bg-gray-400'
                                    }`}
                                ></button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-8">
                        <p className="text-lg text-gray-600">No images available to display.</p>
                    </div>
                )}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-8">
                    <div className="relative p-6 border rounded-lg shadow-lg hover:shadow-xl transition bg-[#800000] text-white">
                        <div className="absolute top-4 left-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" />
                                <path d="M11 12.72L3.4 9.2 2 9.91l9 4.09 9-4.09-1.4-.71-7.6 3.52z" />
                            </svg>
                        </div>
                        <br />
                        <h3 className="text-lg font-bold mb-2">Bachelor of Science in Entrepreneurship</h3>
                        <br />
                        <button
                            onClick={() => navigateToSection('bse-section')}
                            className="inline-block mt-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-[#800000] hover:bg-gray-200"
                        >
                            Read more →
                        </button>
                    </div>
                    <div className="relative p-6 border rounded-lg shadow-lg hover:shadow-xl transition bg-[#800000] text-white">
                        <div className="absolute top-4 left-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" />
                                <path d="M11 12.72L3.4 9.2 2 9.91l9 4.09 9-4.09-1.4-.71-7.6 3.52z" />
                            </svg>
                        </div>
                        <br />
                        <h3 className="text-lg font-bold mb-2">Bachelor of Technology and Livelihood Education</h3>
                        <button
                            onClick={() => navigateToSection('btle-section')}
                            className="inline-block mt-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-[#800000] hover:bg-gray-200"
                        >
                            Read more →
                        </button>
                    </div>
                    <div className="relative p-6 border rounded-lg shadow-lg hover:shadow-xl transition bg-[#800000] text-white">
                        <div className="absolute top-4 left-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" />
                                <path d="M11 12.72L3.4 9.2 2 9.91l9 4.09 9-4.09-1.4-.71-7.6 3.52z" />
                            </svg>
                        </div>
                        <br />
                        <h3 className="text-lg font-bold mb-2">Bachelor of Science in Information Technology</h3>
                        <button
                            onClick={() => navigateToSection('bsit-section')}
                            className="inline-block mt-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-[#800000] hover:bg-gray-200"
                        >
                            Read more →
                        </button>
                    </div>
                </div>
                <div id="bse-section" className="mt-16 p-8 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-4">Bachelor of Science in Entrepreneurship</h2>
                    <p className="text-lg leading-relaxed">
                        The Bachelor of Science in Entrepreneurship program is designed to cultivate entrepreneurial skills and innovative thinking. Students are trained to identify business opportunities, develop comprehensive business plans, and manage resources effectively. The curriculum includes courses on marketing strategies, financial management, business ethics, and innovation. Graduates of this program are equipped to launch their own businesses, manage startups, or take on leadership roles in established organizations. The program emphasizes real-world applications through case studies, internships, and mentorship from industry professionals.
                    </p>
                </div>
                <div id="btle-section" className="mt-16 p-8 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-4">Bachelor of Technology and Livelihood Education</h2>
                    <p className="text-lg leading-relaxed">
                        The Bachelor of Technology and Livelihood Education program prepares students to become educators and leaders in the field of technology and livelihood. The curriculum covers a wide range of topics, including pedagogy, curriculum development, and technical skills in areas such as home economics, agriculture, and industrial arts. Students gain hands-on experience through teaching practicums and community engagement projects. Graduates are well-equipped to teach in secondary schools, work in community development, or pursue careers in technical training and consultancy. The program fosters a deep understanding of the role of technology in improving livelihoods and empowering communities.
                    </p>
                </div>
                <div id="bsit-section" className="mt-16 p-8 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-4">Bachelor of Science in Information Technology</h2>
                    <p className="text-lg leading-relaxed">
                        The Bachelor of Science in Information Technology program provides students with a robust foundation in IT concepts and practices. The curriculum includes courses on programming, database management, network administration, systems analysis, and cybersecurity. Students also gain practical experience through internships, capstone projects, and exposure to the latest technologies. Graduates are prepared for careers in software development, IT consulting, systems management, and more. The program emphasizes critical thinking, problem-solving, and adaptability to ensure graduates can thrive in the rapidly evolving tech industry.
                    </p>
                </div>
            </div>
        </>
    );
}
