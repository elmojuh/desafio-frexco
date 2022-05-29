import Link from "../Link";

function StyleMenu({ children }) {
  return (
    <div>
      <div>{children}</div>
      <style jsx>{`
        div {
          color: #01484F;
          margin: 2px;
          width: 200px;
          height: 30px;
          text-align: center;
        }
        div:hover{
            color: black;
            background-color: #ebebe7;
            text-decoration: none;
        }
      `}</style>
    </div>
  );
}

export default function Head() {
  return (
    <>
      <Link href="/">
        <StyleMenu>Home</StyleMenu>
      </Link>
      <Link href="/cadastrar-produto">
        <StyleMenu>Cadastrar Produto</StyleMenu>
      </Link>
      <Link href="/login">
        <StyleMenu>Logar</StyleMenu>
      </Link>
    </>
  );
}
