
let lastUpdateTime = Date.now();
function gameTick() {
    const time = Date.now();
    const deltaTime = time - lastUpdateTime;
    lastUpdateTime = time;


}

function gameLoop() {
    setInterval(gameTick, 100);
}
