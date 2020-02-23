/*
    In depth revision of circle functions,
    note that the results are APPROXIMATIONS,
    and are not always exact
*/


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
      return circle.coords(circle.simplify(theta), rad)
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
  sphere_raw (xyz, rotxyyzxz){
    // raw unorganized data computation:
    let coords = xyz;
    for (let rotation of rotxyyzxz){
      let pos = rotxyyzxz.indexOf(rotation);
      coords = [
        xyz.position(pos + 2),
        circle.rotate(
          xyz.position()
        )
      ]
    }
    return coords; // update
  },
  sphere (x, y, z, rotxy, rotyz, rotxz){
    // makes sphere function easier to read/input
    return circle.sphere_raw (
      [x, y, z], [rotxy, rotyz, rotxz]
    )
  },
  tangent (angle){
    let coords = circle.coords(angle + 90, 1);
    return coords[1] / coords[0] // slope of tangent line
  }
}
