"use client";
import { formSchema, formSchemaType } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import axios, { AxiosResponse } from "axios";
import { Skeleton } from "../ui/skeleton";
import ResultCard from "./result-card";

const ProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<AxiosResponse<any, any>>();
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchString: "",
        },
    });

    const onSubmit = async (values: formSchemaType) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `/api/find?search=${values.searchString}`
            );
            setData(response);
        } catch (error) {
            setLoading(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
        form.reset();
    };
    return (
        <div>
            {/* Form */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col gap-2 my-1'
                >
                    <div className=''>
                        <FormField
                            control={form.control}
                            name='searchString'
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel>
                                        Enter a book name to search...
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='To kill a mockingbird'
                                            autoComplete='off'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div></div>

                    <Button className='md:hidden'>Search</Button>
                </form>
            </Form>
            <Separator />
            {/* Results */}
            <div>
                <h4 className='text-lg font-semibold opacity-80 italic'>
                    Your results show here.
                </h4>
                <div>
                    {loading ? (
                        <>
                            <div className='flex items-center space-x-4 mt-3 mb-4'>
                                <Skeleton className='h-36 w-36 rounded-full' />
                                <div className='space-y-2'>
                                    <Skeleton className='w-[200px] h-8' />
                                    <Skeleton className='w-[400px] h-8' />
                                    <Skeleton className='w-[300px] h-8' />
                                    <Skeleton className='w-[400px] h-8' />
                                </div>
                            </div>
                            <div className='flex items-center space-x-4 my-2'>
                                <Skeleton className='h-36 w-36 rounded-full' />
                                <div className='space-y-2'>
                                    <Skeleton className='w-[200px] h-8' />
                                    <Skeleton className='w-[400px] h-8' />
                                    <Skeleton className='w-[300px] h-8' />
                                    <Skeleton className='w-[400px] h-8' />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            {data?.data.items.map((item: any) => (
                                <div key={item.id}>
                                    <ResultCard
                                        href={item.accessInfo.webReaderLink}
                                        src={
                                            item.volumeInfo?.imageLinks
                                                ?.thumbnail ||
                                            "https://cdn2.vectorstock.com/i/1000x1000/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg"
                                        }
                                        id={item.id}
                                        etag={item.etag}
                                        title={item.volumeInfo.title}
                                        subtitle={item.volumeInfo.subtitle}
                                        authors={item.volumeInfo.authors}
                                        date={item.volumeInfo.publishedDate}
                                        description={
                                            item.volumeInfo.description
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
