import arrows from '@assets/carousel-arrows.png';

interface NextArrowProps {
  onClick?: () => void;
}

export default function NextArrow({ onClick }: NextArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-0 z-10 h-20 -translate-y-1/2 transform cursor-pointer rounded-l-sm bg-white p-3 shadow-[0px_8px_10px_rgba(0,0,0,0.3)] hover:bg-gray-200"
    >
      <div
        className="h-7 w-4 bg-contain bg-no-repeat"
        style={{
          backgroundImage: `url(${arrows})`,
          backgroundPosition: 'right center',
          backgroundSize: '200% 100%'
        }}
      />
    </button>
  );
}
