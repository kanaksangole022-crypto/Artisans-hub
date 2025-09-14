// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDnVuu-TCC83Ea1x2ZWokgKBoROgxNwNk8",
  authDomain: "artisans-hub-a1cca.firebaseapp.com",
  projectId: "artisans-hub-a1cca",
  storageBucket: "artisans-hub-a1cca.firebasestorage.app",
  messagingSenderId: "83933443892",
  appId: "1:83933443892:web:92fdf521c1ef5ff38f9761"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login function
function login(role) {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        localStorage.setItem("role", role);
        if (role === "artist") {
            window.location.href = "artist.html";
        } else {
            window.location.href = "buyer.html";
        }
    })
    .catch((error) => {
        alert("Login failed: " + error.message);
    });
}

// Artist form submit
const form = document.getElementById('uploadForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const imageUrl = document.getElementById('imageUrl').value;
        const user = auth.currentUser;
        if (!user) {
            alert("Please login first.");
            return;
        }
        db.collection('artworks').add({
            title: title,
            imageUrl: imageUrl,
            artistId: user.uid
        }).then(() => {
            alert("Artwork added successfully!");
            form.reset();
        });
    });
}
