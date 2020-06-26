class Game {
    constructor() {
        this.grid = [];
        for (let row = 0; row < settings.size * 2; row += 2) {
            for (let col = 0; col < settings.size * 2; col += 2) {
                this.grid.push(new Node({ row: row, col: col }));
            }
        }
        this.selected = this.grid[Math.floor(Math.random() * this.grid.length - 3)]
    }

    get buildBoard() {
        if (this.findSpots == []) return
        if (this.selected.remaining == settings.maxConnections) return
        let oldSpot = this.selected,
            newSpot = this.selectSpot(this.findSpots);

        if (newSpot != false) {
            if (newSpot.remaining == settings.maxConnections) return
            newSpot.remaining += 1;
            oldSpot.remaining += 1;
            this.selected = newSpot;
            oldSpot._build.connections.push(newSpot)
            newSpot._build.remaining += 1;
            oldSpot._build.remaining += 1;
        }

        if (newSpot != false) this.buildBoard;
    }

    get findSpots() {
        let spots = [];
        // Can Move Right
        if (this.selected.location.row != 0) {
            spots.push(this.getBuildNode(this.selected.location.row - 1, this.selected.location.col));

            //! DIAG
            // Can Move Up
            if (this.selected.location.col != 0) {
                spots.push(this.getBuildNode(this.selected.location.row - 1, this.selected.location.col - 1));
            }
            // Can Move Down
            if (this.selected.location.col != settings.size - 1) {
                spots.push(this.getBuildNode(this.selected.location.row - 1, this.selected.location.col + 1));
            }
        }
        // Can Move Left
        if (this.selected.location.row != settings.size - 1) {
            spots.push(this.getBuildNode(this.selected.location.row + 1, this.selected.location.col)); 7

            //! DIAG
            // Can Move Up
            if (this.selected.location.col != 0) {
                spots.push(this.getBuildNode(this.selected.location.row + 1, this.selected.location.col - 1));
            }
            // Can Move Down
            if (this.selected.location.col != settings.size - 1) {
                spots.push(this.getBuildNode(this.selected.location.row + 1, this.selected.location.col + 1));
            }
        }
        // Can Move Up
        if (this.selected.location.col != 0) {
            spots.push(this.getBuildNode(this.selected.location.row, this.selected.location.col - 1));
        }
        // Can Move Down
        if (this.selected.location.col != settings.size - 1) {
            spots.push(this.getBuildNode(this.selected.location.row, this.selected.location.col + 1));
        }
        return spots.filter(Boolean);
    }

    selectSpot(spots) {
        return spots[Math.floor(Math.random() * spots.length)] || false;
    }

    get board() {
        return this.grid
    }

    getNode(x, y) {
        var chosenNode = false;

        this.grid.forEach(node => {
            if (node.location.row == x && node.location.col == y) {
                chosenNode = node;
            }
        });

        return chosenNode;
    }

    getBuildNode(x, y) {
        var chosenNode = false;

        this.grid.forEach(node => {
            if (node.location.row == x && node.location.col == y) {
                if (node.remaining < settings.maxConnections) {
                    if (!this.selected._build.connections.includes(this.getNode(x, y)) && !this.getNode(x, y)._build.connections.includes(this.selected)) {
                        chosenNode = node;
                    }
                }

            }
        });

        return chosenNode;
    }

    checkIfOnNode(mousePos) {
        var nodeFound = false;
        this.grid.forEach((node) => {
            if (selectedNode == node.location) {
                node.selected = true
            } else {
                node.selected = false
            }
            if (
                    ((mousePos[0] > node.position[0] + (node.radius / 3)) && (mousePos[0] < (node.position[0] + (node.radius * (5/3))))
                ) && (
                    (mousePos[1] > node.position[1] + (node.radius / 3)) && (mousePos[1] < (node.position[1] + (node.radius * (5/3)))))
                ) {
                    nodeFound = node;
            }
        })
        return nodeFound;
    }
}