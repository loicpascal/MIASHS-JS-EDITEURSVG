app = {
    mode: "",
    svgNS: 'http://www.w3.org/2000/svg',
    svg: document.getElementById('shapeSVG')
};

/**
 * Classe mère ShapeSVG commune à toutes les formes
 */
class ShapeSVG {
    constructor(x1=0, y1=0, id) {
        this.shapeDOM = null;
        this.x1 = x1;
        this.y1 = y1;
        this.id = id;
    }

    attrShape(k,v) {
        this.shapeDOM.setAttribute(k,v);
    }

    createShape(type) {
        this.shapeDOM = document.createElementNS(app.svgNS,type);
    }

    drawShape() {
        this.attrShape('fill', document.getElementById('iFillColor').value);
        this.attrShape('stroke', document.getElementById('iStrokeColor').value);
        this.attrShape('stroke-width', document.getElementById('iStrokeWidth').value);
        this.attrShape('id', this.id);
        app.svg.appendChild(this.shapeDOM);
    }
}

/**
 * Classe RectSVG représente le rectangle
 */
class RectSVG extends ShapeSVG {
    constructor(x1, y1, id) {
        super(x1, y1, id);
        this.x2 = x1;
        this.y2 = y1;
    }

    drawShape() {
        this.createShape('rect');
        this.attrShape('x',this.x1);
        this.attrShape('y',this.y1);
        super.drawShape();
    }

    updateShape() {
        if (app.mode === 'ADD') {
            this.attrShape('width',this.x2 - this.x1);
            this.attrShape('height',this.y2 - this.y1);
        } else if (app.mode === 'EDIT') {
            this.attrShape('x', this.x1);
            this.attrShape('y', this.y1);
        }
    }
}

/**
 * Classe CarrSVG représente le carré
 */
class CarrSVG extends ShapeSVG {
    constructor(x1, y1, id) {
        super(x1, y1, id);
        this.x2 = x1;
        this.y2 = y1;
    }

    drawShape() {
        this.createShape('rect');
        this.attrShape('x',this.x1);
        this.attrShape('y',this.y1);
        super.drawShape();
    }

    updateShape() {
        if (app.mode === 'ADD') {
            let max = Math.max(this.x2 - this.x1, this.y2 - this.y1);
            this.attrShape('width',max);
            this.attrShape('height',max);
        } else if (app.mode === 'EDIT') {
            this.attrShape('x', this.x1);
            this.attrShape('y', this.y1);
        }
    }
}

/**
 * Classe CircSVG représente le cercle
 */
class CircSVG extends ShapeSVG {
    constructor(x1, y1, id) {
        super(x1, y1, id);
        this.x2 = x1;
        this.y2 = y1;
        this.r = 0;
    }

    drawShape() {
        this.createShape('circle');
        this.attrShape('cx',this.x1);
        this.attrShape('cy',this.y1);
        super.drawShape();
    }

    updateShape() {
        if (app.mode === 'ADD') {
            this.r = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
            this.attrShape('r',this.r);
        } else if (app.mode === 'EDIT') {
            this.attrShape('cx', this.x1);
            this.attrShape('cy', this.y1);
        }
    }
}

/**
 * Classe ElliSVG représente l'ellipse
 */
class ElliSVG extends ShapeSVG {
    constructor(x1,y1,id) {
        super(x1, y1, id);
        this.x2 = x1;
        this.y2 = y1;
        this.rx = 0;
        this.ry = 0;
    }

    drawShape() {
        this.createShape('ellipse');
        this.attrShape('cx',this.x1);
        this.attrShape('cy',this.y1);
        super.drawShape();
    }

    updateShape() {
        if (app.mode === 'ADD') {
            this.attrShape('rx',this.x2 - this.x1);
            this.attrShape('ry',this.y2 - this.y1);
        } else if (app.mode === 'EDIT') {
            this.attrShape('cx', this.x1);
            this.attrShape('cy', this.y1);
        }
    }
}

