// Set PDF.js worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

// Preview the uploaded PDF in the viewer
const pdfPreview = document.querySelector('.showPDF');
document.querySelector('.targetPdf').addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        pdfPreview.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile);
});

// Handle PDF translation when user clicks the button
document.querySelector('.translatePDF').addEventListener('click', async () => {
    const file = document.querySelector('.targetPdf').files[0];
    const selectedLanguage = document.querySelector('.selectLang').value;
    const outputContainer = document.querySelector('.temp-body');

    if (!file) {
        alert('Please select a PDF file to translate.');
        return;
    }

    try {
        const fileData = await file.arrayBuffer();
        const pdfDocument = await pdfjsLib.getDocument({ data: fileData }).promise;

        let fullText = '';

        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            const page = await pdfDocument.getPage(pageNum);
            const content = await page.getTextContent();

            content.items.forEach(item => {
                fullText += item.str + ' ';
            });
        }

        if (!fullText.trim()) {
            outputContainer.textContent = 'No readable text found in the PDF.';
            return;
        }

        const translatedResult = await translateInChunks(fullText, selectedLanguage);
        outputContainer.innerHTML = renderFormattedParagraphs(translatedResult);

    } catch (error) {
        console.error('Translation error:', error);
        outputContainer.textContent = 'Oops! Something went wrong during translation.';
    }
});

// Translate large text in chunks using MyMemory API
const translateInChunks = async (text, targetLang) => {
    const chunkSize = 500;
    const apiEndpoint = 'https://api.mymemory.translated.net/get';
    let translatedOutput = '';

    for (let i = 0; i < text.length; i += chunkSize) {
        const chunk = text.slice(i, i + chunkSize);
        const response = await fetch(`${apiEndpoint}?q=${encodeURIComponent(chunk)}&langpair=en|${targetLang}`);

        if (!response.ok) {
            throw new Error(`Translation failed with status: ${response.status}`);
        }

        const data = await response.json();
        translatedOutput += data.responseData.translatedText;
    }

    return translatedOutput;
};

// Split the translated text into clean paragraph blocks
const renderFormattedParagraphs = (text) => {
    return text
        .split(/(?:\n+|\.\s*)/)
        .filter(line => line.trim())
        .map(line => `<p>${line.trim()}</p>`)
        .join('');
};
