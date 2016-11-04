# Tooling and automation
This lab walks you through automating tasks with [gulp](https://github.com/gulpjs/gulp/tree/master/docs), a build tool and task runner.

## Getting started
Once you've cloned the repo, navigate to the starting folder, **app/**.

Install [Node Version Manager](https://github.com/creationix/nvm) (nvm) if it’s not already installed. Then use nvm to install [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/):

```
nvm install node
```

Confirm that the installations were successful with:

```
node -v
```

and

```
npm -v
```

These should return version numbers if they are installed. Then install the gulp command line tool:

```
npm install --global gulp-cli
```

To run the solution, navigate to the **solution/** folder and run:

```
npm install
```

followed by:

```
gulp
```

## License

Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
