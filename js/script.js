// div overView where my profile info will appear
const overview = document.querySelector(".overview");

const username = "jordiBrEs";

const userInformation = async function() {
    const showRequest = await fetch(`https://api.github.com/users/${username}`);
    const infoRequested = await showRequest.json();
    
    // console.log(infoRequested);

    informationDisplay(infoRequested);
}

userInformation();


const informationDisplay = function(infoRequested){
    const div = document.createElement("div");

    div.classList.add("user-info");

    div.innerHTML = `<figure> <img alt="user avatar" src=${infoRequested.avatar_url} /> </figure> <div> <p> <strong>Name:</strong> ${infoRequested.name} </p> <p><strong>Bio:</strong> ${infoRequested.bio}</p><p><strong>Location:</strong> ${infoRequested.location}</p><p><strong>Number of public repos:</strong> ${infoRequested.public_repos}</p></div>`;

    overview.append(div);

};



// fetch(`https://api.github.com/users/${username}`)
// .then(res => res.json())
// .then(data => console.log(data));


