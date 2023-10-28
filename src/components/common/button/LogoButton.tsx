import { CSSProperties } from "react";
// import { Link } from "react-router-dom";

import Logo from "/public/img/logo.png";
import Link from "next/link";
import Image from 'next/image'

/**
 * 로고 버튼
 */
const LogoButton = ({ style }: { style?: CSSProperties }) => {
    const LinkStyle: CSSProperties = {
        height: "30px",
        marginRight: "1rem",
        ...style,
    };
    return (
        <Link href="/" style={LinkStyle}>
            {/* <p>바꾸기</p> */}
            <Image src={Logo} alt="로고" height={30} />
        </Link>
    );
};

export default LogoButton;
