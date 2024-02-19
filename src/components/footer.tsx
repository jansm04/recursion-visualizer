import Link from "next/link";

const Footer = () => {
    return (
        <div className="mt-6 p-6 bg-[#1e1e1e] text-gray-300 text-center text-[14px]">
            Made by @jansm04 in 2024&nbsp; •&nbsp; 
            {<Link href='https://github.com/jansm04/recursion-visualizer' target="_blank">
                <div className="text-sky-600 inline"> Github </div>
            </Link>}
        </div>
    )
}

export default Footer;