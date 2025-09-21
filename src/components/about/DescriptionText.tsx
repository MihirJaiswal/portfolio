export default function DescriptionText() {
  return (
    <div 
      className="md:mt-4 z-10 pb-3 cursor-none select-none" 
    >
      <div className="text-base md:text-lg text-neutral-700 dark:text-neutral-400 leading-relaxed tracking-wide">
        <p className="text-left text-md mb-3">
          <span className="block mb-4">Hey there! I&nbsp;am{" "}
          <span className="text-black dark:text-white tracking-widest font-semibold leading-1.5 text-center">
            Mihir Jaiswal
          </span>{" "}</span>
          I&apos;m a digital craftsman who turns wild ideas into perfect realities. When I&apos;m not busy debugging at
          3 AM, you&apos;ll find me obsessing over the perfect border-radius and wondering if that button needs to be
          2px to the left.
        </p>
      </div>
    </div>
  );
}