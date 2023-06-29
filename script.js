const API_KEY="c3b932d189fc4fc1979bc5255032d024";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));

async function fetchNews (query){
    const res =await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}

function reload(){
    window.location.reload();
}

function bindData(articles){
    const cardContainer=document.getElementById("card-container");
    const newsCardTemplate=document.getElementById("news-card");

    cardContainer.innerHTML="";

    articles.forEach((article) => {
        
        if(!article.urlToImage) return;

        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillData(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}

function fillData(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const title=cardClone.querySelector('#news-title');
    const newsource=cardClone.querySelector("#source");
    const description=cardClone.querySelector("#description");

    newsImg.src=article.urlToImage;
    title.innerText=article.title;
    description.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone:"Asia/Kolkata"
    });

    newsource.innerHTML=`${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");

});

}

let curSel=null;
    

function onNavItemClick(id){
    fetchNews(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});