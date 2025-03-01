import arrows from '@assets/carousel-arrows.png';

interface NextArrowProps {
  onClick?: () => void;
}

export default function NextArrow({ onClick }: NextArrowProps) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-opacity-75 absolute top-1/4 right-3 z-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-transparent p-3 text-white"
    >
      <div
        className="h-15 w-9 bg-contain bg-no-repeat"
        style={{
          backgroundImage: `url(${arrows})`,
          backgroundPosition: 'right center',
          backgroundSize: '200% 100%'
        }}
      />
    </button>
  );
}
