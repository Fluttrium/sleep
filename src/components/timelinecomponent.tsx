import Image from "next/image";
import React, {useEffect, useState} from "react";
import { Timeline } from "@/components/ui/timeline";
import { Title } from "@/components/shared/ui/title";
import Link from "next/link";

export function TimelineDemo() {
    const [deftest, setDeftest] = useState('')

    useEffect(() => {
        const fetchDeftest = async () => {
            try {
                const response = await fetch('/api/test/deftest');
                const data = await response.json();

                if (typeof data === 'string') {
                    // Гарантируем, что значение всегда начинается с "/"
                    setDeftest(data.startsWith('/') ? data : `/${data}`);
                } else {
                    console.error("Некорректный формат ответа:", data);
                    setDeftest('/'); // Устанавливаем значение по умолчанию
                }
            } catch (error) {
                console.error("Ошибка при загрузке дефолтного теста:", error);
                setDeftest('/'); // Устанавливаем значение по умолчанию при ошибке
            }
        };

        fetchDeftest();
    }, []);
  const data = [
    {
      title: "1 Этап",
      content: (
        <div>
          <Title
            text="Онлайн-проверка"
            size="2xl"
            className="text-neutral-800 dark:text-neutral-200 mb-2"
          />
          <Title
            text="✅ Потратьте 3 минуты, чтобы оценить свой профиль риска"
            size="md"
            className="text-neutral-800 dark:text-neutral-200 mb-8"
          />
            <Link href={deftest || '/'}>
          <button className="relative inline-flex items-center justify-center p-2 my-2">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
            <div
              style={{ fontWeight: 600 }}
              className="px-8 py-2 bg-white rounded-full text-lg md:text-xl relative group transition duration-200 text-black hover:bg-transparent hover:text-white"
            >
              Пройти тест
            </div>
          </button>
            </Link>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/side-view-professional-male-working-from-home.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hidden md:block" // Добавлен класс hidden md:block
            />
          </div>
        </div>
      ),
    },
    {
      title: "2 Этап",
      content: (
        <div>
          <Title
            text="Получаете результаты"
            size="2xl"
            className="text-neutral-800 dark:text-neutral-200 mb-2"
          />
          <Title
            text="✅ Получаете вероятные результаты сна"
            size="md"
            className="text-neutral-800 dark:text-neutral-200 mb-8"
          />
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/freepik__a-young-woman-with-long-brown-hair-wearing-a-green__99559.jpeg"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hidden md:block" // Добавлен класс hidden md:block
            />
          </div>
        </div>
      ),
    },
    {
      title: "3 Этап",
      content: (
        <div>
          <Title
            text="Диагностика"
            size="2xl"
            className="text-neutral-800 dark:text-neutral-200 mb-2"
          />
          <Title
            text="✅ Записываетесь на диагностику, консультации"
            size="md"
            className="text-neutral-800 dark:text-neutral-200 mb-8"
          />
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/p687251.jpg"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hidden md:block" // Добавлен класс hidden md:block
            />
          </div>
        </div>
      ),
    },
    {
      title: "4 Этап",
      content: (
        <div>
          <Title
            text="Прием у врача или онлайн"
            size="2xl"
            className="text-neutral-800 dark:text-neutral-200 mb-2"
          />
          <div className="mb-8">
            <Title
              text="✅ Наша команда приедет к вам домой и поможет установить небольшое устройство для записи сна"
              size="md"
              className="text-neutral-800 dark:text-neutral-200 mb-8"
            />
            <Title
              text="✅ Ваш врач сообщит результаты вашего обследования посредством медицинской консультации и может предложить вам соответствующее лечение"
              size="md"
              className="text-neutral-800 dark:text-neutral-200 mb-8"
            />
            <Title
              text="✅ Пожизненное сопровождение"
              size="md"
              className="text-neutral-800 dark:text-neutral-200 mb-8"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/freepik__a-middleaged-caucasian-man-lying-on-a-hospital-bed__54176.jpeg"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hidden md:block" // Добавлен класс hidden md:block
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
