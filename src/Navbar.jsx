import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const textPrimary = "text-stone-900";
    const textSecondary = "text-stone-500";
    const Players = Math.floor(Math.random() * 100);
    const handleCopy = () => {
        const textToCopy = "play.pocketpixels.net";
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log("Text copied to clipboard:", textToCopy);
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="border-gray-200 bg-gray-100 md:px-15 h-13.75">
            <div className="max-w-screen-xl flex flex-col md:flex-row justify-end items-center md:align-middle md:justify-between mx-auto md:p-1.5 p-1">
                <div className="flex gap-5 justify-between md:order-2 space-x-3 md:space-x-2">
                    <div className="flex flex-col cursor-pointer select-none" onClick={handleCopy}>
                        <p className={`${textPrimary} align-middle`}>play.pocketpixels.net</p>
                        <p className={`${textSecondary} align-middle text-center text-sm`}>online: {Players}</p>
                    </div>
                    <button onClick={toggleMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-stone-500 hover:text-stone-900 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none " aria-controls="navbar-default" aria-expanded={isMenuOpen}>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-center m-5 md:m-0 ${isMenuOpen ? "flex" : "hidden"} w-full md:flex md:w-auto md:order-1`} id="navbar-default">
                    <ul className="font-medium flex flex-col mt-0 border-gray-100 rounded-lg bg-gray-100 md:flex-row md:space-x-4 rtl:space-x-reverse border-0 w-full text-center">
                        <li className="max-w-screen-xl">
                            <a href="#" className="block pt-1 pb-1.5 px-5 text-white bg-cyan-600 hover:bg-cyan-800 md:rounded-full" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className={`block pt-1 pb-1.5 px-5 ${textSecondary} rounded-full hover:bg-gray-100 hover:${textPrimary}`}>PocketDex</a>
                        </li>
                        <li>
                            <a href="#" className={`block pt-1 pb-1.5 px-5 ${textSecondary} rounded-full hover:bg-gray-100 hover:${textPrimary}`}>Vote</a>
                        </li>
                        <li>
                            <a href="#" className={`block pt-1 pb-1.5 px-5 ${textSecondary} rounded-full hover:bg-gray-100 hover:${textPrimary}`}>Shop</a>
                        </li>
                        <li>
                            <a href="#" className={`block pt-1 pb-1.5 px-5 ${textSecondary} rounded-full hover:bg-gray-100 hover:${textPrimary}`}>Modpack</a>
                        </li>
                        <li>
                            <a href="#" className={`block pt-1 pb-1.5 px-5 ${textSecondary} rounded-full hover:bg-gray-100 hover:${textPrimary}`}>Discord</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}

export default Navbar;