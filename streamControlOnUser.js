const abortController = new AbortController();
const { signal } = abortController;

const customReadable = new ReadableStream({
  start(controller) {
    let message = 1;

    const intervalId = setInterval(() => {
      controller.enqueue(`Gift ${message++}`);
    }, 2000);

    signal.addEventListener("abort", () => {
      clearInterval(intervalId);
      controller.close();
      console.log("stream is closed as per the user choice");
    });
  },
});

(async () => {
  for await (const chunk of customReadable.values()) {
    console.log("🎁", chunk);
  }
})();

// (async () => {
//   for await (const input of Deno.stdin.readable) {
//     const decodeTheInput = new TextDecoder().decode(input).trim();
//     if (decodeTheInput === "q") {
//       abortController.abort();
//       break;
//     }
//   }
//   console.log("As per your urgency we abort the further data 👀");
// })();

const properInput = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.trim());
  },
});

const dynamicInputStream = Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(properInput);

(async () => {
  for await (const input of dynamicInputStream) {
    if (input === "quit") {
      abortController.abort();
      break;
    }
  }
  console.log("As per your urgency we abort the further data 👀");
})();
