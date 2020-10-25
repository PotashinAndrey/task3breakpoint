import Points from './Points.js';

export default class Point {
  constructor({x, y}) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Points} points
   */
  findNearest(points, exceptionPointsFrom = [], exceptionPointsTo = []) {
    if (points.length == 0) return;

    // if (exceptionPointsFrom.includes(JSON.stringify(this))) {
    //   let nearest = exceptionPointsTo[exceptionPointsFrom.indexOf(JSON.stringify(this))];
    //   return {nearest: nearest, distance: this.distance(nearest)};
    // }

    let nearest = null;
    let distance = 0;

    for (let i = 0; i < points.length; i++) {
      /** @type {Point} */
      const current = points.item(i);

      // && !exceptionPointsTo.includes(JSON.stringify(current))

      const distanceCurrent = this.distance(current);
      if (distanceCurrent < 50 && distanceCurrent < this.distance(nearest)) {
        nearest = current;
        distance = distanceCurrent;
      }
    }

    return {nearest: nearest, distance: distance};
  }

  distance(point) {
    if (!point) return Infinity;
    return Math.hypot(this.x - point.x, this.y - point.y);
  }

  static test(A, B) {
    return A.x === B.x && A.y === B.y;
  }
}
