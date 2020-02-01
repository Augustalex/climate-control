export function CloudBop({ cloud }) {
    const frames = [
        { x: 2, y: 6 },
        { x: 2, y: 5 },
        { x: 2, y: 5 },
        { x: 2, y: 6 },
    ];
    let currentFrameIndex = 0;

    return {
        bop
    };

    function bop() {
        const frame = frames[currentFrameIndex];
        cloud.setPosition(frame);
        if (currentFrameIndex === frames.length - 1) {
            currentFrameIndex = 0;
        }
        else {
            currentFrameIndex++;
        }
    }
}
