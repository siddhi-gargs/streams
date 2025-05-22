const handleConnection = async (connection) => {
  x;
};

const main = async () => {
  const conn = Deno.listen({ port: 8000 });
  for await (const connection of conn) {
    handleConnection(connection);
  }
};

main();
