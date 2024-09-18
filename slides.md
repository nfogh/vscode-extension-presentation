---
layout: cover
highlighter: shiki
---

# Writing VS Code extensions for fun and pofit

<div class="uppercase text-sm tracking-widest">
Nikolaj Fogh
</div>

<div class="abs-bl mx-14 my-12 flex">
  <img src="/images/vscode-icon.png" class="h-8" />
  <div class="ml-3 flex flex-col text-left">
    <div><b>Meeting C++ 2024</b></div>
    <div class="text-sm opacity-50">Nov. 14th, 2024</div>
  </div>
</div>

---
---
# Contents

<v-clicks>

 - Why bring this up at a C++ conference?
 - IDE extensions as a "painkiller"
 - Why VS code
 - Hello world
 - Learning another language (TypeScript)
 - Replacing legacy IDEs
 - Telemetry and security

</v-clicks>

---
---

# Why bring this up at a C++ conference?
This has nothing to do with C++


<v-click>

A bit about me

</v-click>

<v-clicks>

 - Mostly self-taught
 - Some periods in time, you feel you get a learning boost
 - For me, watching presentations about C++ (on YouTube)
 - I wanted to give something back to the community (but what?)
 - The topic I will talk about, is something I have had success with

</v-clicks>

---
---

# Why bring this up at a C++ conference?
This has nothing to do with C++

<v-clicks depth=2>

 - A lot of time is spent on non-coding tasks
   - Configuring builds
   - Configuring debugging
   - Tedious refactoring tasks
   - Boilerplate code
 - Often done by automation tools

</v-clicks>

<!--
  We use Ctrl-shift-b (or similar to build). Or we build on every save.

 - Everyone has a different workflow
-->

---
---
# Why bring this up at a C++ conference?
This has nothing to do with C++

Tooling is importart

<v-clicks>

 - Keynote: C++ Painkillers for C++ developers
 - This talk is very much about C++ painkillers
 - Allows your developers to focus on their main task

</v-clicks>

<!--
  At cppnow by Anastasia Kazakova
-->

---
---
# IDE extensions as a painkiller
A case study 

<v-clicks>

- We were stuck with a legacy IDE + an in-house built build-system
 - Integration between the two was very poor
 - Debugging effectively non-existing
 - A surprising amount of developers make do with whats available

</v-clicks>

<!--
  We have aound 50-100 different build-targets
-->


---
---
# IDE extensions as a painkiller
A case study 

<v-clicks depth=2>

 - We started playing a bit around customizing VS Code
   - Task configurations
   - Launch configurations
 - We got pretty far but were still limited
 - Task and launch configurations are pretty static
   - Suitable for 1-2 components. Not 50-100
 - We wanted 1-click builds of current component
 - We wanted 1-click debugging
   - Autodetect current component
   - Autodetect shared library paths
   - Automatic upload of component + dependencies to target
   - Automatic debugging invocation
  - We wanted various quality-of-life improvements

</v-clicks>

<!--
Show a task configuration
Show a launch configuration
  We have aound 50-100 different build-targets
-->

---
---
# IDE extensions as a painkiller
A case study 

<v-clicks depth=2>

- Did we succeed?
  - Yes

- Was it hard to do?
  - No
  - It was FUN

</v-clicks>

<!--
 - I get immense joy out of delivering tools people like to use
-->

---
---

# Why VS Code

<v-clicks>

- Top of "desired" IDE in a recent stack overflow poll
<img src="/images/so22_ides.png" class="w100" />

- Relatively lightweight.
- Very configurable. Loads of extensions available to add functionality.
- Using extensions, VS code can be made into an IDE.
- Familiar interface for multiple programming languages.
- Extension API fairly well documented (w. examples)
- Takeaways not specific to vscode.

</v-clicks>

<!--
- This talk is specific to vscode, but most of the things should be applicable to any (properly extendable) tool
-->

---

# Why write extensions for VS Code?
What is in it for me?

<v-clicks>

- Integrate IDE with custom automation tools
- Replace legacy IDEs
- Automate repetitive tasks

