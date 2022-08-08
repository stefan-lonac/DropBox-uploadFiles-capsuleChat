const popupClose = document.getElementById('close-popup');
const popupContent = document.getElementById('popup-file');
// const popupFiles = document.getElementById('file-content');

const chatContent = document.getElementById('capsule-chat');
const chatMain = document.getElementById('chat__main');
const chatMessageContent = document.getElementById('chat-message');
const banner = document.getElementById('banner');
const chatScroll = document.getElementById('chatScroll');

// Input chat dialog
const chatMessageDialog = document.getElementById('chat-dialog');
const chatSendMessage = document.getElementById('send-dialog');

var chatIcon = document.querySelectorAll('.trigger-chat');
var chatChildMessage = document.querySelectorAll('.chat__container');
var buttonsMessage = document.querySelectorAll('.button-click');
var useItMsg = document.querySelectorAll('.native-massage');

// Use for executed function once
var executedOnceFunction = true;

// URL buble on Steps
const bubleUrl = document.getElementById('buble-url-content');

var encrypt = true;
const driver = new Driver({
    opacity: 0,
    animate: true,
    allowClose: false, // Off click side (close only on button)
    closeBtnText: '', // Close button text for this step
    nextBtnText: '', // Next button text for this step
    prevBtnText: '', // Prev button text for this step
    doneBtnText: '', // Done button text for this step
});

// Variables for upload files
const dropArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');

let button = dropArea.querySelector('.button-upload');
let input = dropArea.querySelector('input');

let file;

// Function for starting driver
startDriver = function() {

    // Active popup
    popupContent.classList.add('active-popup');
    let headerChatHTML = `
    <div class="capsule-chat steps-header-chat" id="driver-header-capsule">

        <div class="chat__content sl__flex sl__dc" id="chat-content">

            <div class="chat-header">

                <div class="chat__log sl__flex sl__ac">
                    <img src="assets/img/logo-tara.png" alt="">
                    <h3 class="steps-active">Tara</h3>
                </div>

                <div class="chat__close trigger-chat">
                    <a class="steps-header-chat__open steps-header-button" onclick="driverHeaderChatBtn()">Chat</a>
                    <img src="assets/img/more-vertical.png" alt="">
                </div>

            </div>

        </div>

    </div>
    
    <div class="sl__flex steps"> 
        <div class="sl__flex sl__ac sl__sb">
            <p>
                <strong>Step <span class="current-step">1<span></strong>/5
            </p>
            <p>
                End tour
            </p>
        </div>
    </div>`;

    // Define the steps for introduction
    driver.defineSteps([
        // First popup
        {
            element: '#popup-file',
            popover: {
                className: 'first-step-popover 1',
                title: headerChatHTML,
                description: "Let's imagine this is the email you recieved. It looks legit, right? Well, it's actually a <strong>phishing email.</strong> Let's take a closer look....",
                position: 'right'
            },
            onPrevious: () => { mutationSteps(); },
            onNext: () => { mutationSteps(); }
        },

        // Second popup
        {
            element: '#retrive-document',
            popover: {
                className: 'second-step-popover 2',
                title: headerChatHTML,
                description: 'You"ve been asked to review and sign a Docusign agreement. Let"s walk through what happens if you click.',
                position: 'right'
            },
            onPrevious: () => { mutationSteps(); },
            onNext: () => {
                // Add class to body for overlay bg
                document.body.classList.add('active-overlay-body');
                overlayDriver.classList.remove('glass-overlay');
                popupCloseFunc();
                mutationSteps();
                popupContent.classList.remove('active-driver-popup')
            },
        },

        // Third Popup
        {
            element: '#logo-id',
            popover: {
                className: 'third-step-popover 3',
                title: headerChatHTML,
                description: 'Clicking leads you to this website, which at first glance looks like the DocuSign website with its logo.',
                position: 'right'
            },
            onPrevious: () => {
                // Add class to body for overlay bg
                document.body.classList.remove('active-overlay-body');
                overlayDriver.classList.add('glass-overlay');
                popupCloseFunc();
                mutationSteps();
                popupContent.classList.add('active-driver-popup')
            },

            onNext: () => {
                // Add class to body for overlay bg
                document.body.classList.add('active-overlay-body');
                mutationSteps();
                showHideClassBublePopup();
                bubleUrl.classList.remove('fadeInUp')
            }
        },

        // Four Popup
        {
            element: '#buble-url-content',
            popover: {
                className: 'four-step-popover 4',
                title: headerChatHTML,
                description: 'Let"s check the <strong>website address</strong>. It looks like it says "microsoft.com" but a closer look reveals that the letter "o" has been replaced with the number "0".',
                position: 'bottom'
            },
            onPrevious: () => {
                showHideClassBublePopup();
                mutationSteps();
                bubleUrl.classList.remove('fadeInUp')
            },

            onNext: () => {
                // Add class to body for overlay bg
                document.body.classList.add('active-overlay-body');
                showHideClassBublePopup();
                mutationSteps();
                bubleUrl.classList.remove('fadeInUp')
            }
        },

        // Five Popup
        {
            element: '#target-upload',
            popover: {
                className: 'five-step-popover 5',
                title: headerChatHTML,
                description: 'You"re being asked to <strong>enter your credentials</strong> on a website that is pretending to be the Microsoft website.',
                position: 'right'
            },
            onPrevious: () => {
                showHideClassBublePopup();
            },

            onNext: () => {
                // Add class to body for overlay bg
                document.body.classList.remove('active-overlay-body');
                chatContent.classList.remove('steps-chat-active');
                doneMessage();
                openChat();
                mutationSteps();
                animationChat();
                driverCotainer.classList.add('fadeInDown')
            },
        },

    ]);
    driver.start();

    // Add class for glass efect overlay
    const overlayDriver = document.getElementById('driver-page-overlay');
    overlayDriver.classList.add('glass-overlay');

    // Add child element for yellow circle
    const driverElement = document.getElementById('driver-highlighted-element-stage');
    driverElement.innerHTML = "<div class='big-circle'> <div class='medium-circle'> <div class='small-circle'> </div> </div></div>";

}


