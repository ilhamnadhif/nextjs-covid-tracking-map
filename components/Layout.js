import Head from "next/head";
import Navbar from "./Navbar";

function Layout(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Navbar />
      <main style={{ marginTop: 56 }}>{props.children}</main>
    </>
  );
}

export default Layout;
