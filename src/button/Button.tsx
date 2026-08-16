import className from 'classnames';
import type { ReactNode } from 'react';

type IButtonProps = {
  xl?: boolean;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-primary': true,
  });

  return (
    <button type={props.type ?? 'button'} className={btnClass}>
      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-block rounded-md text-center;
          }

          .btn-base {
            @apply px-4 py-2 text-lg font-semibold;
          }

          .btn-xl {
            @apply px-6 py-4 text-xl font-extrabold;
          }

          .btn-primary {
            @apply bg-primary-500 text-white;
          }

          .btn-primary:hover {
            @apply bg-primary-600;
          }
        `}
      </style>
    </button>
  );
};

export { Button };