// Mutation observer for showing element window with buttons and content
mutationSteps = function() {
    const observer = new MutationObserver((mutations, obs) => {

        const driverCotainer = document.getElementById('driver-popover-item');
        
        if (driverCotainer) {

            // Whatch current step and add number of step used from ** className ** Driver
            stepHTML = driverCotainer.querySelector('.current-step');
            stepCurrentNum = driverCotainer.classList[1];
            stepHTML.innerHTML = stepCurrentNum;

            obs.disconnect();
            return;
        }

    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });
}

// Remove style element from head, becouse animation bug on chat
removeStyleEle = function() {
    setTimeout( function(){
        var hs = document.getElementsByTagName('style');
        if (hs.length > 0) {
            for (var i=0, max = hs.length; i < max; i++) {
                if (max > 0) {
                    hs[i].parentNode.removeChild(hs[i]);
                }
            }
        }
    },2500)
}

// Start position of chat
var position = { 
    top: chatContent.offsetTop, 
    left: chatContent.offsetLeft, 
};
var positionSave = [position];

// Follow the chat and calculate position
dragPosition = function(event, ui) {
    var xPos = ui.position.left;
    var yPos = ui.position.top;
    // Object for posistion chat. Push after move chat
    var position = { 
        top: yPos, 
        left: xPos, 
    };
    positionSave.push(position)
}

