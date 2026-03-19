'use client'

import { useParams } from 'next/navigation'; 
import Link from 'next/link';
import Image from 'next/image';
import { blogs } from '../../data/blogs';
import BreadcrumbNav from '../../components/BreadcrumbNav';

export default function BlogDetailPage() {
  const { id } = useParams();

  if (!id) {
    return <div>Loading...</div>;
  }

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#13111C] text-[#D2D2D4] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-[#FF6B6B]">404 - Blog Not Found</h1>
        <Link className="mt-6 text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors" href="/blogs">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#13111C] text-[#D2D2D4] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <nav className="flex justify-between items-center mb-8">
          <BreadcrumbNav />
        </nav>

        <header className="space-y-4 mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#DCB8B0]">{blog.title}</h1>
          <p className="text-sm text-[#D2D2D4]">{blog.date}</p>
          <div className="flex justify-center space-x-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-[#DCB8B0] text-[#13111C] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <article className="space-y-8">
          {blog.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                return <p key={index} className="leading-relaxed text-[#D2D2D4]">{block.value}</p>;
              case 'image':
                return (
                  <div key={index} className="my-6">
                    <Image
                      src={block.value}
                      alt={`Blog content image ${index + 1}`}
                      width={800}
                      height={450}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                );
              case 'heading':
                return <h2 key={index} className="text-2xl font-bold text-[#DCB8B0]">{block.value}</h2>;
              default:
                return null;
            }
          })}
        </article>
      </div>
    </div>
  );
}