var settings = {
    size: 5,
    maxConnections: (Math.floor(Math.random() * 5) + 3),
    colors: {
        complete: 'LIME',
        default: '#ADD8E6',
        selected: 'YELLOW',
        line: 'WHITE',
        background: 'BLACK',
        text: 'BLACK',
        fail: 'RED'
    }
}


Array.prototype.remove = function (elem) {
    const index = this.indexOf(elem);
    if (index > -1) {
        this.splice(index, 1);
    }
}