// Animations for back to tour and show chat from driver
const observerAnimation = new MutationObserver((mutations, obs) => {

    // Add class with animation 
    capsuleHeaderDriver = document.getElementById('driver-header-capsule');
    driverCotainer = document.getElementById('driver-popover-item');
    contentMainID = document.getElementById('content-main-id');
    overlayDriver = document.getElementById('driver-page-overlay');
    driverElement = document.getElementById('driver-highlighted-element-stage');

    isActivatedDriver = driver.isActivated; // Checks if the driver is active or not
    
    // Array for chat position
    if (driverCotainer) {
        
        if (!driverCotainer.classList.contains('hide-driver')) {
            overlayDriver.classList.add('fadeInUp')
            driverElement.classList.add('fadeInUp')
            popupContent.classList.add('fadeInUp')

            driverCotainer.classList.remove('fadeInDown')
            popupContent.classList.remove('fadeInDown')
            overlayDriver.classList.remove('fadeInDown')
            driverElement.classList.remove('fadeInDown')

            // Popup buble conditions
            if (bubleUrl.classList.contains('driver-highlighted-element')) {
                if (bubleUrl.classList.contains('active-buble') && !bubleUrl.classList.contains('hide-driver')) {
                    console.log('No: hide-driver')
                    bubleUrl.classList.remove('fadeInDown')
                    bubleUrl.classList.add('fadeInUp')
                } else {
                    bubleUrl.classList.add('fadeInDown')
                    bubleUrl.classList.remove('fadeInUp')
                }

                if (bubleUrl.classList.contains('buble-start')) {
                    bubleUrl.classList.add('fadeInUp')
                } else {
                    bubleUrl.classList.remove('fadeInUp')
                }
                
            } else {
                bubleUrl.classList.remove('buble-start')
            }
            
            if (chatContent.classList.contains('active-chat')) {
                setTimeout(function() {    
                    driverCotainer.classList.remove('fadeInUp');
                    return;
                }, 2000)
            } else {
                driverCotainer.classList.add('fadeInUp')
            }

            if (!popupContent.classList.contains('active-popup')) {
                popupContent.classList.remove('fadeInUp')
            }

        } else {
            driverCotainer.classList.remove('fadeInUp')
            popupContent.classList.remove('fadeInUp')
            popupContent.classList.add('fadeInDown')

            // Popup buble conditions
            if (bubleUrl.classList.contains('driver-highlighted-element')) {
                console.log('start')
                if (bubleUrl.classList.contains('active-buble') && bubleUrl.classList.contains('hide-driver')) {
                    console.log('Yes: hide-driver')
                    bubleUrl.classList.add('fadeInDown')
                    bubleUrl.classList.remove('fadeInUp')
                } 
            }

            driverCotainer.classList.add('fadeInDown')

            // Popup file conditions
            if (!popupContent.classList.contains('active-popup')) {
                popupContent.classList.remove('fadeInDown')
            }

            if (overlayDriver && driverElement) {
                overlayDriver.classList.add('fadeInDown')
                driverElement.classList.add('fadeInDown')

                overlayDriver.classList.remove('fadeInUp')
                driverElement.classList.remove('fadeInUp')
            }
        }
    }
    
    // Watch if class exist and than add another class
    if (chatContent.classList.contains('move-chat-hide')) {
        chatContent.classList.add('active-chat');
    } else {
        chatContent.classList.remove('active-chat');
    }

    // Add class for disable clicking button and after 2s remove same class (becouse transition bug **keyfames**)
    removeClassDelay = function() {
        chatHeaderBackTo = document.querySelectorAll('.steps-header-chat__open');
        for(i = 0; chatHeaderBackTo.length > i; i++) {
            chatHeaderBackTo[i].classList.add('disable-click');
            setTimeout(function(){
                for(i = 0; chatHeaderBackTo.length > i; i++) {
                    chatHeaderBackTo[i].classList.remove('disable-click');
                }
            },3500)
        }
    }

    animationChat = function() {
                
        if (driverCotainer) {
            // Object with position of driver popup item
            var positionDriver = { 
                top: driverCotainer.offsetTop, 
                left: driverCotainer.offsetLeft, 
            }; 

            // Add posistion to chat content and move to dragable position                
            var positionPop = positionSave.pop();

            if (positionPop) {
                var position = { 
                    top: chatContent.offsetTop, 
                    left: chatContent.offsetLeft, 
                };            
                positionSave.push(position)
            }

        } else {
            // Start position of chat
            var position = {
                top: chatContent.offsetTop, 
                left: chatContent.offsetLeft, 
            };
            positionSave.push(position)
        }

        if (contentMainID.classList.contains('scale-down-ver-top')) {
            contentMainID.classList.remove('scale-down-ver-top');
            contentMainID.classList.add('scale-down-ver-bottom');

            if (driverCotainer) {

                removeClassDelay()
                chatContent.classList.add('move-chat');
                chatContent.classList.remove('move-chat-hide');

                // Add style to the head of page
                const styleMoveChatShow = document.createElement('style');
                styleMoveChatShow.innerHTML = `
                    @-webkit-keyframes move-chat {
                        0% {
                            opacity: 0;
                            top: ${positionDriver.top}px;
                            left: ${positionDriver.left}px;
                        }
                        100% {
                            opacity: 1;
                            top: ${positionPop.top}px;
                            left: ${positionPop.left}px;
                        }
                    }
                    
                    @keyframes move-chat {
                        0% {
                            opacity: 0;
                            top: ${positionDriver.top}px;
                            left: ${positionDriver.left}px;
                        }
                        100% {
                            opacity: 1;
                            top: ${positionPop.top}px;
                            left: ${positionPop.left}px;
                        }
                    }
                    
                    .move-chat {
                        -webkit-animation: move-chat 1s 1s both;
                    }
                `
                document.head.appendChild(styleMoveChatShow)
                removeStyleEle();
            }


        } else {
            
            contentMainID.classList.add('scale-down-ver-top');
            contentMainID.classList.remove('scale-down-ver-bottom');
            contentMainID.classList.remove('scale-up-top');

            if (driverCotainer) {

                removeClassDelay()
                chatContent.classList.add('move-chat-hide');
                chatContent.classList.remove('move-chat');

                // Add style to the head of page
                const styleMoveChatHide = document.createElement('style');
                styleMoveChatHide.innerHTML = `
                    @-webkit-keyframes move-chat-hide {
                        0% {
                            opacity: 1;
                            top: ${positionPop.top}px;
                            left: ${positionPop.left}px;
                        }
                        100% {
                            opacity: 0;
                            top: ${positionDriver.top}px;
                            left: ${positionDriver.left}px;
                        }
                    }
                    
                    @keyframes move-chat-hide {
                        0% {
                            opacity: 1;
                            top: ${positionPop.top}px;
                            left: ${positionPop.left}px;
                        }
                        100% {
                            opacity: 0;
                            top: ${positionDriver.top}px;
                            left: ${positionDriver.left}px;
                        }
                    }
                    
                    .move-chat-hide {
                        -webkit-animation: move-chat-hide 1s 1s both;
                    }
                `
                document.head.appendChild(styleMoveChatHide)
                removeStyleEle();
            }

        }
    }

});

