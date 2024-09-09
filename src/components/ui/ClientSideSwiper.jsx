'use client';

import { useEffect } from 'react';
import { Swiper } from 'swiper/react';
import { Thumbs, Autoplay, Parallax, EffectFade } from 'swiper/modules';
import 'swiper/css';

export default function ClientSideSwiper() {
  const moduleMap = {
    Thumbs,
    Autoplay,
    Parallax,
    EffectFade,
  };

  const getSwiperModules = (moduleNames) => {
    return moduleNames.map((name) => moduleMap[name]);
  };

  useEffect(() => {
    const swiper = document.querySelectorAll('.swiper');
    swiper.forEach((element) => {
      const config = element.dataset.config ? JSON.parse(element.dataset.config) : {};
      const modules = getSwiperModules(config.modules || []);
      new Swiper(element, {
        ...config,
        modules,
      });
    });
  }, []);

  return null; // JSX는 필요 없음
}
