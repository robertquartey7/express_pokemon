import express from "express";
import { nanoid } from "nanoid";

export default function setupPokemonRoutes(db) {
  const router = express.Router();

  //   get all pokemons
  router.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      pokemons: db.data.pokemons,
    });
  });

  //   get one pokemon

  router.get("/:id", (req, res) => {
    const pokemonId = req.params.id;
    const pokemon = db.data.pokemons.find(
      (element) => element.id === pokemonId
    );

    res.status(200).json({
      success: true,
      pokemons: pokemon,
    });
  });

  //   create pokemon
  router.post("/", (req, res) => {
    db.data.pokemons.push({
      id: nanoid(4),
      name: req.body.name,
    });

    db.write();

    res.status(201).json({
      success: true,
    });
  });

  //   update pokemon
  router.put("/:id", (req, res) => {
    const pokemon = req.params.id;

    const pokemonIndex = db.data.pokemons.findIndex(
      (element) => element.id === pokemon
    );

    db.data.pokemons[pokemonIndex].name = req.body.name;

    db.write();

    res.status(200).json({
      success: true,
    });
  });

  //   delete pokemon
  router.delete("/:id", (req, res) => {
    const pokemon = req.params.id;
    const pokemonIndex = db.data.pokemons.findIndex(
      (element) => element.id === pokemon
    );
    db.data.pokemons.splice(pokemonIndex, 1);

    db.write();
    res.status(200).json({
      success: true,
      name: db.data.pokemons,
    });
  });

  return router;
}
