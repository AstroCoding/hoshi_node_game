const dimension = settings.size;

function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

class Node {
    constructor(location={row: 0, col: 0}) {
        this.remaining = 0;
        this.location = {row: location.row / 2, col: location.col / 2};
        this.position = [width / (dimension * 2) * this.location.col * 2, height / (dimension * 2) * this.location.row * 2];
        this.radius = width / (dimension * 2);
        this.selected = false;
        this.connections = [];
        this._build = {connections: []}
    }

    draw() {
        this.drawLines();
        push();
        translate(this.position[0], this.position[1]);
        //* Draw Node
        if (this.remaining <= 0) {
            fill(settings.colors.complete);
        } else {
            fill(settings.colors.default);
        }
        if (this.fail == true) {
            fill(settings.colors.fail)
        } else if (this.selected) {
            fill(settings.colors.selected);
        }
        star(width / (dimension * 2), height / (dimension * 2), this.radius / 3, this.radius / 1.5, 8);
        if (this.remaining != 0) {
            //* Fill Node
            fill(settings.colors.text);
            textSize(72 / ((dimension * 2) / 4));
            textAlign(CENTER);
            text(`${this.remaining}`, width / (dimension * 2), 1.15 * height / (dimension * 2));
        }
        pop();
    }

    drawLines() {
        for (let connection of this.connections) {
            push();
            stroke(settings.colors.line);
            strokeWeight(2);
            line(this.position[0] + this.radius,this.position[1] + this.radius, connection.position[0] + connection.radius, connection.position[1] + connection.radius);
            pop();
        }
    }

    connect(other) {
        if (
            (
                (this.location.row == other.location.row - 1 || this.location.row == other.location.row + 1) && this.location.col == other.location.col
            ) || (
                (this.location.col == other.location.col - 1 || this.location.col == other.location.col + 1) && this.location.row == other.location.row
            ) || (
                (this.location.col == other.location.col - 1 || this.location.col == other.location.col + 1) && (this.location.row == other.location.row - 1 || this.location.row == other.location.row + 1)
            )
        ) {
            if (this.remaining >= 1 && other.remaining >= 1) {

                if (this.connections.includes(other)) {
                    this.connections.remove(other);
                    this.remaining += 1;
                    other.remaining += 1;
                    return 'disconnect';
                }
                if (other.connections.includes(this)) {
                    other.connections.remove(this);
                    this.remaining += 1;
                    other.remaining += 1;
                    return 'disconnect';
                }
                this.remaining -= 1;
                other.remaining -= 1;
                for (let node of nodes) {
                    if (node == this) {
                        this.connections.push(other);
                        break;
                    } else if (node == other) {
                        other.connections.push(this);
                        break
                    }
                }
                return 'connect';
            }
            if (this.connections.includes(other)) {
                this.connections.remove(other);
                this.remaining += 1;
                other.remaining += 1;
                return 'disconnect';
            }
            if (other.connections.includes(this)) {
                other.connections.remove(this);
                this.remaining += 1;
                other.remaining += 1;
                return 'disconnect';
            }
            return 'fail';
        } else {
            return 'fail';
        }
    }
}