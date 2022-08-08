/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./DropBox-uploadFiles-capsuleChat/assets/js/main.js":
/*!***********************************************************!*\
  !*** ./DropBox-uploadFiles-capsuleChat/assets/js/main.js ***!
  \***********************************************************/
/***/ (() => {

var popupClose = document.getElementById('close-popup');
var popupContent = document.getElementById('popup-file'); // const popupFiles = document.getElementById('file-content');

var chatContent = document.getElementById('capsule-chat');
var chatMain = document.getElementById('chat__main');
var chatMessageContent = document.getElementById('chat-message');
var banner = document.getElementById('banner');
var chatScroll = document.getElementById('chatScroll'); // Input chat dialog

var chatMessageDialog = document.getElementById('chat-dialog');
var chatSendMessage = document.getElementById('send-dialog');
var chatIcon = document.querySelectorAll('.trigger-chat');
var chatChildMessage = document.querySelectorAll('.chat__container');
var buttonsMessage = document.querySelectorAll('.button-click');
var useItMsg = document.querySelectorAll('.native-massage'); // Use for executed function once

var executedOnceFunction = true; // URL buble on Steps

var bubleUrl = document.getElementById('buble-url-content');
var encrypt = true;
var driver = new Driver({
  opacity: 0,
  animate: true,
  allowClose: false,
  // Off click side (close only on button)
  closeBtnText: '',
  // Close button text for this step
  nextBtnText: '',
  // Next button text for this step
  prevBtnText: '',
  // Prev button text for this step
  doneBtnText: '' // Done button text for this step

}); // Variables for upload files

var dropArea = document.querySelector('.drag-area');
var dragText = document.querySelector('.header');
var button = dropArea.querySelector('.button-upload');
var input = dropArea.querySelector('input');
var file; // Function for starting driver

startDriver = function startDriver() {
  // Active popup
  popupContent.classList.add('active-popup');
  var headerChatHTML = "\n    <div class=\"capsule-chat steps-header-chat\" id=\"driver-header-capsule\">\n\n        <div class=\"chat__content sl__flex sl__dc\" id=\"chat-content\">\n\n            <div class=\"chat-header\">\n\n                <div class=\"chat__log sl__flex sl__ac\">\n                    <img src=\"assets/img/logo-tara.png\" alt=\"\">\n                    <h3 class=\"steps-active\">Tara</h3>\n                </div>\n\n                <div class=\"chat__close trigger-chat\">\n                    <a class=\"steps-header-chat__open steps-header-button\" onclick=\"driverHeaderChatBtn()\">Chat</a>\n                    <img src=\"assets/img/more-vertical.png\" alt=\"\">\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n    \n    <div class=\"sl__flex steps\"> \n        <div class=\"sl__flex sl__ac sl__sb\">\n            <p>\n                <strong>Step <span class=\"current-step\">1<span></strong>/5\n            </p>\n            <p>\n                End tour\n            </p>\n        </div>\n    </div>"; // Define the steps for introduction

  driver.defineSteps([// First popup
  {
    element: '#popup-file',
    popover: {
      className: 'first-step-popover 1',
      title: headerChatHTML,
      description: "Let's imagine this is the email you recieved. It looks legit, right? Well, it's actually a <strong>phishing email.</strong> Let's take a closer look....",
      position: 'right'
    },
    onPrevious: function onPrevious() {
      mutationSteps();
    },
    onNext: function onNext() {
      mutationSteps();
    }
  }, // Second popup
  {
    element: '#retrive-document',
    popover: {
      className: 'second-step-popover 2',
      title: headerChatHTML,
      description: 'You"ve been asked to review and sign a Docusign agreement. Let"s walk through what happens if you click.',
      position: 'right'
    },
    onPrevious: function onPrevious() {
      mutationSteps();
    },
    onNext: function onNext() {
      // Add class to body for overlay bg
      document.body.classList.add('active-overlay-body');
      overlayDriver.classList.remove('glass-overlay');
      popupCloseFunc();
      mutationSteps();
      popupContent.classList.remove('active-driver-popup');
    }
  }, // Third Popup
  {
    element: '#logo-id',
    popover: {
      className: 'third-step-popover 3',
      title: headerChatHTML,
      description: 'Clicking leads you to this website, which at first glance looks like the DocuSign website with its logo.',
      position: 'right'
    },
    onPrevious: function onPrevious() {
      // Add class to body for overlay bg
      document.body.classList.remove('active-overlay-body');
      overlayDriver.classList.add('glass-overlay');
      popupCloseFunc();
      mutationSteps();
      popupContent.classList.add('active-driver-popup');
    },
    onNext: function onNext() {
      // Add class to body for overlay bg
      document.body.classList.add('active-overlay-body');
      mutationSteps();
      showHideClassBublePopup();
      bubleUrl.classList.remove('fadeInUp');
    }
  }, // Four Popup
  {
    element: '#buble-url-content',
    popover: {
      className: 'four-step-popover 4',
      title: headerChatHTML,
      description: 'Let"s check the <strong>website address</strong>. It looks like it says "microsoft.com" but a closer look reveals that the letter "o" has been replaced with the number "0".',
      position: 'bottom'
    },
    onPrevious: function onPrevious() {
      showHideClassBublePopup();
      mutationSteps();
      bubleUrl.classList.remove('fadeInUp');
    },
    onNext: function onNext() {
      // Add class to body for overlay bg
      document.body.classList.add('active-overlay-body');
      showHideClassBublePopup();
      mutationSteps();
      bubleUrl.classList.remove('fadeInUp');
    }
  }, // Five Popup
  {
    element: '#target-upload',
    popover: {
      className: 'five-step-popover 5',
      title: headerChatHTML,
      description: 'You"re being asked to <strong>enter your credentials</strong> on a website that is pretending to be the Microsoft website.',
      position: 'right'
    },
    onPrevious: function onPrevious() {
      showHideClassBublePopup();
    },
    onNext: function onNext() {
      // Add class to body for overlay bg
      document.body.classList.remove('active-overlay-body');
      chatContent.classList.remove('steps-chat-active');
      doneMessage();
      openChat();
      mutationSteps();
      animationChat();
      driverCotainer.classList.add('fadeInDown');
    }
  }]);
  driver.start(); // Add class for glass efect overlay

  var overlayDriver = document.getElementById('driver-page-overlay');
  overlayDriver.classList.add('glass-overlay'); // Add child element for yellow circle

  var driverElement = document.getElementById('driver-highlighted-element-stage');
  driverElement.innerHTML = "<div class='big-circle'> <div class='medium-circle'> <div class='small-circle'> </div> </div></div>";
}; // Mutation observer for showing element window with buttons and content


mutationSteps = function mutationSteps() {
  var observer = new MutationObserver(function (mutations, obs) {
    var driverCotainer = document.getElementById('driver-popover-item');

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
}; // Remove style element from head, becouse animation bug on chat


removeStyleEle = function removeStyleEle() {
  setTimeout(function () {
    var hs = document.getElementsByTagName('style');

    if (hs.length > 0) {
      for (var i = 0, max = hs.length; i < max; i++) {
        if (max > 0) {
          hs[i].parentNode.removeChild(hs[i]);
        }
      }
    }
  }, 2500);
}; // Start position of chat


var position = {
  top: chatContent.offsetTop,
  left: chatContent.offsetLeft
};
var positionSave = [position]; // Follow the chat and calculate position

dragPosition = function dragPosition(event, ui) {
  var xPos = ui.position.left;
  var yPos = ui.position.top; // Object for posistion chat. Push after move chat

  var position = {
    top: yPos,
    left: xPos
  };
  positionSave.push(position);
}; // Animations for back to tour and show chat from driver


var observerAnimation = new MutationObserver(function (mutations, obs) {
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
      overlayDriver.classList.add('fadeInUp');
      driverElement.classList.add('fadeInUp');
      popupContent.classList.add('fadeInUp');
      driverCotainer.classList.remove('fadeInDown');
      popupContent.classList.remove('fadeInDown');
      overlayDriver.classList.remove('fadeInDown');
      driverElement.classList.remove('fadeInDown'); // Popup buble conditions

      if (bubleUrl.classList.contains('driver-highlighted-element')) {
        if (bubleUrl.classList.contains('active-buble') && !bubleUrl.classList.contains('hide-driver')) {
          console.log('No: hide-driver');
          bubleUrl.classList.remove('fadeInDown');
          bubleUrl.classList.add('fadeInUp');
        } else {
          bubleUrl.classList.add('fadeInDown');
          bubleUrl.classList.remove('fadeInUp');
        } // if (!bubleUrl.classList.contains('fadeInDown')) {
        //     bubleUrl.classList.add('buble-start')
        // } else {
        //     bubleUrl.classList.remove('buble-start')
        // }


        if (bubleUrl.classList.contains('buble-start')) {
          bubleUrl.classList.add('fadeInUp');
        } else {
          bubleUrl.classList.remove('fadeInUp');
        }
      } else {
        bubleUrl.classList.remove('buble-start');
      } // if (!bubleUrl.classList.contains('active-buble') && !bubleUrl.classList.contains('hide-driver')) {
      //     bubleUrl.classList.remove('fadeInDown')
      //     bubleUrl.classList.remove('fadeInUp')
      // }


      if (chatContent.classList.contains('active-chat')) {
        setTimeout(function () {
          driverCotainer.classList.remove('fadeInUp');
          return;
        }, 2000);
      } else {
        driverCotainer.classList.add('fadeInUp');
      }

      if (!popupContent.classList.contains('active-popup')) {
        popupContent.classList.remove('fadeInUp');
      }
    } else {
      driverCotainer.classList.remove('fadeInUp');
      popupContent.classList.remove('fadeInUp');
      popupContent.classList.add('fadeInDown'); // Popup buble conditions

      if (bubleUrl.classList.contains('driver-highlighted-element')) {
        console.log('start');

        if (bubleUrl.classList.contains('active-buble') && bubleUrl.classList.contains('hide-driver')) {
          console.log('Yes: hide-driver');
          bubleUrl.classList.add('fadeInDown');
          bubleUrl.classList.remove('fadeInUp');
        }
      }

      driverCotainer.classList.add('fadeInDown'); // Popup file conditions

      if (!popupContent.classList.contains('active-popup')) {
        popupContent.classList.remove('fadeInDown');
      }

      if (overlayDriver && driverElement) {
        overlayDriver.classList.add('fadeInDown');
        driverElement.classList.add('fadeInDown');
        overlayDriver.classList.remove('fadeInUp');
        driverElement.classList.remove('fadeInUp');
      }
    }
  } // Watch if class exist and than add another class


  if (chatContent.classList.contains('move-chat-hide')) {
    chatContent.classList.add('active-chat');
  } else {
    chatContent.classList.remove('active-chat');
  } // Add class for disable clicking button and after 2s remove same class (becouse transition bug **keyfames**)


  removeClassDelay = function removeClassDelay() {
    chatHeaderBackTo = document.querySelectorAll('.steps-header-chat__open');

    for (i = 0; chatHeaderBackTo.length > i; i++) {
      chatHeaderBackTo[i].classList.add('disable-click');
      setTimeout(function () {
        for (i = 0; chatHeaderBackTo.length > i; i++) {
          chatHeaderBackTo[i].classList.remove('disable-click');
        }
      }, 3500);
    }
  };

  animationChat = function animationChat() {
    if (driverCotainer) {
      // Object with position of driver popup item
      var positionDriver = {
        top: driverCotainer.offsetTop,
        left: driverCotainer.offsetLeft
      }; // Add posistion to chat content and move to dragable position                

      var positionPop = positionSave.pop();

      if (positionPop) {
        var position = {
          top: chatContent.offsetTop,
          left: chatContent.offsetLeft
        };
        positionSave.push(position);
      }
    } else {
      // Start position of chat
      var position = {
        top: chatContent.offsetTop,
        left: chatContent.offsetLeft
      };
      positionSave.push(position);
    }

    if (contentMainID.classList.contains('scale-down-ver-top')) {
      contentMainID.classList.remove('scale-down-ver-top');
      contentMainID.classList.add('scale-down-ver-bottom');

      if (driverCotainer) {
        removeClassDelay();
        chatContent.classList.add('move-chat');
        chatContent.classList.remove('move-chat-hide'); // Add style to the head of page

        var styleMoveChatShow = document.createElement('style');
        styleMoveChatShow.innerHTML = "\n                    @-webkit-keyframes move-chat {\n                        0% {\n                            opacity: 0;\n                            top: ".concat(positionDriver.top, "px;\n                            left: ").concat(positionDriver.left, "px;\n                        }\n                        100% {\n                            opacity: 1;\n                            top: ").concat(positionPop.top, "px;\n                            left: ").concat(positionPop.left, "px;\n                        }\n                    }\n                    \n                    @keyframes move-chat {\n                        0% {\n                            opacity: 0;\n                            top: ").concat(positionDriver.top, "px;\n                            left: ").concat(positionDriver.left, "px;\n                        }\n                        100% {\n                            opacity: 1;\n                            top: ").concat(positionPop.top, "px;\n                            left: ").concat(positionPop.left, "px;\n                        }\n                    }\n                    \n                    .move-chat {\n                        -webkit-animation: move-chat 1s 1s both;\n                    }\n                ");
        document.head.appendChild(styleMoveChatShow);
        removeStyleEle();
      }
    } else {
      contentMainID.classList.add('scale-down-ver-top');
      contentMainID.classList.remove('scale-down-ver-bottom');
      contentMainID.classList.remove('scale-up-top');

      if (driverCotainer) {
        removeClassDelay();
        chatContent.classList.add('move-chat-hide');
        chatContent.classList.remove('move-chat'); // Add style to the head of page

        var styleMoveChatHide = document.createElement('style');
        styleMoveChatHide.innerHTML = "\n                    @-webkit-keyframes move-chat-hide {\n                        0% {\n                            opacity: 1;\n                            top: ".concat(positionPop.top, "px;\n                            left: ").concat(positionPop.left, "px;\n                        }\n                        100% {\n                            opacity: 0;\n                            top: ").concat(positionDriver.top, "px;\n                            left: ").concat(positionDriver.left, "px;\n                        }\n                    }\n                    \n                    @keyframes move-chat-hide {\n                        0% {\n                            opacity: 1;\n                            top: ").concat(positionPop.top, "px;\n                            left: ").concat(positionPop.left, "px;\n                        }\n                        100% {\n                            opacity: 0;\n                            top: ").concat(positionDriver.top, "px;\n                            left: ").concat(positionDriver.left, "px;\n                        }\n                    }\n                    \n                    .move-chat-hide {\n                        -webkit-animation: move-chat-hide 1s 1s both;\n                    }\n                ");
        document.head.appendChild(styleMoveChatHide);
        removeStyleEle();
      }
    }
  };
});
observerAnimation.observe(document, {
  childList: true,
  subtree: true
});
/*  
    *** FILE UPLOAD functions ***
*/
// when file is inside drag area

dropArea.addEventListener('dragover', function (event) {
  event.preventDefault();
  dropArea.classList.add('active');
}); // when file leave the drag area

dropArea.addEventListener('dragleave', function () {
  dropArea.classList.remove('active');
}); // when file is dropped

dropArea.addEventListener('drop', function (event) {
  event.preventDefault();
  file = event.dataTransfer.files[0]; // grab single file even of user selects multiple files

  displayFile();
}); // Scroll to bottom of chat (add message, open chat, add file...)

scrollToBottom = function scrollToBottom() {
  chatScroll.scrollTop = chatScroll.scrollHeight;
};

function displayFile() {
  scrollToBottom();

  if (encrypt === true) {
    var fileType = file.type;
    var validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    RequestEcxryptionMessage();

    if (validExtensions.includes(fileType)) {
      var fileReader = new FileReader();
      fileReader.fileName = file.name;

      fileReader.onload = function (readerEvt) {
        var dragAreaContent = document.getElementById('table'); // Show date of uploaded file

        var dateF = new Date();
        var date = dateF.toLocaleDateString();
        var hours = dateF.getHours();
        var minutes = dateF.getMinutes();
        var time = hours + ':' + minutes;
        var ampm = hours >= 12 ? "pm" : "am";
        var today = date + ' ' + time + ' ' + ampm;
        var fileNameType = '';
        var tbody = dragAreaContent.querySelector('tbody');
        var fileName = readerEvt.target.fileName;
        var fileURL = fileReader.result; // Format for image in table

        if (fileType == 'application/pdf') {
          fileNameType = 'file-pdf';
        } else if (fileType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          fileNameType = 'file-word';
        } else {
          fileNameType = 'file-url';
        } // Create new row in table


        var tr = document.createElement("tr");
        tr.innerHTML = "<td>\n                    <div class=\"checkbox\" style=\"width: 20px; height: 20px;\">\n                        <input type=\"checkbox\" name=\"\" id=\"\">\n                    </div>\n                </td>\n                <td>\n                    <div class=\"td-content sl__flex sl__sb sl__ac\">\n                        <div class=\"sl__flex sl__ac\">\n                            <img src=\"assets/img/".concat(fileNameType, ".svg\" alt=\"\">\n                            <p>").concat(fileName, "</p>\n                        </div>\n                        <img src=\"assets/img/star.svg\" alt=\"\">\n                    </div>\n                </td>\n\n                <td>\n                    <div class=\"td-content sl__flex sl__ac\">\n                        <p>").concat(today, "</p>\n                    </div>\n                </td>\n\n                <td>\n                    <div class=\"td-content sl__flex sl__ac\">\n                        <p>Only you</p>\n                    </div>\n                </td>");
        tbody.appendChild(tr);
      };

      fileReader.readAsDataURL(file);
    } else {
      dropArea.classList.remove('active');
    }
  }
}

button.onclick = function () {
  input.click();
}; // When browse files


input.addEventListener('change', function () {
  file = this.files[0];
  dropArea.classList.add('active');
  displayFile();
});
/*  
    *** END: FILE functions ***
*/
// Add message from chat input from user

chatSendMessage.addEventListener('click', function () {
  if (chatMessageDialog.value.length != 0) {
    // Add class to chat text for blur buttons
    for (x = 0; chatChildMessage.length > x; x++) {
      chatChildMessage[x].classList.add('active-show-more');
    }

    var sectionMessage = "\n            <section class=\"chat__container chat-child-message\">\n                <div class=\"buble-show-more\"><p> ".concat(chatMessageDialog.value, " </p></div>\n                <div class=\"dot-flashing active-dots\"></div>\n                <div class=\"inactive-dots\" style=\"display: none\">\n                    <div class=\"chat__main-message\">Sorry, I didn't understand that.</div>\n                    <div class=\"chat__button sl__flex sl__jce sl__end sl__dc\">\n                        <button type=\"button\" class=\"personal-use buttons-chat\" onclick=\"backToTour()\">Show me why it's suspicious</button>\n                        <button type=\"button\" class=\"business-use buttons-chat\" onclick=\"backToTour()\">Got it</button>\n                    </div>\n                </div>\n            </section>");
    chatMessageContent.innerHTML += sectionMessage;
  }

  chatMessageDialog.value = '';
  var inactiveDots = document.querySelectorAll('.inactive-dots');
  var activeDots = document.querySelectorAll('.dot-flashing');
  setTimeout(function () {
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
}); // Function for showing last message in chat

useMessage = function (use, requestEcrypt) {
  return function (use) {
    if (executedOnceFunction) {
      for (y = 0; chatChildMessage.length > y; y++) {
        chatChildMessage[y].classList.add('hide-native-msg');
        chatChildMessage[y].classList.remove('height-fill');
      }

      var sectionMessage = "\n            <section class=\"chat__container chat-child-message\"> \n                <div class=\"chat__main-message\">\n                    ".concat(use, "\n                </div>\n            </section>");
      setTimeout(function () {
        chatMessageContent.innerHTML += sectionMessage;
        scrollToBottom();
      }, 1000);
      chatMessageDialog.disabled = false;
      executedOnceFunction = false;
    }
  };
}(); // When user in chat click `Request an exceprtion` this function trigger after again upload file


RequestEcxryptionMessage = function RequestEcxryptionMessage() {
  scrollToBottom(); // Add class to chat text for blur buttons

  for (x = 0; chatChildMessage.length > x; x++) {
    chatChildMessage[x].classList.add('active-show-more');
    chatChildMessage[x].classList.remove('height-fill');
  }

  var classButtonsContent = document.querySelectorAll('.chat__message');

  for (a = 0; a < classButtonsContent.length; a++) {
    classButtonsContent[a].classList.add('inactive-buttons');
  }

  var sectionMessage = "\n                <section class=\"chat__container\">\n                    <div class=\"chat__main-message\">\n                        According to the oragnization policy, uploading a file in this application requires either encryption or an approval.\n                    </div>\n\n                    <div class=\"dot-flashing active-dots\"></div>\n\n                    <div class=\"inactive-dots\" style=\"display: none\">\n                        <div class=\"chat__main-message\">\n                            The file is not encrypted. Please cancel the operation, encrypt the file and upload it again.\n                        </div>\n                        <div class=\"chat__button sl__flex sl__jce sl__dc sl__end\">\n                            <button type=\"button\" class=\"business-use buttons-chat button-click\" onclick=\"doneMessage()\">Got it</button>\n                            <button type=\"button\" class=\"personal-use buttons-chat button-click\" onclick=\"startProcess()\">Show me how to encrypt a file</button>\n                        </div>\n                    </div>\n                </section>";
  chatMessageContent.innerHTML += sectionMessage;
  var inactiveDots = document.querySelectorAll('.inactive-dots');
  var activeDots = document.querySelectorAll('.dot-flashing');
  setTimeout(function () {
    for (y = 0; inactiveDots.length > y; y++) {
      inactiveDots[y].style.display = 'block';
    }

    for (z = 0; activeDots.length > z; z++) {
      activeDots[z].remove();
    }

    scrollToBottom();
  }, 1000); // <-- time in milliseconds
}; // Add HTML after clicking done button


doneMessage = function doneMessage() {
  for (y = 0; chatChildMessage.length > y; y++) {
    chatChildMessage[y].classList.add('hide-native-msg');
    chatChildMessage[y].classList.remove('height-fill');
    fadeIn(chatChildMessage[y]);
  }

  var sectionMessage = "\n    <section class=\"chat__container chat-child-message hidden-fade-chat\">\n\n        <div class=\"chat__main-message height-100 sl__flex sl__dc sl__sb\" style=\"background-color: initial;\">\n            <img src=\"assets/img/done-huray.svg\">\n        </div>\n\n        <div>\n            <div class=\"chat__button sl__flex sl__jce sl__end\">\n                <button type=\"button\" class=\"business-use buttons-chat\" onclick=\"chatLogo()\">Done</button>\n                <button type=\"button\" class=\"personal-use buttons-chat\" onclick=\"startProcess(), useMessage('How can i help?', true)\">Show me again</button>\n            </div>\n        </div>\n\n    </section>";
  chatMessageContent.innerHTML += sectionMessage;
  chatMessageDialog.disabled = true;
  chatContent.classList.remove('steps-chat-active');
  var ele = document.querySelector('.hidden-fade-chat');
  ele.classList.remove('hidden-fade-chat');
  fadeIn(ele);
  executedOnceFunction = true;
  scrollToBottom();
}; // Function for Fade In or Out element innerHTML or other 
// ** use class => .hidden-fade-chat <= on element for fade **


fadeIn = function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || 'block';

  (function fade() {
    var val = parseFloat(el.style.opacity);
    var proceed = !((val += 0.5) > 1);

    if (proceed) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}; // Function for oppening chat on click


openChat = function openChat() {
  if (chatContent.classList.contains('active-chat')) {
    chatContent.classList.remove('active-chat');
  } else {
    chatContent.classList.add('active-chat');
  }

  scrollToBottom();
};

chatLogo = function chatLogo() {
  var chatIcon = document.getElementById('chat-icon');
  chatIcon.classList.add('active-chat-icon');

  if (chatMain.classList.contains('active-chat')) {
    chatMain.classList.remove('active-chat');
  } else {
    chatMain.classList.add('active-chat');
  }
}; // Add class to main chat and show/hide buttons and text on header


stepsHeaderButton = function stepsHeaderButton() {
  if (chatContent.classList.contains('steps-chat-active')) {
    chatContent.classList.remove('steps-chat-active');
  } else {
    chatContent.classList.add('steps-chat-active');
  }
}; // Remove class and hide popup buble url


showHideClassBublePopup = function showHideClassBublePopup() {
  if (bubleUrl.classList.contains('active-buble')) {
    bubleUrl.classList.remove('active-buble');
  } else {
    bubleUrl.classList.add('active-buble');
  }
}; // Close current step and back to same step


closeCurrentStep = function closeCurrentStep() {
  var overlayDriver = document.getElementById('driver-page-overlay');
  var highlightDriver = document.getElementById('driver-highlighted-element-stage');
  var driverCotainer = document.getElementById('driver-popover-item');

  if (overlayDriver.classList.contains('hide-driver') || highlightDriver.classList.contains('hide-driver') || driverCotainer.classList.contains('hide-driver') || popupContent.classList.contains('hide-driver') || bubleUrl.classList.contains('hide-driver')) {
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
}; // Function for close popup with driver


popupCloseFunc = function popupCloseFunc() {
  if (popupContent.classList.contains('active-popup')) {
    popupContent.classList.remove('active-popup');
  } else {
    popupContent.classList.add('active-popup');
  }
}; // JQuery for draggable chat


$('#capsule-chat').draggable({
  handle: '.chat-draggable',
  drag: dragPosition
}); // On clicked buttons in chat show different message

for (b = 0; b < buttonsMessage.length; b++) {
  buttonsMessage[b].addEventListener('click', function () {
    var classButtonsContent = document.querySelectorAll('.chat__message');

    for (a = 0; a < classButtonsContent.length; a++) {
      classButtonsContent[a].classList.add('inactive-buttons');
    }
  });
} // Add class or remove fede on Header Driver popup item
// fadeDriverHeader = function() {
//     if (driverCotainer) {
//         if (!capsuleHeaderDriver.classList.contains('fadeInDown')) {
//             capsuleHeaderDriver.classList.add('fadeInDown');
//             capsuleHeaderDriver.classList.remove('fadeInUp');
//         } else {
//             capsuleHeaderDriver.classList.remove('fadeInDown');
//             capsuleHeaderDriver.classList.add('fadeInUp');
//         }
//     }
// }
// In driver steps click on Chat button


driverHeaderChatBtn = function driverHeaderChatBtn() {
  driverCotainer.classList.remove('fadeInUp');
  animationChat();
  useMessage('How can i help?', true);
  openChat();
  stepsHeaderButton();
  closeCurrentStep();
}; // On click back to tour button


backToTour = function backToTour() {
  driverCotainer.classList.add('fadeInUp');
  bubleUrl.classList.add('buble-start');
  animationChat();
  openChat();
  closeCurrentStep();
  stepsHeaderButton();
}; // Button to start driver and animations


startProcess = function startProcess() {
  startDriver();
  setTimeout(function () {
    animationChat();
  }, 500);
};

/***/ }),

/***/ "./DropBox-uploadFiles-capsuleChat/assets/scss/style.scss":
/*!****************************************************************!*\
  !*** ./DropBox-uploadFiles-capsuleChat/assets/scss/style.scss ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/main": 0,
/******/ 			"style": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkunbiased"] = self["webpackChunkunbiased"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["style"], () => (__webpack_require__("./DropBox-uploadFiles-capsuleChat/assets/js/main.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["style"], () => (__webpack_require__("./DropBox-uploadFiles-capsuleChat/assets/scss/style.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;