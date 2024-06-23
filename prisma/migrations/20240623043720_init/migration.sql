-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "dev";

-- CreateTable
CREATE TABLE "dev"."armamentos" (
    "id_armamento" SERIAL NOT NULL,
    "nome_armamento" VARCHAR(48),
    "tipo_armamento" INTEGER,
    "base_armamento" INTEGER,
    "nivel_base_armamento" INTEGER,
    "raridade_armamento" INTEGER,
    "historia_armamento" TEXT,
    "origem_armamento" INTEGER,
    "imagem_armamento_path" TEXT,
    "data_insert" VARCHAR(32),
    "data_update" VARCHAR(32),
    "status" BOOLEAN,

    CONSTRAINT "armamentos_pkey" PRIMARY KEY ("id_armamento")
);

-- CreateTable
CREATE TABLE "dev"."ingrediente_receita_itens" (
    "id_ingrediente_receita_itens" SERIAL NOT NULL,
    "id_ingrediente" INTEGER NOT NULL,
    "id_receita_item" INTEGER NOT NULL,

    CONSTRAINT "ingrediente_receita_itens_pkey" PRIMARY KEY ("id_ingrediente_receita_itens")
);

-- CreateTable
CREATE TABLE "dev"."ingredientes" (
    "id_ingrediente" SERIAL NOT NULL,
    "nome_ingrediente" VARCHAR(32),
    "historia_ingrediente" TEXT,
    "imagem_ingrediente_path" TEXT,
    "origem_ingrediente" INTEGER,

    CONSTRAINT "ingredientes_pkey" PRIMARY KEY ("id_ingrediente")
);

