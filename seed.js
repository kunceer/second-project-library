
const mongoose = require("mongoose");
const User = require("./models/user"); // path to your user model

mongoose.connect('mongodb+srv://kunceer:blabubu18!@cluster0.34tuqmz.mongodb.net/library?appName=Cluster0');

// Your array of 10 books (the one you already have)
const books = [
    {
      title: "Romeo and Juliet",
      author: "William Shakespeare",
      description:
        "A timeless tragic love story between two young lovers from feuding families in Verona.",
      myReviews:
        "A beautiful yet heartbreaking story of love, fate, and family conflict that still feels powerful centuries later.",
      image:
        "https://www.pagepublications.co/cdn/shop/files/Picture10.png?v=1731085660",
    },
    {
      title: "Anna Karenina",
      author: "Leo Tolstoy",
      description:
        "A profound story of love, betrayal, and the rigid social structure of 19th-century Russia.",
      myReviews:
        "Tolstoy captures human emotion with incredible depth — tragic and breathtakingly real.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5e/Anna_Karenina_illustration.jpg",
    },
    {
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      description:
        "A psychological exploration of guilt and redemption through the mind of a man who commits murder.",
      myReviews:
        "An intense, haunting masterpiece — it makes you question morality and justice.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/4b/Crimeandpunishmentcover.png",
    },
    {
      title: "The Gift",
      author: "Vladimir Nabokov",
      description:
        "A semi-autobiographical novel following a young Russian émigré writer’s artistic and emotional growth.",
      myReviews:
        "Complex and poetic — Nabokov’s prose shines with beauty and melancholy.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/b/b7/The_Gift_%28novel%29_cover.jpg",
    },
    {
      title: "Middlemarch",
      author: "George Eliot",
      description:
        "A richly woven story of idealism, marriage, and social change in a small English town.",
      myReviews:
        "Brilliantly layered characters and timeless insight into human motivation and compromise.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/13/Middlemarch_cover_1871.jpg",
    },
    {
      title: "The Adventures of Tom Sawyer",
      author: "Mark Twain",
      description:
        "A fun-filled adventure following young Tom Sawyer along the Mississippi River as he grows and learns about life.",
      myReviews:
        "Playful, nostalgic, and deeply American — always a joy to revisit.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/57/Tom_Sawyer_1876_frontispiece.jpg",
    },
    {
      title: "Moby Dick",
      author: "Herman Melville",
      description:
        "The epic tale of Captain Ahab’s obsessive quest to hunt the great white whale, Moby Dick.",
      myReviews:
        "A grand, philosophical voyage — both thrilling adventure and meditation on obsession.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/55/Moby-Dick_FE_title_page.jpg",
    },
    {
      title: "Madame Bovary",
      author: "Gustave Flaubert",
      description:
        "The tragic story of Emma Bovary, who seeks passion and escape from her mundane provincial life.",
      myReviews:
        "Beautifully written and painfully human — Flaubert’s realism is unmatched.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/1e/Madame_Bovary_1857_title_page.jpg",
    },
    {
      title: "One Hundred Days",
      author: "Xiaolu Guo",
      description:
        "A reflective and emotional journey of love, memory, and identity across different worlds.",
      myReviews:
        "Lyrical and emotional — it captures the feeling of belonging and loss beautifully.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/7/73/A_Concise_Chinese-English_Dictionary_for_Lovers_cover.jpg",
    },
    {
      title: "The Let Them Theory",
      author: "Mel Robbins",
      description:
        "A motivational guide encouraging people to stop controlling others and focus on their own peace and growth.",
      myReviews:
        "Simple but transformative — a reminder to let go and prioritize your own happiness.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/d7/Mel_Robbins_The_Let_Them_Theory_cover.jpg",
    },
  ];

// Function to seed one user with those books
async function seedExistingUser() {
    try {
      // 1️⃣ Pronađi korisnika po email-u
      const user = await User.findOne({ email: "llara.kuncer@gmail.com" });
  
      if (!user) {
        console.log("❌ Korisnik nije pronađen!");
        mongoose.connection.close();
        return;
      }
  
      // 2️⃣ Dodaj knjige u njegovu listu
      user.books.push(...books);
  
      // 3️⃣ Sačuvaj izmene
      await user.save();
  
      console.log("✅ Knjige uspešno dodate postojećem korisniku!");
      mongoose.connection.close();
    } catch (err) {
      console.error("❌ Greška pri dodavanju knjiga:", err);
    }
  }
  
  seedExistingUser();










