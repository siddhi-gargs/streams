const readFile = await Deno.open("content.txt", { read: true });

const chunk = readFile.readable.getReader();
let chunkcount = 0;

async function chunks() {
  while (chunkcount !== 2) {
    const { value, done } = await chunk.read();
    if (done) break;
    const chunkContent = new TextDecoder().decode(value);

    console.log(`chunk no. ${chunkcount} is here ✌️`, chunkContent);

    chunkcount++;
  }

  // chunk.releaseLock(); // ✅ Release the reader first
  // readFile.close();

  console.log("Stream stopped after two chunks.");
}

await chunks();

// const userReadableStream = new ReadableStream({
//   start(controller) {
//     controller.enqueue(new TextEncoder().encode("siddhi"));
//     controller.enqueue(new TextEncoder().encode("sameera"));
//     controller.close();
//   },
// });

// console.log(userReadableStream.getReader().read());
