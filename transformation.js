// this is also some similar like pipe while passing the data it transforms the data

// whenever i have to modify data in transformation so
// decode ==> modify => encode so it can flow properly throw streams

// const readFile = await Deno.open("lessContent.txt", { read: true });
const writeFile = await Deno.create("DenoInput.txt");

const transformationStream = new TransformStream({
  transform(chunk, controller) {
    const decodeThedata = new TextDecoder().decode(chunk);
    const modifyData = new TextEncoder().encode("any mark" + decodeThedata);
    controller.enqueue(modifyData);
  },
});

Deno.stdin.readable
  .pipeThrough(transformationStream)
  .pipeTo(writeFile.writable);

console.log("successfully written");

// writeFile.close();
