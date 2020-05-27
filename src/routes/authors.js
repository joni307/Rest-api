const { Router } = require('express');
const router = Router();
//   LIBRARY
const _ = require('lodash');

const authors = require('../authors.json');
const books = require('../books.json');

//method to fetch data
router.get('/', (req, res) => {
    if (authors.length == 0) {
        res.status(404).json({ error: 'not found' });

    } else {
        res.json(authors);
    }

});


// // method to send data
router.post('/', (req, res) => {

    const id = authors.length + 1;
    const { name, lastname } = req.body;
    const newAuthors = { id, ...req.body };
    if (id && name && lastname) {
        authors.push(newAuthors);
        res.json(authors);

    } else {
        res.status(500).json({ error: 'There was an error.' });
    }
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, lastname } = req.body;
    if (id && name && lastname) {
        _.each(authors, (author) => {
            if (author.id == id) {
                author.name = name;
                author.lastname = lastname;
            }
        });
        res.json(authors);
    }

});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(authors, (author, i) => {
        if (author.id == id) {
            _.each(books, (book, i) => {
                if (book.authorId === id) {
                    res.status(404).json({ error: 'no se puede porque tiene libros' });
                }

            });
            authors.splice(i, 1);
            res.json(authors);

        }
    });
    res.status(404).json({ error: 'no se puede x2' })
        //     res.status(404).json({ error: ' no se puede porque hay autores vinculados' })
})

module.exports = router;