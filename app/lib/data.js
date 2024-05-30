const url = 'heart.avif';
const url1 = 'tree.jpeg';
const url2 = 'smiley.jpg';

export const collections = [
  {title: 'nature', imgURL: url, n_items: 4, id: 0},
  {title: 'books', imgURL: url, n_items: 6, id: 1},
  {title: 'code', imgURL: url, n_items: 9, id: 2},
  {title: 'food', imgURL: url, n_items: 2, id: 3},
  {title: 'trees', imgURL: url, n_items: 6, id: 4},
  {title: 'misc', imgURL: url, n_items: 9, id: 5},
  {title: 'aliens', imgURL: url, n_items: 20, id: 6},
  {title: 'cosmic', imgURL: url, n_items: 400, id: 7},
  {title: 'tech', imgURL: url, n_items: 5000, id: 8},
  {title: 'punny', imgURL: url, n_items: 1, id: 9},
];

export const items_list2 = [
  { "id": 1, "public": true, "content": "npm run dev.", "description": "Launch a node application", "tags": "javascript,node,run", "collection": { "name": "node" }, "userID": 1 },
  { "id": 2, "public": false, "content": "console.log('Hello, World!')", "description": "Print a message to the console", "tags": "javascript,console,print", "collection": { "name": "node" }, "userID": 2 },
  { "id": 3, "public": true, "content": "import React from 'react';", "description": "Import React library", "tags": "javascript,react,import", "collection": { "name": "react" }, "userID": 1 },
  { "id": 4, "public": false, "content": "console.log('Hello, Python!')", "description": "Print a message to the console in Python", "tags": "python,console,print", "collection": { "name": "python" }, "userID": 3 },
  { "id": 5, "public": true, "content": "print('Hello, World!')", "description": "Print a message to the console in Python", "tags": "python,console,print", "collection": { "name": "python" }, "userID": 1 },
  { "id": 6, "public": true, "content": "import numpy as np", "description": "Import NumPy library", "tags": "python,numpy,import", "collection": { "name": "python" }, "userID": 2 },
  { "id": 7, "public": false, "content": "SELECT * FROM users;", "description": "SQL query to select all users", "tags": "sql,query,select", "collection": { "name": "sql" }, "userID": 3 },
  { "id": 8, "public": true, "content": "git commit -m 'Initial commit'", "description": "Commit changes in Git", "tags": "git,commit,version control", "collection": { "name": "git" }, "userID": 1 },
  { "id": 9, "public": false, "content": "sudo apt-get update", "description": "Update package lists in Ubuntu", "tags": "linux,ubuntu,apt-get", "collection": { "name": "linux" }, "userID": 2 },
  { "id": 10, "public": true, "content": "ls -la", "description": "Detailed list files in a directory", "tags": "linux,command,line", "collection": { "name": "linux" }, "userID": 3 }
]
export const items_list = [
  {title: 'tree icon', imgURL: url1, id: 0, collection: 'nature', owner: 'Zeus'},
  {title: 'tree1', imgURL: url1, id: 1, collection: 'trees', owner: 'Mika'},
  {title: 'tree2', imgURL: url1, id: 2, collection: 'Rob', owner: 'Zeus'},
  {title: 'tree3', imgURL: url1, id: 3, collection: 'nature', owner: 'Zeus'},
  {title: 'smiley', imgURL: url2, id: 4, collection: 'Emoticons', owner: 'Zeus'},
  {title: 'happy', imgURL: url2, id: 5, collection: 'Cartoons', owner: 'Erin'},
  {title: 'tree4', imgURL: url1, id: 6, collection: 'nature', owner: 'Zeus'},
  {title: 'arbre', imgURL: url1, id: 7, collection: 'nature', owner: 'Zeus'},
  {title: 'tree5', imgURL: url2, id: 8, collection: 'Smiles', owner: 'Zeus'},
  {title: 'plant', imgURL: url1, id: 9, collection: 'nature', owner: 'Zeus'},
];