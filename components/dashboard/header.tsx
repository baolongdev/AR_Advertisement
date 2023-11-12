export default function Header({ user_email }) {
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
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
