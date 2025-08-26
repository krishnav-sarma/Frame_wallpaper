import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

const ACCESS_KEY = "1BzZeOxKPB4OJLzX7E5zUOlfZmpQlM4KrjlQjutC9S0";

const Home = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=minimal_trending&order_by=latest&per_page=15&page=${page}&client_id=${ACCESS_KEY}`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setImages((oldImages) => [...oldImages, ...data.results]);
      }
    } catch (error) {
      console.log("Error fetching images", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    });

    const sentinel = document.getElementById("sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasMore, loading]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white no-scrollbar">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="bg-clip-padding"
      >
        {images.map((img) => (
          <div key={img.id} className="mb-4 rounded-lg overflow-hidden">
            <img
              src={img.urls.thumb}  
              alt={img.alt_description}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </Masonry>

      <div id="sentinel" className="h-10" />

      {loading && <p className="text-center mt-4">Loading...</p>}
      {!hasMore && (
        <p className="text-center mt-4 text-gray-400">No more wallpapers</p>
      )}
    </div>
  );
};

export default Home;
 