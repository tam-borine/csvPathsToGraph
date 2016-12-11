# csvPathsToGraph

Functions that:
- parse a .csv into JSON where each row is an object
- group rows by a column
- sort within groups by a column
- construct 'paths', ordered collections, for each group
- create graph from paths, losing the group id but retaining other info relations
