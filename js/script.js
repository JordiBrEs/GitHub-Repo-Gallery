// div overView where my profile info will appear
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

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
    // It shows my
    myRepos();

};

const myRepos= async function(){
    const repositoryRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repositoryData = await repositoryRequest.json();

    // - by calling this you can see the data on the console
    console.log(repositoryData); 
   
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

repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        // console.log(repoName);
        console.log(dataFromRepo(repoName));
    }
    
})

const dataFromRepo = async function (repoName){
    const repoNameDataRequest = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoNameDataRequest.json();
    console.log(repoInfo);
    
// fetch languages
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`)
    const languageData = await fetchLanguages.json();
    // console.log(languageData);
    let languages = [];
    for(const language in languageData){
        languages.push(language);
    }
    console.log(languages);
    specificInfo(repoInfo, languages);
   
};

// specific repo information
const specificInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    
    
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3> <p>Description: ${repoInfo.description} </p> <p>Default Branch: ${repoInfo.default_branch}</p> <p>Languages: ${languages.join(", ")}</p> <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    repoData.append(div);
    
    

    // console.log(div);

}

