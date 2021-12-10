const express = require('express');
const app = express();

const PORT = 8080;

app.listen(
    PORT,
    () => console.log("It's alive")
)

var door = {
    'state': 'open',
    'length': 1,
    'width': 1,
    'color': "Red",
    'creator': 'John Cena'
}

app.use( express.json() )

app.get('/state', (req, res) => {
    res.status(200).send({
        'state': door.state
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
            'response':`Door is already ${move}`
        })
    } 
    else {
        res.status(400).send({
            'response':`Door cannot be ${move}`
        })
    }
})

// The door is either open or closed
// The door has a new size every day (length, width)
// The door can be stolen when the right length and width is chosen
// The door has a colour
// The door has a doorknob located randomly on the door
