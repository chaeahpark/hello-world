# Hello World

Hello World is a web app to play around with 250 countries across the world. With this app, you can find interesting facts about some countries. For example, there are some countries where no one lives. Also, some countries does not have the capital city. If these are surprising news, try the app and discover more things about different countries!

## Demo

Click [here](https://chaeahpark.github.io/hello-world/)

## Main features

- Asynchronomous programing (async await)
- Sort countries in ascending and descending order with different data type (number / string).
- Search countries with alphabet letters.

## Code structure

1. Function structure
   ![code structure](./readmeImg/code-structure.png)

2. Data structure to manipulate (sort)

- This structure is to prevent mutate the original country array(nodelist)
- Working with nodelist was not easy because it is an array-like object.
- With this structure, the original country data (countryItem) stay safe.
- Creating and removing elements created from sort functions becomes simple by only dealing with tempItems.
  ![data](./readmeImg/data.png)

## Challenges

- Promise
- Nodelist

## Future work

- Refactoring async...await function (ex. encapsulation, variable naming for ui part).
- Clear, short and concise code with React.
- Learn more about Nodelist.
- Learn more about Promise. (Where are you promise? How does it work?)

## Useful materials

- [Understanding Asyncronomous JS](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [Understanding Asyncronomous Javascript - Learn how JS works](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)
- [Accessing the DOM is not equal accessing the DOM – live vs. static element collections](https://www.stefanjudis.com/blog/accessing-the-dom-is-not-equal-accessing-the-dom/)
- [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
- [Why the concept of immutability is so awfully important for a beginner front-end developer?](https://itnext.io/why-concept-of-immutability-is-so-damn-important-for-a-beginner-front-end-developer-8da85b565c8e)
