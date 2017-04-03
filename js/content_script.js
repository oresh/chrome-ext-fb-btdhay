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
	      if (localStorage.requestSent == today) return;
	    }
	    var reminder, people, name, icon, bDayIcon;
	    var reminders = document.getElementsByClassName('fbRemindersStory');
	    for (var i = 0, len = reminders.length; i < len; i++) {
	      reminder = reminders[i].getElementsByClassName('fbRemindersIcon');
	      icon = reminder[0].querySelectorAll('i u');
	      bDayIcon = icon.length && icon[0].innerHTML == 'birthday';

	      if (bDayIcon) {
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
		            	// remove text if not used.
		              //day.querySelectorAll('textarea')[0].value = '';
		            }
		          }
	          }
	          localStorage.requestSent = today;
	        }, 3000);
	      }
	    }

	    function getGreetingText() {
				var smiles = [
					'😘','🙂','😊','☺','😄','😁','😃','😀','😎','🤠','😺','😸',
					'😼','👏','👍','🍰','🎂','🍮','🍭','🍬','🍫','🍩','🍪','🍧',
					'🍨','🍦','🥂','🍷','🍹','🍾','🏅','🎸','🎷','❗', '🎈','🎉',
					'🎉','🎉','🎁','🎈','🍰','🍰'
				]
				
				let getInvite = () => invites[Math.floor(Math.random() * invites.length)];
				let getGreeting = () => greetings[Math.floor(Math.random() * greetings.length)];
				let getPrewish = () => prewishes[Math.floor(Math.random() * prewishes.length)];
				let getWish = (number_wishes, separators) => getItemsFromArray(wishes, number_wishes, separators);
				let getSmiles = (number_smiles, separators) => getItemsFromArray(smiles, number_smiles, separators);

				function getItemsFromArray(array, number_of_items, separators) {
					var localArr = Array.from(array);
					var out = ''
					for (var i = 0; i < number_of_items; i++) {
						var ind = Math.floor(Math.random() * localArr.length);
						out += localArr[ind];
						if (separators && separators[i]) {
							out += separators[i];
						}
						localArr.splice(ind, 1);
					}
					return out;
				}

				var text = getGreeting() + '\n' + getPrewish() + ' ';
				text += getWish(3, [', ', ' and ', '! ']) + ' ' + getSmiles(3);
				return text;
			}
		}

  }
})();