const skeletonItems = [
  {
    width: 1200,
    height: 854,
  },
  {
    width: 1200,
    height: 1800,
  },

  {
    width: 1200,
    height: 1800,
  },
  {
    width: 1200,
    height: 828,
  },
  {
    width: 1200,
    height: 854,
  },
  {
    width: 1200,
    height: 1800,
  },
  {
    width: 1200,
    height: 1800,
  },
  {
    width: 1200,
    height: 1800,
  },
  {
    width: 1200,
    height: 1800,
  },
  {
    width: 1200,
    height: 1800,
  },
];

export function SkeletonMasonry() {
  return (
    <div className="column-1 gap-4 space-y-4 min-[584px]:columns-2 lg:columns-3">
      {skeletonItems.map((item, i) => (
        <img
          key={i}
          className="animate-pulse bg-background-secondary"
          src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${item.width / 2} ${item.height / 2}'%3E%3C/svg%3E`}
          width={item.width / 2}
          height={item.height / 2}
          alt=""
        />
      ))}
    </div>
  );
}
