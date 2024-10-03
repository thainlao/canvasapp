import Mainpage from "@/components/Mainbody";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Главная Страница</title>
        <meta name="description" content="Описание главной страницы" />
      </Head>
      <Mainpage />
    </>

  );
}
