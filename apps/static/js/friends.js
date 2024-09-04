

async function addFriend(e) {
    
    e.preventDefault();
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const nickname = document.getElementById('id_nickname').value;

    const addfriend = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
            nickname: nickname,
        }),
        credentials: "same-origin",
    }
    await fetch(`/friends/`, addfriend)
    document.getElementById('friends_link').click();
}

async function delete_function(i, e) {
    
    e.preventDefault();
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const addfriend = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
            id_btn: i,
        }),
        credentials: "same-origin",
    }
    await fetch(`/friends/`, addfriend)


    document.getElementById('friends_link').click();
}

async function getStatus(id){
        
    const searchplayer = await fetch(`/game/status/${id}/`)
    const data = await searchplayer.json()
    // console.log(data)
    var theId = "connexion_status_" + id
    var item = document.getElementById(theId)
    item.innerHTML = "●"
    if (data.status == 0){
        item.style = "display: block; color: red;"
    } else {
        item.style = "display: block; color: green;"
    }
}

function loadFriends() {

    var i = 0;
    document.querySelectorAll(".connexion_status").forEach(function (item) {
        item.id = "connexion_status_" + item.parentNode.getAttribute("name");
        getStatus(item.parentNode.getAttribute("name"));
        i++;
    }); 
}