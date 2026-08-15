import Image from 'next/image';
import { useRouter } from 'next/router';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const router = useRouter();

  const width = props.xl ? 180 : 140;
  const height = props.xl ? 60 : 48;

  return (
    <Image
      src={`${router.basePath}/assets/images/logo.svg`}
      alt="Naderi English"
      width={width}
      height={height}
      priority
    />
  );
};

export { Logo };
