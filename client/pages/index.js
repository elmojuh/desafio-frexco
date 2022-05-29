import Link from "../src/components/Link";

function Title({ children, as }) {
  const TAG = as;
  return (
    <>
      <TAG>{children}</TAG>
      <style jsx>{`
        h1 {
          color: blue;
        }
      `}</style>
    </>
  );
}



export default function HomePage() {
  return (
    <div>
      <Title as="h1">Home</Title>
    </div>
  );
}
