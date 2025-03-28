import Logo from "./assets/logo-lg.png";
import Background from "./assets/background-dark.png";

const Hero = () => {
    return (
        <div className=" border-gray-200 bg-fixed bg-center bg-repeat" style={{ backgroundImage: `url(${Background})` }}>
            {/* <div className="bg-gray-900/70 md:px-15"> */}
            <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto py-10">
                <img src={Logo} alt="" className="h-auto md:h-40" />
            </div>
            {/* </div> */}
        </div >
    );
}

export default Hero;