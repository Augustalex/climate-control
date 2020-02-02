export function CloudBop({ cloud }) {
    const frames = [
        { x: 2, y: 10.5 },
        { x: 2, y: 10 },
        { x: 2, y: 10 },
        { x: 2, y: 10.5 },
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
