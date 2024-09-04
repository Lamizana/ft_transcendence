function show_hide_languages(language, item){

	if (language == "fr" || language == "FR"){
		if (item.lang == "fr" || item.lang == "FR")
			item.style = 'display:block;' 
		if (item.lang == "es" || item.lang == "ES")
			item.style = 'display:none;' 
		if (item.lang == "en" || item.lang == "EN")
			item.style = 'display:none;' 
	} 
	if (language == "en" || language == "EN"){
		if (item.lang == "fr" || item.lang == "FR")
			item.style = 'display:none;' 
		if (item.lang == "es" || item.lang == "ES")
			item.style = 'display:none;' 
		if (item.lang == "en" || item.lang == "EN")
			item.style = 'display:block;'
	} 
	if (language == "es" || language == "ES"){
		if (item.lang == "fr" || item.lang == "FR")
			item.style = 'display:none;' 
		if (item.lang == "es" || item.lang == "ES")
			item.style = 'display:block;' 
		if (item.lang == "en" || item.lang == "EN")
			item.style = 'display:none;'
	}
}


// create document click that watches the nav links only
document.addEventListener("click", (e) => {
	const { target } = e;
	if (!target.matches("a")) {
		return;
	}
	e.preventDefault();
	urlRoute();

});

const urlRoute = (event) => {

	event = event || window.event; // get window.event if event argument not provided
	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};

// create a function that handles the url location
const urlLocationHandler = async () => {

	const location = window.location.pathname; // get the url path
	const html = await fetch(location).then((response) => response.text());
	document.querySelector('html').innerHTML = html;
	
	if (location == '/pong/') {
		loadPong();
		loadPong4player();
		loadTournament();
	}
	else if (location == '/profil/' && id) {
		loadProfil()
	} else if (location == '/friends/') {

		loadFriends()
		setInterval(loadFriends, 10000);

	}

	document.querySelectorAll('button').forEach(function (item) {
		show_hide_languages(language, item);
	});
	document.querySelectorAll('h1').forEach(function (item) {
		show_hide_languages(language, item);
	});
	document.querySelectorAll('h2').forEach(function (item) {
		show_hide_languages(language, item);
	});
	document.querySelectorAll('div').forEach(function (item) {
		show_hide_languages(language, item);
	});	
	document.querySelectorAll('a').forEach(function (item) {
		show_hide_languages(language, item);
	});
	document.querySelectorAll('p').forEach(function (item) {
		show_hide_languages(language, item);
	});
	document.querySelectorAll('small').forEach(function (item) {
		show_hide_languages(language, item);
	});
};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = urlRoute;
// call the urlLocationHandler function to handle the initial url
urlLocationHandler();
