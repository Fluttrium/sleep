import {Button} from "@/components/ui/button";
import {MdEditor, config, ToolbarNames} from "md-editor-rt";
import React, {useState} from "react";
import {usePostRedactorStore} from "@/app/admin/_store/adminpageStore";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Category, Post} from "@prisma/client";
import {Badge} from "@/components/ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Plus} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";


config({
    editorConfig: {
        languageUserDefined: {
            'rus': {
                toolbarTips: {
                    bold: 'жирный',
                    underline: 'underline',
                    italic: 'италик',
                    strikeThrough: 'strikeThrough',
                    title: 'Оглавление',
                    sub: 'подписка',
                    sup: 'superscript',
                    quote: 'quote',
                    unorderedList: 'unordered list',
                    orderedList: 'ordered list',
                    task: 'список задач',
                    codeRow: 'inline code',
                    code: 'block-level code',
                    link: 'ссылка',
                    image: 'изображение',
                    table: 'таблица',
                    mermaid: 'mermaid',
                    katex: 'formula',
                    revoke: 'revoke',
                    next: 'undo revoke',
                    save: 'сохранить',
                    prettier: 'prettier',
                    pageFullscreen: 'fullscreen in page',
                    fullscreen: 'fullscreen',
                    preview: 'preview',
                    htmlPreview: 'html preview',
                    catalog: 'catalog',
                    github: 'source code'
                },
                titleItem: {
                    h1: 'Хедер 1',
                    h2: 'Хедер 2',
                    h3: 'Хедер 3',
                    h4: 'Хедер 4',
                    h5: 'Хедер 5',
                    h6: 'Хедер 6'
                },
                imgTitleItem: {
                    link: 'Добавить ссылку на изображение',
                    upload: 'Загрузить ',
                    clip2upload: 'Clip Upload'
                },
                linkModalTips: {
                    linkTitle: 'Add Link',
                    imageTitle: 'Add Image',
                    descLabel: 'Desc:',
                    descLabelPlaceHolder: 'Enter a description...',
                    urlLabel: 'Link:',
                    urlLabelPlaceHolder: 'Enter a link...',
                    buttonOK: 'OK'
                },
                clipModalTips: {
                    title: 'Crop Image',
                    buttonUpload: 'Upload'
                },
                copyCode: {
                    text: 'Copy',
                    successTips: 'Copied!',
                    failTips: 'Copy failed!'
                },
                mermaid: {
                    flow: 'flow',
                    sequence: 'sequence',
                    gantt: 'gantt',
                    class: 'class',
                    state: 'state',
                    pie: 'pie',
                    relationship: 'relationship',
                    journey: 'journey'
                },
                katex: {
                    inline: 'inline',
                    block: 'block'
                },
                footer: {
                    markdownTotal: 'Word Count',
                    scrollAuto: 'Scroll Auto'
                }
            }
        }
    }
});


