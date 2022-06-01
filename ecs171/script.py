# importing Flask and other modules
from flask import Flask, request, render_template
 
# Flask constructor
app = Flask(__name__)  
 
# A decorator used to tell the application
# which URL is associated function
@app.route('/', methods =["GET", "POST"])
def input():
    if request.method == "POST":
       # getting input with name = sentence in HTML form
       userinput = request.form.get("sentence")

       print(userinput)
    return render_template("index.html")
 
if __name__=='__main__':
   app.run()