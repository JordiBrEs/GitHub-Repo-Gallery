// div overView where my profile info will appear
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");

const username = "jordiBrEs";

const userInformation = async function() {
    const showRequest = await fetch(`https://api.github.com/users/${username}`);
    const infoData = await showRequest.json();
    
    // console.log(infoData);

    informationDisplay(infoData);
}

userInformation();


const informationDisplay = function(infoData){
    const div = document.createElement("div");

    div.classList.add("user-info");

    div.innerHTML = `<figure> <img alt="user avatar" src=${infoData.avatar_url} /> </figure> <div> <p> <strong>Name:</strong> ${infoData.name} </p> <p><strong>Bio:</strong> ${infoData.bio}</p><p><strong>Location:</strong> ${infoData.location}</p><p><strong>Number of public repos:</strong> ${infoData.public_repos}</p></div>`;

    overview.append(div);
    myRepos();

};

const myRepos= async function(){
    const repositoryRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repositoryData = await repositoryRequest.json();
    console.log(repositoryData); 
    // - by calling this you can see the data on the console
    displayRepos(repositoryData);
}

const displayRepos = function(repos){
    for(const repo of repos) {
        const listOfRepos = document.createElement("li");
        listOfRepos.classList.add("repos");
        listOfRepos.innerHTML = `<h3> ${repo.name} </h3>`
        repoList.append(listOfRepos);

    }
};

// displayRepos(repositoryData);
