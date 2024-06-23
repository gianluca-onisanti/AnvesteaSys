-- CreateTable
CREATE TABLE "foo" (
    "id" SERIAL NOT NULL,
    "foo_name" TEXT NOT NULL,
    "foo_address" TEXT,

    CONSTRAINT "foo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "foo_foo_name_key" ON "foo"("foo_name");
