// basic functions excluding prototypes

random = (o = [0, 1], integer) => {
  num = op => Math[op](o[0], o[1])
  let min = num("min"), range = num("max") - min;
  return integer ? Math.floor(
    min + ((Math.random()) * (range + 1)) // integer strict
  ) : min + ((Math.random()) * range);
}

type = o => {
  try {
    return Array.isArray(o) ? "array" : (
      o.tagName ? "element" : typeof o
    )
  } catch {return o}
}

sleep = time => new Promise (
  resolve => setTimeout(resolve, +time)
) // use in async functions

loop = (amount = 0, queue, time) => {
  if (!time){
    // accounts for time = 0
    for (let i = 0; i < amount; i++)
    queue(i);
    return amount;
  }
  invoke = async i => {
    if (i < amount){
      await sleep(time);
      queue(i);
      invoke(i + 1)
    }
  }
  return invoke(0); // start
}

parse = list => JSON.parse(`{"${list[0]}": ${list[1]}}`)
