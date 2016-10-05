
= MongoDB

== 0 Installation and Setup

*For OSX and Linux*

Download the precompiled binary from mongodb, choose the community server option (the non-commercial version). Choose the binary either for Linux or OSX.  Unzip or untar the downloaded file accordingly.  Update your system path variable to include the bin folder of the unzipped mongodb installer. You can include the following in your startup script

----
# .bashrc or .bash_profile
export MONGO_HOME=/path-to/mongodb-unzipped-folder/
export PATH=$MONGO_HOME/bin:$PATH:.
----

Exit the terminal and reopen it in order to updates to take effect. Alternatively, you can call source in order to re-evaluate the the startup script, your updates will take effect on the current shell session just the same.

----
source ~/.bashrc # or
source ~/.bash_profile
----

== 0.1 Setup

Lots of installation instructions are on the mongo website, http://www.mongodb.org


*Mac*

The easiest for Mac is to use HomeBrew. 

----
brew install mongo
----

Another way to install it is to use the precompiled binaries, you can get that from the mongodb website (http://www.mongodb.org). 

----
sudo mkdir -p /data/db
chown `id -u` /data/db
----

Next,  extract the downloaded files, inside it, you will find


Windows

You can use chocolatey and simply say cinst mongodb. Or, you could just download the precompiled binary. Unzip it. Update your system path to include the binaries of mongodb (the one you unzipped). Finally, create the db inside the data folder. Launch cmd

C:
md \data\db


Linux

Same stuff as in OSX


-----




== 1 Tools

[glossary]
mongo client::
  it is a JS console. Just like the node REPL

mongo import::
  mongo import -d myApp -c users --file user_data.json

mongo export::
  mongo export -d myApp -c users --out user_data.json

mongo dump:: 
  dumps the contents of mongodb in json format

mongo restore:: 
  mongo restore -d myApp ./dump/myApp

bsondump:: 
  dumps the contents of mongodb database in binary json format. This is usually good for backups

mongo stat:: 
  mongostat - like top

== 2 Terminologies

1. http://dataconomy.com/sql-vs-nosql-need-know/
2. https://www.digitalocean.com/community/tutorials/understanding-sql-and-nosql-databases-and-different-database-models
3. http://www.zdnet.com/article/rdbms-vs-nosql-how-do-you-pick/


|==========================================================
|RDBMS              | NoSQL     | Description
|Databse            | Database  | A collection of tables. In the case of NoSQL, a collection or collections
|Table              | Collection| There is no schema. You may enforce a schema, but that is optional. Records don’t have to be related in any way
|Records or Rows    | Document  |   
|Column             | Field     | {key:value}
|==========================================================

== 3 Mongo Usage

https://docs.mongodb.com/manual/reference/mongo-shell/

Start the server by invoking the mongo daemon on a terminal

----
mongod
----

The process will not stop, just leave the terminal there. Open another terminal to launch the mongo interactive prompt

----
mongo
> use crm
> db.clients.count()
> 0
----

The use command actually switches database. It doesn’t matter that the crm database does not exist yet,t mongo will switch to that anyway. At this point, we haven’t created the employees database yet. It will be created when we have added a collection to it, then it will be created.

Instead of saying `crm.clients.count()`, we used the `db` alias. The db object stands from whatever is the current database in use. The count() method tell us how many documents are there in the collection. Since we haven’t added anything yet, the count was zero.

===  3.1 Create a collection

You can create a collection in one of two ways. You can use the insert() command or use the save() command. Will see how to do both in the sections below.

[source, javascript]
----
> db.clients.insert({name: “Air BnB”, contact_owner: “Ted Hagos”,  contacts: [{name: “John Doe”, email: “johndoe@gmail.com”}, {name:”Jane Doe”, email:”janedoe@gmail.com”}], projects: [{name:”project1”, status: “not moving”}, {name: “project2”}]})
----

Or, if you want to do it cleanly.

[source,javascript]
----
> var doc = {}
> doc.name = “Air BnB”
> doc.contact_owner = “Ted Hagos”
> doc.contacts = [{name: “John Doe”, email: “johndoe@gmail.com”}, {name:“Jane Doe”, email:“janedoe@gmail.com”}]
> doc.projects = [{name: “project1”, status: “not moving”}, {name: “project2”, status: “not moving”}]
> db.clients.save(doc)
----

Remember that mongo documents are just JSON objects. So you can pretty much compose the documents as object literals.

=== 3.2 Finding a collection

To get all the contents of the clients collection, use the command

----
> db.clients.find()
----

The find() method, without any parameter, will display everything in that collection. Think of it like “SELECT * FROM clients”. If you want to prettify the result, you can use the printjson built-in command

----
> db.clients.find().forEach(printjson)
----

=== 3.3  How to drop a database

----
> use mydatabase
> db.dropDatabase()
----





