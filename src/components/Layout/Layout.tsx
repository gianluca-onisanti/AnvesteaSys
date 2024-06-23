import SideMenu from "@/components/SideMenu";
import scss from "./Layout.module.scss";
import React from "react";
import Head from "next/head";

const Layout = (props: any) => {

  return (
    <>
      <Head>
        <title>Anvestea's RPG - Por Gianluca</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={scss.layout}
        style={{ padding: "0 24px 0 80px"}}
      >
        {<SideMenu />}
        {props.children}
      </main>
    </>
  );
};

export default Layout;
