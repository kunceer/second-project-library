const expres= require('express')
const User= require('../models/user.js')
const router = expres.Router()


router.get('/', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/'); 
        }

        const user = await User.findById(req.session.user.id);

        res.render('users/index.ejs', { 
            books: user.books
        });
    } catch (err) {
        console.error(err);
        res.send("Something went wrong");
    }
});

router.get("/addBooks", (req, res)=>{
    res.render("users/addBooks.ejs")
})

router.post("/addBooks", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/");
    }

    const { title, author, description, myReviews } = req.body;

    try {
        
        const user = await User.findById(req.session.user.id);

        
        user.books.push({ title, author, description, myReviews });

        
        await user.save();

        
        res.redirect("/library");
    } catch (err) {
        console.error(err);
        res.render("/addBooks", { error: "Something went wrong while adding the book." });
    }
});

// GET single book by ID
router.get("/singleBook/:id", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    try {
        const user = await User.findById(req.session.user.id);
        const book = user.books.id(req.params.id); // Mongoose subdocument ID
        if (!book) {
            return res.send("Book not found");
        }
        res.render("users/singleBook", { book });
    } catch (err) {
        console.error(err);
        res.send("Something went wrong");
    }
});
router.get('/singleBook/:id/edit', async (req, res) => {
    try {
        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const book = user.books.id(req.params.id); 
        if (!book) {
            return res.status(404).send('Book not found');
        }

        res.render('users/editBook.ejs', { book });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
router.put('/singleBook/:id', async (req, res) => {
    try {
        // Pronađi korisnika koji je trenutno ulogovan
        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Pronađi konkretnu knjigu unutar niza user.books
        const book = user.books.id(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        // Ažuriraj polja iz forme
        book.title = req.body.title;
        book.author = req.body.author;
        book.description = req.body.description;
        book.myReviews = req.body.myReviews;

        // Sačuvaj izmene u bazi
        await user.save();

        // Preusmeri korisnika nazad na stranicu knjige
        res.redirect(`/library/singleBook/${book._id}`);
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).send('Server error');
    }
});

router.delete('/singleBook/:id', async (req, res) => {
    try {
        // Nađi ulogovanog korisnika
        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Nađi knjigu po ID-u unutar niza user.books
        const book = user.books.id(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        // Obrisi knjigu iz niza
        book.deleteOne(); // ili book.remove() za starije verzije Mongoose-a
        await user.save();

        // Vrati korisnika na listu knjiga
        res.redirect('/library');
    } catch (err) {
        console.error('Error deleting book:', err);
        res.status(500).send('Server error');
    }
});





module.exports = router;