const express = require('express')
const Movies = require('../models/Movies');
const router = express.Router();
const fetch = require("node-fetch");
require('dotenv').config();

router.get('/getMovies/:id', async (req, res) => {
    const { id } = req.params
    try {
        let movies = await Movies.find({ personId: id })
        if (movies) {
            res.status(200).json({ success: true, data: movies })
        } else {
            res.status(404).json({ success: false, msg: 'no movies found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

router.get('/getMoviesGenre/:id', async (req, res) => {
    const { id } = req.params
    const { genre } = req.body
    try {
        let movies = await Movies.find({ personId: id, genre: genre })
        if (movies) {
            res.status(200).json({ success: true, data: movies })
        } else {
            res.status(404).json({ success: false, msg: 'no movies found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

router.post('/addMovie/:id', async (req, res) => {
    const { id } = req.params;
    const { img, title, desc, year, rank } = req.body;
    console.log(id)
    try {
        let movie = await Movies.create({ img:img, title:title, desc:desc, year:year, rank:rank, personId: id })
        res.status(200).json({ success: true, data: movie })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error");
    }
})

router.put('/updateMovie/:id', async (req, res) => {
    const { name, newName } = req.body;
    const { id } = req.params;
    try {
        let movie = await Movies.findOne({ personId: id, name: name });
        console.log(movie.name)
        if (!movie) {
            res.status(404).json({ success: false, msg: "Enter the correct credentials" })
        } else {
            await Movies.updateOne({ personId: id, name: name }, { $set: { name: newName } });
            let movie = await Movies.findOne({ personId: id, name: newName });
            res.status(200).json({ success: true, data: movie.name })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error");
    }
})

router.delete('/deleteMovie/:id', async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    try {
        let movie = await Movies.findOne({ personId: id, name: name });
        if (!movie) {
            res.status(404).json({ success: false, msg: "Movie not found to be deleted" })
        } else {
            await Movies.deleteOne({ personId: id, name: name });
            res.status(200).json({ success: true });
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Internal server error");
    }
})

router.post('/movieFind', async (req, res) => {
    const { name } = req.body;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=702a5d9a8a5513094a5fcf009d15249a&language=en-US&page=1&include_adult=false&query=${name}`;
    const options = {
        method: 'GET',
        
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json()
        res.status(200).json({ success: true, data: data });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, msg: "Internal server error" });

    }
})


module.exports = router
