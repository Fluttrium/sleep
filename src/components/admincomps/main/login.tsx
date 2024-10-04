"use client";

import { useRouter } from "next/navigation"; // Импортируем useRouter
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Логин должен быть длиннее.",
    }),
    password: z.string().min(6, {
        message: "Пароль должен быть длиннее.",
    }),
});

export function LoginAdminForm() {
    const router = useRouter(); // Инициализируем useRouter
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { handleSubmit, formState: { isSubmitting } } = form;

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await fetch('/api/useradmin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                toast({
                    title: "Успешный вход",
                    description: result.message,
                });
                router.push('/admin'); // Перенаправление на /admin/panel
            } else {
                toast({
                    title: "Ошибка входа",
                    description: result.message || "Пожалуйста, проверьте ваши учетные данные.",
                });
            }
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            toast({
                title: "Ошибка",
                description: "Не удалось выполнить запрос. Попробуйте позже.",
            });
        }
    }

    return (
        <section className="h-screen flex justify-center items-center">
            <div className="w-80 items-center justify-center border-2 border-blue-600 rounded-3xl">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="justify-center flex space-y-6 flex-col px-3 py-5">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className='justify-center flex flex-col'>
                                    <FormLabel className="justify-center">Никнейм</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Логин" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="*****" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Вход..." : "Войти"}
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    );
}