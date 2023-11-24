import { ModeToggle } from "@/components/mode-toggle";
import ProductPage from "@/components/shared/product-page";

export default function Home() {
    return (
        <main className='p-1'>
            <div className='text-center text-2xl md:text-5xl flex items-center justify-between'>
                <h1>Book Finder</h1>
                <div>
                    <ModeToggle />
                </div>
            </div>
            <div className='my-2 italic opacity-60'>
                <p>Find any book you want. Search all over the internet.</p>
            </div>
            <hr className='bg-zinc-900' />
            {/* Product Page */}
            <ProductPage />
        </main>
    );
}
