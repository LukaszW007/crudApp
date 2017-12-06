var express = require('express');
var bodyParser = require('body-parser');
var uuid = require('uuid')
var app = express();

app.use(bodyParser.json())

class Notes {
  constructor(notes) {
    this.notes = notes
  }

  find(id) {
    return this.notes.find(note => note.id === id)
  }

  add({text}) {
    const note = {
      text,
      id: uuid.v4()
    }
    
    this.notes.push(note)

    return note
  }

  remove(id) {
    const removedNote = this.notes.find(note => note.id === id)
    
    this.notes = this.notes.filter(note => {
      if (note.id === id) {
        return undefined
      } else {
        return note
      }
    })

    return removedNote
  }

  update({id, body}) {
    this.notes = this.notes.map(note => {
      if (note.id === id) {
        return Object.assign({}, note, {text: body.text})
      } else {
        return note
      }
    })
  }

  toJSON() {
    return this.notes
  }
}

Notes.instance = (function() {
  var instance

  return {
    getInstance: function() {
      if (!instance) {
        instance = new Notes([{
          text: 'pierwsza notatka',
          id: '2486c1d6-26c6-4416-92db-7684a2f6e3b9'
        }, {
          text: 'druga notatka',
          id: '6be38c2b-6978-4faf-bd74-2c68c45084df'
        }])
      }

      return instance
    }
  }
})()

app.use('/notes', function(req, res, next) {
  req.notes = Notes.instance.getInstance()

  return next()
})

app.get('/notes', function(req, res) {
  res.json(req.notes);
});

app.post('/notes', function(req, res) {
  res.status(201).json(req.notes.add(req.body))
});

app.get('/notes/:id', function(req, res) {
  res.json(req.notes.find(req.params.id));
})

app.put('/notes/:id', function(req, res) {
  res.status(201).json(req.notes.update({body: req.body, id: req.params.id}))
})

app.delete('/notes/:id', function(req, res) {
  res.json(req.notes.remove(req.params.id))
})

app.listen(3000);