const text = {
    attack: "is attacking",
    superAttack: "is throwing a super attack!",
    tired: "is to tired to do anything!",
    rest: "is resting...",
    ko: "is KO",
    newMonster: "GO!",
    defeat: "you defeated",
    gold: "you earned",
    levelUp: "leveld up"
}

function displayMessagesSequentially(messages, index = 0) {
    if (index < messages.length) {
        const messageObject = messages[index];
        setupArena(currentPNJ, messageObject.text, indexPNJ); // Update the message display
        setTimeout(() => {
            displayMessagesSequentially(messages, index + 1); // Recurse with next message
        }, messageObject.delay);
    }
}
