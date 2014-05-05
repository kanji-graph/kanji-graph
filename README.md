# Kanji Graph App

## Description

kanji.graphics visualizes the connections among Japanese words by looking at the characters they have in common.The dataset used was the subset of the 100 most common Japanese last names containing exactly two characters, which amounted to 96 total. A node was created for each unique character, and an edge was placed between two characters if those two characters formed a name in the dataset. Statistics including the number of nodes, edges, and components were computed. The project was put together via a number of iterations, described in the Screenshots section below.


## Technology

AJAX is used to access information from the database in the Javascript layer. D3.js provides a built-in .json() function, which is used to access json endpoints.

Kanji definitions were dynamically scraped and seeded using Nokogiri and a custom rake task.

Object-oriented Javascript is used to implement the dynamic graphs. Each page load instantiates a Graph object, which maintains the state of the graph as nodes are added and removed.

We used jQuery to bind highlight and tooltip effects to each node's hover event.

The trusty Rails stack holds it all together.
>>>>>>> add-and-remove-large

## Screenshots

### Iteration 1: Histogram
![Iteration 1](http://i.imgur.com/8nEmJRM.png)

A histogram of frequencies of occurence of the kanji in the 96-surname dataset.


### Iteration 2: Small graph
![Iteration 2](http://i.imgur.com/DTOtRJ9.png)

A graph of connections among the 10 most common surnames.

### Iteration 3: Small dynamic graph
![Iteration 3](http://i.imgur.com/w9zRh9U.png)

A graph of connections among the 10 most common surnames, with the ability to add or remove names or characters from the graph. Graph statistics (number of edges, number of nodes, and number of components) are displayed and update as the graph changes.

### Itration 4: Large graph with edge highlighting and tooltips
![Iteration 4](http://i.imgur.com/ZwIQK1L.png)

A graph of connections among the 96-surname dataset. Hovering over a character displays a tooltip with the character's meaning in English, and highlights adjacent edges.

### Iteration 5: Large dynamic grpah
![Iteration 5](http://i.imgur.com/B6X9aQn.png)

A graph of connections among the 96-surname dataset, with the ability to add or remove names or characters from the graph. Graph statistics (number of edges, number of nodes, and number of components) are displayed and update as the graph changes.

## Author

Made at the Flatiron School by Michael Prouty and Laura Conwill. 

