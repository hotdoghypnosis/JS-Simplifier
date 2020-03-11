// Note: this setup is NOT FINISHED
// basic prototype setup

Object.prototype.new = function (o){
  for (let item of Object.keys(o))
    this[item] = o[item];
  return this;
}

// OBJECTS -->

Object.prototype.new({
  // mass getters & setters (fixed deprecation problem)
  setters (o, type = "set"){
    for (let name of Object.keys(o)){
      Object.defineProperty(
        this, name, {set: o[name]}
      )
    }
  },
  getters (o){
    // setters but with 'get'
    for (let name of Object.keys(o)){
      Object.defineProperty(
        this, name, {get: o[name]}
      )
    }
  },
  each (queue){
    try {
      loop(this.length, i => {
        queue(this.keys[i], this.values[i])
      })
    } catch {}
  }
}).getters({
  keys (){
    return Object.keys(this)
  },
  values (){
    return Object.values(this)
  },

  /*
   * functions below turn the object into
   * an array as to replicate the effects
   */

  first (){
    return this.keys[0]
    || this[0] // accommodate elements
  },
  last (){
    return this.keys[this.keys.length - 1]
    || this[this.length - 1] // (elements)
  }
})

// MATH -->

Math.new({
  radians: degrees => degrees / 180 * Math.PI,
  degrees: radians => radians / Math.PI * 180,
  distance: (start, end) => Math.sqrt(
    ((end[0] - start[0]) ** 2) + ((end[1] - start[1]) ** 2)
  ), // pythagorean thereom
  factorial: value => {
    let finalNumber = 1;
    loop (value, i => {
      finalNumber *= i + 1;
    })
    return finalNumber;
  },
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
  prime: number => Math.factors(number).length == 2 ? true : false
})

// ARRAYS -->

Array.prototype.new({
  position (number){
    return this[number % this.length];
  },

  /*
   * below is ONLY for lists containing just
   * numerical values, other value types will not
   * give the same results
   */

  sum (){
    return this.reduce(
      (accumulative, value) => accumulative + value
    )
  },
  average (){
    return this.sum() / this.length;
  },
  rotate (amount){
    return circle.rotate(this, amount)
  }
}).getters({
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

// STRINGS -->

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
  }, // returns accurate word count
})
