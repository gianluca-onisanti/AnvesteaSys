import GerenciarJogadores from "@/pages/canvas/gerenciar_jogadores";
import scss from "../components/Layout/Layout.module.scss";
import React from "react";

const Home: React.FC = () => {

  return (
    <main className={scss.main}>
      {<GerenciarJogadores />}
    </main>
  );
};

export default Home;
