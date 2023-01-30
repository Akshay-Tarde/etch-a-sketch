// Select the elements on the page - canvas, shake button and the context

const canvas = document.querySelector('#etch-a-sketch');

// The canvas is the element and the place where we do the drawing is called the context

const context = canvas.getContext('2d');

const shakeButton = document.querySelector('.shake');

const MOVE_AMOUNT = 10;
// Setup the canvas for drawing
// Add hue to the canvas
let hue = 0;
context.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`; 

context.lineJoin = 'round';
context.lineCap = 'round'; 
// This makes the drawing smooth as by default the drawing lines have squared off edges

context.lineWidth = 10; // For a thicker line 
// Create random widths and heights
let x = Math.floor(Math.random() * canvas.width);
let y = Math.floor(Math.random() * canvas.height);
context.beginPath(); // start the drawing
context.lineTo(x, y);
context.moveTo(x, y);
context.stroke(); // Will draw a line between where you started and where you drew you line to


// Write a draw function 

function draw({key}) {
    console.log(key);
    // increment the hue each time a key is used to draw
    hue += 10;
    context.strokeStyle = `hsl(${hue}, 100%, 50%)`; 

    // Start the path
    context.beginPath();
    context.moveTo(x,y);
    // change the x, y values according to user input
    switch (key)  {
        case 'ArrowUp': 
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
}
    context.lineTo(x,y);
    context.stroke();
}

// Write a handler for working with the keys

function handleKey(event) {
    if (event.key.includes('Arrow')) {
        event.preventDefault(); // to prevent the arrow key to scroll up or down
        draw({ key: event.key}); 
    }
}

// write a clear / shake function 
function clearCanvas() {
    canvas.classList.add('shake');
    context.clearRect(0,0, canvas.width, canvas.height);
    canvas.addEventListener('animationend',function() {
        canvas.classList.remove('shake');
    }, { once: true })
}
 
// Listen for arrow keys
window.addEventListener('keydown', handleKey);

// hook the clearCanvas function to the shake button

shakeButton.addEventListener('click', clearCanvas);
