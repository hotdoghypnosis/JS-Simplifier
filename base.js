random = (o, integer) => {
  let low = o[0] || 0, high = o[1];
  if(o[0] > o[1]){
    low = high;
    high = o[0];
  }
  let range = high - low;
  if (integer)
  return Math.floor(low + ((Math.random()) * (range + 1)));
  return low + ((Math.random()) * range);
}

type = o => {
  try {
    return Array.isArray(o) ? "array" : (
      o.tagName ? "element" : typeof o
    )
  } catch {
    return o;
  }
}

sleep = time => new Promise (
  resolve => setTimeout(resolve, +time)
) // use in async functions



loop = (amount = 0, queue, time = 0) => {
  let breaker = false, exit = () => (breaker = true);
  if (time){
    delay = async i => {
      await sleep(time);
      if (!breaker)
      queue(i, exit);
      if (i < amount - 1)
      return delay(i + 1);
    }
    delay(0);
  }
  else {
    for (let i = 0; i < amount; i++){
      if (breaker)
      break;
      queue(i, exit);
    }
  }
  return amount;
}



Object.prototype.new = function (o){
  // makes prototype setting easier
  let keys = Object.keys(o);
  for (let item of keys)
  this[item] = o[item];
  return this;
}



Object.prototype.new({
  each (queue){
    let o = Object.keys(this), v = Object.values(this);
    loop(o.length, i => {
      queue(o[i], v[i], this);
    })
  },
  setters (o, override){
    let element = this;
    o.each((item, value) => {
      element[`__define${override || "Setter"}__`](item, value);
    })
    return this;
  },
  getters (o){
    return this.setters(o, "Getter");
  }
})



Object.prototype.getters({
  keys (){
    // simplify keys
    return Object.keys(this);
  },
  length (){
    // like array.length
    return this.keys.length;
  },
  values (){
    // simplify values
    return Object.values(this)
  },
  first (){
    // like array.first
    return this.keys[0] || this[0];
  },
  last (){
    // like array.last
    return this.keys[this.keys.length - 1] || this[this.length - 1];
  },
  empty (){
    // returns true if no inputs found
    return this.keys.empty;
  }
})



Math.new({
  radians: degrees => degrees / 180 * Math.PI,
  degrees: radians => radians / Math.PI * 180,
  distance: (start, end) => Math.sqrt(
    ((end[0] - start[0]) ** 2) + ((end[1] - start[1]) ** 2)
  ),
  factorial: value => {
    let finalNumber = 1;
    loop (value, i => {
      finalNumber *= i + 1;
    })
    return finalNumber;
  },
  decimal: number => Math.ceil(number) !== number ? true : false,
  factors: number => {
    let returner = [];
    loop (number, i => {
      let secondary = number / i;
      if (
        i &&
        !Math.decimal(secondary) &&
        !returner.includes(i) &&
        !returner.includes(secondary)
      )
      returner.push(i, secondary);
    })
    return returner;
  },
  query (equation, quality, o){
    if (equation.indexOf("x") == -1 || quality <= 0)
    return false; // invalid setup
    let y = 0, start = o[0], end = o[1], x = start,
    amount = Math.abs(Math.round(
      (start - end) / quality
    )), result = [],
    coefficient = start > end ? -1 : 1
    ev = () => {
      if ((
        coefficient < 1 ? (x < end) : (x > end)
      ))
      return;
      eval(`y = ${equation}`)
      result.push([x, y])
      return x += +quality * coefficient;
    }
    loop(amount + 1, ev)
    return result;
  },
  circle (radius, tolerance){
    let result = [], ev = [0, radius]
    loop(360 * tolerance, i => {
      result.push(ev.rotate(i))
    })
    return result;
  },
  prime: number => Math.factors(number).length == 2 ? true : false
})



Array.prototype.getters({
  first (){
    return this[0];
  },
  last (){
    return this[this.length - 1];
  },
  HEX (){
    return "#" + this.map(number => number.toString(16)).join("");
  },
  empty (){
    return !this.length;
  }
})



Array.prototype.new({
  merge (o){
    return [...this, ...o];
  },
  position (number){
    return this[number % this.length];
  },
  sum (){
    return this.reduce((accumulative, value) => accumulative + value);
  },
  average (){
    return this.sum() / this.length;
  },
  rotate (amount){
    return circle.rotate(this, amount)
  }
})



String.prototype.new({
  reverse (){
    return this.split("").reverse().join("");
  },
  all (value, replacement){
    let placeholder = this, count = 0;
    if (replacement === undefined)
    replacement = "";
    if (value == replacement || replacement.indexOf(value) != -1)
    return false;
    loop (this.length, i => {
      if (placeholder.indexOf(value) != -1){
        count++;
        placeholder = placeholder.replace(value, replacement);
      }
    })
    return replacement ? placeholder : count;
  }
})



String.prototype.getters({
  words (){
    return this.all("  ", " ").trim().all(" ") + 1;
  },
  RGB (){
    let start = this.replace("#", "");
    trim = (from, to) => parseInt(start.substring(from, to), 16);
    return [
      trim(0, 2),
      trim(2, 4),
      trim(4, 6)
    ]
  }
})
