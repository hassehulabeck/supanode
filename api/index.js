import express from 'express'
import path from 'path';
import url from 'url';
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import { data, error } from '../cars.js'

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const supabaseUrl = process.env.CARS_PROJECT_URL

const supabase = createClient(supabaseUrl, process.env.CARS_SUPABASE_KEY)

// const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
// const filePath = path.join(__dirname, '../public/insert.html');

// app.use(express.static(path.join(__dirname, '../public')));

app.get('/enter', async (req, res) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: '/'
    }
  })
})
  
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.sendFile('insert.html');
});

app.post('/api/cars', async (req, res) => {

  const {error} = await supabase
      .from('cars')
      .insert({
          group: req.body.group,
          repo: req.body.repo
      })
  if (error) {
      res.send(error);
  }
  res.send("created!!");
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})