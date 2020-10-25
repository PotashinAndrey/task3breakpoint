import Point from './Point.js';
import Border from './Border.js';

export default class Person {
  constructor({x, y}) {
    this.track = [];
    this.deleted = false;
    this.push({x, y});
  }

  get length() {
    return this.track.length;
  }

  push(position) {
    this.track.push(new Point(position));
  }

  /**
   *
   * @return {Point} point
   */
  get last() {
    const length = this.length;
    if (length === 0) return null;
    return this.track[length - 1];
  }

  delete() {
    this.deleted = true;
  }

  isDeleted() {
    return this.deleted;
  }

  getId() {
    return this.id;
  }

  draw(ctx, index) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${index % 3 === 0 ? 255 : 0}, ${index % 3 === 1 ? 255 : 0}, ${index % 3 === 2 ? 255 : 0})`;
    ctx.moveTo(this.track[0].x, this.track[0].y);
    for (let index = 1; index < this.track.length; index++) {
      const element = this.track[index];
      ctx.lineTo(element.x, element.y);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  cross(border) {
    if (this.length() < 2) return false;
    return border.borderIsCrossing(this.track[this.length() - 2], this.track[this.length() - 1]);
  }
}