</v-clicks>

<v-click>

## Other benefits

</v-click>

<v-clicks>

- Learn another programming language & ecosystem (typescript / npm)
- Have fun!

</v-clicks>

<!--
- Start with the low-hanging fruit.
- It doesn't have to be big complicated tool integrations (cmake / debugger support etc.)
- Typescript is great, until it isn't, but it is mainly great
- Npm is great, look what I can do
- On the other hand, look what I can do (lots of dependencies - security issues)
-->

---

## Let's try to create a hello world extension
Just follow the guide here: https://code.visualstudio.com/api/get-started/your-first-extension

<v-clicks>

- Install node.js and npm
- Generate scaffolding
  ```
  npm install -g yo generator-code
  yo code
  ````
- Answer the questions asked
- Open src/extension.ts
- Press F5 to start an extension debugging session

</v-clicks>

---
---

# Let's make a useful command
Automate repetitive tasks

## Text-editor commands

- Advanced search-and-replace
- Example from real life
  - Hotkey to autocomplete include paths

````md magic-move
```cpp
#include "lib1.h"
#include "lib2.h"
int main()
{

}
```
```cpp
#include "Component1/shared/lib1.h"
#include "Component2/shared/lib2.h"
int main()
{

}
```
````

---
---
# Let's make a useful command
Learning a new language?

<v-clicks>

You need 2 things:

</v-clicks>

<v-clicks>

1. A fun project
2. Code examples and a mentor

</v-clicks>

<br/>
<h2 v-click>ChatGPT can be both of those things</h2>

<v-clicks>

- Has deep knowledge about TypeScript
- Has knowledge about the vscode API
- You can ask it to elaborate on solutions
- This advice comes with all the caveats against ChatGPT

</v-clicks>

<v-clicks>

## Live demo

</v-clicks>

---
layout: center
---

# Wasn't that fun?

<!--
This was just a simple example. You can do all sorts of things.
- Read from databases ex.
-->

---

# Back to our case study

<v-clicks>

## Legacy IDEs

- Often feels like working in the middle ages
- Doesn't offer much customization

## Custom build systems

- Can be difficult to understand and customize
- Puts build artifacts in "odd" places
- No integration with industry standard tools

</v-clicks>

---
clicks: 4
---
# How can we integrate with VS Code

tasks.json, launch.json

<div class="grid grid-cols-2 gap-x-4 gap-y-4">

<div>
  <div v-click="1">- Building can be done by defining a task in tasks.json</div>
  <div v-click="3" class="my-auto leading-6 text-base opacity-75">    - Needs to know paths and command-line arguments</div>
</div>

<div v-click="1"><img src="/images/tasks-cppbuild.png" rounded shadow class="w100" /></div>

<div>
  <div v-click="2">- Debugging can be done by defining a launch configuration in launch.json</div>
  <div v-click="4" class="my-auto leading-6 text-base opacity-75">    - Needs to know the executable path and where to find debugging symbols</div>
  <div v-click="4" class="my-auto leading-6 text-base opacity-75">    - For remote debugging, needs to upload dependent files before invoking debugger</div>
</div>

<div v-click="2"><img src="/images/launch-debug.png" rounded shadow class="w100" /></div>

</div>

---
---
# Let's try to create a build task and a launch configuration


---

# Resolving files and paths for launch.json and tasks.json

 - Works well for trivial cases
 - Not flexible enough for more advanced cases
 - More advanced cases needs
   - Task providers
   - Debugger extensions

---

# Visualization

 - Tree views

---

# Telemetry and security
The ugly side

<h2 v-click>Telemetry</h2>

<v-clicks>

 - VS Code sends telemetry by default
 - Many extensions also send telemetry
 - You are the product

</v-clicks>

<h2 v-click>Security</h2>

<v-clicks>

 - It is _very_ easy to publish extensions to the marketplace
 - It is _very_ easy to install new extensions
 - Be careful which extensions you install
 - Maybe run a private extension marketplace

</v-clicks>