"use-client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import { IconAlertCircle, IconCheck, IconClock, IconEye, IconMoon, IconSun, IconUserHeart } from "@tabler/icons-react";

export function BentoGridDemo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Функция для проверки ширины экрана
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px - порог между мобильными и планшетными/десктопными экранами
    };

    // Вызов функции при загрузке и при изменении размера экрана
    handleResize();
    window.addEventListener("resize", handleResize);

    // Удаляем слушателя при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BentoGrid className="max-w-5xl mx-auto">
      {items
        .slice(0, isMobile ? 2 : items.length) // Отображаем только 2 карточки на мобильных экранах
        .map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={
              <div
                className="w-full h-60 rounded-xl"
                style={{
                  backgroundImage: `url(${item.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            }
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "Более 60 нарушений сна",
    description: "Бессонница и сонливость - основные симптомы всех нарушений сна",
    header: <Skeleton />,
    icon: <IconMoon className="h-8 w-8 text-neutral-500" />, // Луна
    backgroundImage: "/pensive-senior-man-thinking-something-while-sitting-awake-late-night-bedroom.jpg",
  },
  {
    title: "18,1%",
    description: "Распространенность синдрома апноэ во сне в РФ",
    header: <Skeleton />,
    icon: <IconAlertCircle className="h-8 w-8 text-neutral-500" />, // Восклицательный знак
    backgroundImage: "/handsome-young-man-morning-yawning-weekend-time.jpg",
  },
  {
    title: "39%",
    description: "Россиян испытывают избыточную дневную сонливость",
    header: <Skeleton />,
    icon: <IconSun className="h-8 w-8 text-neutral-500" />, // Солнце
    backgroundImage: "/portrait-yawning-student-girl-desk.jpg",
  },
  {
    title: "100%",
    description: "Жизнеугрожающие заболевания, такие как синдром апноэ во сне, не выявляются врачами",
    header: <Skeleton />,
    icon: <IconEye className="h-8 w-8 text-neutral-500" />, // Глаз
    backgroundImage: "/sick-woman-feeling-temperature-touching-forehead-with-hand.jpg",
  },
  {
    title: "9,7 лет",
    description: "Среднее время постановки диагноза нарколепсии от появления симптомов",
    header: <Skeleton />,
    icon: <IconClock className="h-8 w-8 text-neutral-500" />, // Часы
    backgroundImage: "/narcolepsya.png",
  },
  {
    title: "Сомнология",
    description: "Специализация по нарушениям сна, отсутствующая в России",
    header: <Skeleton />,
    icon: <IconCheck className="h-8 w-8 text-neutral-500" />, // Галочка
    backgroundImage: "/somnology.png",
  },
  {
    title: "Развитие апноэ обструктивного типа увеличивается с возрастом.",
    description: "От остановок дыхания во сне страдают примерно 3-7% мужчин и 2-5% женщин",
    header: <Skeleton />,
    icon: <IconUserHeart className="h-8 w-8 text-neutral-500" />, // Сердце пользователя
    backgroundImage: "/iStock-896820002-1.jpg",
  },
];
