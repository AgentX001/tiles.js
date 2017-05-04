class Vector {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get x () {
        return this._x;
    }
    get y () {
        return this._y;
    }
    set x (x) {
        this._x = x;
    }
    set y (y) {
        this._y = y;
    }

    toString() {
        return "x: " + this._x + "; y: " + this._y;
    }

    copy() {
        return new Vector(this._x, this._y);
    }

    multi(vector) {
        if (vector instanceof Vector) {
            return new Vector(this._x * vector.x, this._y * vector.y);
        } else {
            throw new TypeError("argument must be a vector!");
        }
    }

    div(vector) {
        if (vector instanceof Vector) {
            return new Vector(this._x / vector.x, this._y / vector.y);
        } else {
            throw new TypeError("argument must be a vector!");
        }
    }

    floor() {
        return new Vector(Math.floor(this._x), Math.floor(this._y));
    }

    round() {
        return new Vector(Math.round(this._x), Math.round(this._y));
    }
}