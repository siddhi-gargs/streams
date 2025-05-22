const interupt = new AbortController();
console.log(interupt);
const { signal } = interupt;

const readableStream = new ReadableStream({
  start(controller) {
    const intervalId = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 100);
      controller.enqueue(new TextEncoder().encode(randomNumber.toString()));
    }, 2000);

    signal.addEventListener("abort", () => {
      clearInterval(intervalId);
      controller.close();
    });
  },
});
ç;
const [stream1, stream2] = readableStream.tee();

(async () => {
  for await (const chunk of stream1) {
    const decode = new TextDecoder().decode(chunk);
    console.log("This is stream1", decode);
  }
})();

const transformStream = new TransformStream({
  transform(chunk, controller) {
    const decode = new TextDecoder().decode(chunk);
    console.log("decoded data", decode);
    const encodeData = new TextEncoder().encode(`${decode * 2}\n`);
    controller.enqueue(encodeData);
  },
});

const fileForStream = await Deno.open("double.txt", {
  create: true,
  write: true,
  append: true,
});

(async () => {
  for await (const input of Deno.stdin.readable) {
    const decode = new TextDecoder().decode(input);
    console.log("this is my input", decode);
    if (decode.trim() === "q") {
      interupt.abort();

      console.log("Abort the streaming DataData😬");
    }
  }
})();

stream2.pipeThrough(transformStream).pipeTo(fileForStream.writable);
