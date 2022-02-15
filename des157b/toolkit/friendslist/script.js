// JS here
Parse.initialize("k2T80nERn01CnxK1O9KX6gHEJaQSIyoVpurjTQ3q","p41wy1nvE69Mq04uRZCReSSy1kGN7xrECNP3eyXJ");

Parse.serverURL = 'https://parseapi.back4app.com/'

const newBtn = document.getElementById("newbtn");
const editBtns = document.querySelectorAll(".fa-edit");
const addFriendForm = document.getElementById("add-friend");
const editFriendForm = document.getElementById("edit-friend");
const friendList = document.querySelector("main ol");

newBtn.addEventListener("click",function(event){
    event.preventDefault();
    addFriendForm.className = "add-friend-onscreen";
})

addFriendForm.addEventListener("submit",function(event){
    event.preventDefault();
    addFriendForm.className = "add-friend-offscreen";
})

for (let i = 0; i < editBtns.length; i++){

    editBtns[i].addEventListener("click", function(event){
        event.preventDefault();
        editFriendForm.className = "edit-friend-onscreen";
    });
}

editFriendForm.addEventListener("submit", function(event){
    event.preventDefault();
    editFriendForm.className = "edit-friend-offscreen";
});

async function displayFriends() {
    const friends = Parse.Object.extend('Friends');
    const query = new Parse.Query(friends);

    try{
    const results = await query.ascending('lname').find();

    results.forEach(function(friend){
            const id = friend.id;
            const lname = friend.get('lname');
            const fname = friend.get('fname');
            const email = friend.get('email');
            const facebook = friend.get('facebook');
            const twitter = friend.get('twitter');
            const instagram = friend.get('instagram');
            const linkedin = friend.get('linkedin');

            const theListItem = document.createElement("li");
            theListItem.setAttribute("id", `r-${id}`);
            theListItem.innerHTML = `<li>
                <div class="name">
                    ${fname} ${lname}
                </div>
                <div class="email">
                    <i class="fas fa-envelope-square"></i> ${email}
                </div>
                <div class="social">
                    <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                    <a href="${twitter}><i class="fab fa-twitter-square"></i></a>
                    <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                    <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
                </div>
                <i class="fas fa-edit" id = "e-${id}"></i>
                <i class="fas fa-times-circle" id = "d-${id}"></i>
            </li>`;

            friendList.append(theListItem);
        });
    }
    catch (error) {
        console.error("Error while fetching friends", error);
    }
}

displayFriends();