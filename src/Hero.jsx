import Logo from "./assets/logo-lg.png";

const Hero = () => {
    return (
        <div className="bg-stone-800/95 border-gray-200 md:px-15">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto py-10">
                <img src={Logo} alt="" className="h-auto md:h-40" />
            </div>
        </div>
    );
}

export default Hero;