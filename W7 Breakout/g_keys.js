// =================
// KEYBOARD HANDLING
// =================

var g_keys = [];

function handleKeydown(evt) {
    g_keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
    g_keys[evt.keyCode] = false;
}

function handleMouseMove(evt) {
    g_ball.cx = evt.clientX - g_canvas.offsetLeft;
    g_ball.cy = evt.clientY - g_canvas.offsetTop;
    g_ball.nextX= evt.clientX - g_canvas.offsetLeft;
    g_ball.nextY = evt.clientY - g_canvas.offsetTop;
    g_ball.render(g_ctx);
}

// Inspects, and then clears, a key's state
//
// This allows a keypress to be "one-shot" e.g. for toggles
// ..until the auto-repeat kicks in, that is.
//
function eatKey(keyCode) {
    var isDown = g_keys[keyCode];
    //g_keys[keyCode] = false;
    return isDown;
}

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
//window.addEventListener("mousemove", handleMouseMove);
