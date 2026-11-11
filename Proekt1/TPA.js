var loggedIn = false;

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!email.includes("@") || !email.includes(".") || password.length < 6) {
        alert("Enter a valid email and password (min. 6 characters)!");
        return;
    }

    loggedIn = true;
    document.getElementById("loginMessage").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("loginLink").style.display = "none";
    document.getElementById("logoutLink").style.display = "inline";

    alert("Login successful!");
}

function logout() {
    loggedIn = false;
    document.getElementById("loginMessage").style.display = "block";
    
    myTrips = [];
    displayTrips();

    document.getElementById("login").style.display = "block";
    document.getElementById("loginLink").style.display = "inline";
    document.getElementById("logoutLink").style.display = "none";

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

var myTrips = [];
var likes = [];
var dislikes = [];
var comments = [];

function addToTrips(city) {
    if (!loggedIn) {
        alert("Please log in first!");
        return;
    }

    for (var i = 0; i < myTrips.length; i++) {
        if (myTrips[i][0] == city) {
            alert("This destination is already in My Trips!");
            return;
        }
    }

    var budget = prompt("Enter your estimated budget for " + city + " (€):");

    if (budget == null) {
        return;
    }
    if (budget.trim() == "") {
        alert("Please enter a budget!");
        return;
    }

    budget = Number(budget);

    if (isNaN(budget) || budget < 0) {
        alert("Please enter a valid budget!");
        return;
    }

    var category = "";

    if (city == "Paris, France" ||
        city == "Rome, Italy" ||
        city == "Barcelona, Spain" ||
        city == "London, UK" ||
        city == "New York, USA") {
        category = "City Break";
    } else if (city == "Santorini, Greece" ||
               city == "Bali, Indonesia" ||
               city == "Maldives" ||
               city == "Amalfi Coast, Italy") {
        category = "Beach";
    } else {
        category = "Nature";
    }

    myTrips[myTrips.length] = [city, category, budget];

    displayTrips();
}

function addNewDestination() {
    if (!loggedIn) {
        alert("Please log in first!");
        return;
    }

    var city = document.getElementById("newCity").value;
    var category = document.getElementById("newCategory").value;
    var budgetText = document.getElementById("newBudget").value;

    if (city.trim() == "" || budgetText == "") {
        alert("Please fill in all fields!");
        return;
    }

    var budget = Number(budgetText);

    if (isNaN(budget) || budget < 0) {
        alert("Please enter a valid budget!");
        return;
    }

    for (var i = 0; i < myTrips.length; i++) {
        if (myTrips[i][0] == city) {
            alert("This destination is already in My Trips!");
            return;
        }
    }

    myTrips[myTrips.length] = [city, category, budget];

    document.getElementById("newCity").value = "";
    document.getElementById("newCategory").value = "City Break";
    document.getElementById("newBudget").value = "";

    displayTrips();
}


function displayTrips() {
    var html = "";
    var total = 0;

    var category = document.getElementById("filterCategory").value;
    var budgetText = document.getElementById("filterBudget").value;

    for (var i = 0; i < myTrips.length; i++) {

        total = total + myTrips[i][2];

        if ((category == "All" || myTrips[i][1] == category) &&
            (budgetText == "" || myTrips[i][2] <= Number(budgetText))) {

            html += '<div class="col-md-4 mb-4">' +
                        '<div class="card h-100">' +
                            '<div class="card-body">' +
                                '<h3 class="card-title">' + myTrips[i][0] + '</h3>' +
                                '<p>Category: ' + myTrips[i][1] + '</p>' +
                                '<p>Budget: ' + myTrips[i][2] + ' €</p>' +
                                '<button class="btn btn-danger" onclick="removeTrip(' + i + ')">' +
                                    'Remove' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
        }
    }

    document.getElementById("tripsList").innerHTML = html;
    document.getElementById("totalBudget").innerHTML = total;
}


function removeTrip(index) {
    if (!loggedIn) {
        alert("Please log in first!");
        return;
    }

    for (var i = index; i < myTrips.length - 1; i++) {
        myTrips[i] = myTrips[i + 1];
    }

    myTrips.length = myTrips.length - 1;

    displayTrips();
}


function showGallery(city) {
    var cities = [
        "Paris, France",
        "Rome, Italy",
        "Santorini, Greece",
        "Barcelona, Spain",
        "Bali, Indonesia",
        "Interlaken, Switzerland",
        "London, UK",
        "Maldives",
        "Cappadocia, Turkey",
        "New York, USA",
        "Amalfi Coast, Italy",
        "Lake Bled, Slovenia"
    ];

    var photos = [
        ["paris4.jpg", "paris2.avif", "paris3.jpg"],
        ["rome.jpg", "rome2.jpg", "rome3.jpg"],
        ["santorini.jpeg", "santorini2.webp", "santorini3.jpg"],
        ["barcelona.jpg", "barcelona2.avif", "barcelona3.jpg"],
        ["bali.jpeg", "bali2.jpg", "bali3.jpg"],
        ["interlaken.jpg", "interlaken2.jpg", "interlaken3.cms"],
        ["london.jpg", "london2.jpeg", "london3.png"],
        ["maldives.jpeg", "maldives.webp", "maldives3.webp"],
        ["cappadocia.jpg", "cappadocia2.jpeg", "cappadocia3.webp"],
        ["newyork.jpg", "newyork2.jpg", "newyork3.jpg"],
        ["amalficoast.jpg", "amalficoast2.jpg", "amalficoast3.jpg"],
        ["bled.jpg", "bled2.jpg", "bled3.avif"]
    ];

    var html = "";
    var index = 0;

    for (var i = 0; i < cities.length; i++) {
        html += '<div id="galleryCity' + i + '" class="gallery-city">' +
                    '<h3>' + cities[i] + '</h3>' +
                    '<div class="row">';

        for (var j = 0; j < photos[i].length; j++) {

            if (likes[index] == null) {
                likes[index] = 0;
                dislikes[index] = 0;
                comments[index] = [];
            }

            html += '<div class="col-md-4 gallery-photo">' +
                        '<img src="' + photos[i][j] +
                        '" class="gallery-img" alt="' + cities[i] + '">' +

                        '<div class="mb-3">' +
                            '<button class="btn btn-outline-success mr-2" onclick="addLike(' + index + ')">' +
                                'Like 👍 <span id="like' + index + '">' + likes[index] + '</span>' +
                            '</button>' +

                            '<button class="btn btn-outline-danger" onclick="addDislike(' + index + ')">' +
                                'Dislike 👎 <span id="dislike' + index + '">' + dislikes[index] + '</span>' +
                            '</button>' +
                        '</div>' +

                        '<div class="form-group">' +
                            '<textarea id="commentInput' + index + '" class="form-control" rows="2" placeholder="Write a comment..."></textarea>' +
                        '</div>' +

                        '<button class="btn btn-primary mb-3" onclick="addComment(' + index + ')">Add Comment</button>' +

                        '<div id="comments' + index + '"></div>' +
                    '</div>';

            index++;
        }

        html += '</div></div>';
    }

    document.getElementById("galleryImages").innerHTML = html;

    for (var k = 0; k < index; k++) {
        displayComments(k);
    }

    if (city != null) {
        for (var i = 0; i < cities.length; i++) {
            if (cities[i] == city) {
                document.getElementById("galleryCity" + i).scrollIntoView();
                break;
            }
        }
    }
}

function addLike(index) {
    likes[index]++;
    document.getElementById("like" + index).innerHTML = likes[index];
}

function addDislike(index) {
    dislikes[index]++;
    document.getElementById("dislike" + index).innerHTML = dislikes[index];
}

function addComment(index) {
    var comment = document.getElementById("commentInput" + index).value;

    if (comment.trim() == "") {
        alert("Please write a comment!");
        return;
    }

    comments[index][comments[index].length] = comment;

    document.getElementById("commentInput" + index).value = "";

    displayComments(index);
}

function displayComments(index) {
    var html = "";

    for (var i = 0; i < comments[index].length; i++) {
        html += '<div class="comment-item">' +
                    '<p>' + escapeComment(comments[index][i]) + '</p>' +
                '</div>';
    }

    document.getElementById("comments" + index).innerHTML = html;
}

function escapeComment(comment) {
    return comment.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#39;");
}

showGallery();


var blogCities = [
    "Paris, France",
    "Rome, Italy",
    "Santorini, Greece",
    "Barcelona, Spain",
    "Bali, Indonesia",
    "Interlaken, Switzerland",
    "London, UK",
    "Maldives",
    "Cappadocia, Turkey",
    "New York, USA",
    "Amalfi Coast, Italy",
    "Lake Bled, Slovenia"
];

var blogImages = [
    "paris.jpg",
    "rome.jpg",
    "santorini.jpeg",
    "barcelona.jpg",
    "bali.jpeg",
    "interlaken.jpg",
    "london.jpg",
    "maldives.jpeg",
    "cappadocia.jpg",
    "newyork.jpg",
    "amalficoast.jpg",
    "bled.jpg"
];

var blogIntroductions = [
    "Discover iconic landmarks, charming streets and unforgettable experiences in Paris.",
    "Explore ancient history, beautiful architecture and authentic Italian culture.",
    "Experience breathtaking sunsets, white villages and stunning beaches.",
    "Discover colorful architecture, Mediterranean beaches and vibrant culture.",
    "Explore tropical beaches, ancient temples and beautiful rice terraces.",
    "Discover the Swiss Alps, crystal-clear lakes and exciting outdoor adventures.",
    "Explore royal landmarks, famous museums and lively neighborhoods.",
    "Experience tropical paradise, turquoise waters and unforgettable marine life.",
    "Discover magical landscapes, underground cities and unique rock formations.",
    "Explore famous skyscrapers, world-class museums and exciting city life.",
    "Discover colorful coastal villages, spectacular views and Italian cuisine.",
    "Experience beautiful alpine scenery, a fairytale lake and peaceful nature."
];

var blogPlaces = [
    [
        "Eiffel Tower",
        "Louvre Museum",
        "Notre-Dame Cathedral",
        "Montmartre",
        "Arc de Triomphe",
        "Champs-Elysees",
        "Seine River Cruise",
        "Luxembourg Gardens",
        "Palace of Versailles",
        "Sacre-Coeur Basilica"
    ],
    [
        "Colosseum",
        "Roman Forum",
        "Trevi Fountain",
        "Pantheon",
        "Vatican Museums",
        "St. Peter's Basilica",
        "Spanish Steps",
        "Piazza Navona",
        "Villa Borghese",
        "Castel Sant'Angelo"
    ],
    [
        "Oia Village",
        "Fira",
        "Red Beach",
        "Perissa Beach",
        "Akrotiri Archaeological Site",
        "Amoudi Bay",
        "Imerovigli",
        "Ancient Thera",
        "Santo Wines",
        "Santorini Caldera"
    ],
    [
        "Sagrada Familia",
        "Park Guell",
        "Casa Batllo",
        "La Rambla",
        "Gothic Quarter",
        "Barceloneta Beach",
        "Montjuic",
        "Casa Mila",
        "Boqueria Market",
        "Barcelona Cathedral"
    ],
    [
        "Ubud Monkey Forest",
        "Tegallalang Rice Terraces",
        "Uluwatu Temple",
        "Tanah Lot Temple",
        "Seminyak Beach",
        "Mount Batur",
        "Tirta Empul Temple",
        "Nusa Penida",
        "Ubud Art Market",
        "Sekumpul Waterfall"
    ],
    [
        "Lake Brienz",
        "Lake Thun",
        "Harder Kulm",
        "Jungfraujoch",
        "Lauterbrunnen Valley",
        "Schynige Platte",
        "Paragliding",
        "Grindelwald",
        "St. Beatus Caves",
        "Hohematte Park"
    ],
    [
        "Big Ben",
        "Buckingham Palace",
        "Tower of London",
        "Tower Bridge",
        "British Museum",
        "London Eye",
        "Hyde Park",
        "Camden Market",
        "Westminster Abbey",
        "Covent Garden"
    ],
    [
        "Snorkeling",
        "Scuba Diving",
        "Male City",
        "Vaadhoo Island",
        "Sandbank Excursion",
        "Dolphin Watching",
        "Sunset Cruise",
        "Island Hopping",
        "Underwater Restaurant",
        "Relaxing on White Sand Beaches"
    ],
    [
        "Hot Air Balloon Ride",
        "Goreme Open Air Museum",
        "Uchisar Castle",
        "Love Valley",
        "Pasabag Valley",
        "Derinkuyu Underground City",
        "Red Valley",
        "Pigeon Valley",
        "Avanos Pottery Workshops",
        "Cavusin Village"
    ],
    [
        "Statue of Liberty",
        "Central Park",
        "Times Square",
        "Empire State Building",
        "Brooklyn Bridge",
        "Metropolitan Museum of Art",
        "Rockefeller Center",
        "Fifth Avenue",
        "One World Observatory",
        "High Line"
    ],
    [
        "Positano",
        "Amalfi Town",
        "Ravello",
        "Villa Rufolo",
        "Path of the Gods",
        "Fiordo di Furore",
        "Praiano",
        "Atrani",
        "Emerald Grotto",
        "Boat Tour Along the Coast"
    ],
    [
        "Bled Island",
        "Bled Castle",
        "Lake Bled Walk",
        "Vintgar Gorge",
        "Ojstrica Viewpoint",
        "Mala Osojnica",
        "Traditional Bled Cream Cake",
        "Rowboat Ride",
        "Straza Bled",
        "Triglav National Park"
    ]
];

var blogDescriptions = [
    [
        "Enjoy panoramic views of Paris from its most famous landmark.",
        "Explore one of the world's largest museums, home to the Mona Lisa.",
        "Admire the historic Gothic cathedral on the Seine.",
        "Walk through an artistic neighborhood filled with charming cafes.",
        "Visit the famous monument honoring French military victories.",
        "Stroll along one of the most famous avenues in the world.",
        "Discover Paris from the water while passing beautiful landmarks.",
        "Relax in peaceful gardens with fountains and sculptures.",
        "Explore the magnificent royal palace and its gardens outside Paris.",
        "Visit the beautiful basilica overlooking Montmartre."
    ],
    [
        "Explore the ancient amphitheater where gladiators once fought.",
        "Walk among the ruins of ancient Roman public life.",
        "Throw a coin into the famous Baroque fountain.",
        "Admire the remarkable dome of this ancient Roman building.",
        "Discover extraordinary art collections and the Sistine Chapel.",
        "Visit one of the most important churches in the world.",
        "Enjoy the atmosphere around this famous staircase.",
        "Relax in a beautiful square filled with fountains and cafes.",
        "Explore peaceful gardens and an impressive art gallery.",
        "Discover a historic fortress beside the Tiber River."
    ],
    [
        "Watch spectacular sunsets from the island's most famous village.",
        "Explore the island's capital with beautiful caldera views.",
        "Visit a unique beach surrounded by red volcanic cliffs.",
        "Relax on a beach famous for its dark volcanic sand.",
        "Discover the remains of an ancient Bronze Age settlement.",
        "Enjoy seafood restaurants and views of the colorful harbor.",
        "Walk through a peaceful village with panoramic sea views.",
        "Explore the ruins of an ancient city on a mountain.",
        "Taste local wines while enjoying views of the caldera.",
        "Admire the dramatic volcanic landscape and beautiful sea."
    ],
    [
        "Admire Gaudi's extraordinary and still-evolving basilica.",
        "Explore colorful mosaics and imaginative architecture.",
        "Discover a famous building with a unique curved facade.",
        "Walk along a lively pedestrian street in central Barcelona.",
        "Explore narrow medieval streets and historic squares.",
        "Relax beside the Mediterranean Sea.",
        "Enjoy gardens, museums and panoramic city views.",
        "Admire another masterpiece designed by Antoni Gaudi.",
        "Discover fresh produce and local food at a famous market.",
        "Visit a beautiful Gothic cathedral in the historic center."
    ],
    [
        "See playful monkeys in a lush forest sanctuary.",
        "Admire beautiful green rice terraces near Ubud.",
        "Visit a dramatic seaside temple famous for sunset views.",
        "Explore a temple located on a rocky coastal formation.",
        "Enjoy beaches, restaurants and beautiful sunsets.",
        "Hike an active volcano for breathtaking sunrise views.",
        "Discover a sacred water temple and traditional rituals.",
        "Explore dramatic cliffs and turquoise beaches on a nearby island.",
        "Shop for handmade crafts and traditional souvenirs.",
        "Discover an impressive waterfall surrounded by tropical forest."
    ],
    [
        "Enjoy turquoise waters and spectacular mountain scenery.",
        "Take a scenic boat ride across a beautiful Swiss lake.",
        "Admire panoramic views of Interlaken from above.",
        "Experience breathtaking high-altitude Alpine scenery.",
        "Explore a picturesque valley filled with waterfalls.",
        "Discover mountain trails and beautiful Alpine landscapes.",
        "Experience unforgettable views while flying above the mountains.",
        "Visit a charming mountain village with exciting outdoor activities.",
        "Explore fascinating caves overlooking Lake Thun.",
        "Relax in a green park with views of the Jungfrau mountains."
    ],
    [
        "Admire the famous clock tower beside the Houses of Parliament.",
        "Discover the official London residence of the British monarch.",
        "Explore a historic fortress filled with royal history.",
        "Walk across one of London's most recognizable bridges.",
        "Discover fascinating historical artifacts from around the world.",
        "Enjoy panoramic views from the famous observation wheel.",
        "Relax in one of London's largest and most beautiful parks.",
        "Explore colorful markets, shops and street food.",
        "Visit the historic church used for royal coronations.",
        "Discover a lively district known for shopping and entertainment."
    ],
    [
        "Explore colorful coral reefs and tropical fish.",
        "Discover the underwater world with professional diving guides.",
        "Explore the capital and experience local Maldivian culture.",
        "Visit an island known for seasonal glowing plankton.",
        "Relax on a small stretch of white sand surrounded by ocean.",
        "Watch dolphins swimming in their natural environment.",
        "Enjoy spectacular colors as the sun sets over the ocean.",
        "Discover different islands and their unique atmosphere.",
        "Enjoy a memorable dining experience surrounded by marine life.",
        "Relax beside crystal-clear turquoise waters."
    ],
    [
        "Watch the sunrise over unique rock formations from a balloon.",
        "Explore historic rock-cut churches decorated with frescoes.",
        "Admire panoramic views from a remarkable natural fortress.",
        "Discover unusual rock formations in a scenic valley.",
        "Explore the famous fairy chimneys of Cappadocia.",
        "Visit an impressive ancient underground settlement.",
        "Hike through a beautiful valley with colorful rock formations.",
        "Discover a valley famous for its rock-carved pigeon houses.",
        "Experience traditional pottery making in a historic town.",
        "Explore a charming village surrounded by unique landscapes."
    ],
    [
        "Visit the iconic monument representing freedom and opportunity.",
        "Relax in the famous green park in the heart of Manhattan.",
        "Experience bright lights and energy in this busy square.",
        "Enjoy spectacular views from a famous skyscraper.",
        "Walk across the historic bridge connecting Manhattan and Brooklyn.",
        "Explore one of the world's most important art museums.",
        "Discover the famous plaza and observation deck.",
        "Explore a world-famous avenue known for shopping.",
        "Enjoy panoramic views from a skyscraper in Lower Manhattan.",
        "Walk along an elevated park built on a former railway."
    ],
    [
        "Explore colorful buildings overlooking the Mediterranean Sea.",
        "Discover the historic center of the town that gives the coast its name.",
        "Visit a peaceful hilltop town with breathtaking coastal views.",
        "Explore beautiful gardens and historic architecture in Ravello.",
        "Hike a scenic trail offering spectacular views of the coastline.",
        "Admire a dramatic narrow inlet surrounded by steep cliffs.",
        "Discover a quieter coastal village with beautiful scenery.",
        "Explore one of Italy's smallest and most charming villages.",
        "Visit a beautiful sea cave known for its emerald-colored water.",
        "Admire colorful villages and dramatic cliffs from the sea."
    ],
    [
        "Visit the picturesque island with its famous church.",
        "Explore a medieval castle overlooking the lake.",
        "Enjoy a peaceful walk around the beautiful lake.",
        "Discover a dramatic gorge with wooden walkways and waterfalls.",
        "Hike to a viewpoint offering postcard-perfect lake views.",
        "Enjoy spectacular panoramic views from above Lake Bled.",
        "Taste the famous local dessert made with cream and pastry.",
        "Rent a traditional boat and explore the lake.",
        "Enjoy outdoor activities and beautiful views near the lake.",
        "Discover magnificent mountains, forests and Alpine landscapes."
    ]
];


function displayBlog() {
    var html = "";

    for (var i = 0; i < blogCities.length; i++) {

        html += '<div class="row blog-city">' +

                    '<div class="col-md-4">' +
                        '<div class="card">' +
                            '<img src="' + blogImages[i] + '" class="card-img-top" alt="' + blogCities[i] + '">' +
                            '<div class="card-body">' +
                                '<h3 class="card-title">' + blogCities[i] + '</h3>' +
                                '<p>' + blogIntroductions[i] + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<div class="col-md-8">' +
                        '<h3>Top 10 Things to Do in ' + blogCities[i] + '</h3>' +
                        '<ol>';

        for (var j = 0; j < blogPlaces[i].length; j++) {
            html += '<li>' +
                        '<strong>' + blogPlaces[i][j] + '</strong>' +
                        '<p>' + blogDescriptions[i][j] + '</p>' +
                    '</li>';
        }

        html +=         '</ol>' +
                    '</div>' +
                '</div>';
    }

    document.getElementById("blogCards").innerHTML = html;
}

displayBlog();

var surveyAnswers = [];

function submitSurvey() {
    var name = document.getElementById("surveyName").value;
    var destination = document.getElementById("surveyDestination").value;
    var rating = document.getElementById("surveyRating").value;
    var favorite = document.getElementById("surveyFavorite").value;
    var suggestions = document.getElementById("surveySuggestions").value;

    if (name.trim() == "" || destination == "" || rating == "" || favorite == "") {
        alert("Please fill in all required fields!");
        return;
    }

    surveyAnswers[surveyAnswers.length] = [
        name,
        destination,
        rating,
        favorite,
        suggestions
    ];

    document.getElementById("surveyMessage").innerHTML =
        "Thank you for completing our survey!";

    document.getElementById("surveyName").value = "";
    document.getElementById("surveyDestination").value = "";
    document.getElementById("surveyRating").value = "";
    document.getElementById("surveyFavorite").value = "";
    document.getElementById("surveySuggestions").value = "";
}
