function typeWriter(text, i, callback) {
    if (i < (text.length)) {
        document.getElementById("terminal-output").innerHTML += text.charAt(i);
        i++;
        setTimeout(function() {
            typeWriter(text, i, callback);
        }, 50);
    } else if (callback) {
        callback();
    }
}

// Start typing when the popup opens
document.getElementById("popup").addEventListener("show", function() {
    document.getElementById("terminal-output").innerHTML = ""; // Clear previous output
    typeWriter("Error: Observatory is about to crash the BROM...\nType 'STOP' to stop the telescope.", 0);
});

