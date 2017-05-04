/**
 * Создает новый экземпляр Mouse.
 * 
 * @param {any} element DOM-объект для привязки. 
 */
class Mouse { 
    constructor(element) {
        this._x = 0;
        this._y = 0;
        this._clicked = false;

        element.addEventListener('mousemove', (function(evt) {
            var rect = element.getBoundingClientRect();
            this._x = evt.clientX - rect.left;
            this._y = evt.clientY - rect.top;
        }).bind(this));

        element.addEventListener('click', (function(evt) {
            this._clicked = true;
        }).bind(this));
    }

    get position() {
        return new Vector(this._x, this._y);
    }

    get clicked() {
        if (this._clicked) {
            this._clicked = false;
            return true;
        } else {
            return false;
        }
    }
}