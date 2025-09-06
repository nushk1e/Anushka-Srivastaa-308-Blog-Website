let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
    searchIcon.classList.remove("fa-times");
    searchForm.classList.remove("active");
}
let searchIcon = document.querySelector("#search-icon");
let searchForm = document.querySelector(".search-form");

searchIcon.onclick = () => {
    searchIcon.classList.toggle("fa-times");
    searchForm.classList.toggle("active");
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
}
window.onscroll = () => {
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
    searchIcon.classList.remove("fa-times");
    searchForm.classList.remove("active");
}


// Load votes from localStorage
document.addEventListener("DOMContentLoaded", loadVotes);
function vote(postId, type) {
    let votes = JSON.parse(localStorage.getItem("votes")) || {};

// If post has no votes yet, initialize it
if (!votes[postId]) {
    votes[postId] = 0;
}

// Upvote or downvote
if (type === "up") {
    votes[postId] += 1;
} else if (type === "down") {
    votes[postId] -= 1;
}

 // Save back to localStorage
localStorage.setItem("votes", JSON.stringify(votes));

 // Update UI
document.getElementById("votes-" + postId).innerText = votes[postId];
}

function loadVotes() {
    let votes = JSON.parse(localStorage.getItem("votes")) || {};
    for (let postId in votes) {
        let voteElement = document.getElementById("votes-" + postId);
        if (voteElement) {
            voteElement.innerText = votes[postId];
        }
    }
}

// Share function
function shareBlog(postId) {
    const post = document.querySelector(`.post[data-id="${postId}"]`);
    const title = post.querySelector("h3").innerText;
    const text = post.querySelector("p").innerText;
    const url = window.location.href + "#post-" + postId;
    if (navigator.share) {
        // ✅ Web Share API (mobile-friendly)
        navigator.share({
          title: title,
          text: text,
          url: url,
        })
        .then(() => console.log("Blog shared successfully!"))
        .catch(err => console.log("Share failed:", err));
    } else {
        // ❌ Fallback (copy link to clipboard)
        navigator.clipboard.writeText(url).then(() => {
          alert("Link copied to clipboard: " + url);
        });
    }
}
// share function for sns
function shareSocial(postId, platform) {
    const post = document.querySelector(`.post[data-id="${postId}"]`);
    const title = encodeURIComponent(post.querySelector("h3").innerText);
    const text = encodeURIComponent(post.querySelector("p").innerText);
    const url = encodeURIComponent(window.location.href + "#post-" + postId);
}
let shareUrl = "";

switch (platform) {
    case "whatsapp":
        shareUrl = `https://wa.me/?text=${title}%20-%20${url}`;
        break;
        case "twitter":
            shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
          break;
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
          case "linkedin":
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
            case "email":
                shareUrl = `mailto:?subject=${title}&body=${text}%0A${url}`;
                break;
            }

// --- Voting logic ---
const votes = {};

function vote(postId, type) {
    if (!votes[postId]) votes[postId] = 0;
    if (type === "up") votes[postId]++;
    else if (type === "down") votes[postId]--;

document.getElementById("votes-" + postId).innerText = votes[postId];
}

 // --- Comments logic ---
function addComment(postId) {
    const input = document.getElementById("comment-input-" + postId);
    const commentText = input.value.trim();
    if (commentText === "") return;

    const commentList = document.getElementById("comments-" + postId);
    const comment = document.createElement("div");
    comment.className = "comment";
    comment.textContent = commentText;

    commentList.appendChild(comment);
    input.value = "";
    }

// --- Toggle Comments (only on mobile) ---
function toggleComments(postId) {
    const section = document.getElementById("comments-section-" + postId);
    const btn = event.target;

    if (section.style.display === "block") {
        section.style.display = "none";
        btn.textContent = "Show Comments";
    } else {
        section.style.display = "block";
        btn.textContent = "Hide Comments";
      }
    }

 // --- Social sharing ---
function shareSocial(postId, platform) {
    const post = document.querySelector(`.blog-post[data-id="${postId}"]`);
    const title = encodeURIComponent(post.querySelector("h2").innerText);
    const text = encodeURIComponent(post.querySelector("p").innerText);
    const url = encodeURIComponent(window.location.href + "#post-" + postId);

    let shareUrl = "";
    switch (platform) {
                case "whatsapp":
                    shareUrl = `https://wa.me/?text=${title}%20-%20${url}`;
                    break;
                    case "twitter":
                        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                        break;
                        case "facebook":
                            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                            break;
                            case "linkedin":
                                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                                break;
                                case "email":
                                    shareUrl = `mailto:?subject=${title}&body=${text}%0A${url}`;
                                    break;
                                }

window.open(shareUrl, "_blank");

//search function
    function searchPosts() {
      const input = document.getElementById("search-box").value.toLowerCase();
      const posts = document.querySelectorAll(".post");

      posts.forEach(post => {
        const text = post.innerText.toLowerCase();
        if (text.includes(input)) {
          post.classList.remove("hidden");
        } else {
          post.classList.add("hidden");
        }
      });
    }
}
