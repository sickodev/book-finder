import { trimDescription } from "@/lib/trim-description";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ResultCardProps {
    href: string;
    src: string;
    id: string;
    etag: string;
    title: string;
    subtitle: string;
    authors: string[];
    date: string;
    description: string;
}

const ResultCard = ({
    href,
    src,
    id,
    etag,
    title,
    subtitle,
    authors,
    date,
    description,
}: ResultCardProps) => {
    const desc = trimDescription(description);
    return (
        <Link href={href}>
            <div className='border rounded-3xl p-3 mx-1 flex space-x-2 items-center my-2'>
                <div className='w-48 h-48 relative'>
                    <Image
                        src={src}
                        alt='book-name'
                        fill
                        className='rounded-2xl'
                    />
                </div>
                <div className='w-full space-y-1'>
                    <div className='text-sm opacity-60 flex items-center justify-between'>
                        <p>Id: {id}</p>
                        <p>eTag: {etag}</p>
                    </div>
                    <div>
                        <h5 className='text-xl font-semibold'>{title}</h5>
                        <p className='opacity-60'>{subtitle}</p>
                    </div>
                    <div className='flex justify-between'>
                        <h5 className='text-xl font-semibold'>
                            by{" "}
                            {authors &&
                                authors.map((author) => (
                                    <span key={author}>{author},</span>
                                ))}
                        </h5>
                        <p className='opacity-60'>on {date}</p>
                    </div>
                    <div className='text-sm text-justify opacity-60 w-[700px] h-32'>
                        <p>{desc}...</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ResultCard;
