export function BlobWander({ blob, map }) {
    let direction = -1;

    return {
        wander
    };

    function wander(delta) {
        if (nearLeftEdge()) {
            direction = 1;
        }
        else if (nearRightEdge()) {
            direction = -1;
        }

        blob.move(blob.width() * .5 * delta * direction);
    }

    function nearLeftEdge() {
        return blob.position().x < 2;
    }

    function nearRightEdge() {
        const number = map.width() - 2;
        return blob.position().x > (number);
    }
}
