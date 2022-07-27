let allEpisodes = [];

fetch('/episodes')
    .then((res) => res.json())
    .then(episodes => updatePage(episodes))

function updatePage(episodes) {
    allEpisodes = episodes;
    //should take a parameter that will be the episode data (json object taken from the fetch)
    //fetch gives us the episode data from stmt.all in the form of json. 
    //create a new html table element for each item of data from /episodes. iterate through the data. it is in json

    let episodeElements = "";

    for (let episode of episodes) {
        episodeElements += `<tr onclick="openEpisodeForm(${episode.ID})">
        <td>${episode.Title}</td>
        <td>${episode.Series}</td>
        <td>${episode.Doctor}</td>`

        if (episode.Average > 7.5) {
            //turn green 
            episodeElements += `<td>
            <span class=" tag is-success is-light">${episode.Average}</span>
            </td>`
        }
        else if (episode.Average < 7.5 && episode.Average > 3.5) {
            //turn yellow
            episodeElements += `<td>
            <span class=" tag is-warning is-light">${episode.Average}</span>
            </td>`
        }
        else if (episode.Average === null) {
            episodeElements += `<td>
            <span class= "tag is-light">N/A</span>
            </td>`
        }
        else {
            episodeElements += `<td>
            <span class=" tag is-danger is-light">${episode.Average}</span>
            </td>`
            //turn red
        }
        episodeElements += `</tr>`
    }

    let episodesTable = document.getElementById("episodes");

    episodesTable.innerHTML = `<th>Title</th>
    <th>Series</th>
    <th>Doctor</th>
    <th>Rating</th>` +
        episodeElements;

}

function toggleModal() {
    let modal = document.getElementById("modal");
    modal.classList.toggle("is-active");
}

async function submitForm() {
    let comment = document.getElementById("comment").value;
    let rating = document.getElementById("rating").value;
    let episodeId = document.getElementById("episode-id").value;

    const body = {
        comment: comment,
        rating: rating,
        episodeId: episodeId
    }

    let response = await fetch("/ratings", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    let responseBody = await response.text()

    document.getElementById("comment").value = "";
    document.getElementById("rating").value = "";

    toggleModal();

    let episodeResponse = await fetch("/episodes");

    let episodes = await episodeResponse.json();
    updatePage(episodes);
}

function openEpisodeForm(episodeID) {
    let matchingEpisode = allEpisodes.find(episode => episode.ID === episodeID)
    console.log(matchingEpisode)

    //Change title
    document.getElementById("modal-title").innerHTML = matchingEpisode.Title;

    toggleModal();
    //change episode ID field
    document.getElementById("episode-id").value = matchingEpisode.ID
}

function searchPage(input) {
    console.log(input.value);
    let nodeList = document.querySelectorAll("tr");
    for (let node of nodeList) {
        if (node.innerHTML.toLowerCase().includes(input.value.toLowerCase())) {
            node.classList.remove("is-hidden");
        } else node.classList.add("is-hidden");
    }
}
async function loadComments() {
    let commentResponse = await fetch("/ratings");
    const comments = await commentResponse.json();
    const commentDisplay = document.getElementById('comment-section');

    displayComments(commentDisplay, comments);
}


loadComments()

function displayComments(commentDisplay, comments) {
    comments.forEach((comment) => {
        const element = document.createElement('span');
        element.classList.add('comment');
        element.classList.add('media');
        element.innerText = `Comment on ${comment.Title}: "${comment.Comment}" Rating: ${comment.Rating}`;
        commentDisplay.appendChild(element);
    });
}

