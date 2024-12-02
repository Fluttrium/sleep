"use client";
import React from "react";

import Image from "next/image";
import { StickyScroll } from "./shared/ui/sticky-scroll-reveal";

const content = [
  {
    title: "КУРС «КЛИНИЧЕСКАЯ СОМНОЛОГИЯ» С НАЧИСЛЕНИЕМ БАЛЛОВ НМО И БЕССРОЧНОЙ ПОДДЕРЖКОЙ",
    description:
      "Приглашаем вас на курс тематического усовершенствования врачей «Клиническая сомнология» - 36 часов, 36 баллов НМО и Сертификат прохождения курса",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
         <Image
          src="/Снимок экрана 2024-11-19 в 16.35.58.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: " Все выпускники курса будут добавлены в бессрочный чат поддержки",
    description:
      " Все выпускники курса будут добавлены в бессрочный чат поддержки, где опытный врач-сомнолог Бочкарев М.В. будет помогать с медицинскими вопросами, а инженер компании CPAP RF осуществлять поддержку по оборудованию, программному обеспечению, выбору и подбору СИПАП-аппаратов и масок",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/Снимок экрана 2024-11-19 в 17.44.37.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Специальности, по которым начисляются баллы НМО: ",
    description:
      "Терапия, общая врачебная практика (семейная медицина), педиатрия, пульмонология, гастроэнтерология, кардиология, оториноларингология, эндокринология, неврология, гериатрия, психиатрия, психотерапия, физиотерапия, функциональная диагностика",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
         <Image
          src="/Снимок экрана 2024-11-19 в 17.49.41.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Включайте курс «Клиническая сомнология» в свое расписание:",
    description:
      "Не обязательно присутствовать на каждой лекции онлайн. Курс будет доступен для просмотра в течение 2-х месяцев после окончания",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Image
          src="/Снимок экрана 2024-11-19 в 18.43.31.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];
export function StickyScrollRevealDemo1() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}