const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;
  const project = {id:uuid(),title,url,techs,likes:0}
  repositories.push(project);
  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const {title,url,techs} = request.body;
  const repository_id = repositories.findIndex(repository => repository.id === id);
  console.log(repository_id);
  if(repository_id>=0){
    repositories[repository_id].techs = techs;
    repositories[repository_id].title = title;
    repositories[repository_id].url = url;
  return response.json(repositories[repository_id])
}
else{
  return response.status(400).json({error: "Directory not found"});
}

  
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const repository_id = repositories.findIndex(repository => repository.id === id);
  console.log(id);
  if(repository_id>=0){ 
   repositories.splice(repository_id,1);
    return response.status(204).send()
  }
  else{
    return response.status(400).json({error: "Directory not found"});
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id;
  const repository_id = repositories.findIndex(repository => repository.id === id);
  if(repository_id >= 0){
    repositories[repository_id].likes++;
    return response.status(200).json(repositories[repository_id])
  }
  else{
    return response.status(400).json({error: "Directory not found"});
  }
  
});

module.exports = app;
