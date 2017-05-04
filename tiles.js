var canvas = document.getElementById("main-canv"),
    context = canvas.getContext("2d");

var canvas2 = document.getElementById("map-canv"),
    context2 = canvas2.getContext("2d");

context.imageSmoothingEnabled = false;
context.globalAlpha = 1;
context.lineWidth = 2;

var mouse = new Mouse(canvas);
var mouse2 = new Mouse(canvas2);

class Tileset {
    constructor(filePath, tileSize) {
        this.image = new Image();
        this._ready = false;
        let self = this;
        this.image.onload = function() {
            console.log("Tileset " + filePath + " loaded!");
            self._ready = true;
            self.tilesInLine = self.image.width / self.tileWidth;
            self.lines = self.image.height / self.tileHeight;
            self.tilesCount = self.tilesInLine * self.lines;
        }
        this.image.src = filePath;
        this.tileWidth = tileSize.x;
        this.tileHeight = tileSize.y;
    }

    get tiles() {
        return this.tilesCount;
    }

    get img() {
        return this.image;
    }

    get ready() {
        return this._ready;
    }

    get imageSize() {
        return new Vector(this.image.width, this.image.height);
    }

    get tileSize() {
        return new Vector(this.tileWidth, this.tileHeight);
    }

    get size() {
        return new Vector(this.tilesInLine, this.lines);
    }

    tilePositionOnTileset(tile) {
        let tileY = Math.floor(tile / this.tilesInLine);
        let tileX = tile - tileY * this.tilesInLine;
        return new Vector(tileX, tileY);
    }

    tilePositionOnImage(tile) {
        let positionOnTileset = this.tilePositionOnTileset(tile);
        return positionOnTileset.multi(new Vector(this.tileWidth, this.tileHeight));
    }

    tileInCell(cell) {
        return cell.x + cell.y * this.tilesInLine;
    }

    drawTile(context, tile, position) {
        if (tile < 0 || tile > this.tilesCount) throw new Error("Tile not finded!");
        let imagePos = this.tilePositionOnImage(tile);
        context.drawImage(this.image, imagePos.x, imagePos.y, this.tileWidth, this.tileHeight, position.x, position.y, this.tileWidth, this.tileHeight);
    }

    draw(context, position) {
        context.drawImage(this.image, position.x, position.y);
        context.strokeStyle = "white";
        for (let tile = 0; tile < this.tilesCount; tile++) {
            let cellPos = this.tilePositionOnImage(tile);
            context.strokeRect(cellPos.x, cellPos.y, this.tileWidth, this.tileHeight);
        }
    }
}

let tileset = new Tileset("./tilesets/city1.png", new Vector(32, 32));

let currentCell = false;

let map = [];
for (let x = 0; x < 16; x++) { 
    map[x] = [];
    for (let y = 0; y < 16; y++) {
        map[x][y] = 0;
    }
}

let renderer = new Renderer(function(dt) {
    context.fillStyle = "blue";
    context.fillRect(0, 0, 640, 512);

    if (tileset.ready) {
        tileset.draw(context, new Vector(0, 0));
    }
    
    let selectedCell = mouse.position.div(tileset.tileSize).floor();
    let cellPos = selectedCell.multi(tileset.tileSize);
    context.strokeStyle = "black";
    context.strokeRect(cellPos.x, cellPos.y, tileset.tileSize.x, tileset.tileSize.y);

    if (mouse.clicked) {
        currentCell = selectedCell.copy();
    }

    if (currentCell) {
        let currentCellPos = currentCell.multi(tileset.tileSize);
        context.strokeStyle = "red";
        context.strokeRect(currentCellPos.x, currentCellPos.y, tileset.tileSize.x, tileset.tileSize.y);
    }

    context2.fillStyle = "green";
    context2.fillRect(0, 0, 512, 512);

    let selectedCell2 = mouse2.position.div(tileset.tileSize).floor();
    let cellPos2 = selectedCell2.multi(tileset.tileSize);
    context2.strokeStyle = "black";
    context2.strokeRect(cellPos2.x, cellPos2.y, tileset.tileSize.x, tileset.tileSize.y);

    if (mouse2.clicked) {
        map[selectedCell2.x][selectedCell2.y] = tileset.tileInCell(currentCell);
    }

    for (let x = 0; x < 16; x++) for (let y = 0; y < 16; y++) {
        tileset.drawTile(context2, map[x][y], new Vector(x*32, y*32))
    }

    
})
renderer.start();