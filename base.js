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
