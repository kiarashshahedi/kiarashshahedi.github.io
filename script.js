$(document).ready(function() {
    // Scroll animation for sections
    $(window).scroll(function() {
        $('.timeline-item').each(function() {
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass('fade-in');
            }
        });
    });
});



// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Page View Counter
db.ref('pageViews').transaction(function (currentViews) {
    return (currentViews || 0) + 1;
});

db.ref('pageViews').on('value', (snapshot) => {
    const views = snapshot.val();
    document.getElementById('viewCount').innerText = views;
});

// Submit Review Form
const form = document.getElementById('reviewForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewName').value;
    const review = document.getElementById('reviewText').value;
    const rating = document.getElementById('reviewRating').value;

    db.ref('reviews').push({
        name: name,
        review: review,
        rating: rating,
        timestamp: new Date().toString()
    }).then(() => {
        alert('Review submitted!');
        form.reset();
    });
});

// Display Reviews
const reviewsContainer = document.getElementById('reviewsContainer');

db.ref('reviews').on('value', (snapshot) => {
    reviewsContainer.innerHTML = ''; // Clear previous reviews
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



  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA02GTMGPHPvT1QcsvtYE2HslYRrl8y9ks",
    authDomain: "kiarashshahedi-github-io.firebaseapp.com",
    projectId: "kiarashshahedi-github-io",
    storageBucket: "kiarashshahedi-github-io.appspot.com",
    messagingSenderId: "545043533329",
    appId: "1:545043533329:web:db4dd1ad59d752d314abb0",
    measurementId: "G-WK4NFPY3GY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
