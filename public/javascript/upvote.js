async function upvoteClickHandler(event) {
    event.preventDefault();

    // NOTE: user_id comes from session, post_id comes from URL
    // User_id added in post_routes.js under PUT /api/posts/upvote
    // Get post_id
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const response = await fetch("/api/posts/upvote", {
        method: "PUT",
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
}

document.querySelector(".upvote-btn").addEventListener("click", upvoteClickHandler);