observerAnimation.observe(document, {
    childList: true,
    subtree: true
});


/*  
    *** FILE UPLOAD functions ***
*/

// when file is inside drag area
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('active');
});

// when file leave the drag area
dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('active');
});

// when file is dropped
dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0]; // grab single file even of user selects multiple files
    displayFile();
});

// Scroll to bottom of chat (add message, open chat, add file...)
scrollToBottom = function() {
    chatScroll.scrollTop = chatScroll.scrollHeight;
}

function displayFile() {
    scrollToBottom();
    if (encrypt === true) {
        let fileType = file.type;
        let validExtensions = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        RequestEcxryptionMessage();

        if (validExtensions.includes(fileType)) {
            let fileReader = new FileReader();
            fileReader.fileName = file.name

            fileReader.onload = (readerEvt) => {
                const dragAreaContent = document.getElementById('table');
                // Show date of uploaded file
                let dateF = new Date();
                let date = dateF.toLocaleDateString();
                let hours = dateF.getHours();
                let minutes = dateF.getMinutes();
                let time = hours + ':' + minutes;
                var ampm = (hours >= 12) ? "pm" : "am";
                let today = date + ' ' + time + ' ' + ampm;

                let fileNameType = '';
                let tbody = dragAreaContent.querySelector('tbody');
                let fileName = readerEvt.target.fileName;
                let fileURL = fileReader.result;

                // Format for image in table
                if (fileType == 'application/pdf') {
                    fileNameType = 'file-pdf';
                } else if (fileType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    fileNameType = 'file-word';
                } else {
                    fileNameType = 'file-url';
                }

                // Create new row in table
                var tr = document.createElement("tr");
                tr.innerHTML =
                    `<td>
                    <div class="checkbox" style="width: 20px; height: 20px;">
                        <input type="checkbox" name="" id="">
                    </div>
                </td>
                <td>
                    <div class="td-content sl__flex sl__sb sl__ac">
                        <div class="sl__flex sl__ac">
                            <img src="assets/img/${fileNameType}.svg" alt="">
                            <p>${fileName}</p>
                        </div>
                        <img src="assets/img/star.svg" alt="">
                    </div>
                </td>

                <td>
                    <div class="td-content sl__flex sl__ac">
                        <p>${today}</p>
                    </div>
                </td>

                <td>
                    <div class="td-content sl__flex sl__ac">
                        <p>Only you</p>
                    </div>
                </td>`;

                tbody.appendChild(tr);
            };
            fileReader.readAsDataURL(file);
        } else {
            dropArea.classList.remove('active');
        }
    }
}

