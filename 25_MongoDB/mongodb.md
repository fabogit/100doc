# select db

`use DATABASENAME`

# CRUD

## CREATE

### Inserts a single document into a collection.

```
db.collection.insertOne(
   <document>,
   {
      writeConcern: <document>
   }
)
```

### Inserts multiple documents into a collection.

```
db.collection.insertMany(
   [ <document 1> , <document 2>, ... ],
   {
      writeConcern: <document>,
      ordered: <boolean>
   }
)
```

## READ

### Selects documents in a collection or view and returns a cursor to the selected documents.

```
db.collection.find(query, projection)
```

## UPDATE

### Updates a single document within the collection based on the filter.

`db.collection.updateOne(filter, update, options)`

```
db.collection.updateOne(
   <filter>,
   <update>,
   {
     upsert: <boolean>,
     writeConcern: <document>,
     collation: <document>,
     arrayFilters: [ <filterdocument1>, ... ],
     hint:  <document|string>
   }
)
```

### Updates all documents that match the specified filter for a collection.

`db.collection.updateMany(filter, update, options)`

```
db.collection.updateMany(
   <filter>,
   <update>,
   {
     upsert: <boolean>,
     writeConcern: <document>,
     collation: <document>,
     arrayFilters: [ <filterdocument1>, ... ],
     hint:  <document|string>
   }
)
```

### Replaces a single document within the collection based on the filter.

`db.collection.replaceOne(filter, replacement, options)`

```
db.collection.replaceOne(
   <filter>,
   <replacement>,
   {
     upsert: <boolean>,
     writeConcern: <document>,
     collation: <document>,
     hint: <document|string>
   }
)
```

## DELETE

### Removes a single document from a collection.

`db.collection.deleteOne()`

```
db.collection.deleteOne(
   <filter>,
   {
      writeConcern: <document>,
      collation: <document>,
      hint: <document|string>
   }
)
```

### Removes all documents that match the filter from a collection.

`db.collection.deleteMany()`

```
db.collection.deleteMany(
   <filter>,
   {
      writeConcern: <document>,
      collation: <document>
   }
)
```
