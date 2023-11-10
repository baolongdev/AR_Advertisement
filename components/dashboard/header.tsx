import { useRef, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Header({ user_email }) {
  const [humburgerActive, setHumburgerActive] = useState(false);
  const headerHumburgerCloseRef = useRef(null);
  const menuRef = useRef(null);

  const toggleHumburger = () => {
    setHumburgerActive((prevActive) => !prevActive);

    if (!humburgerActive) {
      console.log(headerHumburgerCloseRef.current);
      setTimeout(() => {
        if (headerHumburgerCloseRef.current && menuRef.current) {
          headerHumburgerCloseRef.current.style.overflow = 'hidden';
          menuRef.current.style.height = '100%';
        }
      }, 300);
    } else {
      if (headerHumburgerCloseRef.current && menuRef.current) {
        headerHumburgerCloseRef.current.style.overflow = 'auto';
        menuRef.current.style.height = 'auto';
      }
    }
  };

  const navLinks = [
    { text: "Account", href: "/account" },
    { text: "Help", href: "/help" },
  ];


  return (
    <>
      <header className="header">
        <div className="header-absolute">
          <div className="content">
            <div className="header__columns">
              <div className="header__col">
                <a href="/" className="header__logo w-inline-block">
                  <img
                    height={67}
                    width={67}
                    src="assets/Logo.svg"
                    loading="eager"
                    alt=""
                    className="logo-img"
                  />
                </a>
              </div>
              <div className="header__col col--2">
                <nav className="header__nav">
                  <p className='header__nav-link'>
                    Hello, {user_email
                      ? (user_email.includes('@') ? user_email.split('@')[0] : user_email).substring(0, 18)
                      : 'Guest'
                    } 😄
                  </p>
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      data-anim="link"
                      className={`header__nav-link ${index === 0 ? 'w--current' : ''}`}
                    >
                      {link.text}
                    </a>
                  ))}
                  {/* <a href="#" className="-m-1.5 p-1.5"
                    onClick={}
                  >
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                  </a> */}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