-- CreateTable
CREATE TABLE "dev"."inventario_armamentos" (
    "id" SERIAL NOT NULL,
    "id_inventario" INTEGER NOT NULL,
    "id_arma" INTEGER NOT NULL,
    "nivel_arma" INTEGER,

    CONSTRAINT "inventario_armamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dev"."inventario_itens" (
    "id" SERIAL NOT NULL,
    "id_inventario" INTEGER NOT NULL,
    "id_item" INTEGER NOT NULL,
    "quantidade_item" INTEGER NOT NULL,

    CONSTRAINT "inventario_itens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dev"."inventario_magias_agartheanas" (
    "id" SERIAL NOT NULL,
    "id_inventario" INTEGER NOT NULL,
    "id_agartheana" INTEGER NOT NULL,
    "nivel_agartheana" INTEGER,

    CONSTRAINT "inventario_magias_agartheanas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dev"."inventario_magias_elementais" (
    "id" SERIAL NOT NULL,
    "id_inventario" INTEGER NOT NULL,
    "id_elemental" INTEGER NOT NULL,
    "nivel_elemental" INTEGER,

    CONSTRAINT "inventario_magias_elementais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dev"."inventario_talentos_classe" (
    "id" SERIAL NOT NULL,
    "id_inventario" INTEGER NOT NULL,
    "id_talento_classe" INTEGER NOT NULL,

    CONSTRAINT "inventario_talentos_classe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dev"."inventario_talentos_raca" (
    "id" SERIAL NOT NULL,
    "id_inventario" INTEGER NOT NULL,
    "id_talento_raca" INTEGER NOT NULL,

    CONSTRAINT "inventario_talentos_raca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dev"."inventarios" (
    "id_inventario" SERIAL NOT NULL,
    "id_personagem" INTEGER NOT NULL,
    "data_insert" VARCHAR(32),
    "data_update" VARCHAR(32),
    "status" BOOLEAN,

    CONSTRAINT "inventarios_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "dev"."itens" (
    "id_item" SERIAL NOT NULL,
    "nome_item" VARCHAR(48),
    "tipo_item" INTEGER,
    "historia_item" TEXT,
    "origem_item" INTEGER,
    "imagem_item_path" TEXT,
    "data_create" VARCHAR(32),
    "data_update" VARCHAR(32),
    "status" BOOLEAN,

    CONSTRAINT "itens_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "dev"."jogadores" (
    "id_jogador" SERIAL NOT NULL,
    "nome_jogador" VARCHAR(32),
    "apelido_jogador" VARCHAR(32),
    "data_insert" VARCHAR(32),
    "data_update" VARCHAR(32),
    "status" BOOLEAN,

    CONSTRAINT "jogadores_pkey" PRIMARY KEY ("id_jogador")
);

-- CreateTable
CREATE TABLE "dev"."magias_agartheanas" (
    "id_agartheana" SERIAL NOT NULL,
    "nome_agartheana" VARCHAR(32),
    "cunho_agartheana" INTEGER,
    "nivel_base_agartheana" INTEGER,
    "historia_agartheana" TEXT,
    "origem_agartheana" INTEGER,
    "data_insert" VARCHAR(32),
    "data_update" VARCHAR(32),
    "status" BOOLEAN,

    CONSTRAINT "magias_agartheanas_pkey" PRIMARY KEY ("id_agartheana")
);

-- CreateTable
CREATE TABLE "dev"."magias_elementais" (
    "id_elemental" SERIAL NOT NULL,
    "nome_elemental" VARCHAR(32),
    "elemento_elemental" INTEGER,
    "nivel_base_elemental" INTEGER,
    "historia" TEXT,
    "origem_elemental" INTEGER,
    "data_insert" VARCHAR(32),
    "data_update" VARCHAR(32),
    "status" BOOLEAN,

    CONSTRAINT "magias_elementais_pkey" PRIMARY KEY ("id_elemental")
);

-- CreateTable
CREATE TABLE "dev"."origem_ingredientes" (
    "id_origem_ingrediente" SERIAL NOT NULL,
    "id_ingrediente" INTEGER NOT NULL,
    "id_origem" INTEGER NOT NULL,

    CONSTRAINT "origem_ingredientes_pkey" PRIMARY KEY ("id_origem_ingrediente")
);

-- CreateTable
CREATE TABLE "dev"."personagens" (
    "id_personagem" SERIAL NOT NULL,
    "nome_personagem" VARCHAR(48),
    "apelido_personagem" VARCHAR(48),
    "idade" INTEGER,
    "sexo_genero" INTEGER,
    "altura" DOUBLE PRECISION,
    "peso" DOUBLE PRECISION,
    "raca" INTEGER,
    "profissao_fantasia" VARCHAR(64),
    "papel" INTEGER,
    "classe" INTEGER,
    "historia_personagem" TEXT,
    "imagem_personagem_path" TEXT,
    "id_jogador" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "personagens_pkey" PRIMARY KEY ("id_personagem")
);

-- CreateTable
CREATE TABLE "dev"."raca" (
    "id_raca" SERIAL NOT NULL,
    "nome_raca" VARCHAR(48),
    "historia_raca" TEXT,
    "ishibrido" BOOLEAN,
    "data_insert" VARCHAR(32),
    "data_update" VARCHAR(32),
    "status" BOOLEAN,

    CONSTRAINT "raca_pkey" PRIMARY KEY ("id_raca")
);

-- CreateTable
CREATE TABLE "dev"."racas_hibridas" (
    "id_raca_hibrida" SERIAL NOT NULL,
    "id_raca1" INTEGER NOT NULL,
    "id_raca2" INTEGER NOT NULL,
    "id_raca3" INTEGER,
    "id_raca4" INTEGER,
    "data_insert" VARCHAR(32),
    "data_update" VARCHAR(32),
    "status" BOOLEAN,

    CONSTRAINT "racas_hibridas_pkey" PRIMARY KEY ("id_raca_hibrida")
);

-- CreateTable
CREATE TABLE "dev"."receita_itens" (
    "id_receita_item" SERIAL NOT NULL,
    "id_item" INTEGER NOT NULL,

    CONSTRAINT "receita_itens_pkey" PRIMARY KEY ("id_receita_item")
);

-- CreateTable
CREATE TABLE "dev"."talento_classe_razao" (
    "id_tcr" SERIAL NOT NULL,
    "id_talento_classe" INTEGER NOT NULL,
    "id_classe" INTEGER NOT NULL,

    CONSTRAINT "talento_classe_razao_pkey" PRIMARY KEY ("id_tcr")
);

-- CreateTable
CREATE TABLE "dev"."talento_raca_razao" (
    "id_trr" SERIAL NOT NULL,
    "id_talento_raca" INTEGER NOT NULL,
    "id_raca" INTEGER NOT NULL,

    CONSTRAINT "talento_raca_razao_pkey" PRIMARY KEY ("id_trr")
);

-- CreateTable
CREATE TABLE "dev"."talentos_classe" (
    "id_talento_classe" SERIAL NOT NULL,
    "titulo" VARCHAR(48),
    "descricao" TEXT,
    "data_insert" VARCHAR(32),
    "data_update" VARCHAR(32),
    "status" BOOLEAN,

    CONSTRAINT "talentos_classe_pkey" PRIMARY KEY ("id_talento_classe")
);

-- CreateTable
CREATE TABLE "dev"."talentos_raca" (
    "id_talento_raca" SERIAL NOT NULL,
    "titulo" VARCHAR(48),
    "descricao" TEXT,
    "data_insert" VARCHAR(32),
    "data_update" VARCHAR(32),
    "status" BOOLEAN,

    CONSTRAINT "talentos_raca_pkey" PRIMARY KEY ("id_talento_raca")
);
