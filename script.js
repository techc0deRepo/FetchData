const url = 'https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4ed77555e6mshfb74e64fc8b5304p106c81jsna7db2ec7d911',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};


const btn = document.getElementById("btn");
const cnt = document.getElementById("cnt");
const genre = new Set();
const platform = new Set();

function saveFetch(data){

 console.log(data);
 
 data.forEach(element => {
     const obj = {
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
    genre.add(obj.general_info.genre);
    platform.add(obj.general_info.platform);

    // Create Elements
    let card = document.createElement("div");
    let general_info = document.createElement("div");
    let game_desc = document.createElement("div");
    let image = new Image();
    let title = document.createElement("h3");
    let desc = document.createElement("p");
    let release = document.createElement("span");
    let cta = document.createElement("button");

    // Add values to the elements created
    image.src= obj.game_desc.thumb;
    title.innerHTML = obj.game_desc.title;
    desc.innerHTML = obj.game_desc.desc;
    release.innerHTML = obj.game_desc.release;
    
    // Button customize
    cta.innerText = "Go to website";
    cta.type = "button";
    cta.classList.add("button");
    cta.addEventListener("click", () => {
        window.location.href=obj.game_desc.url
    });

    // Set CSS class
    card.setAttribute("class","card");
    image.setAttribute("class","image");
    game_desc.setAttribute("class","game-desc");

    // Append 
    cnt.append(card);
    card.append(image, game_desc);
    game_desc.append(title, desc, release, cta);

    // Reapeat to all the objects!
 });

 console.log(genre);
 console.log(platform);
}

btn.addEventListener("click", () => {
    try {
        fetch(url, options)
          .then((response) => response.json())
          .then((data) => saveFetch(data))
    } catch (error) {
        console.log(error);
    }
});
