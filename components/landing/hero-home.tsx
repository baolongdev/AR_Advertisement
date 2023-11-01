import { useEffect, useState } from "react";

const HeroHome = () => {
  return (
    <address className="section section--hero" id="virtual-museum">
      <div className="content">
        <div className="hero__elements-wrap">
          <div className="hero__elements">
            <div className="hero__elem mod--1">
              <div className="hero__elem-circle1-wrap mod--1">
                <div className="hero__elem-circle1 mod--1" />
              </div>
              <div className="hero__elem-circle1-wrap mod--2">
                <div className="hero__elem-circle1 mod--2" />
              </div>
            </div>
            <div className="hero__elem mod--12" />
            <div className="hero__elem mod--2" />
            <img width="165.5" src="/landing/snapshot00.png" loading="lazy" alt="" className="hero__elem mod--2" />
            <div className="hero__elem mod--3" />
            <div className="hero__elem mod--4" />
            <div className="hero__elem mod--5">
              <div className="hero__elem-circle3" />
            </div>
            <div className="hero__elem mod--14" />
            <div className="hero__elem mod--6" />
            <div className="hero__elem mod--13" />
            <div className="hero__elem mod--7">
              <div className="hero__elem-cube" />
            </div>
            <div className="hero__elem mod--8">
              <div className="hero__elem-circle2" />
            </div>
            <div className="hero__elem mod--9" />
            <img src="/landing/snapshot01.png" loading="lazy" width="128.5" alt="" className="hero__elem mod--10" />
            <div className="hero__elem mod--11" />
          </div>
        </div>
        <div className="hero__content">
          <div className="hero__over-heading">ARAD - ar advertising</div>
          <h1 className="hero__heading">
            <div className="hero__h1-span1">Trực tuyến</div>
            <br />
            {/* <span className="hero__h1-span2">&nbsp;</span> */}
            <span className="hero__h1-span3">Tương tác</span>
            <br />
            <span className="hero__h1-span1">Thuận lợi</span>
          </h1>
          <div className="hero__btn-wrap">
            <a data-remodal-target="form" href="#intro" className="btn btn--hero w-button">
              <span>Khám pháp ngay</span>
              &nbsp;
              <span className="btn__ico">&nbsp;</span>
            </a>
          </div>
        </div>
      </div>
    </address>
  )
}

export default HeroHome;