const readableStream = new ReadableStream({
  start(controller) {
    controller.enqueue("this is custom readable stream");
  },
});

const createdFile = await Deno.create("created.txt", {
  create: true,
  append: true,
});

const writeAbleStream = createdFile.writable.getWriter();

await writeAbleStream.write(
  new TextEncoder().encode("Hello, this is writable stream")
);

await writeAbleStream.write(new TextEncoder().encode("null"));

await writeAbleStream.close();

// const writefile = await Deno.open(Deno.args[0], {
//   create: true,
//   write: true,
//   append: true,
// });
// const writableStream = writefile.writable.getWriter();

// writableStream.write(
//   new TextEncoder().encode("this is new file created for writing in file\n")
// );

// writableStream.close();
// for ensuring that data is properly written and if i will not close the stream
// other process will not be able to access the file because this file would be lockedstate so then i need releaselock
