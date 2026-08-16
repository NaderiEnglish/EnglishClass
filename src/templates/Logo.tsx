import { useRouter } from 'next/router';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const router = useRouter();

  return (
    <img
      src={`${router.basePath}/assets/images/logo.svg`}
      alt="Naderi English"
      className={props.xl ? 'h-12 w-auto' : 'h-9 w-auto'}
    />
  );
};

export { Logo };
