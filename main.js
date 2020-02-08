/*
    All Assets Displayed Here
    Version Iteration 1.6

    Author's Note: many of the
    included functions add to
    prototypes, all functions are
    to reduce code length and
    improve experiences regarding
    elements, objects, and arrays

    preloader container function:
    SYNTAX: package `...`
    where ... are the preloaded
    options being called
*/

let package = async string => {

  const sendMessage = (msg, status) => {
    let date = new Date, sender = status ? "warn" : "error";
    console[sender](
      msg,
      status
    )
  }, acceptedStringValues = [
    "default",
    "render",
    "canvas",
    "console"
  ], approvedLoaders = [];

  for (let loaderItem of acceptedStringValues){
    if (string[0].toLowerCase().indexOf(loaderItem) != -1)
    approvedLoaders.push(loaderItem);
  }

  try {
      await void async function preloadPrototypes (){
        let global = globalThis;

        // # chronological #

        if (approvedLoaders.includes("default")){

          await (
            global.variableListener = name => {
              let pseudo = global[name];
              global[name] = {
                pseudoValue: pseudo,
                attached: () => {},
                set value (value){
                  this.pseudoValue = value;
                  this.attached(value);
                },
                get value (){
                  return this.pseudoValue;
                },
                attach (queue){
                  this.attached = queue;
                }
              }
            }
          )

          await (
            global.random = (o, integer) => {
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
          )

          await (
            global.type = o => {
              try {
                return Array.isArray(o) ? "array" : (
                  o.tagName ? "element" : typeof o
                )
              } catch {
                return o;
              }
            }
          )

          await (
            global.sleep = time => new Promise (
              resolve => setTimeout(resolve, +time)
            )
          )

          await (
            global.loop = (amount = 0, queue, time = 0) => {
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
          )

          await (
            Object.prototype.new = function (o){
              // makes prototype setting easier
              let keys = Object.keys(o);
              for (let item of keys)
              this[item] = o[item];
              return this;
            }
          )

          await (
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
          )

          await (
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
          )

          await (
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
          )

          await (
            Number.prototype.within = function (interval){
              let raw = this;
              return {
                of (number){
                  return raw <= number + interval &&
                         raw >= number - interval ? true : false
                }
              }
            }
          )

          await (
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
          )

          await (
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
                try {
                  return circle.rotate(
                    this[0], this[1], amount
                  )
                } catch {
                  return []
                }
              }
            })
          )

          await (
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
          )

          await (
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
          )

          await (
            field = (o, strict) => {
              const fieldTypes = {
                id: "ElementById",
                class: "ElementsByClassName",
                name: "ElementsByName",
                tag: "ElementsByTagName"
              };
              switch(type(o)){
                case "string":
                  return document[o];
                  break;
                case "object":
                  let array = [];
                  evaluation = (search, query) => {
                    let e = eval(
                      `document.get${fieldTypes[search.toLowerCase()]}("${query}")`
                    )
                    try {
                      return type(e) === "element" ? array.push(e) : (
                        array = [...array, ...e.values]
                      )
                    } catch {}
                  }
                  o.each((search, query) => evaluation(search, query))
                  if (strict)
                  return array;
                  return array.length == 1 ? array[0] : (
                    array.empty ? false : array
                  )
                  break;
                default:
                  return document;
                  break;
                // # if no criteria met #
              }
            }
          )

          await (
            Element.prototype.new({
              append (o){
                let target = this;
                appender = tag => target.appendChild(document.createElement(tag));
                switch(type(o)){
                  case "string":
                    element = appender("div");
                    element.innerHTML = o;
                    target.insertBefore(element.firstChild, element);
                    target.removeChild(element);
                    break;
                  case "array":
                    for (let item of o)
                    target.append(item);
                    break;
                  case "object":
                    o.each((item, value) => {
                      appender(item).css(value);
                    })
                    break;
                }
                return document;
              },
              remove (){
                return this.parentNode.removeChild(this);
              },
              parent (node){
                node.append("<div/>");
                let temp = node.querySelectorAll("div").last;
                node.insertBefore(this, temp);
                temp.remove();
                return this;
              },
              attachEvent (o, deletion){
                let element = this, prefix = deletion ? "remove" : "add";
                o.each((item, value) => {
                  element[`${prefix}EventListener`](item, value);
                })
                return this;
              },
              removeEvent (o){
                return this.attachEvent(o, true);
              },
              css (o){
                let target = this, returner = false, style = this.style;
                const conventional = {
                  id: "id",
                  class: "className",
                  name: "name",
                  tag: "tagName"
                }, options = [
                  "margin-left",
                  "margin-right",
                  "margin-top",
                  "margin-bottom",
                  "left",
                  "top",
                  "position"
                ], available = [
                  "px",
                  "em",
                  "%"
                ];
                switch(type(o)){
                  case "string":
                    return target.css([o]);
                    break;
                  case "array":
                    returner = {};
                    for (let item of o){
                      let actual = item.toLowerCase();
                      returner[actual] = {};
                      switch(actual){
                        case "style":
                          for (let value of style)
                          returner[actual][value] = style[value];
                          break;
                        case "format":
                          for (let cycle of options){
                            let query = null, determined = style[cycle];
                            for (let searched of available){
                              if (determined.indexOf(searched) != -1){
                                returner[actual][cycle] = {
                                  raw: Number(determined.replace(searched, "")),
                                  type: searched
                                }
                              }
                            }
                          }
                          break;
                        case "attributes":
                          conventional.each((item, value) => {
                            if (target[value])
                            returner[actual][item] = target[value];
                          })
                          break;
                        default:
                          returner[actual] = target.getAttribute(actual);
                          break;
                      }
                    }
                    returner = returner.length == 1 ? returner.values.first : returner;
                    break;
                  case "object":
                    o.each((item, value) => {
                      if (conventional[item])
                      target[conventional[item]] = value;
                      else if (style[item] != undefined)
                      target.style[item] = value;
                      else
                      target.setAttribute(item, value);
                    })
                    returner = target;
                    break;
                }
                return returner;
              },
              move (queue){
                this.nullify();
                raw = value => {
                  let getter = value.replace("rotate(", "").toLowerCase();
                  return +getter.replace("deg)", "");
                };
                let form = this.css("format"), target = this, static = {
                  mx: form["margin-left"].raw || 0,
                  my: form["margin-top"].raw || 0,
                  x: form.left.raw,
                  y: form.left.raw,
                  rotation: raw(this.style.transform)
                }
                queue(static);
                static.each((item, value) => {
                  let converter = {
                    x: "left",
                    y: "top",
                    mx: "margin-left",
                    my: "margin-top"
                  }, base = converter[item];
                  try {
                    target.style[base] = static[item] + form[base].type;
                  } catch {
                    target.style.transform = `rotate(${static[item]}deg)`;
                  }
                })
                return this;
              },
              face (point){
                let mid = this.center;
                this.style.transform = `rotate(${circle.simplify(
                  circle.degrees(point[0] - mid[0], mid[1] - point[1]) - 90
                )}deg)`
                return this;
              },
              nullify (){
                let element = this, query = {
                  "margin-left": 0,
                  "margin-right": 0,
                  "margin-top": 0,
                  "margin-bottom": 0,
                  left: 0,
                  top: 0,
                  position: "static"
                };
                query.each((item, replacement) => {
                  if (!element.style[item])
                  element.style[item] = replacement;
                })
                return this;
              },
              __clientSide__ (which, value){
                this.widget = this.widget || {};
                if (which && value !== undefined)
                this.widget[which] = value;
              },
              drag (data){
                this.__clientSide__(
                  "draggable", data
                )
                return this;
              },
              resizable (data){
                this.__clientSide__(
                  "resizable", data
                )
                return this;
              },
              rotatable (data){
                this.__clientSide__(
                  "rotatable", data
                )
                return this;
              },
              fullscreen (boolean){
                let e = this;
                switch(boolean){
                  case true:
                    run = async () => {
                      await (e.nullify().__fullscreen__ = e.css(["format", "style"]));
                      e.css({
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      })
                    }
                    run();
                    break;
                  case false:
                    e.__fullscreen__.each((item, data) => {
                      data.each((query, value) => {
                        switch(item){
                          case "format":
                            e[query] = value;
                            break;
                          case "style":
                            e.style[query] = value;
                            break;
                        }
                      })
                    })
                    break;
                  default:
                    return false;
                }
                return this;
              },
              cursor (style){
                this.style.cursor = style || "auto";
                return this;
              },
              prepend (which){
                switch(which.toLowerCase()){
                  case "canvas":
                    return this.tagName.toLowerCase() !== "canvas" ? false : (
                      this.draw = {
                        raw: this,
                        get e (){
                          return this.raw.getContext("2d")
                        },
                        list: {},
                        box (o, style){
                          let l = o.left, t = o.top, x = o.width, y = o.height;
                          return this.list[o.id] = {
                            vertices: [
                              [l, t],
                              [l + x, t],
                              [l, t + y],
                              [l + x, t + y]
                            ], ... style
                          }
                        },
                        polygon (o, style){
                          return this.list[o.id] = {
                            ... o, ... style
                          }
                        },
                        scale: 1,
                        clear (){
                          this.e.fillStyle = "white"; // reset
                          return this.e.fillRect(
                            0, 0, this.raw.offsetWidth, this.raw.offsetHeight
                          )
                        },
                        process (){
                          let scaleX = 1,
                              scaleY = (this.raw.offsetWidth / this.raw.offsetHeight),
                              num = typeof this.scale === "number" ? this.scale : 1,
                              l = this.list.values;
                          this.e.scale(scaleX * num, scaleY * num)
                          customs = (o) => {
                            for (let ln of o){
                              if (ln[0] in this.e) // verification
                              this.e[ln[0]] = ln[1] !== undefined ? ln[1] : 0
                            }
                          }
                          customs([
                            [],
                            []
                          ])
                          // # redraws the canvas according to list #
                          this.clear();
                          for (let object of l){

                          }
                        }
                      }
                    )
                    break;
                  case "slider":
                    break;
                  default:
                    return this;
                    break;
                }
              },
              commit (o, secondary){
                this.pathway = [];
                this.pathtype = [];
                let chosen = o.type, detail = +o.spacing;
                if (o.length <= 1)
                return false;
                switch(chosen.toLowerCase()){
                  case "static":
                    this.pathway = [
                      ...this.pathway, ...o.path.filter(
                        a => type(a) == "array" && a.length == 2
                      )
                    ]
                    break;
                  case "revolve":
                    this.pathway = Math.circle(
                      +o.radius, detail
                    )
                    break;
                  case "linear":
                    let r = o.reach, a = +o.slope;
                    this.pathway = Math.query(
                      `x * ${slope}`, detail, r
                    )
                  default:
                    return false;
                    break;
                }

                /*
                    secondary describes whether or not
                    the object automatially faces a certain
                    direction when an instance is called
                */

                this.pathtype = typeof secondary == "object" ? secondary : false
                return this;
              },
              instance (i, constant){
                if (+i > this.pathway.length - 1 || +i < 0)
                return false; // invalid cache
                let query = this.pathway[+i];
                this.move(e => {
                  e.mx = (constant || 0) + query[0];
                  e.my = (constant || 0) + query[1];
                })
                if (i >= this.pathtype.reach[0] && i <= this.pathtype.reach[1])
                this.face(this.pathtype.face)
                else
                this.style.transform = "rotate(0deg)"
                return this;
              },
              animate (speed, constant, o){
                let value = typeof speed == "object" ? +speed.keys[0] : speed,
                instance = typeof o == "object" ? o.start : 0,
                end = typeof o == "object" ? o.end : this.pathway.length - 1;
                time = () => typeof speed == "object" ? value = speed.values[0](value, instance) : speed
                run = async () => {
                  this.instance(instance, constant || 0)
                  instance++;
                  if (instance <= end){
                    await sleep(time())
                    run() // recursive timeout
                  }
                }
                run()
              }
            })
          )

          await (
            Element.prototype.setters({
              width (v){
                return this.style.width = v;
              },
              height (v){
                return this.style.width = v;
              }
            })
          )

          await (
            Element.prototype.getters({
              center (){
                let w = this.scrollWidth, h = this.scrollHeight,
                    x = this.offsetLeft, y = this.offsetTop;
                return [
                  x + (w / 2),
                  y + (h / 2),
                  w / 2,
                  h / 2
                ]
              }
            })
          )

          /*
              circle & sphere calculators: rotations
              of points, conversion to tangible 0-360
              values, and returns of quadrants
              sectioned 1-4. ? CACULATIONS ARE DETERMINED
              IN DEGREES, IF USING RADIANS USE THE MATH
              EXTENSION MATH.DEGREES FOR CONVERSION
          */

          await (
            global.circle = {
              degrees (x, y){
                let angle = Math.degrees(Math.atan(x / y));
                neg = value => value < 0 ? true : false;
                return neg(y) ? 180 + angle : (
                  !neg(y) && neg(x) ? 360 + angle : angle
                )
              },
              quadrant: degrees => [1, 2, 3, 4].position(
                Math.floor(degrees / 90)
              ),
              rotate (x, y, rotation){
                val = type => Math[type](Math.radians(end));
                rig = () => [
                  val("sin") * c,
                  val("cos") * c
                ]
                rotate = (x, y, recursive) => {
                  let general = [x, y];
                  for (let i = 0; i < recursive; i ++)
                  general = [general[1], -general[0]]
                  return general;
                };
                let c = Math.distance([0, 0], [x, y]),
                amount = circle.degrees(x, y) + rotation,
                quadrant = circle.quadrant(amount),
                end = amount - ((quadrant - 1) * 90);
                return rotate(rig()[0], rig()[1], quadrant - 1);
              },
              sphere (x, y, z, rotxz, roty){
                let thetaXrot = circle.degrees(x, z),
                newZ = circle.rotate(x, z, -thetaXrot)[1],
                yRotYield = circle.rotate(newZ, y, -roty),
                $coords = circle.rotate(0, yRotYield[0], thetaXrot + rotxz);
                return {
                  x: $coords[0] || 0,
                  y: yRotYield[1],
                  z: $coords[1] || 0
                }
              },
              plane: {
                ratio (angle = 0){
                  val = (type) => Math[type](Math.radians(
                    circle.simplify(angle)
                  ))
                  return {
                    x: val("sin"),
                    y: val("cos")
                  }
                },
                move (angle = 0, type, amount = 1){
                  let setup = {
                    forward: [1, 1],
                    backward: [-1, -1],
                    left: [1, -1, true],
                    right: [-1, 1, true]
                  },
                  ratio = circle.plane.ratio(angle),
                  array = setup[type.toLowerCase()],
                  pull = (num, which) => array[num] * ratio[which] * amount,
                  end = [pull(0, "x"), pull(1, "y")];
                  if (array[2])
                  end = end.reverse();
                  return {
                    x: end[0],
                    y: end[1]
                  }
                }
              },
              simplify: value => value < 0 ? circle.simplify(
                360 + (value % 360) // recursive called on positive number
              ) : value % 360
            }
          )

          /*
              final element loading, allows for
              simple execution of interactive
              widget elements, includes sliders,
              draggables, rotatables, and
              resizables. ? TOLERANCES ARE RELATIVE
          */

          await (
            global.user = {
              target: null,
              mouse: {},
              relative: {}
            }
          )

          await (
            global.__u__ = (o) => {
              o.each((item, value) => {
                if (item in user)
                user[item] = value;
              })
            }
          )

          await (
            global.documentMouseDown = e => {
              mouse = () => {
                return {x: e.clientX, y: e.clientY}
              };
              try {
                __u__({
                  target: e.target,
                  mouse: {
                    current: mouse(),
                    previous: mouse(),
                    change: []
                  }
                })
              } catch {
                // do nothing
              }
            }
          )

          await (
            global.documentMouseMove = e => {
              try {
                let u = user, _u = u.target;
                if (!_u)
                return;
                mouse = () => {
                  return {x: e.clientX, y: e.clientY}
                }
                __change = t => u.mouse.current[t] - u.mouse.previous[t];
                __relative = m => {
                  let w = _u.scrollWidth, h = _u.scrollHeight,
                  ow = _u.offsetLeft, oh = _u.offsetTop;
                  return {
                    left: m.x - ow,
                    right: (ow + w) - m.x,
                    top: m.y - oh,
                    bottom: (oh + h) - m.y
                  }
                }
                __u__({
                  mouse: {
                    previous: u.mouse.current,
                    current: mouse(),
                    change: [
                      __change("x"),
                      __change("y")
                    ]
                  },
                  relative: __relative(mouse())
                })
                __widgetExecution__(
                  // instance of --->
                  user
                )
              } catch {
                // do nothing
              }
            }
          )

          await (
            global.documentMouseUp = () => user.target = false
          )

          await (
            global.__widgetExecution__ = u => {
              let e = u.target, w = e.widget;
              percent = (start, end, val) => 100 * (
                (val - start) / (end - start)
              )
              w.each((arch, query) => {
                switch(arch.toLowerCase()){

                  /*
                      creates working draggable widgets,
                      tolerances in x & y can be used
                      to make easily formatted sliders
                  */

                  case "draggable":
                   let option = "m", cx = u.mouse.change[0], cy = u.mouse.change[1];
                   if (e.position == "relative")
                   option = "";

                   e.move(l => {
                     let _x = option + "x", _y = option + "y", vx = l[_x], vy = l[_y];

                     /*
                        for sloped sliders, strict
                        dragging vectors, uses plane assets:
                        x ---> x
                        z ---> y     # 0.7071 ≈ 45 degrees
                     */

                     if (+query[4]){
                       if (query[5] === true) // strict definition
                       l.rotation = 90 - +query[4];
                       let ratio = __planeRatioXZ__(+query[4], 1);
                       if (ratio.z <= 0.7071)
                       cy = cx * ratio.z * (1 / ratio.x)
                       else if (ratio.z > 0.7071)
                       cx = cy * ratio.x * (1 / ratio.z)
                     }

                     /*
                        only add mouse change in x if
                        the sum of ∆x & current offset
                        of x is within tolerances
                     */

                     if (+query[0] <= (vx + cx) && (vx + cx) <= +query[1])
                     l[_x] += cx;

                     /*
                        only add mouse change in y if
                        the sum of ∆y & current offset
                        of y is within tolerances
                     */

                     if (+query[2] <= (vy + cy) && (vy + cy) <= +query[3])
                     l[_y] += cy;

                     // runs listener function

                     if (typeof query[6] == "function"){
                       query[6](
                         l[_x], l[_y], // % for sliders --->
                         percent(+query[0], +query[1], l[_x]),
                         percent(+query[2], +query[3], l[_y])
                       )
                     }
                   })
                   break;

                  /*
                      creates working rotatable widgets,
                      functions similar to a "wheel" where
                      the mouse forms a vector relative to
                      the target element's center point
                  */

                  case "rotatable":

                   /*
                      gets coordinates of mouse position
                      relative to a circle drawn around the
                      first click and returns degree difference
                      between the two.
                   */

                   circle = (x1, y1, x2, y2) => {
                     let ratio = Math.distance([0, 0], [x1, y1]) /
                                 Math.distance([0, 0], [x2, y2]);
                     return [x2 * ratio, y2 * ratio];
                   }

                   accurateDimension = (x, y) => Math.degrees(Math.atan(
                     ((.5 * Math.distance([x, y], [ax, ay])) /
                            Math.distance([0, 0], [ax, ay])) * 2
                   ))

                   // # setup ln #

                   let midx = e.offsetLeft + (e.scrollWidth / 2),
                   midy = e.offsetTop + (e.scrollHeight / 2),
                   m = u.mouse.current, p = u.mouse.previous,
                   ax = m.x - midx, ay = midy - m.y,
                   px = p.x - midx, py = midy - p.y,
                   fx = circle(ax, ay, px, py),
                   change = accurateDimension(fx[0], fx[1]);

                   // directional coefficient

                   if (
                     __rotationalSymmetryIndex__(ax, ay) -
                     __rotationalSymmetryIndex__(fx[0], fx[1]) < 0
                   )
                   change *= -1;

                   e.move(l => {

                     // execute within tolerances

                     if (
                       l.rotation + change < +query[1] &&
                       l.rotation + change > +query[0]
                     )
                     l.rotation += change;

                     // run listener function

                     if (typeof query[2] == "function"){
                       query[2](
                         l.rotation, // % for sliders --->
                         percent(+query[0], +query[1], l.rotation)
                       )
                     }
                   })
                   break;

                   /*
                       creates working resizable widgets,
                       options can be along vertices or
                       its sides, modes can either be x,
                       y, xy, or "strict" (x & y according
                       to its respective ratio)
                   */

                  case "resizable":
                    let sides = query.sides || {}, points = query.vertices,
                    pointIndex = [
                      [0, 0], // top-left
                      [1, 0], // top-right
                      [0, 1], // bottom-left
                      [1, 1]  // bottom-right
                    ],
                    sideIndex = [
                      [0, Infinity], // left
                      [1, Infinity], // right
                      [Infinity, 0], // top
                      [Infinity, 1]  // bottom
                    ], tolerance = 10;


                    break;
                }
              })
            }
          )

          await (
            document.children[0].attachEvent({
              mousedown: documentMouseDown,
              mousemove: documentMouseMove,
              mouseup: documentMouseUp
            })
          )

          await (

            /*
                container works as a more palatable
                body element, adding shortcuts while
                working asynchronously to the actual
                body element, deletion of one DOES NOT
                affect the other except in the case of
                element wrapping and positioning.
            */

            global.container = {
              get this (){
                return field({id: "#container"}) || document.body;
              },
              get dimensions (){
                return [
                  this.this.offsetWidth,
                  this.this.offsetHeight
                ]
              },
              get ratio (){
                return this.dimensions[0] / this.dimensions[1];
              },
              get css (){
                return this.this.style;
              },
              get center (){
                return container.this.center.slice(0, 2)
              },
              setup (){
                if (!field({id: "#container"})){
                  return document.body.append({
                    div: {
                      id: "#container",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      margin: "0 0 0 0",
                      display: "absolute",
                      left: 0,
                      top: 0
                    }
                  })
                }
                return container.this;
              },
              box (css){
                container.this.append("<div/>");
                return field({tag: "div"}, true).last.css(
                  css
                ).getContext("2d");
              },
              canvas (css){
                container.this.append("<canvas>")
                return field({tag: "canvas"}, true).last.css(css)
              },
              text (text){
                container.this.append("<font/>");
                let e = field({tag: "font"}, true).last;
                e.innerHTML = text;
                return e;
              },
              feedback (type){
                container.this.append("<input/>");
                let e = field({tag: "input"}, true).last;
                e.type = type || "text";
                return e;
              },
              clear (){
                this.this.innerHTML = "";
              },
              sidebar: {
                generic (id, w, h){
                  get = () => field({id: `#sidebar-${id}`}) // instance
                  if (!get()){
                    container.box({
                      id: `#sidebar-${id}`
                    })
                  }
                  let conversion = {
                    left: () => [0, 0],
                    right: (p, w, h) => [p[0] - w, 0],
                    top: () => [0, 0],
                    bottom: (p, w, h) => [0, p[1] - h]
                  }
                  query = i => conversion[id](container.dimensions, w, h)[i]
                  void function resizeSidebar (){
                    let e = get();
                    e.css({
                      "margin-left": query(0),
                      "margin-top": query(1),
                      width: w,
                      height: h,
                      position: "absolute"
                    })
                  }()
                  return get();
                },

                // left to right --->

                left (w, h){
                  return container.sidebar.generic(
                    "left", w ? w : 0, h ? h : container.dimensions[1]
                  )
                },
                right (w, h){
                  return container.sidebar.generic(
                    "right", w ? w : 0, h ? h : container.dimensions[1]
                  )
                },

                // top to bottom --->

                top (h, w){
                  return container.sidebar.generic(
                    "top", w ? w : container.dimensions[0], h ? h : 0
                  )
                },
                bottom (h, w){
                  return container.sidebar.generic(
                    "bottom", w ? w : container.dimensions[0], h ? h : 0
                  )
                }
              },
              slider (o){
                let width = o.width > 0 ? o.width : 100,
                    height = o.height > 0 ? o.height : 25;
                container.box({
                  width: width,
                  height: height,
                  class: "#slider",
                  transform: `rotate(${o.angle}deg)`,
                  position: "absolute",
                  margin: 0,
                  outline: "2px solid black"
                }).append({
                  DIV: {
                    class: "#slider-action",
                    position: "relative",
                    width: height - 4,
                    height: height - 4,
                    border: "2px solid black",
                    "border-radius": "30%"
                  }
                })

                return field({class: "#slider-action"}, true).last.drag([
                  0, width - height, 0, 0, 90, false, o.action
                ])
              },
              format (e){
                return {
                  slider (o, conditional){

                  }
                }
              }
            }
          )

        }

        if (approvedLoaders.includes("render")){

          await (
            global.camera = function (x = 0, y = 0, z = 0, horizontal = 0, vertical = 0){
              this.x = +x;
              this.y = +y;
              this.z = +z;
              this.horizontal = +horizontal;
              this.vertical = +vertical;
              this.reset = () => loop(5, i => {
                this[this.keys[i]] = 0
              })
              this.calibrate = o => o.each((item, value) => {
                if (item in this && type(this[item]) == "number")
                this[item] = value;
              })
              this.move = (direction, amount) => circle.plane.move(
                this.horizontal, direction, amount
              ).each((axis, value) => {
                this[axis] += +value;
              })
              this.bind = o => {
                o.each((item, queue) => {
                  __keyListenerFunctions__.push(
                    key => key == item ? queue() : false
                  )
                })
              }
            }
          )

          await (
            global.render = function (o = {}){
              this.field = o;
              this.set = o => o.each((item, value) => {
                console.log(item, value)
                if (this.template.includes(item) && type(value) == "object"){
                  console.log(value)
                  value.each((name, query = []) => {
                    if (!(item in this.field))
                    this.field[item] = {};
                    this.field[item][name] = query;
                  })
                }
              })
              this.template = [
                "points",
                "connections",
                "physics"
              ];
            }
          )

          await (
            global.animation = function (o = {}){
              this.setup = o;
              this.calculate = {
                slope: .5,
                scale: 1,
                appearance: (x, y, z, cx, cy, cz, rotxz, roty) => {
                  let newx = x - cx, newy = y - cy, newz = z - cz,
                      stable = circle.sphere(newx, newy, newz, rotxz, roty);
                  return {
                    x: stable.x + cx,
                    y: stable.y + cy + ((z + x) ** this.calculate.slope),
                    z: stable.z + cz
                  }
                }
              }
              this.sync = field => {
                let e = field(field);
                htmlRenderIn = (connections, points) => {
                  connections.each((start, end) => {

                  })
                }
                switch(e.tagName.toLowerCase()){
                  case "canvas":
                   throw `Syncing Error: type 'canvas' is not supported.`
                   break;
                  case "iframe":
                   throw `Syncing Error: type 'iframe' is not supported.`
                   break;
                  default:
                   let boundaries = {
                     x: [e.offsetLeft, e.offsetLeft + e.scrollWidth],
                     y: [e.offsetTop, e.offsetTop + e.scrollHeight]
                   }

                   break;
                }
              }
            }
          )

        }

        if (approvedLoaders.includes("canvas")){

        }

        if (approvedLoaders.includes("console")){
          document.body.append({
            div: {}
          })
        }

      }()
    sendMessage(" CODE BUILD STATUS:", true);
    return true; // promise officially resolved
  } catch {
    sendMessage(" CODE BUILD STATUS:", false);
    return false; // promised resolved as false
  }
}
