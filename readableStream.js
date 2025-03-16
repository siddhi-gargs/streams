const readAbleStream = new ReadableStream({
  start(controller) {
    controller.enqueue(new TextEncoder().encode("chunk1"));
    controller.enqueue(new TextEncoder().encode("chunk2"));
    controller.enqueue(new TextEncoder().encode("chunk3"));
    controller.enqueue(new TextEncoder().encode("chunk4"));
    controller.close();
  },
});

for await (const chunk of readAbleStream.values()) {
  const decodeTheChunk = new TextDecoder().decode(chunk);
  console.log(decodeTheChunk);
}

// enqueue can take directly string and so i don't need to first encode and then encode i can directly send the string and then can print without decoding
