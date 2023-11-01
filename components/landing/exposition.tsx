import React, { useState } from "react";
import Transition from '../utils/transitions';

function Exposition() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsContent = [
    {
      title: "Không cần tải ứng dụng",
      description: "Mã QR hoạt động mà không cần ứng dụng chuyên dụng trên điện thoại thông minh và mắc kính AR/VR như Apple Vision Pro",
      iconPath: "M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z",
      activeTabContentSource: "/video/ar_demo.gif"
    },
    {
      title: "Trải nghiệm thực tế tăng cường ở mọi nơi",
      description: "Các doanh nghiệp và tổ chức có thể dễ dàng thêm trải nghiệm kỹ thuật số, tương tác vào các tài liệu này, khiến chúng trở nên hấp dẫn và mang tính thông tin hơn cho người dùng.",
      iconPath: "M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z",
      activeTabContentSource: "assets/multi-platform.png"
    },
    // {
    //   title: "Quản lý",
    //   description: "Sử dụng Obsidian để đồng bộ hóa và xử lý bài đăng cho phép mỗi bảo tàng quản lý và tùy chỉnh nội dung, tài liệu, và trải nghiệm trang web của họ dành cho người tham quan",
    //   iconPath: "M11.334 8.06a.5.5 0 00-.421-.237 6.023 6.023 0 01-5.905-6c0-.41.042-.82.125-1.221a.5.5 0 00-.614-.586 6 6 0 106.832 8.529.5.5 0 00-.017-.485z",
    //   activeTabContentSource: "assets/obs-sync.gif"
    // },
  ];

  return (
    <section id="exposition" className="section">
      {/* Section content */}
      <div className="content md:grid md:grid-cols-12 md:gap-6">
        {/* Content */}
        <div className="visit__content max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6">
          <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
            <h2 className="text-5xl sm:text-6xl md:pt-12 xl:pt-0">Tính năng nổi bật</h2>
            <p className="text-xl large mb-8 mt-3">Take your workflow to the next level and make quick capture actually quick</p>
            {/* Tabs buttons */}
            <div className="visit__datas mb-8 md:mb-0">
              {tabsContent.map((tab, index) => (
                <button
                  key={index}
                  className={`text-left flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 
                    ${activeTab === index ? 'bg-white' : 'bg-transparent shadow-md'}`}
                  onClick={() => setActiveTab(index)}
                >
                  <div>
                    <div className={`${activeTab === index ? 'text-black' : 'text-gray-600'} font-bold leading-snug tracking-tight mb-1`}>{tab.title}</div>
                    <div className={`${activeTab === index ? 'text-black' : 'text-gray-600'}`}>{tab.description}</div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 rounded-full shadow shrink-0 ml-3">
                    <svg className={`${activeTab === index ? 'text-black' : 'text-gray-600'} w-3 h-3 fill-current`} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d={tab.iconPath} fillRule="nonzero" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="visit_cards justify-center h-full flex items-center max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
          <div className="relative flex flex-col text-center lg:text-right">
            <Transition
              show={activeTab >= 0 && activeTab < tabsContent.length}
              appear={true}
              className="w-full"
              enter="transition ease-in-out duration-700 transform order-first"
              enterStart="opacity-0 translate-y-16"
              enterEnd="opacity-100 translate-y-0"
              leave="transition ease-in-out duration-300 transform absolute"
              leaveStart="opacity-100 translate-y-0"
              leaveEnd="opacity-0 -translate-y-16"
            >
              <div className="relative inline-flex flex-col">
                <img className="md:max-w-none mx-auto rounded w-full" src={tabsContent[activeTab].activeTabContentSource} />
              </div>
            </Transition>
          </div>
        </div>
      </div>
      <div className="visit__shine-wrap">
        <img
          src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904076_bg_shine-01.png"
          loading="eager"
          sizes="100vw"
          srcSet="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904076_bg_shine-01-p-500.png 500w, https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904076_bg_shine-01.png 1306w"
          alt=""
          className="visit__shine-img"
        />
      </div>
      <div className="visit__shine-mob-wrap">
        <img
          src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904076_bg_shine-01.png"
          loading="eager"
          sizes="(max-width: 479px) 400px, 100vw"
          srcSet="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904076_bg_shine-01-p-500.png 500w, https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904076_bg_shine-01.png 1306w"
          alt=""
          className="visit__shine-mob-img"
        />
      </div>
    </section>
  );
}

export default Exposition;
