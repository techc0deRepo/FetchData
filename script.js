function App() {

    var app = {
        obj: {},
        sets: 
            {
                genre: new Set(),
                platform: new Set()
            }
        ,
        filters: {
            name: "",
            tags: new Set(),
            platform: new Set(),
            order: "",
        },
        
        // GET REQUEST TO OBTAIN ALL THE DATA
        initApp: (url, options) => {
            try {
                fetch(url, options)
                  .then((response) => response.json())
                  .then((data) => app.main(data))
            } catch (error) {
                console.log(error);
            }
        },

        // SAVE THE DATA
        main: (data) => {
            app.obj = data;
            app.resetCardContainer();
            app.addSets(data);
            app.createCards(data);
            app.createTags();
        },

        resetCardContainer: () => {
            while (cnt.firstChild) {
                cnt.firstChild.remove()
            }
        },

        createCards: (data) => {

            data.forEach(element => {
                const card = {
                    id: element.id,
                    general_info: {
                    genre: element.genre,
                    platform: element.platform,
                    developer: element.developer,
                    publisher: element.publisher,
                    },
                    game_desc: {
                    title: element.title,
                    thumb: element.thumbnail,
                    desc: element.short_description,
                    release: element.release_date,
                    url: element.game_url
                    }
                }

                app.appendCard(app.createCard(card));

            });
        },

        addSets: (data) => {
            data.forEach(item =>{
                app.sets.genre.add(item.genre);
                app.sets.platform.add(item.platform);
            })
        },

        appendCard: (card) => {
            
            // Append 
            cnt.append(card.card_cnt);
            card.card_cnt.append(card.image, card.game_desc);
            card.game_desc.append(card.title, card.desc, card.release, card.cta);

        },

        createCard: (card) => {
            
            // Create Elements
            let card_cnt = document.createElement("div");
            let game_desc = document.createElement("div");
            let image = new Image();
            let title = document.createElement("h4");
            let desc = document.createElement("p");
            let release = document.createElement("span");
            let cta = document.createElement("button");

            // Add values to the elements created
            image.src= card.game_desc.thumb;
            title.innerHTML = card.game_desc.title;
            desc.innerHTML = card.game_desc.desc;
            release.innerHTML = card.game_desc.release;

            // Card eventListener toggle class .hidden
            card_cnt.addEventListener("click", () =>{
                game_desc.classList.toggle("hidden");
            });
            // Button customize
            cta.innerText = "Go to website";
            cta.type = "button";
            cta.classList.add("button");
            cta.addEventListener("click", () => {
                window.location.href=card.game_desc.url
            });

            // Set CSS class
            card_cnt.setAttribute("class","card");
            image.setAttribute("class","image");
            game_desc.setAttribute("class","game-desc");
            game_desc.classList.add("hidden");

            let cardCreated = {
                card_cnt: card_cnt,
                game_desc: game_desc,
                image: image,
                title: title,
                desc: desc,
                release: release,
                cta: cta
            }

            return cardCreated;   
        },

        createTags: () => {

            app.sets.genre = Array.from(app.sets.genre).sort();
        
            // Create Tags
            app.sets.genre.forEach(item => {
                let tag = document.createElement("small");
                tag.innerHTML = item;
                tag.classList.add("tag");
                aside_cnt.append(tag);

                tag.addEventListener("click", (e) => {
                    
                    let name = e.target.innerText;
                    
                    if (app.filters.tags.has(name)){
                        app.filters.tags.delete(name);
                    } else {
                        app.filters.tags.add(name);
                    }
                    
                    e.target.classList.toggle("clicked");
                    
                    app.sortObject(app.obj, app.filters);
                });
            });
        },

        sortObject: function(obj, filters) {

            app.resetCardContainer();
            let sortedObj;

            if (filters.tags.size !== 0){
                sortedObj = app.sortByTagName(obj);
            } else {
                sortedObj = obj;
            }
            
            /*
            sortedObj = app.sortByName(sortedObj);

            switch (filters.order) {
            case "price-asc":
                oggettone.sort((a, b) => {
                return parseFloat(a.rooms[0].room_rates.rate_total.amount) - parseFloat(b.rooms[0].room_rates.rate_total.amount);
                });  
                break;
            case "price-desc":
                oggettone.sort((a, b) => {
                return parseFloat(b.rooms[0].room_rates.rate_total.amount) - parseFloat(a.rooms[0].room_rates.rate_total.amount);
                });
                break;
            case "rating-asc":
                oggettone.sort((a, b) => {
                return parseFloat(a.rating) - parseFloat(b.rating);
                });
                break;
            case "rating-desc":
                oggettone.sort((a, b) => {
                return parseFloat(b.rating) - parseFloat(a.rating);
                });
                break;
            default:
                console.log("error sorting");
                break;
            }*/

            app.createCards(sortedObj);
        },

        sortByTagName: (obj) => {
        
            var array = [];
            
            obj.forEach(item => {
                if (app.filters.tags.has(item.genre)){
                    array.push(item);
                }
            });

            return array;
        },

        sortByName: (obj) => {
        
            var array = [];
            
            obj.forEach(item => {
                if (app.filters.name.has(item.genre)){
                    array.push(item);
                }
            });

            return array;
        },

        event_search: btn.addEventListener("click", (e) => {
            console.log(e.target);
        }),

        event_toggleMenu: menu.addEventListener("click", (e) => {
            if(e.target.parentElement.classList.contains("menu-btn")){
                e.target.parentElement.classList.toggle("change");
            } else {
                e.target.classList.toggle("change");
            }
            console.log(e.target);
            menuCnt.classList.toggle("show");
        })
    };

    return {
        app : app
    };
};

// CONSTANTS

const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4ed77555e6mshfb74e64fc8b5304p106c81jsna7db2ec7d911',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

const btn = document.getElementById("btn");
const menu = document.getElementById("menu");
const menuCnt = document.getElementById("menuCnt");
const cnt = document.getElementById("cnt");
const aside_cnt = document.getElementById("aside-cnt");

// APP INIT 

let game = new App();

game.app.initApp(url, options);