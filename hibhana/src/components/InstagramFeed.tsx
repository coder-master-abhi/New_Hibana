import { useState, useEffect } from "react";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface InstagramPost {
  id: string;
  imageUrl: string;
  link: string;
  likes?: number;
  comments?: number;
}

// Mock Instagram data (in a real app, this would come from the Instagram API)
const mockInstagramPosts: InstagramPost[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1715090364409-161e8dd5ab8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3V0Zml0JTIwbWVufGVufDB8fDB8fHww",
    link: "https://www.instagram.com/p/1",
    likes: 234,
    comments: 12
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNoaXJ0fGVufDB8fDB8fHww",
    link: "https://www.instagram.com/p/2",
    likes: 189,
    comments: 8
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    link: "https://www.instagram.com/p/3",
    likes: 312,
    comments: 15
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1543132220-4bf3de6e10ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJ1c2luZXNzJTIwbWFufGVufDB8fDB8fHww",
    link: "https://www.instagram.com/p/4",
    likes: 156,
    comments: 7
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNoaXJ0fGVufDB8fDB8fHww",
    link: "https://www.instagram.com/p/5",
    likes: 278,
    comments: 11
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=600&auto=format&fit=crop",
    link: "https://www.instagram.com/p/6",
    likes: 423,
    comments: 19
  },
];

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch from Instagram API here
    setTimeout(() => {
      setPosts(mockInstagramPosts);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background/95 to-background">
      <div className="container mx-auto px-4">
        <div 
          className="text-center mb-16"
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            animation: 'fadeInUp 0.8s ease forwards'
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair tracking-tight">
            Follow Us on Instagram
          </h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-0.5 w-24 bg-gradient-to-r from-hibhana-gold/50 via-hibhana-gold to-hibhana-gold/50 rounded-full"></div>
            <a
              href="https://www.instagram.com/hibhana_/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-6 text-2xl font-medium text-hibhana-maroon hover:text-hibhana-gold transition-all duration-300 hover:scale-105"
            >
              @hibhana_
            </a>
            <div className="h-0.5 w-24 bg-gradient-to-r from-hibhana-gold/50 via-hibhana-gold to-hibhana-gold/50 rounded-full"></div>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Stay updated with our latest collections, behind-the-scenes moments, and styling inspiration.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index} 
                className="aspect-square bg-muted/50 animate-pulse rounded-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {posts.map((post, index) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden aspect-square rounded-lg shadow-lg"
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  animation: 'fadeInUp 0.8s ease forwards',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <img
                  src={post.imageUrl}
                  alt="Instagram post"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Instagram size={28} className="text-white transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between text-white/90 text-sm">
                      <div className="flex items-center gap-2">
                        <Heart size={16} className="fill-current" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle size={16} />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div 
          className="text-center mt-12"
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            animation: 'fadeInUp 0.8s ease forwards',
            animationDelay: '0.6s'
          }}
        >
          <a
            href="https://www.instagram.com/hibhana_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium tracking-wide text-white transition-all duration-300 bg-gradient-to-r from-hibhana-gold/90 to-hibhana-gold rounded-full hover:shadow-lg hover:shadow-hibhana-gold/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-hibhana-gold focus:ring-offset-2 focus:ring-offset-background"
          >
            View More on Instagram
            <Instagram className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default InstagramFeed;