/**
 * Classe SegmSVG représente le segment
 */
class SegmSVG extends ShapeSVG {
    constructor(x1, y1, id) {
        super(x1, y1, id);
        this.x2 = x1;
        this.y2 = y1;
        this.width = this.x2 - this.x1;
        this.height = this.y2 - this.y1;
    }

    drawShape() {
        this.createShape('line');
        this.attrShape('x1',this.x1);
        this.attrShape('y1',this.y1);
        this.attrShape('x2',this.x2);
        this.attrShape('y2',this.y2);
        super.drawShape();
    }

    updateShape() {
        if (app.mode === 'ADD') {
            this.attrShape('x2',this.x2);
            this.attrShape('y2',this.y2);
            this.width = this.x2 - this.x1;
            this.height = this.y2 - this.y1;
        } else if (app.mode === 'EDIT') {
            this.attrShape('x1', this.x1);
            this.attrShape('y1', this.y1);
            this.attrShape('x2', this.x2 = this.x1 + this.width);
            this.attrShape('y2', this.y2 = this.y1 + this.height);
        }
    }
}

/**
 * Classe RectSVG représente le texte
 */
class TextSVG extends ShapeSVG {
    constructor(x1, y1, id) {
        super(x1, y1, id);
    }

    drawShape() {
        this.createShape('text');
        this.attrShape('x',this.x1);
        this.attrShape('y',this.y1);
        this.shapeDOM.innerHTML = window.prompt("Votre texte : ");
        super.drawShape();
    }

    updateShape() {
        if (app.mode === 'EDIT') {
            this.attrShape('x', this.x1);
            this.attrShape('y', this.y1);
        }
    }
}

/**
 * Représente le dessin dans son ensemble
 */
class DrawingSVG {
    constructor() {
        this.shapes = [];
        this.action = "";
    }
}

/**
 * Représente la zone de dessin et les interactions avec la souris
 */
class DrawingZone {
    constructor() {
        this.drawingSVG = drawingSVG;
        this.currentShape = null;
        this.editing = false;
        // Les coordonnées on mouse down
        this.x = 0; this.y = 0;
    }

    whenMouseDown(e) {
        this.x = e.offsetX; this.y = e.offsetY;
        if (app.mode === 'ADD') {
            this.editing = true;
            let id = this.drawingSVG.shapes.length;
            switch(this.drawingSVG.action) {
                case 'Rect':
                    this.currentShape = new RectSVG(this.x, this.y, id);
                    break;
                case 'Carr':
                    this.currentShape = new CarrSVG(this.x, this.y, id);
                    break;
                case 'Circ':
                    this.currentShape = new CircSVG(this.x, this.y, id);
                    break;
                case 'Elli':
                    this.currentShape = new ElliSVG(this.x, this.y, id);
                    break;
                case 'Segm':
                    this.currentShape = new SegmSVG(this.x, this.y, id);
                    break;
                case 'Text':
                    this.currentShape = new TextSVG(this.x, this.y, id);
                    break;
            }
            this.currentShape.drawShape();
        } else if (app.mode === 'EDIT') {
            this.editing = true;
            this.currentShape = this.drawingSVG.shapes[e.target.id];
        } else if (app.mode === 'SELECT') {
            this.currentShape = this.drawingSVG.shapes[e.target.id];
        }
        // On affiche les coordonnées du curseur
        document.getElementById('coordinates').innerHTML = this.currentShape.name;
    }

    whenMouseUp() {
        this.editing = false;
        if (app.mode === 'ADD') {
            this.drawingSVG.shapes[this.drawingSVG.shapes.length] = this.currentShape;
        }
    }

    whenMouseMove(e) {
        if (this.editing) {
            if (app.mode === 'ADD') {
                this.currentShape.x2 = e.offsetX;
                this.currentShape.y2 = e.offsetY;
            } else if (app.mode === 'EDIT') {
                this.currentShape.x1 += e.offsetX - this.x;
                this.currentShape.y1 += e.offsetY - this.y;
                this.x = e.offsetX;
                this.y = e.offsetY;
            }
            if (app.mode === 'ADD' || app.mode === 'EDIT') {
                this.currentShape.updateShape();
            }
        }
    }

