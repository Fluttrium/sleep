"use client"
import {NewsGroupList} from "@/components/shared/news-grouplist";
import {TopBar} from "@/components/shared/top-bar";
import {Hero} from "@/components/shared/hero";
import React from "react";
import Steps from "@/components/shared/steps";
import {Container} from "@/components/shared/ui/container";
import {SleepStats} from "@/components/shared/ui/blocks";
import {GlareCard} from "@/components/ui/glare-card";
import TeamCard from "@/components/shared/team";
import Information from "@/components/shared/information";
import Footer from "@/components/footer";
import {BentoGrid} from "@/components/ui/bento-grid";
import {BentoGridDemo} from "@/components/ui/bento-gridDemo";
import {FeaturesSectionDemo} from "@/components/ui/services";
import {Article} from "@/components/shared/ui/article";
import {PostPageComp} from "@/components/postsforuser/PostPageComp";


export default function Home() {

    return (
        <>
            <div className=" bg-cover bg-center min-h-screen">

                <div className="absolute flex justify-center w-screen">
                    <TopBar/>
                </div>
                {/*новый выриант hero*/}
                <div id="Тест">

                    <Hero/>
                </div>
                <div id="Услуги">

                    <FeaturesSectionDemo/>
                </div>

                {/* Проблемы со сном */}
                <div id="Нарушение сна">
                    <SleepStats/>
                </div>

                {/* Статьи */}
                <div id="Статьи">
                    <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white py-4">
                        Изучите проблемы со сном подробнее
                    </h4>
                    <PostPageComp/>
                </div>


                <div id="Как мы можем помочь вам" className="mt-10 sm:mt-20 md:mt-20 lg:mt-20">
                    <Steps/>
                </div>
                <div id="Команда">
                    <TeamCard/>
                </div>

                <Information/>
                <Footer/>
            </div>
        </>
    );
}
