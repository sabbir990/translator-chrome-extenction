import { countries } from './countries.js';
const selectTags = document.querySelectorAll('select');
const translateButton = document.getElementsByClassName('translate-button')[0];
const input = document.getElementById('input');
const output = document.getElementById('output');
const swapButton = document.getElementsByClassName('swap-button')[0];
const speechFrom = document.getElementById('speech-from');
const copyFrom = document.getElementById('copy-from');
const copyTo = document.getElementById('copy-to');
const speechTo = document.getElementById('speech-to')

selectTags.forEach((tag, index) => {
    for (let country_code in countries) {
        let selected = '';
        if ((index === 0 && country_code === 'en-GB') || (index === 1 && country_code === 'bn-IN')) {
            selected = 'selected';
        }
        const option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option);
    }
});

translateButton.addEventListener('click', () => {
    const inputSelect = selectTags[0].value;
    const outputSelect = selectTags[1].value;
    const apiUrl = `https://api.mymemory.translated.net/get?q=${input.value}&langpair=${inputSelect}|${outputSelect}`;
    fetch(apiUrl).then((response) => {
        return response.json();
    }).then((result) => {
        output.innerHTML = `${result.responseData.translatedText}`
    })
})

swapButton.addEventListener('click', () => {
    let tempText = input.value;
    input.value = output.value;
    output.value = tempText;

    let fromSelect = selectTags[0].value;
    selectTags[0].value = selectTags[1].value;
    selectTags[1].value = fromSelect;
})

copyFrom.addEventListener('click', () => {
    navigator.clipboard.writeText(input.value);
})

copyTo.addEventListener('click', () => {
    navigator.clipboard.writeText(output.value);
})

speechFrom.addEventListener('click', () => {
    const speaker = new SpeechSynthesisUtterance(input.value);
    speaker.lang = selectTags[0].value;
    speechSynthesis.speak(speaker);
})

speechTo.addEventListener('click', () => {
    const outputSpeaker = new SpeechSynthesisUtterance(output.value);
    outputSpeaker.lang = selectTags[1].value;
    speechSynthesis.speak(outputSpeaker);
})