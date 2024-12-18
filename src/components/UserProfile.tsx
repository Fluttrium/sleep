"use client";
import {useSession, signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {TestChart} from "@/components/ui/chart2";
import {DesiesLinksNDocrors} from "@/components/prifilecomp/desiesLinksNDocrors";
import {useEffect, useState} from "react";

export function UserProfile() {
    const {data: session} = useSession();
    const userId = String(session?.user.email);
    const [chartData, setChartData] = useState<{ month: string; desktop: number }[]>([]);
    const [doctors, setDoctors] = useState([]); // Состояние для врачей
    const [posts, setPosts] = useState([]); // Состояние для постов
    const [dataFetched, setDataFetched] = useState(false);

    // Функция для загрузки данных
    const fetchData = async () => {
        if (!userId) return;

        try {
            const response = await fetch("/api/user/test", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userId}),
            });

            if (response.ok) {
                const result = await response.json();
                if (result?.diseasesList?.length > 0) {
                    const formattedData = result.diseasesList.map((item: string) => {
                        const parsedItem = JSON.parse(item);
                        return {month: parsedItem.title, desktop: parsedItem.score};
                    });
                    setChartData(formattedData);
                    localStorage.setItem("testResults", JSON.stringify(formattedData));
                    setDataFetched(true);
                }
            } else {
                const storedData = localStorage.getItem("testResults");
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    setChartData(parsedData);
                    setDataFetched(true);
                }
            }
        } catch (error) {
            console.error("Error loading chart data:", error);
        }
    };

    // Функция для отправки данных о максимальном диагнозе
    const fetchPostsNDoctors = async () => {
        try {
            const maxDisease = chartData.reduce(
                (max, current) => (current.desktop > max.desktop ? current : max),
                {month: "", desktop: -Infinity}
            );

            if (maxDisease.desktop === -Infinity) return;

            console.log("Sending the best disease:", maxDisease);

            const response = await fetch("/api/test/profiletest", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title: maxDisease.month}),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Fetched disease data with doctors and posts:", result);
                setDoctors(result.disease.doctors); // Сохраняем врачей
                setPosts(result.disease.posts); // Сохраняем посты
            } else {
                console.error("Failed to fetch disease data:", response.statusText);
            }
        } catch (error) {
            console.error("Error in fetchPostsNDoctors:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    useEffect(() => {
        if (dataFetched && chartData.length > 0) {
            fetchPostsNDoctors();
        }
    }, [dataFetched]);

    return (
        <div className="flex flex-row w-screen h-full justify-between px-10 py-11">
            <div className="flex flex-col mx-3 basis-1/2">
                {/* Передаём врачей и посты в компонент */}
                <DesiesLinksNDocrors doctors={doctors} posts={posts}/>


            </div>
            <div className="flex flex-col mx-3 basis-1/2">
                {session?.user?.id && <TestChart chartData={chartData}/>}
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Аккаунт</TabsTrigger>
                        <TabsTrigger value="password">Пароль</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Аккаунт</CardTitle>
                                <CardDescription>
                                    Внесите изменения в свой аккаунт здесь. Нажмите &quot;Сохранить&quot;, когда
                                    закончите.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Имя</Label>
                                    <Input id="name" defaultValue=""/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Имя пользователя</Label>
                                    <Input id="username" defaultValue=""/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Сохранить изменения</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Пароль</CardTitle>
                                <CardDescription>
                                    Измените свой пароль здесь. После сохранения вы будете выведены из
                                    системы.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Текущий пароль</Label>
                                    <Input id="current" type="password"/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Новый пароль</Label>
                                    <Input id="new" type="password"/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Сохранить пароль</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div
                    className="mt-8 w-full h-8 bg-red-600 rounded-3xl flex items-center justify-center text-stone-50 font-semibold"
                    onClick={() => signOut({callbackUrl: "/"})}
                >
                    Выйти из аккаунта
                </div>
            </div>


        </div>
    );
}