    deleteCurrent() {
        this.currentShape.shapeDOM.remove();
        delete this.drawingSVG.shapes[this.currentShape.id];
    }
}

/**
 * Représente le menu qui permet de choisir la forme à dessiner
 */
class MenuAction {

    constructor(drawingSVG) {
        this.elems = ['bRect','bCarr','bCirc','bElli','bSegm','bText','bMove','bSele','bDele'];
        for (let e of this.elems) {
            this[e] = document.getElementById(e);
        }
        this.drawingSVG = drawingSVG;
    }

    static changeMode(mode, cursor) {
        app.mode = mode;
        app.svg.style.cursor = cursor;
    }

    setAction(sForm) {
        for (let e of this.elems) {
            this[e].classList.remove('selected');
        }

        if (sForm !== "") {
            if (sForm === 'Move') {
                MenuAction.changeMode('EDIT', 'move');
            } else if (sForm === 'Select') {
                MenuAction.changeMode('SELECT', 'pointer');
            } else {
                MenuAction.changeMode('ADD', 'crosshair');
            }
            this.drawingSVG.action = sForm;
            this["b" + sForm].classList.add('selected');
        }
    }
}

/*
 * Interactions
 */
let drawingSVG = new DrawingSVG();
let drawingZone = new DrawingZone(drawingSVG);

// Gestion des interactions avec le menu des actions
let menuAction = new MenuAction(drawingSVG);
menuAction.bRect.onclick = function() {
    menuAction.setAction("Rect");
};
menuAction.bCarr.onclick = function() {
    menuAction.setAction("Carr");
};
menuAction.bCirc.onclick = function() {
    menuAction.setAction("Circ");
};
menuAction.bElli.onclick = function() {
    menuAction.setAction("Elli");
};
menuAction.bSegm.onclick = function() {
    menuAction.setAction("Segm");
};
menuAction.bText.onclick = function() {
    menuAction.setAction("Text");
};
menuAction.bMove.onclick = function() {
    menuAction.setAction("Move");
};
menuAction.bSele.onclick = function() {
    menuAction.setAction("Select");
};
menuAction.bDele.onclick = function() {
    if (app.mode === 'SELECT' && drawingZone.currentShape !== undefined) {
        drawingZone.deleteCurrent();
    }
};

// Gestion des interactions avec la zone de dessin
app.svg.onmousedown = function(e) {
    drawingZone.whenMouseDown(e);
};
app.svg.onmouseup = function(e) {
    drawingZone.whenMouseUp(e);
};
app.svg.onmousemove = function(e) {
    document.getElementById('coordinates').innerHTML = "X = " + e.offsetX + ", Y = " + e.offsetY;
    drawingZone.whenMouseMove(e);
};

// Gestion des événements au clavier
window.onkeydown = function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
    }
    switch(e.key) {
        case 'r':
            if (e.ctrlKey) {
                document.getElementById('iFillColor').click();
            } else {
                menuAction.setAction("Rect");
            }
            break;
        case 'p':
            menuAction.setAction("Carr");
            break;
        case 'c':
            if (e.ctrlKey) {
                document.getElementById('iStrokeColor').click();
            } else {
                menuAction.setAction("Circ");
            }
            break;
        case 'e':
            menuAction.setAction("Elli");
            break;
        case 'l':
            menuAction.setAction("Segm");
            break;
        case 't':
            menuAction.setAction("Text");
            break;
        case 'd':
            menuAction.setAction("Move");
            break;
        case 's':
            menuAction.setAction("Select");
            break;
        case 'Delete':
            if (app.mode === 'SELECT' && drawingZone.currentShape !== undefined) {
                drawingZone.deleteCurrent();
            }
            break;
    }
};