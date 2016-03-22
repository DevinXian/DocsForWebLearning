####mongodb optimization
1.  db.collections.explain(['queryPlanner']|['executionStats']|'allPlansExecution').query/count(selector[, options]);
参考[explain](https://docs.mongodb.org/manual/reference/explain-results/),[db.collections.explain](https://docs.mongodb.org/manual/reference/method/db.collection.explain/#explain-method-executionstats)
2.  db.collections.query(xxx).hint({index_name}); force using index
3.