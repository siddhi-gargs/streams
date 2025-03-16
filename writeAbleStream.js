const readableStream = new ReadableStream({
  start(controller) {
    controller.enqueue("this is custom readable stream");
  },
});

const writeAbleSteam = readableStream.write;

const b = await writeAbleSteam.writeAbleSteam(
  new TextEncoder().encode("Hello, this is writable stream")
);

console.log(b);
