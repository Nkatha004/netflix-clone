import React, { useState, useEffect } from 'react'
import './Nav.css'

function Nav() {

    const[show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
                handleShow(true);
            }else handleShow(false);
        });
        return () => {
            // window.removeEventListener("scroll");
        };
    }, []);

    return (
        <div className = {`nav ${show && "nav__black"}`}>
            <img
                className='nav__logo'
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
            />

            <img
                className='nav__avatar'
                src="https://th.bing.com/th/id/OIP.j6vT9PdxmLs98u018CBTugAAAA?pid=ImgDet&w=167&h=167&c=7&dpr=1.5"
                alt="Netflix Logo"
            />
        </div>
    )
}

export default Nav