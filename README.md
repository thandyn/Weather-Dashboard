# Weather-dashboard

I made a weather app for user to look up the weather for cities they input in the search bar. 

![alt text](/assets/images/ss1.PNG)

I started off with the an event listener for my search button. If the city has a space in it, i made sure to use the function trim() to take out any white space. If the input value is nothing, it will do nothing. I made a variable for the latitude and longitude so when the search button gets clicked, those two variable will be stored in the global scope as the relative variable. I also I made a variable for the api to fetch the longitude and latitude of the city. Inside of the fetch, two function will be called. 

![alt text](/assets/images/ss2.PNG)

These two function are almost identical. One fetches the weather for the today and the other fetches the forecast for the incoming days. The latitude and longitude variable were set to global scope by the event listener and those input gets added to the url variable. In the middle each of the fetch functions are the functions to render the respective elements into our HTML. 

![alt text](/assets/images/ss3.PNG)

Just like the last two functions, these two are almost the same with forecast having a for loop. I started with making sure the added HTML gets emptied when the search is clicked. I grabbed each object from the API and made them into variables and created new elements to add into the HTML by using template literals then appended to the parent of the element as the child.