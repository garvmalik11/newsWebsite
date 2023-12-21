const API_KEY = "551a52b1e26343a3b2f14576e8d82807";
const url= "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("india"));

function reload(){
    window.location.reload();
}


async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    //binding
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card'); 

    cardsContainer.innerHTML= "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title; // Fixed assignment
    newsDesc.innerHTML = article.description; // Fixed assignment

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, "blank" );
    })
}

let currSelectedNavItem = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNavItem?.classList.remove('active');
    currSelectedNavItem = navItem;
    currSelectedNavItem.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

searchButton.addEventListener('click', ()=>{
    const query = searchText.value;
    if(!query){
        return;
    }
    fetchNews(query);
    currSelectedNavItem?.classList.remove('active');
    currSelectedNavItem = null;
})



