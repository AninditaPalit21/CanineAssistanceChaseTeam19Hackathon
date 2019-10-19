# ./python_code/api.py
from flask import Flask, render_template,request,redirect,url_for # For flask implementation
from bson import ObjectId # For ObjectId to work
from pymongo import MongoClient
import os
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from auth import HOST_URI
import datetime

app = Flask(__name__)
CORS(app)
api = Api(app)

title = "Users and Results"
heading = "Users and Results"

client = MongoClient(HOST_URI) #host uri
db = client.mymongodb #Select the database
users = db.User #Select the collection name

@app.route("/")
def getAllUsers():
    users_l = users.find()
    return

@app.route("/add", methods=['POST'])
def action ():
    #Adding a User
    user=request.values.get("user")
    disease=request.values.get("disease")
    type=request.values.get("type")
    condition=request.values.get("condition")
    result=request.values.get("result")
    today = datetime.datetime.now()

    users.insert({ "user":user, "disease":disease, "type":type, "condition":condition, "result":result, "date": today})
    return redirect("/")

@app.route("/remove")
def remove ():
    #Deleting a Task with various references
    key=request.values.get("_id")
    users.remove({"_id":ObjectId(key)})
    return redirect("/")

@app.route("/update")
def update ():
    id=request.values.get("_id")
    user=users.find({"_id":ObjectId(id)})
    return redirect("/")

@app.route("/search", methods=['GET'])
def search():
    #Searching a Task with various references
    key=request.values.get("key")
    refer=request.values.get("refer")
    if(key=="_id"):
        users_l = users.find({refer:ObjectId(key)})
    else:
        users_l = users.find({refer:key})
    return redirect("/")

if __name__ == "__main__":
     app.run(debug=True)
