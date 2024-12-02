import Masonry from "react-masonry-css";

export const MasonryTest = ({ children }: { children: any }) => {
  return (
    <Masonry
      className="skeleton-masonry-grid"
      columnClassName="skeleton-masonry-grid__column"
    >
      {children}
    </Masonry>
  );
};
