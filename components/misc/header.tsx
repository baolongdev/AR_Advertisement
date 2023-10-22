import { useRef, useState } from 'react';
import Link from 'next/link';

const Header = () => {
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
    { text: "Home", href: "/" },
    { text: "Pricing", href: "/pricing" },
    { text: "Docs", href: "/docs" },
    { text: "Payments", href: "#audio-guide" },
  ];

  return (
    <>
      <header className="header">
        <div className="header-absolute">
          <div className="content">
            <div className="header__columns">
              <div className="header__col">
                <a href="#" className="header__logo w-inline-block">
                  <img
                    src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904040_logo.svg"
                    loading="eager"
                    alt=""
                    className="logo-img"
                  />
                </a>
              </div>
              <div className="header__col col--2">
                <nav className="header__nav">
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
                </nav>
              </div>
              <div className="header__col col--3">
                {/* Desktop sign in links */}
                <a data-remodal-target="form" data-anim="link" href="/login" className="header__login">login</a>
                <a data-remodal-target="form" href="/signup" className="btn btn--slim w-button">sign up</a>
              </div>
              <div className="header__humburger-wrap" onClick={toggleHumburger}>
                <div className="header__humburger">
                  <div className="header__humburger-line mod--1" />
                  <div className="header__humburger-line mod--2" />
                  <div className="header__humburger-line mod--3" />
                </div>
                <div className="header__humburger-close" ref={headerHumburgerCloseRef} />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="menu" ref={menuRef}>
        <div className="menu__content">
          <nav className="menu__nav">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`menu__nav-link${index === 0 ? ' w--current' : ''}${index === navLinks.length - 1 ? ' mod--last' : ''}`}
              >
                {link.text}
              </a>
            ))}
          </nav>
          <div className="menu__btns-wrap">
            <a data-anim="link" href="#" className="header__login">login</a>
            <a href="#" className="btn btn--slim w-button">sign up</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
