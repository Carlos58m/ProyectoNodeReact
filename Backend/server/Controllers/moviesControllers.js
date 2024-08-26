const { response } = require("express");
const Movies = require("../Models/Movies");

// Obtener todas las películas
const getMovies = async (req, res) => {
    try {
        const listMovies = await Movie.find();
        res.json(listMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching movies." });
    }
};

// Buscar una película por nombre /getByName/:name
const getMovieByName = async (req, res) => {
    try {
        const { name } = req.params;
        const movieByName = await Movie.find({ name: name });
        res.json(movieByName);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while searching for the movie." });
    }
};

// Añadir una nueva película
const addMovie = async (req, res) => {
    try {
        const newMovie = req.body;
        const findMovie = await Movie.find({ name: newMovie.name });

        if (findMovie.length === 0) {
            // Si la película no está en la BD
            const movie = new Movie(newMovie);
            const createdMovie = await movie.save();
            res.status(201).json(createdMovie);
        } else {
            res.status(200).json({ message: "The movie already exists." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding the movie." });
    }
};

// Eliminar una película
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteMovie = await Movie.findByIdAndDelete(id);

        if (deleteMovie) {
            res.status(201).json({ success: true, message: "Movie deleted successfully.", data: deleteMovie });
        } else {
            res.status(404).json({ success: false, message: "The movie ID does not exist." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the movie." });
    }
};

// Actualizar una película
const updateMovie = async (req, res) => {
    try {
        const { id } = req.query;
        const movieBody = req.body;
        const updateMovie = await Movie.findByIdAndUpdate(id, movieBody, { new: true });

        if (!updateMov) {
            res.status(404).json({ success: false, message: "The movie ID does not exist." });
        } else {
            res.json(updateMovie);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the movie." });
    }
};

module.exports = { getMovies, getMovieByName, addMovie, deleteMovie, updateMovie };