---
layout: cover
highlighter: shiki
---

# Replacing legacy IDEs with VS Code

By playing around with extensions

<div class="uppercase text-sm tracking-widest">
Nikolaj Fogh
</div>

<div class="abs-bl mx-14 my-12 flex">
  <img src="/images/vscode-icon.png" class="h-8" />
  <div class="ml-3 flex flex-col text-left">
    <div><b>Copenhagen C++ meetup</b></div>
    <div class="text-sm opacity-50">Apr. 29th, 2024</div>
  </div>
</div>

---

# Legacy IDEs

- Often feels like working in the middle ages
- Doesn't offer much customization

---

# Why VS Code

<v-clicks>

- Top of "desired" IDE in a recent stack overflow poll
<img src="/images/so22_ides.png" class="w100" />

- Relatively lightweight.
- Very configurable. Loads of extensions available to add functionality.
- Using extensions, VS code can be made into an IDE.
- Familiar interface for multiple programming languages.

</v-clicks>

---

# Why write extensions for VS Code?
What is in it for me?

<v-clicks>

- Integrate with a custom build system
- Replace legacy IDEs
- Automate repetitive tasks

</v-clicks>

<v-click>

## Other benefits

</v-click>

<v-clicks>

- Learn another programming language & ecosystem (npm / typescript)
- Have fun!

</v-clicks>

---

# The VSCode window

<img src="/images/vscode-ide.png" class="w150" />

---

## Let's try to create an extension
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
2. C++ Test Mate <img src="/images/extension-testmate.png" />
    Gives us C++ test framework integrations

</v-clicks>

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

# Using commands to fill out vscode .json files

<v-clicks>

- Uses VS code commands

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
