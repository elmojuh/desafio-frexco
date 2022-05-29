import NextLink from "next/link";

export default function Link({ children, href, ...props }) {
  return (
    <Style>
        <NextLink href={href} passHref>
          <a {...props}>{children}</a>
        </NextLink>
    </Style>
  );
}

function Style({ children }) {
  return (
    <div>
      {children}
      <style jsx>{`
         a:link, a:visited, a{
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
