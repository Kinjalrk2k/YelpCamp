# YelpCamp
Colt Steele's YelpCamp project!

This version is a part of Section 30: Data Persistence

## Objectives for this section
- Add Mongoose
    - Install and configure momgoose
    - Setup campground model
    - Use campground model inside of the routes

- Show Page
    - Review the RESTful Routes 
    - Add description to campground model
    - Show ```db.collection.drop()```
        - deletes database
    - Add a show route/template

## RESTful Routes

| Name  |    URL   |   Verb  |  Description     |
|-------|----------|---------|------------------|
| INDEX   | /dogs   |   GET |  Display a list of all dog |
| NEW     | /dogs/new | GET |  Displays form to make a new dog |
| CREATE  | /dogs     | POST | Add new dog to DB |
| SHOW    | /dogs/:id | GET |  Shows info about one dog |