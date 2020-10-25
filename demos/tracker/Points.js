import { stat } from 'fs';
import Point from './Point.js';

export default class Points {
  constructor(points) {
    this.points = points.map((p) => new Point(p));
  }

  get length() {
    return this.points.length;
  }

  item(index) {
    return this.points[index];
  }

  /**
   *
   * @param {Points} points
   */
  findTracks(points) {
    let tracks = fusePoints(this, points);
    // let exceptionPoints = findeSurjection(tracks);
    // let newPersonsCoord = [];
    // let excess = [];

    // if (exceptionPoints.from.length != 0) {
    //   tracks = fusePoints(this.points, points, exceptionPoints.from, exceptionPoints.to);
    // }

    // while (!isSimpleTracks(tracks)) {
    //   exceptionPoints = findeSurjection(tracks, exceptionPoints);
    //   tracks = fusePoints(this.points, points, exceptionPoints.from, exceptionPoints.to);
    // }

    // if (tracks.length < points.length) {
    //   let pointsStr = points.slice().map((e) => JSON.stringify(e));
    //   let nearests = tracks.map((e) => JSON.stringify(e.nearest));

    //   newPersonsCoord = pointsStr.filter((e) => !nearests.includes(e)).map((e) => JSON.parse(e));
    // }

    // excess = tracks.filter((e) => !e.nearest).map((e) => e.point);


    return {tracks}; //  newPersonsCoord: newPersonsCoord, excess: excess
  }

  includes(P) {
    return Boolean(this.points.find((A) => Point.test(A, P)));
  }

  static includes(points, P) {
    return points.includes(P);
  }
}

function isSimpleTracks(tracks) {
  let nearests = tracks.map((e) => JSON.stringify(e.nearest));

  if (nearests.length != unique(nearests) + nullCounter(nearests)) {
    return false;
  }

  return true;
}

function nullCounter(points) {
  let counter = 0;
  for (let i = 0; i < points.length; i++) {
    if (points[i] == "null") counter++;
  }
  return counter;
}

/**
 *
 * @param {Points} before
 * @param {Points} after
 * @param {*} exceptionPointsFrom
 * @param {*} exceptionPointsTo
 */
function fusePoints(before, after, exceptionPointsFrom = [], exceptionPointsTo = []) {
  let tracks = [];

  for (let i = 0; i < before.length; i++) {
    /** @type {Point} */
    const current = before.item(i);
    let nearest = current.findNearest(after, exceptionPointsFrom, exceptionPointsTo);
    if (!nearest || !nearest.nearest) continue;
    tracks.push({point: current, nearest: nearest.nearest, distance: nearest.distance});
  }

  return tracks;
}

function findeSurjection(array, exceptionPoints = {from: [], to: []}) {
  let exceptionPointsFrom = [];
  let exceptionPointsTo = [];
  let index = 0;

  array.sort((a, b) => a.distance - b.distance);

  while (index != array.length) {
    for (let i = index; i < array.length - 1; i++) {
      if (JSON.stringify(array[index].nearest) == JSON.stringify(array[i + 1].nearest) && !exceptionPointsTo.includes(JSON.stringify(array[index].nearest)) && !exceptionPoints.from.includes(JSON.stringify(array[index].point))) {
        exceptionPointsFrom.push(JSON.stringify(array[index].point));
        exceptionPointsTo.push(JSON.stringify(array[index].nearest));
        break;
      }
    }

    index++;
  }

  return {from: exceptionPoints.from.concat(exceptionPointsFrom), to: exceptionPoints.to.concat(exceptionPointsTo)};
}

function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}
