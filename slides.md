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

# Why bring this up at a C++ conference?
This has nothing to do with C++

A bit about me

<v-clicks>

 - Mostly self-taught
 - Some periods in time, you feel you get a learning boost
 - For me, watching presentations about C++
 - I wanted to give something back to the community
 - This is something I have had success with

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

A bit of history 

<v-clicks>

- We were stuck with a legacy IDE + an in-house built build-system
 - Integration between the two was very poor
 - Debugging effectively non-existing
 - Some developers were trying out VSCode, but integration was even poorer.

</v-clicks>

<!--
  We have aound 50-100 different build-targets
-->

---
---
# Why bring this up at a C++ conference?
This has nothing to do with C++

Tooling is importart

<v-clicks>

 - Talk: C++ Painkillers for C++ developers
 - This talk is very much about C++ painkillers
 - Allows your developers to focus on their main task

</v-clicks>


---
---
# Why bring this up at a C++ conference?
This has nothing to do with C++

A bit of history

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
# Why bring this up at a C++ conference?
This has nothing to do with C++

<v-clicks depth=2>

- Did we succeed?
  - Yes

- Was it hard?
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

- Integrate with custom automation tools
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
-->

---

# The VSCode window

<img src="/images/vscode-ide.png" class="w150" />

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

# VS Code extensions for C/C++ development
<v-clicks>

1. Microsoft VS Code C/C++ Tools <img src="/images/extension-cpp.png" />
    Gives us syntax highlighting, compilation and debugging support

</v-clicks>

---

# Legacy IDEs

- Often feels like working in the middle ages
- Doesn't offer much customization


---

# Custom / legacy build systems

<v-clicks>

- Executed via the command-line
- Can be difficult to understand and customize
- Puts build artifacts in "odd" places
- No integration with debugging and test-runner tools

</v-clicks>

---
clicks: 6
---
# How can we integrate with VS Code

tasks.json, launch.json, settings.json

<div class="grid grid-cols-2 gap-x-4 gap-y-4">

<div>
  <div v-click="1">- Building can be done by defining a task in tasks.json</div>
  <div v-click="4" class="my-auto leading-6 text-base opacity-75">    - Needs to know paths and command-line arguments</div>
</div>

<div v-click="1"><img src="/images/tasks-cppbuild.png" rounded shadow class="w70" /></div>

<div>
  <div v-click="2">- Debugging can be done by defining a launch configuration in launch.json</div>
  <div v-click="5" class="my-auto leading-6 text-base opacity-75">    - Needs to know the debugger we want to use, and where to find debugging symbols</div>
  <div v-click="5" class="my-auto leading-6 text-base opacity-75">    - For remote debugging, needs to upload dependent files</div>
</div>

<div v-click="2"><img src="/images/launch-debug.png" rounded shadow class="w70" /></div>

<div>
  <div v-click="3">- Test-runner tools can be enabled by a suitable settings.json</div>
  <div v-click="6" class="my-auto leading-6 text-base opacity-75">    - In this case, we use TestMate.</div>
</div>

<div v-click="3"><img src="/images/tasks-cppbuild.png" rounded shadow class="w70" /></div>

</div>

---
---
# Example

Using the VS Code documentation for C++ development

https://code.visualstudio.com/docs/cpp/config-linux

---
---
# Let's try to create a build task

---
---
# Let's try to create a launch configuration

---
---

# Using commands to fill out vscode .json files

<v-clicks>

- Uses VS code commands to dynamically populate configuations
- _This_ is where we can define custom commands in our extension

</v-clicks>

---

# Text-editor commands

- Advanced search-and-replace
    - Example: Change include path to full paths

---

# Resolving files and paths for launch.json and tasks.json

Legacy build systems often puts artifacts in odd places.

An extension can search for these and return the paths.

This is especially useful in launch.json
