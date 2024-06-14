function createDialogBox(dialog, callback) {
    const dialogBox = document.createElement('div');
    dialogBox.id = 'dialog-box';
    dialogBox.style.display = 'none';

    const dialogImage = document.createElement('img');
    dialogImage.id = 'dialog-image';
    dialogBox.appendChild(dialogImage);

    const dialogTextContainer = document.createElement('div');
    dialogTextContainer.id = "dialog-container"
    dialogTextContainer.classList = "fight-info";

    const dialogText = document.createElement('p');
    dialogText.id = 'dialog-text';

    const continueBtn = document.createElement('button');
    continueBtn.id = 'continue-btn';
    continueBtn.textContent = 'Continue';
    
    dialogTextContainer.appendChild(dialogText);
    dialogTextContainer.appendChild(continueBtn);
    dialogBox.appendChild(dialogTextContainer);

    document.body.appendChild(dialogBox);

    let dialogIndex = 0;

    continueBtn.addEventListener('click', () => {
        dialogIndex++;
        if (dialogIndex < dialog.length) {
            dialogText.textContent = dialog[dialogIndex].text;
            dialogImage.src = dialog[dialogIndex].image;
        } else {
            dialogBox.style.display = 'none';
            if (callback) {
                callback();
            }
        }
    });

    return dialogBox;
}

function showDialog(dialog, callback) {
    if (!dialog || dialog.length === 0) {
        console.error('Dialog is empty or undefined');
        return;
    }

    const dialogBox = createDialogBox(dialog, callback);
    const dialogText = document.getElementById('dialog-text');
    const dialogImage = document.getElementById('dialog-image');
    dialogBox.style.display = 'flex';
    dialogText.textContent = dialog[0].text;
    dialogImage.src = dialog[0].image;
}

const introDialog = [
    { text: "Welcome to the game!", image: "img/challengers/triss.jfif" },
    { text: "My name is Triss, I am a mythic master.", image: "img/challengers/triss.jfif" },
    { text: "You should create your own mythics a become one of us.", image: "img/challengers/triss.jfif" },
    { text: "The if you defeat all challengers and maybe something will happen.", image: "img/challengers/triss.jfif" },
    { text: "Good Luck!", image: "img/challengers/triss.jfif" },
];

const anotherDialog = [
    { text: "Here is another dialog!", image: "path/to/image4.jpg" },
    { text: "This is the second part.", image: "path/to/image5.jpg" },
    { text: "And this is the end.", image: "path/to/image6.jpg" }
];
