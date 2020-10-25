import Person from './Person.js';
import Point from './Point.js';
import Points from './Points.js';

export default class Persons {
  constructor() {
    this.persons = [];
    this.counter = 0;
  }

  addPerson(person) {
    this.persons.push(new Person(person));
  }

  get list() {
    return this.persons;
  }
  get length() {
    return this.persons.length;
  }

  get last() {
    const array = this.persons.map((p) => p.last).filter((e) => e);
    return new Points(array.map((e) => ({x: e.x, y: e.y})));
  }

  check(persons, border) {
    if (this.persons.length === 0) {
      persons.forEach((p) => this.addPerson(p));
      return;
    }

    const last = this.last;
    const points = new Points(persons);
    const tracks = last.findTracks(points);

    this.persons.forEach((p) => p.updated = false);

    tracks.tracks.forEach((track) => {
      if (!track.point) return;
      const temp = this.persons.find((person) => {
        if (!person.last) return false;
        return Point.test(person.last, track.point);
      });

      if (temp) {
        temp.push(track.nearest);
        temp.updated = true;
        for (let index = 0; index < points.length; index++) {
          const element = points.item(index);
          if (Point.test(element, track.nearest)) element.updated = true;
        }
      }

      if (!border) return;
      if (border.borderIsCrossing(track.nearest, track.point)) {
        ++this.counter;
      }
    });

    if (tracks.tracks.length !== points.length) {
      const prev = tracks.tracks.length;
      const curr = points.length;
      if (prev > curr) {
        // человек ушел
        this.persons = this.persons.filter(p => p.updated);
      } else {
        // пришел
        const created = [];
        for (let index = 0; index < points.length; index++) {
          const element = points.item(index);
          if (!element.updated) this.addPerson(element);
        }
      }
    }
  }

  draw(ctx) {
    this.persons.forEach((p, i) => p.draw(ctx, i));
    console.log(this.persons);
  }
}
