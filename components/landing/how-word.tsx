import React from 'react';
import CardLandingPage from './CardLandingPage';

const HowWord = () => {
  const cardsData = [
    {
      title: "Tải lên file 3D và mô tả sản phẩm",
      description: "Gửi hình file 3D và mô tả về mẫu của bạn",
      imageSrc: "assets/landingPage/upload.png",
    },
    {
      title: "Điều chỉnh theo ý thích",
      description: "Kaedim's pipeline kicks off, creating a model based on your inputs",
      imageSrc: "assets/landingPage/config.jpeg",
    },
    {
      title: "Chia sẽ sản phẩm",
      description: "Bắt đầu chiến dịch quản cáo hoặc chia sẽ sản phẩm của bạn dưới dạng 3D",
      imageSrc: "/assets/model-images/axe-3-2.png",
    },
    {
      title: "Sử dụng API",
      description: "tích hợp sản phẩm AR vào website của riêng bạn",
      imageSrc: "/assets/model-images/axe-4.png",
    },
  ];

  return (
    <section id="howword" className="section">
      <div className="content mx-auto max-w-7xl p-6 flex flex-col justify-between gap-8 md:px-12 lg:my-0">
        <h2 className="mx-auto max-w-sm text-5xl font-bold md:mx-0 md:max-w-none md:text-left md:text-6xl">
          Cách hoạt động
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-4 lg:grid-cols-4 xl:gap-6">
          {cardsData.map((card, index) => (
            <CardLandingPage
              key={index}
              title={card.title}
              description={card.description}
              imageSrc={card.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWord;
