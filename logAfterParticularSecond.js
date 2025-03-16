const timeStampInHours = (timeStamp) => timeStamp / 1000;

const fileName = Deno.args[0];
const writtenMessageFile = await Deno.open(fileName, {
  create: true,
  write: true,
  append: true,
});

const writeInGivenFile = writtenMessageFile.writable.getWriter();

let count = 1;
const intervalId = setInterval(() => {
  const timeStamp = Date.now();
  const time = timeStampInHours(timeStamp);
  writeInGivenFile.write(new TextEncoder().encode(`${count++} ${time}\n`));
}, 2000);

const userInput = Deno.stdin.readable.pipeThrough(new TextDecoderStream());

(async () => {
  for await (const input of userInput) {
    console.log(input, "input");
    if (input === "q") {
      clearInterval(intervalId);
      await writeInGivenFile.close();
      break;
    }
  }
  console.log("as per your instruction the writable stream is getting close");
})();
