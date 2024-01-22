from flask import Flask, request, Blueprint;
app = Flask(__name__);
DEBUG=False;
#Registramos una nueva url
media_pt=Blueprint("media", __name__, static_folder="./media", static_url_path="/media");
app.register_blueprint(media_pt);

media_pt=Blueprint("static", __name__, static_folder="./static", static_url_path="/static");
app.register_blueprint(media_pt);

@app.route("/")
def index():
	with open("./index.html",'r') as html:
		return html.read();
	return "Error: Page no fount";

if __name__=="__main__":
	app.run(host="daniel.com" if DEBUG else "https://dabl03.github.io/piano/", debug=DEBUG)
