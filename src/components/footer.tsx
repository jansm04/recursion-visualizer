import Link from "next/link";

const Footer = () => {
    return (
        <div className="p-6 bg-[#161616] text-gray-500 text-center text-[14px]">
            Made by @jansm04 in 2024&nbsp;&nbsp;•&nbsp;&nbsp; 
            {<Link href='https://github.com/jansm04/recursion-visualizer' target="_blank">
                <div className="text-sky-800 inline">Github</div>
            </Link>}
        </div>
    )
}

export default Footer;