

const express = require('express')
const pgp = require('pg-promise')();
const db = pgp("postgres://postgres:goodworks17@localhost:5432/postgres");
const winston = require('winston')
const app = express()




// Creates a winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({ filename: 'error.log', level: 'error'}),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
// The path to get all pokemon
app.get('/pokemon', async (req, res) => {
  let pokedex = await db.any('SELECT * FROM pokedex_project'); 
  res.json(pokedex);
});


//Let's user know if there's a syntax error
//No addition of pokemon will be allowed...might include 400 code which means (bad request code-server 
//coudln't understand because of syntax error)
// PUT endpoint to insert Pokemon data
app.put('/pokedex/:id', async (req, res) => {
  const { name, type, abilities, region } = req.body;

  // This "if" statement checks if any of the following (name, type, abilities, region) are missing from the request body. 
  if (!name || !type || !abilities || !region) 
  // you could also try this in the statemnt above and see if it works: if (name.type.abilities.region)   
  {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // "try" can be used to execute code that might present an error
  try {
    //line 47 is importing all necessary info from the pokedex_project Table
    const query = 'INSERT INTO pokedex_project (name, type, abilities, region) VALUES ($1, $2, $3, $4)';
    const values = [name, type, abilities, region];
    //"await" is is used to pause the execution of an asynchronous function
    await pool.query(query, values);
    return res.status(201).json({ message: 'Pokemon was updated successfully' });
    // If the query was successful, the execution should continue here>
  } catch (error) {
    console.error('Error inserting data:', error);
    return res.status(400).json({ error: 'Bad request invalid syntax' });
  }
});

app.listen(3000, ()=> {
  console.log("Server is running on port 3000");
})



// app.put('/pokedex/:id', async (req, res) => { 
//   await db.oneOrNone('SELECT * FROM pokedex_project WHERE id = $1', [req.params.id]);
//   if(req.body.name != undefined) {
//     await db.oneOrNone('UPDATE name FROM pokedex_project WHERE id = $1', [req.params.id]);
//   }
//   else {
//     res.json("No name changed");
//   }
// })


// (index !== -1) {
//   pokedex[index] = { ...pokedex[index], ...updatedPokemon };
//   res.json({ message: 'Pokemon updated successfully', pokemon: pokedex[index] });
// } else {
//   res.status(400).json({ message: 'Pokemon not found' });
// }
// });

// });
  // const id = parseInt(req.params.id);
  // const updatedPokemon = req.body;
  // const index = pokedex.findIndex(p => p.id === id);
  // if (index ==1) 





