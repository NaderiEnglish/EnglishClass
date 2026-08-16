type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? 48 : 38;
  const titleSize = props.xl ? 'text-xl' : 'text-base';
  const subtitleSize = props.xl ? 'text-xs' : 'text-[10px]';

  return (
    <div className="inline-flex items-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 flex-shrink-0"
        aria-label="Naderi English logo"
      >
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="13"
          className="fill-primary-500"
        />

        <path
          d="M12 42 L9 47 L18 43"
          className="fill-primary-500"
        />

        <path
          d="M11 31V17H14.5L23 26.5V17H27V31H23.5L15 21.5V31H11Z"
          className="fill-white"
        />

        <path
          d="M29 17H38V20.5H33V22.5H37.5V26H33V27.5H38V31H29V17Z"
          className="fill-white"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className={`${titleSize} font-bold tracking-tight text-gray-900 dark:text-white`}
        >
          Naderi
        </span>

        <span
          className={`${subtitleSize} mt-1 font-semibold uppercase tracking-[0.18em] text-primary-500`}
        >
          English
        </span>
      </div>
    </div>
  );
};

export { Logo };
