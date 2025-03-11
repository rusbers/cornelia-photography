import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";

const parallaxImageFallback =
  "https://cdn.sanity.io/images/4su5il1u/production/7185fa179c2a5296ce3b1c45a3511bd12dd82dfc-2000x1333.jpg?w=2000&h=1333&fm=webp&q=60&fit=max&auto=format";

type ParallaxProps = {
  parallaxImage: string | null;
  children: React.ReactNode;
};

export function Parallax({ children, parallaxImage }: ParallaxProps) {
  return (
    <ParallaxProvider>
      {children}
      <ParallaxBanner
        aria-hidden={true}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundColor: "#f8f4f4",
        }}
        layers={[
          {
            image: parallaxImage || parallaxImageFallback,
            speed: -15,
          },
        ]}
        className="absolute inset-0 top-auto"
      />
    </ParallaxProvider>
  );
}
