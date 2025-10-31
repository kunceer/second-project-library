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

router.get("/singleBook/:id", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    try {
        const user = await User.findById(req.session.user.id);
        const book = user.books.id(req.params.id); 
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
        
        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const book = user.books.id(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        book.title = req.body.title;
        book.author = req.body.author;
        book.description = req.body.description;
        book.myReviews = req.body.myReviews;

    
        await user.save();

        res.redirect(`/library/singleBook/${book._id}`);
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).send('Server error');
    }
});

router.delete('/singleBook/:id', async (req, res) => {
    try {
        
        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }


        const book = user.books.id(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        
        book.deleteOne(); 
        await user.save();

        
        res.redirect('/library');
    } catch (err) {
        console.error('Error deleting book:', err);
        res.status(500).send('Server error');
    }
});





module.exports = router;