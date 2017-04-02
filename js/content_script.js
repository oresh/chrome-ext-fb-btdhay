// Sending a request from a content script
/*
chrome.extension.sendMessage({msg: "I'm content-script"}, function (response) {
    console.log(response);
});
*/

(function() {

	if (window.location.hostname == 'www.facebook.com') {

		var wishes, prewishes, greetings;

		function get_options() {
	    // Use default value color = 'red' and likesColor = true.
	    chrome.storage.sync.get({
	      wishes: wishesLocalStorage.default_options.wishes,
	      prewishes : wishesLocalStorage.default_options.prewishes,
	      greetings : wishesLocalStorage.default_options.greetings
	    }, function(items) {
	    	wishes = items.wishes.split('\n');
	    	prewishes = items.prewishes.split('\n');
	    	greetings = items.greetings.split('\n');
	    	processBirthdays();
	    });
	  }
	  get_options();

	  function processBirthdays() {
	  	var now = new Date();
	    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	    if (localStorage.requestSent) {
	      
	      if (localStorage.requestSent == today) {
	        return;
	      }
	    }
	    var reminder, people, name;
	    var reminders = document.getElementsByClassName('fbRemindersStory');
	    for (var i = 0, len = reminders.length; i < len; i++) {
	      reminder = reminders[i].getElementsByClassName('fbRemindersIcon');
	      if (reminder[0].classList.contains('sp_RX49PX1k27y_2x') || reminder[0].classList.contains('sp_W5zYJPccZzp_2x')) {
	      	var link = reminders[i].getElementsByTagName('a');
	        link[0].click();
	        // wait 3 seconds for the form to open
	        setTimeout(function() {
	          var birthdays = document.querySelectorAll('._5j09');
	          for (var j = 0, lenj = birthdays.length; j < lenj; j++) {
	            day = birthdays[j];
	            if (day.querySelectorAll('textarea').length) {
		            day.querySelectorAll('textarea')[0].value = getGreetingText();
		            person = day.querySelectorAll('._5j0a a')[0].innerHTML;
		            if (confirm('Say congrats to ' + person + '?')) {
		              day.querySelectorAll('button._42ft')[0].click();
		            } else {
		              day.querySelectorAll('textarea')[0].value = '';
		            }
		          }
	          }
	          localStorage.requestSent = today;
	        }, 3500);
	      }
	    }

	    function getGreetingText() {
				var smiles = [
				'😘','🙂','😊','☺','😄','😁','😃','😀','😎','🤠','😺','😸',
				'😼','👏','👍','🍰','🎂','🍮','🍭','🍬','🍫','🍩','🍪','🍧',
				'🍨','🍦','🥂','🍺','🍷','🍹','🍾','🏅','🎸','🎷','❗']


				function getInvite() {
					return invites[Math.floor(Math.random() * invites.length)];
				}

				function getGreeting() {
					return greetings[Math.floor(Math.random() * greetings.length)]
				}

				function getPrewish() {
					return prewishes[Math.floor(Math.random() * prewishes.length)];
				}

				function getWish(number_wishes, separators) {
					return getItemsFromArray(wishes, number_wishes, separators)
				}

				function getSmiles(number_smiles, separators) {
					return getItemsFromArray(smiles, number_smiles, separators)
				}

				function getItemsFromArray(array, number_of_items, separators) {
					var localArr = Array.from(array);
					var text = ''
					for (var i = 0; i < number_of_items; i++) {
						var ind = Math.floor(Math.random() * localArr.length);
						text += localArr[ind];
						if (separators && separators[i]) {
							text += separators[i];
						}
						localArr.splice(ind, 1);
					}
					return text;
				}

				text = getGreeting() + '\n' + getPrewish() + ' ';
				text += getWish(3, [', ', ' and ', '! ']);
				// text += 'Besides that I would like to meet with you over ' + getInvite();
				// text +=  ' when we both have the time.';
				text += ' ' + getSmiles(3);
				return text;
			}
		}

  }
})();

// Receiving message from a background page
/*
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting === "Do you hear me?") {
            sendResponse({answer: "Yes"});
        }
    }
);
*/