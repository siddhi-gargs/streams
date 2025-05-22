const transform = new TransformStream({
  transform(chunk, controller) {
    const decoded = new TextDecoder().decode(chunk).trim();
    const passingvalue = `decoded value ${decoded}`;
    controller.enqueue(
      new TextEncoder().encode(passingvalue.toLocaleUpperCase())
    );
  },
});

const jsonParsing = new TransformStream({
  transform(chunk, controller) {
    const parsed = JSON.parse(chunk);
    console.log(parsed, "this is parsed");
    controller.enqueue(parsed);
  },
});

const encodeTheMsg = new TransformStream({
  transform(piece, controller) {
    controller.enqueue(new TextEncoder().encode(piece));
  },
});

const decodeTheMsg = new TransformStream({
  transform(piece, controller) {
    controller.enqueue(new TextDecoder().decode(piece).trim());
  },
});

const stringify = new TransformStream({
  transform(chunk, controller) {
    const parsed = JSON.stringify(chunk);
    controller.enqueue(parsed);
  },
});

Deno.stdin.readable
  .pipeThrough(decodeTheMsg)
  .pipeThrough(stringify)
  .pipeThrough(jsonParsing)
  .pipeThrough(stringify)
  .pipeThrough(encodeTheMsg)
  .pipeTo(Deno.stdout.writable);
