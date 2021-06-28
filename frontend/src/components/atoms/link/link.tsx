import NextLink from 'next/link'

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const Link = ({ href, children, className = null }: Props) => {
  if (href.startsWith('http')) {
    return (
      <a
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href}>
      <a className={className}>
        {children}
      </a>
    </NextLink>
  );
};
