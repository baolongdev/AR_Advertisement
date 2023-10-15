import Link from 'next/link';
import React, { useState } from 'react';
import { subscribeCustomerIo } from '../utils/newsletter';

function Footer() {
  const [newsletterSubbed, setNewsletterSubbed] = useState(false);
  const subscribeNewsletter = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const success = subscribeCustomerIo(email);
    if (success) {
      setNewsletterSubbed(true);
    }
  }
  return (
    <footer className='footer'>
      <div
        className="content mod--footer"
      >
        <div className="footer__columns">
          <div className="footer__col col--1">
            <a href="#" className="footer__logo w-inline-block">
              <img
                src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904040_logo.svg"
                loading="eager"
                alt=""
                className="logo-img"
              />
            </a>
            <div className="footer__desc">
              . . .<br />
              BẢO TÀNG SỐ 3D
              <br />
              E-MUSEUM
            </div>
          </div>
          <div className="footer__col col--2">
            <nav className="footer__nav">
              <a href="#virtual-museum" data-anim="link" className="footer__nav-link">
                MUSEUM
              </a>
              <a href="#exposition" data-anim="link" className="footer__nav-link">
                Tính năng
              </a>
              <a href="#about" data-anim="link" className="footer__nav-link">
                Về chúng tôi
              </a>
              <a href="#audio-guide" data-anim="link" className="footer__nav-link">
                Sản phẩm
              </a>
            </nav>
            <div className="footer__social">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="footer__soc-link w-inline-block"
              >
                <img
                  src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd7812490405c_ico_facebook-f.svg"
                  loading="lazy"
                  alt=""
                />
              </a>
              <a
                href="https://www.behance.net/"
                target="_blank"
                className="footer__soc-link w-inline-block"
              >
                <img
                  src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd7812490405b_ico_behance.svg"
                  loading="lazy"
                  alt=""
                />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                className="footer__soc-link w-inline-block"
              >
                <img
                  src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd7812490405a_ico_linkedin.svg"
                  loading="lazy"
                  alt=""
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="footer__soc-link w-inline-block"
              >
                <img
                  src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904058_ico_instagram.svg"
                  loading="lazy"
                  alt=""
                />
              </a>
              <a
                href="https://dribbble.com/"
                target="_blank"
                className="footer__soc-link w-inline-block"
              >
                <img
                  src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904059_ico_dribbble.svg"
                  loading="lazy"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="footer__col col--3">
            <div className="footer__form-title">
              HÃY LÀ NGƯỜI ĐẦU TIÊN NHẬN
              <br />
              TIN TỨC BẢO TÀNG SỐ E-MUSEUM
            </div>
            <div className="form-block mod--footer w-form">
              <form
                id="wf-form-footer"
                name="wf-form-footer"
                data-name="footer"
                method="get"
                className="form"
                data-wf-page-id="651c348dccebd78124904023"
                data-wf-element-id="631f9564-0461-3f4b-d1f8-cfe9ceca4d78"
                aria-label="footer"
              >
                <input
                  type="email"
                  className="input w-input"
                  maxLength={256}
                  name="email"
                  data-name="Email"
                  placeholder="E-MAIL"
                  id="email"
                />
                <div className="form__btn-wrap">
                  <div form-submitted="anim" className="btn btn--slim mod--form">
                    Đăng ký
                  </div>
                  <div className="form__submit-result-wrap">
                    <div form-submitted="anim" className="form__submit-result">
                      <img
                        src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904078_ico-cheked.svg"
                        loading="lazy"
                        alt=""
                        className="form__submit-result-ico"
                      />
                    </div>
                  </div>
                  <input
                    type="submit"
                    defaultValue="Subscribe"
                    data-wait="Please wait..."
                    className="form__submit w-button"
                  />
                </div>
              </form>
              <div
                className="form__succes w-form-done"
                tabIndex={-1}
                role="region"
                aria-label="footer success"
              >
                <div>
                  Your submission <br />
                  has been received!
                </div>
              </div>
              <div
                className="w-form-fail"
                tabIndex={-1}
                role="region"
                aria-label="footer failure"
              >
                <div>Ối! Đã xảy ra lỗi khi gửi biểu mẫu.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__social mod--mob">
          <a
            href="https://www.facebook.com/halolabteam/"
            target="_blank"
            className="footer__soc-link w-inline-block"
          >
            <img
              src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd7812490405c_ico_facebook-f.svg"
              loading="lazy"
              alt=""
            />
          </a>
          <a
            href="https://www.behance.net/halolab"
            target="_blank"
            className="footer__soc-link w-inline-block"
          >
            <img
              src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd7812490405b_ico_behance.svg"
              loading="lazy"
              alt=""
            />
          </a>
          <a
            href="https://www.linkedin.com/company/halolabteam/"
            target="_blank"
            className="footer__soc-link w-inline-block"
          >
            <img
              src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd7812490405a_ico_linkedin.svg"
              loading="lazy"
              alt=""
            />
          </a>
          <a
            href="https://www.instagram.com/halolabteam/"
            target="_blank"
            className="footer__soc-link w-inline-block"
          >
            <img
              src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904058_ico_instagram.svg"
              loading="lazy"
              alt=""
            />
          </a>
          <a
            href="https://dribbble.com/halolab"
            target="_blank"
            className="footer__soc-link w-inline-block"
          >
            <img
              src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904059_ico_dribbble.svg"
              loading="lazy"
              alt=""
            />
          </a>
        </div>
      </div>

      <div className="footer__elements">
        <img src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904055_footer_hand.png" loading="eager" width="131.5" alt="" className="footer__elem mod--1" />
        <img src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904056_footer_rectangle.png" loading="eager" alt="" className="footer__elem mod--2" />
        <div data-w-id="0becfdc3-d3f2-402c-381a-1d12f18fdf87" className="footer__elem-mob">
          <img src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904055_footer_hand.png" loading="eager" alt="" width="131.5" className="footer__elem mod--3" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
