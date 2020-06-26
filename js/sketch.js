var game, nodes = null;
    selectedNode = false;

function setup() {
    let height = $(document).height();
    let width = $(document).width();
    let dim = (height < width ? height : width) - 50
    createCanvas(dim, dim);
    frameRate(12);
    game = new Game();
    nodes = game.board;
    game.buildBoard;
}

function draw() {
    background(settings.colors.background);

    for (let node of nodes) {
        node.draw()
    }
    let mousePos = [mouseX, mouseY];
    $('canvas').css('cursor', 'default');
    nodes.forEach((node) => {
        if (game.checkIfOnNode(mousePos)) {
            $('canvas').css('cursor', 'pointer');
        }
    });
}

function mousePressed() {
    var node = game.checkIfOnNode([mouseX, mouseY])
    if (node) {
        if (node.location == selectedNode) {
            selectedNode = false;
        } else {
            let originalNode = false;
            if (selectedNode != false) {
                originalNode = game.getNode(selectedNode.row, selectedNode.col);
                selectedNode = node.location;

            } else {
                selectedNode = node.location;
            }
            if (originalNode != false) {
                let connect = originalNode.connect(game.getNode(selectedNode.row, selectedNode.col));

                if (connect == 'fail') {
                    selectedNode.fail = true;
                    originalNode.fail = true;
                    setTimeout(() => {
                        selectedNode.fail = false;
                        originalNode.fail = false;
                    }, 2000);
                }
                if (connect == 'connect' || connect == 'disconnect') selectedNode = false;
            }
        }
    }
}

