function bind(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
}

class Renderer {
    constructor(handler) {
        this._handler = handler;
        this.lastTime = new Date().getTime();
        this.timeDelta = 1 / 60;
    }

    render() { 
        let nowTime = new Date().getTime();
        this.timeDelta = (nowTime - this.lastTime) / 1000;
        this.lastTime = nowTime;
        bind(this._handler(this.timeDelta), window);
        this.reqAFID = requestAnimationFrame(bind(this.render, this));
    }

    start() {
        this.render();
    }

    stop() {
        cancelAnimationFrame(this.reqAFID);
    }

    get FPS() {
        return Math.round(1 / this.timeDelta);
    }
}