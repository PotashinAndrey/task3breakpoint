export default class Border {
  constructor(pointOne, pointTwo) {
    this.pointOne = pointOne;
    this.pointTwo = pointTwo;
    this.directionVector = {x: pointTwo.x -pointOne.x, y: pointTwo.y - pointOne.y};
  }

  borderIsCrossing(pointOne, pointTwo) {
    const directionVector = this.directionVector;
    let isPrimitive = parallelToTheCoordinateAxis(directionVector, pointOne, pointTwo);
    if (isPrimitive) return isPrimitive;

    let firstPointSide = pointSide(pointOne, this.pointOne, this.directionVector);
    let secondPointSide = pointSide(pointTwo, this.pointOne, this.directionVector);

    if (secondPointSide.x == secondPointSide.y) return true;
    if (firstPointSide.x > firstPointSide.y == secondPointSide.x < secondPointSide.y || firstPointSide.x < firstPointSide.y == secondPointSide.x > secondPointSide.y) return true;

    return false;
  }

  draw(ctx) {
    const color = 'yellow';
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    const A = this.pointOne;
    const B = this.pointTwo;
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  static line(canvas, {x, y}) {
    return new Promise((resolve) => {
      let points = [];
      canvas.addEventListener('click', (e) => {
        if (points.length > 2) return;
        const point = {
          x: e.offsetX,
          y: e.offsetY,
        };
        points.push(point);
        if (points.length === 2) resolve(new Border(...points));
      });
    })
  }
}

function pointSide(point, linePoint, vector) {
  let pointSideX = (point.x - linePoint.x)/vector.x;
  let pointSideY = (point.y - linePoint.y)/vector.y;

  return {x: pointSideX, y: pointSideY};
}

function parallelToTheCoordinateAxis(vector, pointOne, pointTwo) {
  if (vector.x == 0 || vector.y == 0) {
    if (vector.x == 0) {
      return primitiveCase(vector.x, pointOne.x, pointTwo.x);
    }

    if (vector.y == 0) {
      return primitiveCase(vector.y, pointOne.y, pointTwo.y);
    }
  }
  return false;
}

function primitiveCase(position, pointOne, pointTwo) {
  let firstPointSide = position - pointOne >= 0;
  let secondPointSide = position - pointTwo >= 0;

  return firstPointSide != secondPointSide;
}
