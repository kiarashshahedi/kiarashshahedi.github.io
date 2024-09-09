// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA02GTM...",
    authDomain: "kiarashshahedi-github-io.firebaseapp.com",
    projectId: "kiarashshahedi-github-io",
    storageBucket: "kiarashshahedi-github-io.appspot.com",
    messagingSenderId: "545043533329",
    appId: "1:545043533329:web:db4dd1ad59d752d314abb0",
    measurementId: "G-WK4NFPY3GY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Page View Counter
const pageViewsRef = db.ref('pageViews');
pageViewsRef.transaction(function (currentViews) {
    return (currentViews || 0) + 1;
});

pageViewsRef.on('value', (snapshot) => {
    const views = snapshot.val();
    document.getElementById('viewCount').innerText = views;
});

// Submit Review
document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('reviewName').value;
    const review = document.getElementById('reviewText').value;
    const rating = document.getElementById('reviewRating').value;

    const reviewsRef = db.ref('reviews');
    reviewsRef.push({
        name: name,
        review: review,
        rating: rating,
        timestamp: new Date().toString()
    }).then(() => {
        alert('Review submitted!');
        document.getElementById('reviewForm').reset();
    });
});

// Display Reviews
const reviewsContainer = document.getElementById('reviewsContainer');
const reviewsRef = db.ref('reviews');

reviewsRef.on('value', (snapshot) => {
    reviewsContainer.innerHTML = '';
    snapshot.forEach((reviewSnapshot) => {
        const review = reviewSnapshot.val();
        const reviewElement = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${review.name}</h5>
                    <p class="card-text">${review.review}</p>
                    <p class="card-text">Rating: ${review.rating}/5</p>
                    <small class="text-muted">${new Date(review.timestamp).toLocaleString()}</small>
                </div>
            </div>
        `;
        reviewsContainer.innerHTML += reviewElement;
    });
});
