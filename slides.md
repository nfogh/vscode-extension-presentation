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
# About me

## Background

<v-clicks>

 - Electronics engineering / process control
 - Embedded C
 - 10+ years working with C++
 - Recently mostly frameworks / tooling
 - Currently works for Siemens Gamesa doing wind turbine control software

nikolajfogh@gmail.com

</v-clicks>

---
---
# About this presentation

<v-clicks>

 - Some periods in time, you feel you get a learning boost
 - For me, watching presentations about C++ on YouTube
 - I wanted to give something back to the community (but what?)
 - The topic of this talk is something I have had success with

</v-clicks>

<!--
 - How did it come about
 - This is not a deep dive into extension development. Just how _we_ have used
 it to optimize our processes.
 - I will employ you to do the same, we can all learn from it
 - Doesn't have to be hard-core c++. There are plenty of those going around.
-->

---
---
# Contents

<v-clicks>

 1. Why bring this up at a C++ conference?
 2. IDE extensions
 3. Why VS Code
 4. Hello World!
 5. Quality-of-life improvements
 6. Case study: Replacing legacy IDEs
 7. Telemetry and security

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

Tooling is important

<v-clicks>

 - Anastasia Kazakova: C++ Painkillers for C++ developers
 - This talk is very much about C++ painkillers
 - Allows your developers to focus on their main task

</v-clicks>

<!--
  - Keynote at recent cppnow
  - Nothing takes the joy out of working as slow and tedious jobs
-->

---
---
# Why VS Code

<v-clicks>

- Top of "desired" IDE in a recent stack overflow poll
<img src="/images/so22_ides.png" class="w100" />

- Relatively lightweight.
- Very configurable. Loads of extensions available to add functionality.
- Using extensions, VS Code can be made into an IDE.
- Familiar interface for multiple programming languages.
- Extension API fairly well documented (w. examples)
- Takeaways from this talk not specific to VS Code.

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
- On the other hand, look what I can do (lots of dependencies - security issues) - great and scary
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

<!--
 Show the VSCode API reference and documentation as well
-->

---
layout: center
---

# Wasn't that fun?

<!--
This was just a simple example. You can do all sorts of things.
- Read from databases ex.
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
   - No debugger? I'll just use couts
   - No address sanitizer? I'll just browse code for ages
-->



---
---
# IDE extensions as a painkiller
A case study 

<v-clicks depth=2>

 - We started playing a bit around customizing VS Code
   - Task configurations (https://code.visualstudio.com/docs/editor/tasks)
   - Launch configurations (https://code.visualstudio.com/docs/cpp/launch-json-reference)
 - We got pretty far but were still limited
 - Task and launch configurations are pretty static
   - Suitable for 1-2 components. Not 50-100
 - We wanted various quality-of-life improvements
 - We wanted 1-click builds of current component
 - We wanted 1-click debugging
   - Autodetect current component
   - Autodetect shared library paths
   - Automatic upload of component + dependencies to target
   - Automatic debugging invocation

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
# IDE extensions as a painkiller

<v-clicks depth=2>

 - In the mean time, the vendor supplied a VSCode extension themselves
   - Didn't really integrate well in our workflow
   - Closed-source, so we cannot customize

</v-clicks>

<!--
  - There is one thing about standard tools. They are great, but at some point, 
  your development workflow specializes to a point where your tools have to be
  made specialized in-house.
-->

---
---

# Resolving files and paths for launch.json and tasks.json


<h2 v-click>Demo time!</h2>

<br>

<v-clicks>

 - Works well for trivial cases
 - Not flexible enough for more advanced cases
 - More advanced cases needs
   - Task providers
   - Debugger extensions

</v-clicks>

---

# Legacy build systems

<v-clicks>

 - Introducing terribuild
 - Tries to emulate legacy custom build system
 - Configuration based on JSON
 - Command-line based

</v-clicks>

<h2 v-click>Demo: Let's try to integrate it into vs code</h2>

<!--
I had limited time to develop it, so it has all the same quirks as a regular
in-house developed build system
-->

---

# Telemetry and security
The ugly side

<h2 v-click>Telemetry</h2>

<v-clicks>

 - VS Code sends telemetry by default
 - Many extensions also send telemetry
 - Do you know what telemetry is sent?

</v-clicks>

<h2 v-click>Security</h2>

<v-clicks>

 - It is _very_ easy to publish extensions to the VS Code marketplace
 - It is _very_ easy to install new extensions
 - Be careful which extensions you install
 - Maybe run a private extension marketplace & firewall the default

</v-clicks>

---
---
# Closing remarks

<v-clicks>

 - Writing extensions for VS Code is easy and fun
 - I have only tried writing extensions for VS Code
 - Haven't tried many other IDEs (mainly Eclipse and Visual Studio)

</v-clicks>

<!--
 I _hope_ that all IDE developers will provide the documentation and examples
 to the same degree (or better) than the VS Code developers has
 -->

---
layout: center
---

# Thank you