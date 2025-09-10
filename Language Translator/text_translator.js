// Translate input text using MyMemory API
async function handleTranslation() {
    const input = document.getElementById('text').value.trim();
    const language = document.getElementById('language').value;
    const output = document.getElementById('translatedText');

    if (!input) {
        alert('Kuch bhi nahi likha hai!'); 
        return;
    }

    output.value = 'Translating...'; // Show loading

    try {
        const apiURL = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(input)}&langpair=en|${language}`;
        const response = await fetch(apiURL);
        const result = await response.json();

        if (result.responseData && result.responseData.translatedText) {
            output.value = result.responseData.translatedText;
        } else {
            output.value = '';
            alert('Translation failed. Try again.');
        }
    } catch (err) {
        output.value = '';
        console.error('Translation error:', err);
        alert('An error occurred while translating. Please check your connection.');
    }
}

// Swap the text and translated fields
function swapTextFields() {
    const original = document.getElementById('text');
    const translated = document.getElementById('translatedText');

    const temp = original.value;
    original.value = translated.value;
    translated.value = temp;
}

// Copy translated text to clipboard 
function copyTranslatedText() {
    const output = document.getElementById('translatedText');

    navigator.clipboard.writeText(output.value).then(() => {
        alert('Copied translated text to clipboard!');
    }).catch(() => {
        alert('Copy failed. Try again.');
    });
}