button.onclick = () => {
    input.click();
};

// When browse files
input.addEventListener('change', function() {
    file = this.files[0];
    dropArea.classList.add('active');
    displayFile();
});

/*  
    *** END: FILE functions ***
*/


// Add message from chat input from user
chatSendMessage.addEventListener('click', function() {
    if (chatMessageDialog.value.length != 0) {

        // Add class to chat text for blur buttons
        for (x = 0; chatChildMessage.length > x; x++) {
            chatChildMessage[x].classList.add('active-show-more');
        }

        let sectionMessage = `
            <section class="chat__container chat-child-message">
                <div class="buble-show-more"><p> ${chatMessageDialog.value} </p></div>
                <div class="dot-flashing active-dots"></div>
                <div class="inactive-dots" style="display: none">
                    <div class="chat__main-message">Sorry, I didn't understand that.</div>
                    <div class="chat__button sl__flex sl__jce sl__end sl__dc">
                        <button type="button" class="personal-use buttons-chat" onclick="backToTour()">Show me why it's suspicious</button>
                        <button type="button" class="business-use buttons-chat" onclick="backToTour()">Got it</button>
                    </div>
                </div>
            </section>`;
        chatMessageContent.innerHTML += sectionMessage;
    }

    chatMessageDialog.value = '';

    let inactiveDots = document.querySelectorAll('.inactive-dots');
    let activeDots = document.querySelectorAll('.dot-flashing');
    setTimeout(function() {
        for (y = 0; inactiveDots.length > y; y++) {
            inactiveDots[y].style.display = 'block';
        }

        for (z = 0; activeDots.length > z; z++) {
            activeDots[z].remove();
        }

        scrollToBottom();
    }, 1000); // <-- time in milliseconds
    scrollToBottom();
    chatMessageDialog.disabled = true;
})


// Function for showing last message in chat
useMessage = (function(use, requestEcrypt) {

    return function(use) {
        if (executedOnceFunction) {
            for (y = 0; chatChildMessage.length > y; y++) {
                chatChildMessage[y].classList.add('hide-native-msg');
                chatChildMessage[y].classList.remove('height-fill');
            }
            let sectionMessage = `
            <section class="chat__container chat-child-message"> 
                <div class="chat__main-message">
                    ${use}
                </div>
            </section>`;
        
            setTimeout(function() {
                chatMessageContent.innerHTML += sectionMessage;
                scrollToBottom();
            }, 1000);
        
            chatMessageDialog.disabled = false;
            executedOnceFunction = false;
        }
    }

})();

