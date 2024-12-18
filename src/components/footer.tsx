"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faTwitter, faInstagram, faTelegram} from "@fortawesome/free-brands-svg-icons"; // Импортируем иконку Telegram

export const Footer: React.FC = () => {
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
    return (
        <footer className="bg-gray-100 dark:bg-neutral-900 w-full py-8">
            <div className="container mx-auto flex flex-col items-center space-y-4">
                {/* Ссылки */}
                <div className="flex flex-col space-y-4 text-center">
                    <Link href="/" className="text-lg font-medium hover:text-blue-500 transition">
                        Главная
                    </Link>
                    <Link href={deftest || '/'} className="text-lg font-medium hover:text-blue-500 transition">
                        Пройти Тест
                    </Link>
                    <Link href="/doctors" className="text-lg font-medium hover:text-blue-500 transition">
                        Услуги
                    </Link>
                </div>

                {/* Email */}
                <div className="text-lg font-medium text-center">
                    <Link href="mailto:michail_bv@list.ru" className="hover:text-blue-500 transition">
                        michail_bv@list.ru
                    </Link>
                </div>

                {/* Социальные сети */}
                <div className="flex space-x-6 pt-4">
                    <Link href="https://web.telegram.org/k/#@Mikhail_V_Bochkarev" target="_blank" aria-label="Telegram">
                        <FontAwesomeIcon icon={faTelegram}
                                         className="text-2xl hover:text-blue-500 transition"/> {/* Добавляем иконку Telegram */}
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
