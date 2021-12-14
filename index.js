const express = require('express');
const req = require('express/lib/request');
const app = express();

const PORT = 8080;

app.listen(
    PORT,
    () => console.log("It's alive")
)


const newDoor = (maxHeight, maxWidth) => ({
    'state': Math.floor(Math.random * 2) < 1 ? 'open' : 'closed',
    'height': Math.floor(Math.random() * maxHeight),
    'width': Math.floor(Math.random() * maxWidth),
    'colour': Math.floor(Math.random() * 16777215).toString(16)
})

var door = newDoor(200, 200)
app.use(express.json())

// app.get('/show', (req, res) => {
//     console.log(door)
//     res.status(200).send(
//         `
//         <div style="width:${door.width}px; height:${door.height}px; background-color:#${door.color};">
//         </div>
//         `
//     )
// })

app.get('/state', (req, res) => {
    res.status(200).send({
        'state': door.state
    })
})

app.get('/colour', (req, res) => {
    res.status(200).send({
        'colour': '#' + door.colour
    })
})


app.patch('/state/:move', (req, res) => {
    const { move } = req.params;

    if ((move == "open" || move == "closed") && move != door.state) {
        door.state = move;
        res.status(200).send({
            'state': door.state
        })
    } else if (move == door.state) {
        res.status(409).send({
            'response': `Door is already ${move}`
        })
    }
    else {
        res.status(400).send({
            'response': `Door cannot be ${move}`
        })
    }
})

app.post('/steal', (req, res) => {
    const { width, length } = req.body;
    if (width == door.width && length == door.length) {
        res.status(200).send(door)
        door = newDoor(200, 200)
    } else {
        res.status(200).send({
            'length': width,
            'width': length
        })
    }
})

// The door is either open or closed
// The door has a new size every day (length, width)
// The door can be stolen when the right length and width is chosen
// The door has a colour
// The door has a doorknob located randomly on the door
