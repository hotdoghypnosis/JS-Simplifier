// in depth revision of circle functions

circle = {
  degrees (x, y){
    let angle = Math.degrees(Math.atan(x / y));
    neg = value => value < 0 ? true : false; // lower code length
    return neg(y) ? 180 + angle : (
      !neg(y) && neg(x) ? 360 + angle : angle
    )
  },
  simplify: value => value < 0 ? circle.simplify(
    360 + (value % 360) // recursive called on positive number
  ) : value % 360,
  quadrant: degrees => [1, 2, 3, 4].position(
    Math.floor(degrees / 90) // chooses sequental position
  ),
  coords (theta, rad){
    if (theta >= 360 || theta < 0)
    return circle.coords(circle.simplify(coords), rad)
    r90 = (li) => [li[1], -li[0]] // +90 degree rotation
    op = operation => Math[operation](Math.radians(theta % 90)) * rad
    let pseudo = [op("sin"), op("cos")] // x and y
    for (let i = 0; i < circle.quadrant(theta) - 1; i++)
    pseudo = r90(pseudo); // get closer to target
    return pseudo;
  },
  rotate (coords, rotation){
    let x = coords[0], y = coords[1];
    return circle.coords(
      circle.degrees(x, y) + rotation,
      Math.sqrt(
        (x ** 2) + (y ** 2) //  hypothetical radius
      )
    )
  },
  sphere (x, y, z, rotxz, roty){

  },

  // functions below are primarily for 3d graphics

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
  }
}
