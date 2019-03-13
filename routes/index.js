const express = require('express');
const router = express.Router();

const animalsDB = [
  { id: 1, name: "Pumbaa", species: "Warthog" },
  { id: 2, name: "Timon", species: "Meerkat" }
];

function generateId() {
  const ids = animalsDB.map(animal => animal.id);
  const max = Math.max(...ids);
  return max + 1;
}

function findAnimal(id) {
  /*
  let animal;

  for (let i = 0; i < animalsDB.length; i++) {
    if (animalsDB[i].id === Number(id)) {
      animal = animalsDB[i];
    }
  }
  */

  return animalsDB.find(animal => animal.id === Number(id));
}

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Africa' });
});

router.get('/animals', (req, res) => {
  res.render('animals', { db: animalsDB }); 
});

router.get('/animals/new', (req, res) => {
  res.render('newAnimal');  
});

router.post('/animals/new', (req, res) => {
  const { name, species } = req.body;
  const id = generateId();
  animalsDB.push({id, name, species});
  res.redirect(`/animals/${id}`);
});

router.get('/animals/:id', (req, res) => {
  const { id } = req.params;
  const animal = findAnimal(id);
  res.render('animal', {animal});
});

router.get('/animals/:id/edit', (req, res) => {
  const animal = findAnimal(req.params.id);
  res.render('editAnimal', {animal});
});

router.post('/animals/:id/edit', (req, res) => {
  const { id, name, species } = req.body;
  const index = animalsDB.findIndex(animal => animal.id === Number(id));
  if (index !== undefined) {
    animalsDB[index] = {id: Number(id), name, species};
    res.redirect(`/animals/${id}`);
  } else {
    res.redirect(`/animals/${id}/edit`);
  }
});

router.get('/animals/:id/delete', (req, res) => {
  const index = animalsDB.findIndex(animal => animal.id === Number(req.params.id));
  animalsDB.splice(index, 1);

  res.redirect('/animals'); 
});

module.exports = router;
