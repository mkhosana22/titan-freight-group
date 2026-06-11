import React from 'react';
import { BLOG_POSTS } from '../constants';
import { Plus } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <section className="py-24 bg-white selection:bg-logisticsOrange selection:text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Centered Header Section matching image inspiration */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-navy mb-4 tracking-tight">Recent Articles</h2>
          <div className="h-1 w-16 bg-logisticsOrange mx-auto mb-8"></div>
          <p className="text-lg text-charcoalGrey/80 font-medium">
            Explore stories that help you navigate the world of supply chain and transportation with ease.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {BLOG_POSTS.map((post, idx) => (
            <article key={idx} className="flex flex-col group cursor-pointer">
              {/* Image Container */}
              <div className="aspect-[16/10] mb-6 overflow-hidden rounded-sm shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                <img 
                  src={post.image || `https://picsum.photos/seed/${idx + 10}/800/600`} 
                  alt={post.title} 
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Date: Orange and Uppercase */}
              <p className="text-xs font-black text-logisticsOrange uppercase tracking-[0.1em] mb-3">
                {post.date}
              </p>
              
              {/* Title: Bold Navy */}
              <h3 className="text-2xl font-black text-navy mb-4 leading-tight group-hover:text-steelBlue transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              {/* Excerpt */}
              <p className="text-charcoalGrey/70 mb-6 line-clamp-3 leading-relaxed font-medium">
                {post.excerpt}
              </p>
              
              {/* READ MORE: Navy text with Orange Plus Icon */}
              <div className="mt-auto flex items-center gap-3 group/link">
                <div className="bg-logisticsOrange rounded-full p-1.5 transition-transform duration-300 group-hover/link:rotate-90">
                  <Plus className="w-4 h-4 text-white stroke-[4px]" />
                </div>
                <span className="text-sm font-black text-navy uppercase tracking-widest border-b-2 border-transparent group-hover/link:border-navy transition-all">
                  Read More
                </span>
              </div>
            </article>
          ))}
        </div>
        
        {/* Centered "View All" Button for better conversion balance */}
        <div className="text-center mt-20">
           <button className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-10 py-4 rounded-full font-black uppercase tracking-widest transition-all text-xs">
            View All Insights
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;