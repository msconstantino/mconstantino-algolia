# Algolia Take-Home Assignment:  Muhammed Constantino
## To run the app:

```npm i```

```npm start```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Customer Questions
**Quality of relevance settings (eg. searchable attributes, custom ranking, index configuration settings)**

I chose the airport data set for my take home assignment. The data included several useful points, many of which could be of interest to a user. From my own past experience searching for airports, I tended to search for the ones that I was most likely to travel to: the busiest airports in a country, state or city. For example, the London, UK metro area has 6 airports. Yet most likely, international passengers would only fly through Heathrow or Gatwick, as they have the highest links_count, or connection flights. Therefore, I decided to use the links_count as my highest custom ranking, sorting the results in descending order.

---

**Richness of UI functionality. What kind of controls are provided to the end user to best capture their intent and ultimately retrieve the best possible content to put in front of the user to drive engagement and find what they are looking for? What features are leveraged in this endeavor (eg. query rules, geo, personalization, AI features etc.)?**

Due to the demo being so simple, the only functionality needed was a search bar. Some ideas I had to make this demo even cooler (if there wasn’t a time limit) include:
* A node map showing all the flights interconnecting the airports. The ones with the most amount of interconnected flights would appear bigger, and all nodes would be searchable
* Search for two airports and show the flight time between them
* Connect to a flight tracker API and show all the flights en route to a selected airport and their arrival times

---

**Quality of design. How does the layout, styling etc. contribute to the overall feel of the experience?**

In the end my UI was pretty simple. A search bar and table gave almost all the information a user would need to find the airport they are looking for.

---

**Ability to drive a narrative with the demo, connecting how the user experience will drive ROI for a business**

I believe that this would be a good foundation to show someone in the air travel business a demo of Algolia and how it works. If I knew the particular field, for example if we are demoing to an airport like SFO, I’d create a demo using departing and arriving flights, and show how they can be searchable by gate number and terminal. A pitch might include a mobile app and that despite frequent flight changes, flyers would be able to quickly find their gates at any time.

---

## Feedback notes:
* In the https://github.com/algolia/datasets/tree/master/wine repo the  wine-search.now.sh is a dead link.
* In https://www.algolia.com/doc/guides/building-search-ui/getting-started/react-hooks/?client=SearchBox.jsx there are methods from react that are used that aren't imported. A top line would look something like:
```import { useState, useRef, useEffect } from 'react'; is missing```