export function PostRedacor() {
    const {createdPost, setCreatedPost, setIsCreatingPost} = usePostRedactorStore();
    const [text, setText] = React.useState(() => createdPost ? createdPost.body || "" : "");
    const [language] = React.useState("rus");
    const toolbarex: ToolbarNames[] = ['github', 'htmlPreview'];
    const [categoryName, setCategoryName] = React.useState<string>("");
    const [categoryLoading, setCategoryLoading] = React.useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [categories2, setCategories2] = useState<Category[]>([]);// Хранение категорий
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const fetchCategoriesbyPost = async () => {
        if (!createdPost) return; // Если пост не создан, ничего не делать
        try {
            const response = await fetch(`/api/admin/post/${createdPost.id}/categories`);
            const data = await response.json();
            setCategories(data.postCategories); // Устанавливаем категории, связанные с постом
            setCategories2(data.allCategories); // Устанавливаем все категории
        } catch (error) {
            console.error("Ошибка при получении категорий:", error);
        }
    };




    React.useEffect(() => {
        fetchCategoriesbyPost();
        setImageUrl(createdPost!.image || "");
    }, [createdPost]); // Зависимость от createdPost

    const onUploadImg = async (files: File[], callback: (urls: string[]) => void) => {
        try {
            const formData = new FormData();
            files.forEach((file) => formData.append("file", file));
            formData.append("id", createdPost!.id.toString());

            const response = await fetch("/api/upload/post2", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                callback([data.fileUrl]);
            } else {
                console.error("Ошибка загрузки изображения:", await response.json());
            }
        } catch (error) {
            console.error("Ошибка загрузки изображения:", error);
        }
    };

    const handleSave = async () => {
        if (!createdPost) return;

        const {id, title} = createdPost;
        const response = await fetch(`/api/admin/post`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, title, body: text, imageUrl: imageUrl}),
        });

        if (response.ok) {
            const updatedPost = await response.json();
            console.log('Пост обновлён:', updatedPost);
        } else {
            const errorData = await response.json();
            console.error('Ошибка при обновлении поста:', errorData.message);
        }
    };

    const handelCreateNSubmitCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setCategoryLoading(true);
        if (!categoryName) {
            alert("Пожалуйста, заполните все поля");
            setCategoryLoading(false);
            return;
        }
        try {
            const response = await fetch("/api/admin/post/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: categoryName,
                    posts: createdPost!.id
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при создании категории");
            }

            setCategoryName("");
            alert("Категория успешно создана");
            await fetchCategoriesbyPost(); // Обновляем категории после создания

        } catch (error) {
            console.error("Ошибка:", error);
            setError("Ошибка при создании категории. Пожалуйста, попробуйте еще раз.");
        } finally {
            setCategoryLoading(false);
        }
    };

    const handleRemoveCategoryFromPost = async (categoryId: number) => {
        try {
            const response = await fetch(`/api/admin/post/${createdPost?.id}/categories`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({categoryId}),
            });

            if (response.ok) {
                const updatedPost = await response.json();
                console.log('Категория удалена из поста:', updatedPost);
                fetchCategoriesbyPost(); // Обновляем список категорий после удаления
            } else {
                const errorData = await response.json();
                console.error('Ошибка при удалении категории из поста:', errorData.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleAddCategoryToPost = async (categoryId: number) => {
        try {
            const response = await fetch(`/api/admin/post/${createdPost?.id}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({categoryId}),
            });

            if (response.ok) {
                const updatedPost = await response.json();
                console.log('Категория добавлена к посту:', updatedPost);
                fetchCategoriesbyPost(); // Обновляем список категорий после добавления
            } else {
                const errorData = await response.json();
                console.error('Ошибка при добавлении категории к посту:', errorData.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUploadImage = async () => {
        if (!image) {
            alert("Пожалуйста, выберите изображение.");
            return;
        }

        if (!createdPost?.id) {
            alert("Ошибка: пост не найден.");
            return;
        }

        const formData = new FormData();
        formData.append("file", image);
        formData.append("id", createdPost.id.toString());

        try {
            const response = await fetch("/api/upload/post", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Фото успешно загружено! ${data.fileUrl}`);
                setImageUrl(data.fileUrl);
            } else {
                alert("Ошибка загрузки изображения.");
            }
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            alert("Произошла ошибка при загрузке изображения.");
        }
    };



    return (
        <div className="relative flex flex-col h-full">
            <div className="absolute top-0 left-0 space-x-2.5">

                <Button variant="destructive" onClick={() => {
                    setCreatedPost(null);
                    setIsCreatingPost(false);
                }}>
                    Закрыть
                </Button>
                <Button className='px-4' onClick={handleSave}>
                    Сохранить
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Редактировать категории</Button>
                    </DialogTrigger>

                    <DialogContent aria-describedby="dialog-description">
                        <p id="dialog-description">Пожалуйста, заполните форму для создания новой категории.</p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size='icon'>
                                    <Plus/>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <form className="grid gap-4 py-4" onSubmit={handelCreateNSubmitCategory}>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="text" className="text-right">
                                            Название категории
                                        </Label>
                                        <Input
                                            id="text"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            required
                                            className="col-span-3"
                                        />
                                    </div>
                                    {error && <div className="text-red-500">{error}</div>}
                                    <DialogFooter>
                                        <Button type="submit">
                                            {categoryLoading ? "Создание..." : "Создать категорию"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Категории поста</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.length > 0 ? (
                                    categories.map((category: Category) => (
                                        <TableRow key={category.id}>
                                            <TableCell>
                                                <Badge className='m-2'>{category.name}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="destructive"
                                                        onClick={() => handleRemoveCategoryFromPost(category.id)}>
                                                    Удалить
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2}>Нет категорий для этого поста</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Категории</TableHead>
                                    <TableHead>Добавить</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories2.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleAddCategoryToPost(category.id)}>Добавить</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='px-4' onClick={handleSave}>
                            Добавть обложку
                        </Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby="dialog-description">
                        <Card>
                            <CardHeader>
                                <CardTitle>Image</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-7">
                                <div className="space-y-1">
                                    <Label htmlFor="new">Новый Image</Label>
                                    <Input id="new" type="file" accept="image/*" onChange={handleImageChange}/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleUploadImage}>Загрузить фото</Button>
                                <img
                                    src={imageUrl!} // Укажите путь к изображению
                                    alt="Описание изображения"
                                    width={400} // Ширина изображения
                                    height={500} // Высота изображения
                                />
                            </CardFooter>

                        </Card>
                    </DialogContent>
                </Dialog>

            </div>

            <div className="flex-grow mt-10 overflow-hidden">
                <div className="h-full w-full">
                    <MdEditor
                        toolbarsExclude={toolbarex}
                        language={language}
                        modelValue={text}
                        onChange={setText}
                        style={{height: '100%', width: '100%'}}
                        previewTheme="default"
                        onUploadImg={onUploadImg}
                    />
                </div>
            </div>
        </div>
    );
}