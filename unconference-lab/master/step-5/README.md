# Step 5

Use the task runner Gulp to lint code.

This step take you part of the way to implementing a build process, to automate testing and processing of code and assets before committing or deploying. In this step, source code is moved to the **src** directory, and inline JavaScript from [index.html](src/index.html) is moved to external files.

To see Gulp in action, run the following from the command line in the top-level  directory for this step (the same directory that contains this README file):

```bash
npm install
gulp
```

This runs the linting tasks configured in [gulpfile.js](gulpfile.js). You will learn more about Gulp and build processes in later exercises. Find out more about Gulp [here](https://markgoodyear.com/2014/01/getting-started-with-gulp/).


## Objectives

* Use a task runner to automate processes when building, committing and deploying code.
* Learn how to use Gulp as a task runner.
* Enable (and potentially enforce) code validation.


## Things to check

* Would code minification be worthwhile? Does it break the 'view source' principle, whereby all Web code can be readable by users?
* Would a build process the right place to optimize images?
* How might you automate unit testing or performance testing?
* Should you validate code before every commit, every push, or only on demand? Should it be possible to accept a pull request with invalid code? Find out more about using Git Hooks to enforce code validation [here](https://www.atlassian.com/git/tutorials/git-hooks/local-hooks).
* Are task runners always the right approach? Using npm, shell scripts (or even Make) may be more suitable for simpler projects. Take a look at the following articles:
  * [Why I Left Gulp and Grunt for npm Scripts](why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.bhl5k1muh)
  * [Why we should stop using Grunt & Gulp](https://www.keithcirkel.co.uk/why-we-should-stop-using-grunt/)