// When user in chat click `Request an exceprtion` this function trigger after again upload file
RequestEcxryptionMessage = function() {
    scrollToBottom();
    // Add class to chat text for blur buttons
    for (x = 0; chatChildMessage.length > x; x++) {
        chatChildMessage[x].classList.add('active-show-more');
        chatChildMessage[x].classList.remove('height-fill');
    }
 
    var classButtonsContent = document.querySelectorAll('.chat__message');
    for (a = 0; a < classButtonsContent.length; a++) {
        classButtonsContent[a].classList.add('inactive-buttons');
    }
        
    let sectionMessage = `
                <section class="chat__container">
                    <div class="chat__main-message">
                        According to the oragnization policy, uploading a file in this application requires either encryption or an approval.
                    </div>

                    <div class="dot-flashing active-dots"></div>

                    <div class="inactive-dots" style="display: none">
                        <div class="chat__main-message">
                            The file is not encrypted. Please cancel the operation, encrypt the file and upload it again.
                        </div>
                        <div class="chat__button sl__flex sl__jce sl__dc sl__end">
                            <button type="button" class="business-use buttons-chat button-click" onclick="doneMessage()">Got it</button>
                            <button type="button" class="personal-use buttons-chat button-click" onclick="startProcess()">Show me how to encrypt a file</button>
                        </div>
                    </div>
                </section>`;
    chatMessageContent.innerHTML += sectionMessage;
    

    let inactiveDots = document.querySelectorAll('.inactive-dots');
    let activeDots = document.querySelectorAll('.dot-flashing');
    setTimeout(function() {
        for (y = 0; inactiveDots.length > y; y++) {
            inactiveDots[y].style.display = 'block';
        }

        for (z = 0; activeDots.length > z; z++) {
            activeDots[z].remove();
        }
        scrollToBottom();
    }, 1000); // <-- time in milliseconds
}


// Add HTML after clicking done button
doneMessage = function() {
    for (y = 0; chatChildMessage.length > y; y++) {
        chatChildMessage[y].classList.add('hide-native-msg');
        chatChildMessage[y].classList.remove('height-fill');
        fadeIn(chatChildMessage[y]);
    }
    let sectionMessage = `
    <section class="chat__container chat-child-message hidden-fade-chat">

        <div class="chat__main-message height-100 sl__flex sl__dc sl__sb" style="background-color: initial;">
            <img src="assets/img/done-huray.svg">
        </div>

        <div>
            <div class="chat__button sl__flex sl__jce sl__end">
                <button type="button" class="business-use buttons-chat" onclick="chatLogo()">Done</button>
                <button type="button" class="personal-use buttons-chat" onclick="startProcess(), useMessage('How can i help?', true)">Show me again</button>
            </div>
        </div>

    </section>`;
    chatMessageContent.innerHTML += sectionMessage;
    chatMessageDialog.disabled = true;

    chatContent.classList.remove('steps-chat-active');
    const ele = document.querySelector('.hidden-fade-chat');
    ele.classList.remove('hidden-fade-chat');
    fadeIn(ele);
    executedOnceFunction = true;
    scrollToBottom();
}

