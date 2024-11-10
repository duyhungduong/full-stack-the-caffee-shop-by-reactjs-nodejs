import React, { useEffect, useState } from 'react'
import Videobackgr from '../assest/Videobackgr.mp4'
import Video2 from '../assest/Black Modern Coffee Video.mp4'
import image1 from '../assest/imagereplace.png'
import image2 from '../assest/Black Modern Coffee Video.png'


const VideoBackground = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(true);
    const [videoSrc, setVideoSrc] = useState(Video2);
    const [imgaeSrc, setImaeSrc] = useState(image2);

    // Phát hiện kích thước màn hình và thay đổi video nguồn tương ứng
    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
            if (isLargeScreen) {
                setVideoSrc(Video2);
                setImaeSrc(image2)
            } else {
                setVideoSrc(Videobackgr);
                setImaeSrc(image1)
            }
        };

        handleResize(); // Chạy khi component được mount
        window.addEventListener('resize', handleResize); // Cập nhật khi thay đổi kích thước màn hình

        // Dọn dẹp sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleVideoError = () => {
        setIsVideoLoaded(false); // Chuyển sang ảnh nếu video không tải được
    };

    const handleScroll = () => {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    };

    // Vô hiệu hóa chuột phải để ngăn tải xuống
    const disableRightClick = (e) => {
        e.preventDefault();
    };

    return (
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
            {/* Video nền hoặc ảnh fallback */}
            {isVideoLoaded ? (
                <video
                    className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 object-cover"
                    src={videoSrc}
                    type="video/mp4"
                    autoPlay
                    muted
                    loop
                    controlsList="nodownload" // Ngăn tải xuống trên trình duyệt hỗ trợ
                    onError={handleVideoError}
                    onContextMenu={disableRightClick} // Ngăn chuột phải
                />
            ) : (
                <img
                    className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 object-cover"
                    src={imgaeSrc}
                    alt="Fallback Coffee Shop Background"
                />
            )}

            {/* Lớp phủ */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                {/* Nút Scroll */}
                <button
                    onClick={handleScroll}
                    className="z-10 px-4 py-2 font-serif md:px-6 md:py-3 bg-white text-gray-800 text-sm md:text-base font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                >
                    Buy and Booking Now
                </button>
            </div>
        </div>
    );
};

export default VideoBackground;