// Function for Fade In or Out element innerHTML or other 
// ** use class => .hidden-fade-chat <= on element for fade **
fadeIn = function(el, display) {
    el.style.opacity = 0;
    el.style.display = display || 'block';

    (function fade() {
        let val = parseFloat(el.style.opacity);
        let proceed = !(((val += 0.5) > 1));

        if (proceed) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}


// Function for oppening chat on click
openChat = function() {
    if (chatContent.classList.contains('active-chat')) {
        chatContent.classList.remove('active-chat');
    } else {
        chatContent.classList.add('active-chat');
    }
    scrollToBottom();
}

chatLogo = function() {
    const chatIcon = document.getElementById('chat-icon');
    chatIcon.classList.add('active-chat-icon');
    if (chatMain.classList.contains('active-chat')) {
        chatMain.classList.remove('active-chat');
    } else {
        chatMain.classList.add('active-chat');
    }
}


// Add class to main chat and show/hide buttons and text on header
stepsHeaderButton = function() {
    if (chatContent.classList.contains('steps-chat-active')) {
        chatContent.classList.remove('steps-chat-active');
    } else {
        chatContent.classList.add('steps-chat-active');
    }
}

// Remove class and hide popup buble url
showHideClassBublePopup = function() {
    if (bubleUrl.classList.contains('active-buble')) {
        bubleUrl.classList.remove('active-buble');
    } else {
        bubleUrl.classList.add('active-buble');
    }
}


// Close current step and back to same step
closeCurrentStep = function() {
    const overlayDriver = document.getElementById('driver-page-overlay');
    const highlightDriver = document.getElementById('driver-highlighted-element-stage');
    const driverCotainer = document.getElementById('driver-popover-item');

    if (overlayDriver.classList.contains('hide-driver') ||
        highlightDriver.classList.contains('hide-driver') ||
        driverCotainer.classList.contains('hide-driver') ||
        popupContent.classList.contains('hide-driver') ||
        bubleUrl.classList.contains('hide-driver')) {

        overlayDriver.classList.remove('hide-driver');
        highlightDriver.classList.remove('hide-driver');
        driverCotainer.classList.remove('hide-driver');
        popupContent.classList.remove('hide-driver');
        bubleUrl.classList.remove('hide-driver');

        if (overlayDriver.classList.contains('glass-overlay')) {
            document.body.classList.remove('active-overlay-body');

            if (document.body.classList.contains('active-overlay-body')) {
                document.body.classList.add('active-overlay-body');
            }

        } else {
            document.body.classList.add('active-overlay-body');
        }

    } else {
        overlayDriver.classList.add('hide-driver');
        highlightDriver.classList.add('hide-driver');
        driverCotainer.classList.add('hide-driver');
        popupContent.classList.add('hide-driver');
        bubleUrl.classList.add('hide-driver');

        if (!overlayDriver.classList.contains('glass-overlay')) {
            document.body.classList.add('active-overlay-body');

            if (document.body.classList.contains('active-overlay-body')) {
                document.body.classList.remove('active-overlay-body');
            }

        } else {
            document.body.classList.remove('active-overlay-body');
        }
    }
}

// Function for close popup with driver
popupCloseFunc = function() {
    if (popupContent.classList.contains('active-popup')) {
        popupContent.classList.remove('active-popup');
    } else {
        popupContent.classList.add('active-popup');
    }
}

// JQuery for draggable chat
$('#capsule-chat').draggable({ 
    handle: '.chat-draggable',
    drag: dragPosition, 
});


// On clicked buttons in chat show different message
for (b = 0; b < buttonsMessage.length; b++) {
    buttonsMessage[b].addEventListener('click', function() {
        var classButtonsContent = document.querySelectorAll('.chat__message');
        for (a = 0; a < classButtonsContent.length; a++) {
            classButtonsContent[a].classList.add('inactive-buttons');
        }
    });
}

// In driver steps click on Chat button
driverHeaderChatBtn = function() {
    driverCotainer.classList.remove('fadeInUp')
    animationChat()
    useMessage('How can i help?', true)
    openChat() 
    stepsHeaderButton()
    closeCurrentStep()
}

// On click back to tour button
backToTour = function() {
    driverCotainer.classList.add('fadeInUp')
    bubleUrl.classList.add('buble-start')
    animationChat()
    openChat()
    closeCurrentStep()
    stepsHeaderButton()
}

// Button to start driver and animations
startProcess = function() {
    startDriver()
    setTimeout(function() {
        animationChat()
    }, 500)
}