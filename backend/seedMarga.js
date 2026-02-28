const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Level = require('./models/Learning/Level');
const Challenge = require('./models/Learning/Challenge');
const Badge = require('./models/Gamification/Badge');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Clean up existing Learning Data
        try {
            await Level.collection.dropIndex('levelNumber_1');
            console.log('Dropped levelNumber_1 index');
        } catch (e) {
            console.log('Index might not exist or already dropped', e.message);
        }
        await Level.deleteMany({});
        await Challenge.deleteMany({});
        // await Badge.deleteMany({}); // Keep badges for now or clear if needed

        // --- Challenge Creation ---

        // --- Definition of Stacks ---
        const stacks = [
            // Existing
            { id: 'JavaScript', title: 'JS Basics: Variables', desc: 'Start your JS journey.', code: 'function hello() {}', type: 'Algorithm' },
            { id: 'Python', title: 'Python: Syntax', desc: 'Learn indentation.', code: 'def main():\n  pass', type: 'Algorithm' },
            { id: 'React', title: 'React: Components', desc: 'Build your first component.', code: 'const App = () => <div>Hello</div>', type: 'JustCode' },
            { id: 'Java', title: 'Java: Syntax', desc: 'Classes and Objects.', code: 'public class Main {}', type: 'Algorithm' },
            { id: 'C++', title: 'C++: Memory', desc: 'Manual memory management.', code: '#include <iostream>', type: 'Algorithm' },
            { id: 'Go', title: 'Go: Concurrency', desc: 'Channels and Goroutines.', code: 'package main', type: 'Algorithm' },

            // New Languages
            { id: 'C', title: 'C: Pointers', desc: 'The mother of all languages.', code: '#include <stdio.h>\nint main() {}', type: 'Algorithm' },
            { id: 'C#', title: 'C#: Basics', desc: 'Modern object-oriented coding.', code: 'using System;\nclass Program {}', type: 'Algorithm' },
            { id: 'Rust', title: 'Rust: Ownership', desc: 'Memory safety without GC.', code: 'fn main() {}', type: 'Algorithm' },
            { id: 'TypeScript', title: 'TS: Interfaces', desc: 'Typed JavaScript.', code: 'interface User {}', type: 'Algorithm' },
            { id: 'Swift', title: 'Swift: Basics', desc: 'iOS development.', code: 'import UIKit', type: 'Algorithm' },
            { id: 'Kotlin', title: 'Kotlin: Basics', desc: 'Modern Android dev.', code: 'fun main() {}', type: 'Algorithm' },
            { id: 'PHP', title: 'PHP: Scripts', desc: 'Server-side scripting.', code: '<?php echo "Hello"; ?>', type: 'Algorithm' },
            { id: 'Ruby', title: 'Ruby: Syntax', desc: 'Developer happiness.', code: 'puts "Hello"', type: 'Algorithm' },
            { id: 'Lua', title: 'Lua: Scripting', desc: 'Embedded scripting.', code: 'print("Hello")', type: 'Algorithm' },
            { id: 'R', title: 'R: Statistics', desc: 'Data analysis.', code: 'print("Hello")', type: 'Algorithm' },

            // B.Tech / CS Subjects
            { id: 'DBMS', title: 'SQL Basics', desc: 'Database Management Systems.', code: 'SELECT * FROM users;', type: 'Database' },
            { id: 'Computer Networks', title: 'OSI Model', desc: 'Understanding layers.', code: '// Explain the 7 layers', type: 'Quiz' },
            { id: 'Operating Systems', title: 'Process vs Thread', desc: 'Core concepts.', code: '// Difference between Process and Thread', type: 'Quiz' },
            { id: 'DSA', title: 'Linked Lists', desc: 'Data Structures.', code: 'class Node {}', type: 'Algorithm' },
            { id: 'System Design', title: 'Load Balancing', desc: 'Scalable systems.', code: '// Design a load balancer', type: 'Design' },

            // Web / DevOps
            { id: 'HTML/CSS', title: 'HTML5 Structure', desc: 'Web skeleton.', code: '<html></html>', type: 'Frontend' },
            { id: 'Node.js', title: 'Node: Server', desc: 'JS Runtime.', code: 'const http = require("http");', type: 'Backend' },
            { id: 'Git', title: 'Git Basics', desc: 'Version Control.', code: 'git init', type: 'Tool' },
            { id: 'Docker', title: 'Docker Basics', desc: 'Containerization.', code: 'FROM node:14', type: 'DevOps' },
            { id: 'Data Science', title: 'Data Science & AI', desc: 'Python for ML.', code: 'import pandas as pd', type: 'Algorithm' }
        ];

        console.log(`Seeding ${stacks.length} stacks...`);

        // Outer loop removed to fix syntax error

        // --- COMPREHENSIVE COURSE PRE-SETS ---
        const courseContent = {
            'Python': {
                beginner: [
                    { title: "Python Syntax & Indentation", desc: "Clean code structure.", content: "# Python Syntax & Indentation\n\nPython ka syntax dusri languages (jaise C++ ya Java) se bahut alag aur saaf hai. Iska sabse bada feature hai **Indentation**.\n\nPython mein code blocks ko define karne ke liye braces `{}` ka nahi, balki **spaces** ka use kiya jata hai. Agar aapne ek space bhi galat di, toh code error dega.\n\nYe module beginners ko sikhata hai ki kaise clean code likha jata hai jo machine aur insaan dono ko samajh aaye." },
                    { title: "Core Data Types", desc: "Integers, Strings, Booleans.", content: "# Core Data Types\n\nData types programming ki building blocks hain. Is module mein hum explore karte hain:\n\n* **Integers & Floats**: Numbers ke sath kaam karna.\n* **Strings**: Textual data ko handle karna (jaise names ya messages).\n* **Booleans**: Logical decisions (True/False) ke liye base taiyar karna.\n\nAap seekhenge ki Python kaise dynamically types assign karta hai, yaani aapko batane ki zaroorat nahi ki variable kya store karega." },
                    { title: "Operators & Expressions", desc: "Calculations & Logic.", content: "# Operators & Expressions\n\nBina calculations ke koi program nahi chalta. Yahan hum arithmetic operators (+, -, *, /) se lekar comparison operators (==, >, <) tak sab cover karte hain.\n\nAap ye bhi seekhenge ki complex logic kaise banate hain `and`, `or`, aur `not` ka use karke." },
                    { title: "Input & Output (I/O)", desc: "Interaction with User.", content: "# Input & Output (I/O)\n\nEk interactive program wahi hai jo user se baat kare.\n\nHum `print()` function ke advanced features (f-strings, formatting) aur `input()` function ka use karke user se data collect karna seekhte hain. Isse aap real-world applications ka pehla kadam rakhte hain." },
                    { title: "Conditional Statements", desc: "If, Elif, Else.", content: "# Conditional Statements (Decision Making)\n\nDuniya logic par chalti hai. `if`, `elif`, aur `else` ka use karke aap apne program ko \"sochne\" ki power dete hain.\n\nIs module mein hum nested conditions aur logical flow banana seekhte hain taaki code specific conditions par specific kaam kare." },
                    { title: "Loops: For Loops", desc: "Iterating sequences.", content: "# Loops Part 1 - For Loops\n\nRepetitive tasks programming ka dushman hain.\n\n`for` loop ka use karke hum kisi bhi sequence (list, string, range) par iterate karna seekhte hain. Ye module automation ki buniyaad hai, jahan aap 1000 lines ka kaam 3 lines mein karna seekhte hain." },
                    { title: "Loops: While Loops", desc: "Conditional repetition.", content: "# Loops Part 2 - While Loops\n\nJab tak condition true hai, tab tak loop chalta rahega. `while` loops tab use hote hain jab humein pata nahi hota ki kaam kitni baar repeat hoga.\n\nHum isme `break` aur `continue` jaise control statements bhi seekhte hain jo loops ko bich mein rokne ya skip karne mein madad karte hain." },
                    { title: "Lists & Indexing", desc: "Storing multiple items.", content: "# Lists & Indexing\n\nPython Lists bahut powerful hoti hain. Isme aap multiple data types ek sath store kar sakte hain.\n\nHum seekhenge ki list se data nikalna (indexing), uske hisse karna (slicing), aur list mein data add ya remove kaise kiya jata hai." },
                    { title: "String Methods", desc: "Text manipulation.", content: "# String Methods Deep Dive\n\nText data sabse zyada use hota hai. Python strings ke paas in-built powers hoti hain.\n\nHum seekhenge ki kaise text ko upper/lower case karna hai, unwanted spaces hatana hai, text ko split karna hai, aur kisi word ko replace kaise karna hai bina puri string ko rewrite kiye." },
                    { title: "Functions Basics", desc: "Reusable logic.", content: "# Functions Basics\n\n**DRY** (Don't Repeat Yourself) principle programming ka gold rule hai.\n\nFunctions ka use karke hum code ko chote, reusable pieces mein divide karte hain. Aap seekhenge ki function kaise define karna hai, parameters kaise pass karne hain, aur result kaise return karna hai." },
                ],
                intermediate: [
                    { title: "List Comprehensions", desc: "One-line loops.", content: "# List Comprehensions\n\nYe Python ki ek \"cool\" feature hai. Aap 5 lines ke loop ko ek single line mein convert karna seekhte hain. Isse code fast chalta hai aur dikhne mein bhi professional lagta hai." },
                    { title: "Dictionaries & Tuples", desc: "Key-Value & Immutable Data.", content: "# Dictionaries & Tuples\n\nData ko hamesha list mein nahi rakha jata.\n\n* **Dictionaries** humein \"Key-Value\" pair mein data store karne deti hain (jaise phonebook).\n* **Tuples** immutable hote hain, yaani unka data change nahi kiya ja sakta, jo security ke liye zaroori hai." },
                    { title: "Sets & Frozensets", desc: "Unique collections.", content: "# Sets & Frozensets\n\nUnique elements handle karne ke liye Sets ka use hota hai. Agar aapko duplicates hatane hain ya mathematical operations (Union, Intersection) karne hain, toh ye module aapke kaam aayega." },
                    { title: "File Handling", desc: "Reading/Writing files.", content: "# File Handling\n\nReal apps hamesha database ya files ke sath kaam karti hain.\n\nIsme hum seekhte hain ki kaise .txt ya .csv files ko Python se read, write, aur append kiya jata hai. Aap context managers (`with` statement) ka use seekhenge jo file automatically close kar dete hain." },
                    { title: "Modules & Packages", desc: "Importing code.", content: "# Modules & Packages\n\nSab kuch khud likhne ki zaroorat nahi. Python ki ek huge library hai.\n\nHum seekhte hain ki kaise `import` ka use karke dusron ka likha code (`math`, `random`, `os`) apne project mein use karna hai aur khud ke custom modules kaise banane hain." },
                    { title: "Exception Handling", desc: "Error management.", content: "# Exception Handling\n\nProgram crash hona sabse bura experience hai.\n\nHum `try`, `except`, `finally` blocks ka use karke errors (jaise `DivisionByZero` ya `FileNotFoundError`) ko gracefully handle karna seekhte hain taaki app chalti rahe." },
                    { title: "*args and **kwargs", desc: "Variable arguments.", content: "# *args and **kwargs\n\nJab aapko pata na ho ki function mein kitne arguments aayenge, tab ye magic keywords kaam aate hain. Ye advanced function design mein bahut use hote hain, khaas kar frameworks banane mein." },
                    { title: "Lambda Functions", desc: "Anonymous functions.", content: "# Lambda Functions\n\nChote, one-time use ke liye anonymous functions banana. Ye functions bina kisi naam ke hote hain aur `filter()`, `map()` jaise functions ke sath bahut efficiently kaam karte hain." },
                    { title: "Intro to OOP", desc: "Classes & Objects.", content: "# Intro to OOP (Classes & Objects)\n\nObject Oriented Programming Python ki jaan hai. Hum seekhenge ki real-world entities ko code mein kaise badle (jaise ek 'Car' class banana). Attributes aur Methods ka concept yahan clear hota hai." },
                    { title: "Inheritance", desc: "Code reuse.", content: "# Inheritance & Polymorphism\n\nCode reuse ka advanced level. Ek existing class se nayi class banana aur existing functionality ko modify karna. Isse bada code maintain karna easy ho jata hai." },
                ],
                advanced: [
                    { title: "Decorators", desc: "Function wrappers.", content: "# Decorators\n\nDecorators ek function ko wrapper ki tarah lapet dete hain. Iska use logging, authentication, aur timing check karne mein hota hai bina core function ko touch kiye." },
                    { title: "Generators", desc: "Lazy evaluation.", content: "# Generators & Iterators\n\nMemory efficient programming. Jab aapko 1 million records handle karne ho, toh generators `yield` keyword ka use karke ek-ek karke data dete hain, jisse aapki RAM crash nahi hoti." },
                    { title: "Context Managers", desc: "Resource management.", content: "# Context Managers\n\nResources manage karna (Files, DB connections). Aap khud ke custom context managers banana seekhenge jo setup aur teardown logic ko handle karte hain." },
                    { title: "Multithreading", desc: "Parallelism.", content: "# Multithreading vs Multiprocessing\n\nPython mein parallel kaam kaise karein?\n\n* **Threads** ka use I/O tasks ke liye seekhenge.\n* **Processes** ka use heavy calculations ke liye seekhenge taaki program super-fast chale." },
                    { title: "RegEx", desc: "Pattern matching.", content: "# RegEx (Regular Expressions)\n\nString searching ka advanced level. Kisi bhi complex pattern (jaise email validation ya phone number extract karna) ko find karne ke liye RegEx use hota hai." },
                    { title: "API Integration", desc: "Connecting to web.", content: "# API Integration\n\nPython se internet connect karna. `requests` library ka use karke kisi dusre website se data lena aur JSON response ko process karna." },
                    { title: "Virtual Envs", desc: "Dependency isolation.", content: "# Virtual Environments\n\nHar project ki apni duniya hoti hai. `venv` ka use karke dependencies ko isolate karna seekhenge taaki ek project ka version dusre ko kharab na kare." },
                    { title: "Metaclasses", desc: "Class creation.", content: "# Metaclasses\n\nPython mein classes ko bhi control kiya ja sakta hai. Metaclasses wo hoti hain jo classes banati hain. Ye framework developers ke liye bahut powerful tool hai." },
                    { title: "Unit Testing", desc: "Automated testing.", content: "# Unit Testing\n\nPro code wahi hai jo test kiya gaya ho. `unittest` ya `pytest` ka use karke apne code ko automate check karna ki wo har scenario mein sahi kaam kar raha hai ya nahi." },
                    { title: "AsyncIO", desc: "Asynchronous programming.", content: "# Asynchronous Programming (asyncio)\n\nModern web apps ke liye multitasking. `async` aur `await` keywords ka use karke program ko bina ruke wait karwana (jaise file download hote waqt dusra kaam karna)." },
                ],
                finalQuiz: [
                    { question: "Python mein single line comment ke liye kya use hota hai?", options: ["//", "/*", "#", "--"], correctOption: 2, explanation: "# is used for comments." },
                    { question: "Wrapper function create karne ke liye kya use hota hai?", options: ["Generator", "Decorator", "Iterator"], correctOption: 1, explanation: "Decorator." },
                    { question: "Memory efficient iteration ke liye kya best hai?", options: ["List", "Generator", "Tuple"], correctOption: 1, explanation: "Generator uses yield." },
                    { question: "Asynchronous function define karne ke liye keyword?", options: ["async", "await", "defer"], correctOption: 0, explanation: "async def." },
                    { question: "Mutable data type kaunsa hai?", options: ["Tuple", "List", "String", "Int"], correctOption: 1, explanation: "List is mutable." }
                ]
            },
            'HTML/CSS': {
                beginner: [
                    { title: "HTML Structure", desc: "Boilerplate.", content: "# HTML Structure & Boilerplate\n\nLearn the essential skeleton of every web page, including the <!DOCTYPE html>, <html>, <head>, and <body> tags.\n\n[More Info](https://www.geeksforgeeks.org/html-basic-structure/)" },
                    { title: "Text Tags", desc: "Headings/Para.", content: "# Essential Text Tags\n\nMaster the tags that give meaning to content, such as headings (<h1>-<h6>), paragraphs (<p>), and spans (<span>).\n\n[More Info](https://www.geeksforgeeks.org/html-text-formatting/)" },
                    { title: "Lists", desc: "OL/UL/DL.", content: "# Working with Lists\n\nLearn to organize data using ordered (<ol>), unordered (<ul>), and description lists to create menus and structured content.\n\n[More Info](https://www.geeksforgeeks.org/html-lists/)" },
                    { title: "Links & Images", desc: "Navigation.", content: "# Links & Image Integration\n\nUnderstand the anchor tag (<a>) for navigation and the <img> tag for adding visual elements, including the importance of the alt attribute.\n\n[More Info](https://www.geeksforgeeks.org/html-images/)" },
                    { title: "Semantic HTML", desc: "Meaning.", content: "# Semantic HTML\n\nGo beyond <div> and <span>. Learn to use <header>, <footer>, <article>, and <section> to help SEO and accessibility.\n\n[More Info](https://www.geeksforgeeks.org/html-semantic-elements/)" },
                    { title: "CSS Selectors", desc: "Targeting.", content: "# Introduction to CSS Selectors\n\nLearn how to target HTML elements using Tag, Class (.), and ID (#) selectors to apply visual styles.\n\n[More Info](https://www.geeksforgeeks.org/css-selectors/)" },
                    { title: "Colors & Bg", desc: "Visuals.", content: "# Colors & Backgrounds\n\nExplore CSS color values (Hex, RGB, HSL) and how to apply solid colors, gradients, and images as backgrounds.\n\n[More Info](https://www.geeksforgeeks.org/css-backgrounds/)" },
                    { title: "Box Model", desc: "Layout Core.", content: "# The CSS Box Model\n\nThe most important concept in design. Understand Content, Padding, Border, and Margin and how they calculate an element's size.\n\n[More Info](https://www.geeksforgeeks.org/css-box-model/)" },
                    { title: "Typography", desc: "Fonts.", content: "# Web Typography\n\nLearn to control text appearance using font-family, font-size, line-height, and how to import Google Fonts.\n\n[More Info](https://www.geeksforgeeks.org/css-fonts/)" },
                    { title: "Forms", desc: "Input.", content: "# HTML Forms Basics\n\nLearn to build user interaction points with <input>, <textarea>, <button>, and <label> tags.\n\n[More Info](https://www.geeksforgeeks.org/html-forms/)" },
                ],
                intermediate: [
                    { title: "Flexbox", desc: "1D Layout.", content: "# CSS Flexbox\n\nMaster the one-dimensional layout system to align items in rows or columns and distribute space within a container easily.\n\n[More Info](https://www.geeksforgeeks.org/css-flexbox/)" },
                    { title: "Grid Layout", desc: "2D Layout.", content: "# CSS Grid Layout\n\nLearn the powerful two-dimensional layout system to create complex, grid-based designs that were previously impossible.\n\n[More Info](https://www.geeksforgeeks.org/css-grid-layout/)" },
                    { title: "Positioning", desc: "Flow control.", content: "# CSS Positioning\n\nUnderstand how static, relative, absolute, fixed, and sticky positions affect the flow of elements on the screen.\n\n[More Info](https://www.geeksforgeeks.org/css-positioning/)" },
                    { title: "Pseudo-classes", desc: "States.", content: "# Pseudo-classes & Elements\n\nLearn to style elements based on their state (e.g., :hover, :focus) or specific parts (e.g., ::before, ::after).\n\n[More Info](https://www.geeksforgeeks.org/css-pseudo-classes/)" },
                    { title: "Responsiveness", desc: "Media Queries.", content: "# Responsive Design\n\nMake your website look good on all devices using Media Queries allowing you to apply styles based on screen width.\n\n[More Info](https://www.geeksforgeeks.org/responsive-web-design/)" },
                    { title: "CSS Variables", desc: "Custom Props.", content: "# CSS Variables (Custom Properties)\n\nDefine reusable values like colors and spacing in one place and use them throughout your stylesheet.\n\n[More Info](https://www.geeksforgeeks.org/css-variables/)" },
                    { title: "Transitions", desc: "Animation.", content: "# Transitions & Transforms\n\nAdd smooth animations to property changes (like hover effects) and rotate/scale elements.\n\n[More Info](https://www.geeksforgeeks.org/css-transitions/)" },
                    { title: "Specificity", desc: "Resolution.", content: "# Specificity & Cascade\n\nUnderstand the rules that determine which style wins when multiple rules target the same element.\n\n[More Info](https://www.geeksforgeeks.org/css-specificity/)" },
                    { title: "Units", desc: "rem/em/vh.", content: "# CSS Units\n\nDeep dive into relative units like rem, em, vh, and vw versus absolute units like px.\n\n[More Info](https://www.geeksforgeeks.org/css-units/)" },
                    { title: "Shadow DOM", desc: "Encapsulation.", content: "# Shadow DOM & Custom Elements\n\nBrief introduction to web components and style encapsulation.\n\n[More Info](https://www.geeksforgeeks.org/shadow-dom-in-html/)" },
                ],
                advanced: [
                    { title: "Architecture", desc: "BEM.", content: "# CSS Architecture (BEM)\n\nLearn the Block Element Modifier naming convention to write scalable and maintainable CSS.\n\n[More Info](https://www.geeksforgeeks.org/bem-methodology/)" },
                    { title: "SASS/SCSS", desc: "Preprocessor.", content: "# SASS/SCSS\n\nUse a preprocessor to add features like nesting, mixins, and inheritance to CSS.\n\n[More Info](https://www.geeksforgeeks.org/sass-tutorial/)" },
                    { title: "Tailwind", desc: "Utility-first.", content: "# CSS Frameworks (Tailwind)\n\nUnderstand the utility-first approach to styling and how frameworks like Tailwind speed up development.\n\n[More Info](https://www.geeksforgeeks.org/tailwind-css/)" },
                    { title: "Advanced Grid", desc: "Areas.", content: "# Advanced Grid Features\n\nMaster grid-template-areas, minmax(), and auto-fill/auto-fit for robust layouts.\n\n[More Info](https://www.geeksforgeeks.org/css-grid-layout-module/)" },
                    { title: "Accessibility", desc: "A11y.", content: "# Accessibility (A11y)\n\nStyling for screen readers, focus management, and using ARIA attributes correctly.\n\n[More Info](https://www.geeksforgeeks.org/web-accessibility/)" },
                    { title: "Performance", desc: "Rendering.", content: "# CSS Performance\n\nUnderstand the critical rendering path, repaints, reflows, and how to optimize CSS delivery.\n\n[More Info](https://www.geeksforgeeks.org/css-optimization/)" },
                    { title: "Modern CSS", desc: "Layers/Nesting.", content: "# Modern CSS Features\n\nExplore new features like Cascade Layers, Native Nesting, and the :has() selector.\n\n[More Info](https://developer.mozilla.org/en-US/docs/Web/CSS)" },
                    { title: "PostCSS", desc: "Tooling.", content: "# PostCSS & Tooling\n\nUsing tools to autoprefix and transpile modern CSS for older browsers.\n\n[More Info](https://github.com/postcss/postcss)" },
                    { title: "CSS-in-JS", desc: "React Styling.", content: "# CSS-in-JS\n\nIntroduction to styling approaches used in modern frameworks, like Styled Components.\n\n[More Info](https://www.geeksforgeeks.org/css-in-js/)" },
                    { title: "Houdini", desc: "Future.", content: "# CSS Houdini\n\nA glimpse into the future of low-level CSS access and custom painting APIs.\n\n[More Info](https://developer.mozilla.org/en-US/docs/Web/Guide/Houdini)" },
                ],
                finalQuiz: [
                    { question: "HTML boilerplate tag?", options: ["<html>", "<!DOCTYPE html>", "<body>"], correctOption: 1, explanation: "Doctype defines version." },
                    { question: "Space between border and content?", options: ["Margin", "Padding", "Gap"], correctOption: 1, explanation: "Padding." },
                    { question: "Flexbox main axis alignment?", options: ["align-items", "justify-content"], correctOption: 1, explanation: "justify-content." },
                    { question: "Grid 2D system?", options: ["True", "False"], correctOption: 0, explanation: "Grid controls rows and cols." },
                    { question: "ID selector symbol?", options: [".", "#", "*"], correctOption: 1, explanation: "# is for ID." }
                ]
            },
            'React': {
                beginner: [
                    { title: "Intro & JSX", desc: "Syntax.", content: "# Intro to React & JSX\n\nUnderstand why React is used and learn the JSX syntax that allows you to write HTML-like code inside JavaScript.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-introduction/)" },
                    { title: "Components", desc: "Functional.", content: "# Functional Components\n\nLearn the modern way to build React UI by creating small, independent, and reusable functions.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-functional-components/)" },
                    { title: "Props", desc: "Data Flow.", content: "# Props & Data Flow\n\nMaster the concept of \"Properties\" to pass data from a parent component down to a child component.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-props/)" },
                    { title: "useState", desc: "State Hook.", content: "# The useState Hook\n\nLearn how to add \"state\" to your components, allowing them to remember and update data like counters or input values.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-usestate-hook/)" },
                    { title: "Events", desc: "Interaction.", content: "# Handling Events\n\nLearn how to react to user interactions like button clicks, form submissions, and keyboard inputs the React way.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-event-handling/)" },
                    { title: "Conditionals", desc: "Logic.", content: "# Conditional Rendering\n\nRender different UI markup based on state conditions using ternary operators and logical &&.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-conditional-rendering/)" },
                    { title: "Lists & Keys", desc: "Rendering.", content: "# Lists & Keys\n\nRender multiple components from an array of data and understand the importance of unique keys.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-lists-and-keys/)" },
                    { title: "Forms", desc: "Controlled.", content: "# Forms & Controlled Inputs\n\nManage form elements where the React state is the \"single source of truth\".\n\n[More Info](https://www.geeksforgeeks.org/reactjs-forms/)" },
                    { title: "Styling", desc: "CSS modules.", content: "# Styling in React\n\nExplore different ways to style components: CSS stylesheets, CSS Modules, and inline styles.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-css-styling/)" },
                    { title: "Fragments", desc: "Grouping.", content: "# Fragments & Portals\n\nReturn multiple elements without adding extra nodes to the DOM using Fragments.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-fragments/)" },
                ],
                intermediate: [
                    { title: "useEffect", desc: "Side Effects.", content: "# The useEffect Hook\n\nLearn to handle \"side effects\" like fetching data from an API, setting up subscriptions, or manually changing the DOM.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-useeffect-hook/)" },
                    { title: "Context API", desc: "Global State.", content: "# Context API\n\nAvoid \"prop drilling\" by creating a global state that any component can access, regardless of how deep it is in the tree.\n\n[More Info](https://www.geeksforgeeks.org/react-context-api/)" },
                    { title: "Custom Hooks", desc: "Reusability.", content: "# Custom Hooks\n\nLearn to extract component logic into reusable functions, making your code cleaner and easier to maintain.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-custom-hooks/)" },
                    { title: "useReducer", desc: "Complex State.", content: "# useReducer Hook\n\nManage complex state logic closer to Redux pattern but native to React.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-usereducer-hook/)" },
                    { title: "useRef", desc: "References.", content: "# useRef & DOM Access\n\nAccess DOM nodes directly and persist values between renders without causing re-renders.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-useref-hook/)" },
                    { title: "Router", desc: "Navigation.", content: "# React Router\n\nImplement client-side routing to create Single Page Applications (SPAs).\n\n[More Info](https://www.geeksforgeeks.org/reactjs-router-tutorial/)" },
                    { title: "API Calls", desc: "Fetch/Axios.", content: "# API Calls & Data Fetching\n\nBest practices for fetching data using Fetch API or Axios inside useEffect.\n\n[More Info](https://www.geeksforgeeks.org/how-to-fetch-data-from-an-api-in-reactjs/)" },
                    { title: "Optimization", desc: "Memo.", content: "# React.memo & useCallback\n\nPrevent unnecessary re-renders of child components using memoization techniques.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-memo/)" },
                    { title: "Err Boundary", desc: "Safety.", content: "# Error Boundaries\n\nCatch JavaScript errors anywhere in the child component tree and display a fallback UI.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-error-boundaries/)" },
                    { title: "Patterns", desc: "HOCs.", content: "# HOCs & Render Props\n\nUnderstand advanced patterns used in many libraries, even if hooks have replaced them for most use cases.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-higher-order-components/)" },
                ],
                advanced: [
                    { title: "Redux", desc: "State Mgmt.", content: "# Redux & State Management\n\nMaster industrial-grade state management for massive applications where the Context API isn't enough.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-redux-introduction/)" },
                    { title: "Redux Toolkit", desc: "Modern Redux.", content: "# Redux Toolkit (RTK)\n\nThe strictly recommended way to write Redux logic today. It simplifies store setup and reducers.\n\n[More Info](https://redux-toolkit.js.org/)" },
                    { title: "React Query", desc: "Server State.", content: "# React Query (TanStack Query)\n\nManage server state (caching, synchronizing, updating) separately from client state.\n\n[More Info](https://tanstack.com/query/latest)" },
                    { title: "Testing", desc: "Jest/RTL.", content: "# Testing React Apps\n\nWrite unit and integration tests using Jest and React Testing Library.\n\n[More Info](https://www.geeksforgeeks.org/testing-react-app-with-jest-and-react-testing-library/)" },
                    { title: "Performance", desc: "Deep Dive.", content: "# Performance Optimization\n\nLearn about useMemo, virtualization, and code-splitting with React.lazy.\n\n[More Info](https://www.geeksforgeeks.org/reactjs-performance-optimization/)" },
                    { title: "SSR", desc: "Server Side.", content: "# Server Side Rendering (SSR)\n\nUnderstand the concepts of SSR and how it benefits SEO and performance.\n\n[More Info](https://www.geeksforgeeks.org/server-side-rendering-with-reactjs/)" },
                    { title: "Next.js", desc: "Framework.", content: "# Next.js Introduction\n\nThe React Framework for production. Learn about pages, routing, and data fetching methods.\n\n[More Info](https://nextjs.org/)" },
                    { title: "RSC", desc: "Server Comp.", content: "# React Server Components\n\nThe future of React. Render components exclusively on the server to reduce bundle size.\n\n[More Info](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components)" },
                    { title: "Security", desc: "XSS.", content: "# Security in React\n\nPrevent Common vulnerabilities like XSS and learn proper data sanitization.\n\n[More Info](https://www.geeksforgeeks.org/security-in-reactjs/)" },
                    { title: "Deployment", desc: "CI/CD.", content: "# Deployment & CI/CD\n\nDeploy your React app to Vercel or Netlify and set up automated build pipelines.\n\n[More Info](https://www.geeksforgeeks.org/deploying-react-app-to-vercel/)" },
                ],
                finalQuiz: [
                    { question: "JSX stand for?", options: ["JS XML", "Java Syntax Extension", "JSON X"], correctOption: 0, explanation: "JavaScript XML." },
                    { question: "Hook for side effects?", options: ["useState", "useEffect", "useReduce"], correctOption: 1, explanation: "useEffect." },
                    { question: "Pass data to child?", options: ["State", "Props", "Context"], correctOption: 1, explanation: "Props." },
                    { question: "Prevent re-render?", options: ["React.memo", "React.stop", "React.once"], correctOption: 0, explanation: "React.memo." },
                    { question: "Global state tool?", options: ["Redux", "Axios", "Jest"], correctOption: 0, explanation: "Redux." }
                ]
            },
            'JavaScript': {
                beginner: [
                    { title: "Variables (let, const)", desc: "Storing data.", content: "# Variables (let, const, var)\n\nProgramming ka pehla kadam data store karna hai.\n\nIs module mein hum seekhte hain ki modern JavaScript mein `let` aur `const` ka use kyun zaroori hai aur purana `var` ab kyun avoid kiya jata hai. Aap \"Block Scope\" ka concept seekhenge jo code ko bugs se bachata hai." },
                    { title: "Core Data Types", desc: "Strings, Numbers, Booleans.", content: "# Core Data Types\n\nJS ek dynamically typed language hai. Hum primitives (Strings, Numbers, Booleans) se lekar special types jaise `null` aur `undefined` ke beech ka farak samjhenge. Ye building blocks aapko data ko sahi tareeke se handle karna sikhayenge." },
                    { title: "Operators & Expressions", desc: "Arithmetic & Logic.", content: "# Basic Operators & Expressions\n\nArithmetic calculations se lekar logical comparisons tak, operators hi code ko chalate hain.\n\nAap seekhenge ki kaise `+`, `-`, `*`, `/` ke sath-sath `&&` (AND), `||` (OR) aur `!` (NOT) ka use karke complex conditions banayi jati hain." },
                    { title: "Functions Basics", desc: "Reusable code blocks.", content: "# Functions Basics\n\nCode ko chote, reusable blocks mein todna hi asli engineering hai.\n\nHum `function` keyword se lekar modern **Arrow Functions** ka syntax seekhenge. Aap ye bhi samjhenge ki \"Parameters\" aur \"Return values\" kya hoti hain aur unka use code ko clean rakhne mein kaise hota hai." },
                    { title: "Conditional Logic", desc: "If-Else & Switch.", content: "# Conditional Logic (If-Else & Switch)\n\nProgram ko decision-making power dena. Aap seekhenge ki `if`, `else if`, aur `else` ka use karke logic kaise flow karta hai.\n\nSaath hi, hum `switch` statements ko dekhenge jo tab kaam aate hain jab humein ek hi variable ki multiple values check karni ho." },
                    { title: "Loops", desc: "For, While, Do-While.", content: "# Loops (For, While, Do-While)\n\nAgar koi kaam 100 baar karna hai, toh hum 100 baar code nahi likhte. Hum loops ka use karte hain. Is module mein aap array iteration aur repetitive tasks ko automate karne ka sabse fast tareeka seekhenge." },
                    { title: "Arrays & Basic Methods", desc: "Lists of data.", content: "# Arrays & Basic Methods\n\nMultiple values ko ek saath store karna. Hum seekhenge ki arrays kaise bante hain aur basic methods jaise `.push()`, `.pop()`, `.shift()`, aur `.unshift()` ka use karke data ko add ya remove kaise kiya jata hai." },
                    { title: "String Manipulation", desc: "Handling text.", content: "# String Manipulation\n\nWeb par 90% data text hota hai. Aap seekhenge ki strings ko kaise join (concatenate) karna hai, length kaise check karni hai, aur `.substring()` ya `.replace()` jaise methods se text ko customize kaise karna hai." },
                    { title: "User Interaction", desc: "Alert, Prompt, Confirm.", content: "# Interacting with the User\n\nBrowser ke built-in features ka use karke user se input lena. Halaki modern apps mein custom modals hote hain, lekin in basics ko seekhna debugging aur simple testing ke liye bahut zaroori hai." },
                    { title: "DOM Basics", desc: "Selecting elements.", content: "# Basic DOM Selection\n\nDocument Object Model (DOM) JavaScript aur HTML ka milan hai. Aap seekhenge ki `getElementById` aur `querySelector` ka use karke kaise kisi web page ke element ko select kiya jata hai taaki usse badla ja sake." },
                ],
                intermediate: [
                    { title: "Arrow Functions", desc: "Modern syntax & 'this'.", content: "# Arrow Functions & Lexical 'this'\n\nModern JS ka sabse popular feature. Arrow functions na sirf syntax chota karte hain, balki `this` keyword ke behavior ko bhi handle karne mein madad karte hain, jo traditional functions mein complex hota hai." },
                    { title: "Array Methods", desc: "Map, Filter, Reduce.", content: "# Array Methods (Map, Filter, Reduce)\n\nData processing ka asli power. Aap seekhenge ki loop chalaye bina kaise pure array ko transform karna (`map`), specific items nikalna (`filter`), aur pura data calculate karke ek single value banana (`reduce`)." },
                    { title: "Objects & JSON", desc: "Data structures.", content: "# Objects & JSON\n\nReal-world data ko handle karna (jaise user profile). Hum seekhenge ki properties aur methods kaise banaye jate hain, aur **JSON** (JavaScript Object Notation) ka use karke servers se data kaise exchange kiya jata hai." },
                    { title: "DOM Events", desc: "Click, Input, Hover.", content: "# DOM Events\n\nWeb page ko \"zinda\" karna. Aap seekhenge ki jab user button click kare ya mouse move kare, toh JS ko us par kaise react karna chahiye. Isme hum `addEventListener` ka deep dive karenge." },
                    { title: "Timers", desc: "SetTimeout & Interval.", content: "# SetTimeout & SetInterval\n\nTime-based actions. Agar aapko koi message 5 second baad dikhana hai ya clock chalani hai, toh ye functions kaam aate hain. Aap \"Asynchronous execution\" ka pehla taste yahan lenge." },
                    { title: "Template Literals", desc: "String interpolation.", content: "# Template Literals\n\nStrings likhne ka modern tareeka. Backticks (`) ka use karke variables ko string ke andar integrate karna (`${variable}`) aur multi-line strings ko handle karna seekhenge." },
                    { title: "Destructuring", desc: "Unpacking data.", content: "# Destructuring (Arrays & Objects)\n\nData nikalne ka shortcut. Aap seekhenge ki kaise ek hi line mein object ki properties ya array ke items ko variables mein assign kiya jata hai, jo code ko readable banata hai." },
                    { title: "Storage", desc: "Local & Session.", content: "# LocalStorage & SessionStorage\n\nUser ka data browser mein save karna. Isse aap aisi apps bana sakte hain jahan page refresh hone par bhi data (jaise dark mode setting ya login info) gayab na ho." },
                    { title: "Modules", desc: "Import/Export.", content: "# ES6 Modules (Import/Export)\n\nCode ko files mein divide karna. Bade projects mein hum saara code ek file mein nahi rakhte. Aap seekhenge ki ek file se functions ko export karke dusri file mein import kaise kiya jata hai." },
                    { title: "Error Handling", desc: "Try-Catch.", content: "# Error Handling (Try-Catch)\n\nProfessional developers galti hone ka wait nahi karte, wo usse handle karte hain. Aap seekhenge ki `try-catch` ka use karke code crash hone se kaise bachana hai aur meaningful error messages kaise dikhane hain." },
                ],
                advanced: [
                    { title: "Closures", desc: "Function scope.", content: "# Closures\n\nJS ka ek mysterious lekin powerful concept. Aap seekhenge ki kaise ek function apne bahar wale scope ke variables ko \"yaad\" rakhta hai, jo data privacy aur complex logic mein bahut kaam aata hai." },
                    { title: "Prototypal Inheritance", desc: "Object chain.", content: "# Prototypes & Prototypal Inheritance\n\nJS ka core architecture. Aap samjhenge ki JS mein Classes kaise kaam karti hain aur kaise ek object dusre object ki properties inherit karta hai behind-the-scenes." },
                    { title: "Async/Await", desc: "Promises.", content: "# Promises & Async/Await\n\nAPI calls aur long tasks ko handle karna. Aap seekhenge ki \"Callback Hell\" se kaise bacha jaye aur code ko aise kaise likha jaye jo synchronous dikhe lekin asynchronous chale." },
                    { title: "Fetch API", desc: "Networking.", content: "# Fetch API & Working with Servers\n\nReal data ke sath kaam karna. Aap seekhenge ki kaise external servers (APIs) se data fetch karna hai aur usse apni website par render karna hai bina page reload kiye." },
                    { title: "Event Bubbling", desc: "Propagation.", content: "# Event Bubbling & Delegation\n\nEvent handling ka advanced concept. Aap samjhenge ki events DOM tree mein kaise travel karte hain aur kaise ek single parent par listener lagakar multiple children ko handle kiya jata hai." },
                    { title: "'this' Keyword", desc: "Context binding.", content: "# The 'this' Keyword Mastery\n\n`this` keyword programming mein sabse zyada confuse karne wala topic hai. Hum `call()`, `apply()`, aur `bind()` ka use karke seekhenge ki `this` ke context ko manually kaise control kiya jata hai." },
                    { title: "HOFs", desc: "Higher Order Functions.", content: "# Higher Order Functions\n\nWo functions jo dusre functions ko as an argument lete hain ya return karte hain. Ye functional programming ki buniyaad hai aur aapke logic ko next level par le jayegi." },
                    { title: "RegEx", desc: "Pattern matching.", content: "# Regular Expressions (RegEx)\n\nComplex string patterns. User ka email validate karna ho ya phone number format check karna ho, RegEx hi ekmatra solution hai. Is module mein aap patterns banana seekhenge." },
                    { title: "Web Workers", desc: "Background threads.", content: "# Web Workers\n\nHeavy calculations ko background mein chalana. Aap seekhenge ki kaise main thread ko free rakha jaye taaki aapki website calculations karte waqt \"hang\" na ho." },
                    { title: "Performance", desc: "Memory & V8.", content: "# Memory Management & Performance\n\nProfessional code sirf chalna nahi chahiye, wo optimized hona chahiye. Hum seekhenge ki memory leaks kaise pehchane hain aur JS engine (V8) code ko kaise execute karta hai taaki aap ultra-fast apps bana sakein." },
                ],
                finalQuiz: [
                    { question: "JS mein constant variable kaise declare karte hain?", options: ["var", "let", "constant", "const"], correctOption: 3, explanation: "const keyword." },
                    { question: "typeof([]) ka result kya hoga?", options: ["array", "object", "list", "undefined"], correctOption: 1, explanation: "Arrays are objects in JS." },
                    { question: "Strict equality operator kaunsa hai?", options: ["==", "===", "=", "!="], correctOption: 1, explanation: "=== checks type." },
                    { question: "DOM ka full form?", options: ["Document Object Model", "Data Object Main"], correctOption: 0, explanation: "Document Object Model." },
                    { question: "Timer rokne ke liye function?", options: ["stopTimeout", "clearTimer", "clearTimeout"], correctOption: 2, explanation: "clearTimeout()." }
                ]
            },
            'DBMS': {
                beginner: [
                    { title: "Intro to DBMS", desc: "Foundations.", content: "# Intro to DBMS\n\nUnderstand the difference between Data and Information, and why we use DBMS over file systems.\n\n[More Info](https://www.geeksforgeeks.org/introduction-of-dbms/)" },
                    { title: "Architecture", desc: "2-Tier/3-Tier.", content: "# DBMS Architecture\n\nLearn how users, application servers, and the database engine connect in 2-Tier and 3-Tier architectures.\n\n[More Info](https://www.geeksforgeeks.org/dbms-architecture-2-tier-and-3-tier/)" },
                    { title: "Data Independence", desc: "Abstraction.", content: "# Data Independence\n\nUnderstand Physical and Logical data independence to modify schema levels without affecting others.\n\n[More Info](https://www.geeksforgeeks.org/data-independence-in-dbms/)" },
                    { title: "ER Model", desc: "Blueprints.", content: "# The ER Model\n\nDesign database blueprints using Entities, Attributes, and Relationships.\n\n[More Info](https://www.geeksforgeeks.org/introduction-of-er-model/)" },
                    { title: "Relational Model", desc: "Tables/Rows.", content: "# Relational Model Concepts\n\nUnderstand Relations (Tables), Tuples (Rows), and Attributes (Columns) structurally.\n\n[More Info](https://www.geeksforgeeks.org/relational-model-in-dbms/)" },
                    { title: "Keys", desc: "Identification.", content: "# Understanding Keys\n\nMaster Primary, Candidate, Super, and Foreign keys to uniquely identify records.\n\n[More Info](https://www.geeksforgeeks.org/keys-in-dbms/)" },
                    { title: "SQL Basics", desc: "DDL/DML.", content: "# SQL Introduction\n\nOverview of SQL sub-languages: Data Definition (DDL) and Data Manipulation (DML).\n\n[More Info](https://www.geeksforgeeks.org/sql-tutorial/)" },
                    { title: "SELECT & WHERE", desc: "Filtering.", content: "# Basic SELECT & WHERE\n\nLearn to fetch specific data points using filtering logic and conditions.\n\n[More Info](https://www.geeksforgeeks.org/sql-select-statement/)" },
                    { title: "Aggregates", desc: "Math ops.", content: "# Aggregate Functions\n\nPerform calculations on multiple rows using SUM, AVG, COUNT, MAX, and MIN.\n\n[More Info](https://www.geeksforgeeks.org/aggregate-functions-in-sql/)" },
                    { title: "Constraints", desc: "Rules.", content: "# Integrity Constraints\n\nEnforce rules like NOT NULL, UNIQUE, and CHECK to maintain data quality.\n\n[More Info](https://www.geeksforgeeks.org/integrity-constraints-in-dbms/)" },
                ],
                intermediate: [
                    { title: "JOINS", desc: "Combining tables.", content: "# JOINS\n\nInner, Left, Right..." },
                    { title: "Aggregates", desc: "SUM, AVG.", content: "# Aggregates\n\nMath on columns..." },
                    { title: "GROUP BY", desc: "Clustering.", content: "# Grouping\n\nSummarizing..." },
                    { title: "Foreign Keys", desc: "Relations.", content: "# FK\n\nLinking tables..." },
                    { title: "Normalization", desc: "1NF, 2NF.", content: "# Normalization\n\nReducing redundancy..." },
                    { title: "Constraints", desc: "Rules.", content: "# Constraints\n\nUnique, Not Null..." },
                    { title: "Subqueries", desc: "Nested queries.", content: "# Subqueries\n\nQuery within query..." },
                    { title: "Views", desc: "Virtual tables.", content: "# Views\n\nSaved queries..." },
                    { title: "Indexes", desc: "Performance.", content: "# Indexing\n\nSpeeding up..." },
                    { title: "Transactions", desc: "ACID.", content: "# Transactions\n\nAll or nothing..." },
                ],
                advanced: [
                    { title: "ACID", desc: "Properties.", content: "# ACID\n\nAtomicity..." },
                    { title: "Procedures", desc: "Saved code.", content: "# Stored Procs\n\nFunctions in DB..." },
                    { title: "Triggers", desc: "Auto-execution.", content: "# Triggers\n\nEvent listeners..." },
                    { title: "Sharding", desc: "Scaling.", content: "# Sharding\n\nHorizontal partition..." },
                    { title: "Replication", desc: "Copies.", content: "# Replication\n\nHigh availability..." },
                    { title: "Optimization", desc: "Query Plans.", content: "# Optimization\n\nAnalyzing queries..." },
                    { title: "Deadlocks", desc: "Concurrency issues.", content: "# Deadlocks\n\nStuck transactions..." },
                    { title: "NoSQL", desc: "MongoDB.", content: "# NoSQL\n\nDocuments..." },
                    { title: "Warehousing", desc: "OLAP.", content: "# Warehousing\n\nBig data..." },
                    { title: "Backup", desc: "Recovery.", content: "# Disaster Recovery\n\nBackups..." },
                ],
                finalQuiz: [
                    { question: "Unique records identify karne ke liye kya use hota hai?", options: ["Foreign Key", "Primary Key", "Local Key"], correctOption: 1, explanation: "Primary Key." },
                    { question: "Do tables ko combine karne ki command?", options: ["MERGE", "JOIN", "CONNECT", "ADD"], correctOption: 1, explanation: "JOIN operation." },
                    { question: "SQL mein pattern matching ke liye operator?", options: ["AS", "LIKE", "MATCH", "SAME"], correctOption: 1, explanation: "LIKE operator." },
                    { question: "Rows count karne ka function?", options: ["ADD()", "COUNT()", "SUM()", "TOTAL()"], correctOption: 1, explanation: "COUNT()." },
                    { question: "Database schema delete karne ki command?", options: ["REMOVE", "DELETE", "DROP", "CLEAR"], correctOption: 2, explanation: "DROP command." },
                    { question: "Duplicates remove karne ke liye keyword?", options: ["UNIQUE", "DISTINCT", "SINGLE", "ONLY"], correctOption: 1, explanation: "DISTINCT." },
                    { question: "MongoDB kis type ka database hai?", options: ["Relational", "NoSQL", "Hierarchical"], correctOption: 1, explanation: "NoSQL/Document." },
                    { question: "C in ACID stands for?", options: ["Consistency", "Control", "Command", "Copy"], correctOption: 0, explanation: "Consistency." },
                    { question: "Foreign Key ka use?", options: ["Security", "Table Relation", "Speed"], correctOption: 1, explanation: "Relation." },
                    { question: "Data update command?", options: ["CHANGE", "MODIFY", "UPDATE", "SET"], correctOption: 2, explanation: "UPDATE." }
                ]
            },
            'Node.js': {
                beginner: [
                    { title: "Intro vs V8", desc: "Runtime.", content: "# Node.js & V8\n\nUnderstand how Node.js is a JavaScript runtime built on Chrome's V8 engine, not a language itself.\n\n[More Info](https://www.geeksforgeeks.org/introduction-to-node-js/)" },
                    { title: "NPM", desc: "Packages.", content: "# Node Package Manager (NPM)\n\nLearn to initialize projects (`npm init`) and manage dependencies (`npm install`) to power your apps.\n\n[More Info](https://www.geeksforgeeks.org/node-js-npm-node-package-manager/)" },
                    { title: "Modules", desc: "Imports.", content: "# Module System\n\nMaster `require` (CommonJS) and `import` (ES Modules) to connect your files and share code.\n\n[More Info](https://www.geeksforgeeks.org/node-js-modules/)" },
                    { title: "File System", desc: "fs modules.", content: "# File System (fs)\n\nRead, write, update, and delete files on your server using the `fs` core module.\n\n[More Info](https://www.geeksforgeeks.org/node-js-file-system/)" },
                    { title: "HTTP Server", desc: "Web basics.", content: "# Creating HTTP Server\n\nLaunch your first web server using the `http` module and handle basic requests.\n\n[More Info](https://www.geeksforgeeks.org/node-js-http-module/)" },
                    { title: "Async/Callbacks", desc: "Non-blocking.", content: "# Asynchronous Programming\n\nUnderstand the callback pattern and how Node.js handles heavy tasks without blocking the main thread.\n\n[More Info](https://www.geeksforgeeks.org/nodejs-asynchronous-programming/)" },
                    { title: "Events", desc: "Emitter.", content: "# Events & EventEmitter\n\nNode.js is event-driven. Learn to emit and listen for custom events to de-couple your logic.\n\n[More Info](https://www.geeksforgeeks.org/node-js-eventemitter/)" },
                    { title: "Buffers", desc: "Binary data.", content: "# Buffers & Streams Basics\n\nHandle raw binary data and learn why Buffers are essential for files and networks.\n\n[More Info](https://www.geeksforgeeks.org/node-js-buffers/)" },
                    { title: "Path Module", desc: "File paths.", content: "# Path Module\n\nManipulate file paths safely across different operating systems (Windows vs Linux).\n\n[More Info](https://www.geeksforgeeks.org/node-js-path-module/)" },
                    { title: "Debugging", desc: "Console.", content: "# Debugging Node.js\n\nGo beyond `console.log` and learn to use the built-in debugger and VS Code inspector.\n\n[More Info](https://nodejs.org/en/docs/guides/debugging-getting-started/)" },
                ],
                intermediate: [
                    { title: "Express Intro", desc: "Framework.", content: "# Express Framework\n\nThe standard web framework for Node.js. Simplify routing and server creation dramatically.\n\n[More Info](https://www.geeksforgeeks.org/express-js/)" },
                    { title: "Middleware", desc: "Interceptors.", content: "# Middleware Concepts\n\nFunctions that run between the request and response. Essential for auth, logging, and parsing.\n\n[More Info](https://www.geeksforgeeks.org/middleware-in-express-js/)" },
                    { title: "REST API", desc: "Architecture.", content: "# REST API Design\n\nBuild standard APIs using GET, POST, PUT, DELETE methods and status codes.\n\n[More Info](https://www.geeksforgeeks.org/rest-api-introduction/)" },
                    { title: "MongoDB+Mongoose", desc: "Database.", content: "# MongoDB & Mongoose\n\nConnect to a NoSQL database and model your data using Schemas.\n\n[More Info](https://www.geeksforgeeks.org/mongoose-introduction/)" },
                    { title: "Authentication", desc: "JWT.", content: "# JWT Authentication\n\nSecure your APIs using JSON Web Tokens (Stateless Auth).\n\n[More Info](https://www.geeksforgeeks.org/json-web-token-jwt/)" },
                    { title: "Error Handling", desc: "Try-Catch.", content: "# error Handling\n\nCentralized error handling in Express to prevent app crashes.\n\n[More Info](https://www.geeksforgeeks.org/error-handling-in-express/)" },
                    { title: "File Uploads", desc: "Multer.", content: "# File Uploads\n\nHandle multipart/form-data to allow users to upload images and files.\n\n[More Info](https://www.geeksforgeeks.org/multer-nodejs/)" },
                    { title: "Template Engines", desc: "EJS.", content: "# Template Engines (EJS)\n\nRender dynamic HTML pages on the server side using data.\n\n[More Info](https://www.geeksforgeeks.org/using-ejs-with-express/)" },
                    { title: "Environment Vars", desc: "Dotenv.", content: "# Environment Variables\n\nKeep secrets (API keys, DB URIs) safe using `.env` files and the `dotenv` package.\n\n[More Info](https://www.geeksforgeeks.org/node-js-dotenv/)" },
                    { title: "Deployment", desc: "PM2.", content: "# Deployment Basics\n\nPrepare your app for production using a process manager like PM2.\n\n[More Info](https://www.geeksforgeeks.org/introduction-to-pm2/)" },
                ],
                advanced: [
                    { title: "Advanced Streams", desc: "Piping.", content: "# Advanced Streams\n\nMaster `pipe()` to process massive files efficiently without loading them into memory.\n\n[More Info](https://nodejs.org/api/stream.html)" },
                    { title: "Child Processes", desc: "Spawn/Exec.", content: "# Child Processes\n\nRun system commands or other scripts from within your Node app.\n\n[More Info](https://www.geeksforgeeks.org/node-js-child-process/)" },
                    { title: "Clustering", desc: "Scaling.", content: "# Clustering & Scaling\n\nScale your single-threaded app across multiple CPU cores.\n\n[More Info](https://www.geeksforgeeks.org/node-js-cluster/)" },
                    { title: "Worker Threads", desc: "CPU bound.", content: "# Worker Threads\n\nHandle CPU-intensive tasks via threads to avoid blocking the Event Loop.\n\n[More Info](https://nodejs.org/api/worker_threads.html)" },
                    { title: "Microservices", desc: "Architecture.", content: "# Microservices Architecture\n\nBreak a monolith into smaller, communicating services.\n\n[More Info](https://www.geeksforgeeks.org/microservices-architecture/)" },
                    { title: "Redis Caching", desc: "Performance.", content: "# Redis Caching\n\nSpeed up responses by caching data in-memory.\n\n[More Info](https://redis.io/docs/clients/nodejs/)" },
                    { title: "WebSockets", desc: "Real-time.", content: "# WebSockets (Socket.io)\n\nEnable bi-directional real-time communication for chat apps.\n\n[More Info](https://socket.io/docs/v4/)" },
                    { title: "Testing", desc: "Jest.", content: "# Automated Testing\n\nWrite Unit and Integration tests using Jest and Supertest.\n\n[More Info](https://jestjs.io/)" },
                    { title: "GraphQL", desc: "Query Lang.", content: "# GraphQL Basics\n\nAn alternative to REST for more flexible data fetching.\n\n[More Info](https://graphql.org/)" },
                    { title: "Security", desc: "Best Practices.", content: "# Node.js Security\n\nHelmet, Rate Limiting, and XSS protection strategies.\n\n[More Info](https://www.geeksforgeeks.org/node-js-security-best-practices/)" },
                ],
                finalQuiz: [
                    { question: "Node.js uses which engine?", options: ["SpiderMonkey", "V8", "Chakra"], correctOption: 1, explanation: "Google's V8 Engine." },
                    { question: "Default package manager?", options: ["yarn", "npm", "pip"], correctOption: 1, explanation: "NPM is default." },
                    { question: "Event Loop is?", options: ["Multi-threaded", "Single-threaded"], correctOption: 1, explanation: "Single-threaded." },
                    { question: "To import modules in ES6?", options: ["require", "import", "include"], correctOption: 1, explanation: "import statement." },
                    { question: "Core module for files?", options: ["disk", "fs", "file"], correctOption: 1, explanation: "fs module." }
                ]
            },
            'Git': {
                beginner: [
                    { title: "Intro & Install", desc: "Setup.", content: "# What is Git?\n\nDistributed version control system. Install git and configure your user.name and user.email.\n\n[More Info](https://www.geeksforgeeks.org/introduction-to-git/)" },
                    { title: "Init Repo", desc: "git init.", content: "# Initializing Repositories\n\nTurn a folder into a Git repo using `git init` or clone an existing one.\n\n[More Info](https://www.geeksforgeeks.org/git-init-command/)" },
                    { title: "Stage & Commit", desc: "Workflow.", content: "# Staging & Committing\n\nThe core workflow: `git add` to stage, and `git commit` to save history.\n\n[More Info](https://www.geeksforgeeks.org/git-add-and-git-commit/)" },
                    { title: "Status & Log", desc: "History.", content: "# Status & Log\n\nCheck what's changed (`git status`) and view project history (`git log`).\n\n[More Info](https://www.geeksforgeeks.org/git-status-and-git-log/)" },
                    { title: "Branching", desc: "Parallel work.", content: "# Branching Basics\n\nCreate isolated environments for new features using `git branch`.\n\n[More Info](https://www.geeksforgeeks.org/git-branching-and-merging/)" },
                    { title: "Checkout", desc: "Switching.", content: "# Checkout & Switch\n\nMove between branches using `git checkout` or `git switch`.\n\n[More Info](https://www.geeksforgeeks.org/git-checkout-command/)" },
                    { title: "Deleting Branches", desc: "Cleanup.", content: "# Deleting Branches\n\nRemove old feature branches to keep your workspace clean (`git branch -d`).\n\n[More Info](https://www.geeksforgeeks.org/how-to-delete-local-and-remote-git-branches/)" },
                    { title: "Renaming/Moving", desc: "File ops.", content: "# Moving & Renaming\n\nLet Git know you moved a file using `git mv` so history is preserved.\n\n[More Info](https://git-scm.com/docs/git-mv)" },
                    { title: "Ignoring Files", desc: ".gitignore.", content: "# .gitignore\n\nPrevent generated files (like node_modules) from being tracked.\n\n[More Info](https://www.geeksforgeeks.org/working-with-gitignore-file/)" },
                    { title: "Undoing", desc: "Basic revert.", content: "# Basic Undoing\n\nUnstage files or discard local changes using `git restore`.\n\n[More Info](https://git-scm.com/docs/git-restore)" },
                ],
                intermediate: [
                    { title: "Merging", desc: "Combine.", content: "# Merging Branches\n\nBring changes from a feature branch into main using `git merge`.\n\n[More Info](https://www.geeksforgeeks.org/git-merge/)" },
                    { title: "Conflicts", desc: "Resolving.", content: "# Resolving Conflicts\n\nHandle situations where two branches modify the same line of code.\n\n[More Info](https://www.geeksforgeeks.org/resolving-merge-conflicts-in-git/)" },
                    { title: "Remotes", desc: "Push/Pull.", content: "# Remote Repositories\n\nConnect to GitHub/GitLab. `git push` to upload, `git pull` to download.\n\n[More Info](https://www.geeksforgeeks.org/git-push-and-pull-commands/)" },
                    { title: "Fetch vs Pull", desc: "Sync.", content: "# Fetch vs Pull\n\nUnderstand that Pull is just Fetch + Merge. Fetch updates references safely.\n\n[More Info](https://www.geeksforgeeks.org/difference-between-git-fetch-and-git-pull/)" },
                    { title: "Cloning", desc: "Copying.", content: "# Cloning\n\nDownload a complete repository from a URL to your local machine.\n\n[More Info](https://www.geeksforgeeks.org/git-clone/)" },
                    { title: "Tags", desc: "Versioning.", content: "# Git Tags\n\nMark specific points in history as important (e.g., v1.0.0).\n\n[More Info](https://www.geeksforgeeks.org/tagging-in-git/)" },
                    { title: "Stashing", desc: "Temporary save.", content: "# Stashing\n\nSave uncommitted changes temporarily (`git stash`) to switch branches cleanly.\n\n[More Info](https://www.geeksforgeeks.org/git-stash/)" },
                    { title: "Reset", desc: "Moving HEAD.", content: "# Git Reset\n\nSoft, Mixed, and Hard resets. Rewriting local history.\n\n[More Info](https://www.geeksforgeeks.org/git-reset-command/)" },
                    { title: "Revert", desc: "Safe undo.", content: "# Git Revert\n\nCreate a new commit that undoes a previous commit (safe for public history).\n\n[More Info](https://www.geeksforgeeks.org/git-revert/)" },
                    { title: "Diff", desc: "Comparison.", content: "# Git Diff\n\nSee exactly what changed line-by-line between commits or working directory.\n\n[More Info](https://www.geeksforgeeks.org/git-diff/)" },
                ],
                advanced: [
                    { title: "Rebase", desc: "Linear history.", content: "# Rebase\n\nRe-apply commits on top of another base tip using `git rebase`.\n\n[More Info](https://www.geeksforgeeks.org/git-rebase/)" },
                    { title: "Cherry Pick", desc: "Select commits.", content: "# Cherry Picking\n\nPick a specific commit from one branch and apply it to another.\n\n[More Info](https://www.geeksforgeeks.org/cherry-pick-git/)" },
                    { title: "Reflog", desc: "Recovery.", content: "# Reflog\n\nThe safety net. Find lost commits even after hard resets.\n\n[More Info](https://www.geeksforgeeks.org/git-reflog/)" },
                    { title: "Submodules", desc: "Nested repos.", content: "# Submodules\n\nKeep a git repository as a subdirectory of another git repository.\n\n[More Info](https://www.geeksforgeeks.org/git-submodules/)" },
                    { title: "Hooks", desc: "Automation.", content: "# Git Hooks (Husky)\n\nRun scripts automatically before committing or pushing (e.g., linting).\n\n[More Info](https://www.geeksforgeeks.org/git-hooks/)" },
                    { title: "Blame/Bisect", desc: "Debugging.", content: "# Blame & Bisect\n\nFind who wrote a line (`blame`) or find the commit that introduced a bug (`bisect`).\n\n[More Info](https://git-scm.com/docs/git-bisect)" },
                    { title: "Workflows", desc: "Strategies.", content: "# Git Workflows\n\nGitflow vs Trunk-Based Development strategies for teams.\n\n[More Info](https://www.geeksforgeeks.org/introduction-git-workflow/)" },
                    { title: "Squashing", desc: "Clean history.", content: "# Squashing Commits\n\nCombine multiple small commits into one clean commit before merging.\n\n[More Info](https://www.geeksforgeeks.org/squashing-commits-git/)" },
                    { title: "GitHub Actions", desc: "CI/CD.", content: "# GitHub Actions\n\nAutomate your build, test, and deployment pipeline directly from Git.\n\n[More Info](https://docs.github.com/en/actions)" },
                    { title: "Aliases", desc: "Shortcuts.", content: "# Advanced Config & Aliases\n\nSpeed up your workflow by creating custom shortcuts for complex commands.\n\n[More Info](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)" },
                ],
                finalQuiz: [
                    { question: "Repo initialize command?", options: ["git start", "git init", "git new"], correctOption: 1, explanation: "git init." },
                    { question: "Stage changes command?", options: ["git add", "git stage", "git push"], correctOption: 0, explanation: "git add." },
                    { question: "Check history?", options: ["git history", "git log", "git past"], correctOption: 1, explanation: "git log." },
                    { question: "Save changes permanently?", options: ["git save", "git commit", "git store"], correctOption: 1, explanation: "git commit." },
                    { question: "Branch create command?", options: ["git branch", "git checkout", "git new"], correctOption: 0, explanation: "git branch <name>." }
                ]
            },
            'Docker': {
                beginner: [
                    { title: "Intro vs VMs", desc: "Containers.", content: "# Intro to Docker\n\nUnderstand how Docker containers differ from Virtual Machines (VMs). Containers share the host OS kernel, making them lightweight.\n\n[More Info](https://www.geeksforgeeks.org/introduction-to-docker/)" },
                    { title: "Architecture", desc: "Daemon.", content: "# Docker Architecture\n\nLearn about the Client-Server model: Docker Daemon, Client, and Registries.\n\n[More Info](https://www.geeksforgeeks.org/docker-architecture/)" },
                    { title: "Installation", desc: "Setup.", content: "# Installing Docker\n\nSetup Docker Desktop or CLI on Windows, Mac, or Linux (Ubuntu).\n\n[More Info](https://www.geeksforgeeks.org/how-to-install-docker-on-linux-windows-and-macos/)" },
                    { title: "Images & Layers", desc: "Blueprints.", content: "# Docker Images\n\nUnderstand read-only templates and how caching layers works to speed up builds.\n\n[More Info](https://www.geeksforgeeks.org/docker-images/)" },
                    { title: "Running Containers", desc: "docker run.", content: "# Running First Container\n\nExecute `docker run` to pull an image from Hub and start a container instance.\n\n[More Info](https://www.geeksforgeeks.org/docker-hello-world/)" },
                    { title: "Lifecycle", desc: "Start/Stop.", content: "# Container Lifecycle\n\nManage states: Start, Stop, Restart, Pause, and Kill containers.\n\n[More Info](https://www.geeksforgeeks.org/docker-container-lifecycle/)" },
                    { title: "Interactive Shell", desc: "Exec.", content: "# Interactive Mode\n\nUse `docker exec -it <id> bash` to enter a running container's terminal.\n\n[More Info](https://www.geeksforgeeks.org/how-to-run-commands-inside-a-docker-container/)" },
                    { title: "Port Mapping", desc: "Networking.", content: "# Port Mapping\n\nExpose container ports to the host using `-p 8080:80`.\n\n[More Info](https://www.geeksforgeeks.org/docker-port-mapping/)" },
                    { title: "Registries", desc: "Hub.", content: "# Docker Search & Pull\n\nFind official images on Docker Hub and understand version tags.\n\n[More Info](https://www.geeksforgeeks.org/docker-search-command/)" },
                    { title: "Cleanup", desc: "Prune.", content: "# System Prune\n\nClean up unused containers, networks, and images to free up disk space.\n\n[More Info](https://www.geeksforgeeks.org/docker-listing-containers-and-images/)" },
                ],
                intermediate: [
                    { title: "Dockerfile", desc: "Building.", content: "# Dockerfile Basics\n\nWrite a `Dockerfile` using FROM, RUN, CMD to define your app's environment.\n\n[More Info](https://www.geeksforgeeks.org/how-to-write-a-dockerfile/)" },
                    { title: "Build Command", desc: "Tags.", content: "# Building Images\n\nUse `docker build -t <name> .` to create custom images from your Dockerfile.\n\n[More Info](https://www.geeksforgeeks.org/docker-build-command/)" },
                    { title: "Volumes", desc: "Persistence.", content: "# Data Volumes\n\nPersist data outside the container lifecycle using Volumes and Bind Mounts.\n\n[More Info](https://www.geeksforgeeks.org/docker-volumes/)" },
                    { title: "Networking", desc: "Bridge.", content: "# Docker Networking\n\nConnect containers using Bridge network to allow internal communication.\n\n[More Info](https://www.geeksforgeeks.org/docker-networking/)" },
                    { title: "Docker Compose", desc: "Multi-container.", content: "# Docker Compose\n\nDefine and run multi-container applications (e.g., App + DB) using `docker-compose.yml`.\n\n[More Info](https://www.geeksforgeeks.org/docker-compose/)" },
                    { title: "Env Variables", desc: "Config.", content: "# Environment Variables\n\nInject configuration settings (API Keys, DB URLs) at runtime.\n\n[More Info](https://www.geeksforgeeks.org/how-to-pass-environment-variables-to-docker-containers/)" },
                    { title: "Logs", desc: "Debugging.", content: "# Docker Logs\n\nMonitor container output streams using `docker logs -f`.\n\n[More Info](https://www.geeksforgeeks.org/docker-logs-command/)" },
                    { title: ".dockerignore", desc: "Exclusions.", content: "# .dockerignore\n\nPrevent unnecessary files (node_modules, .git) from bloating the build context.\n\n[More Info](https://www.geeksforgeeks.org/docker-ignore-file/)" },
                    { title: "Resource Limits", desc: "CPU/RAM.", content: "# Resource Constraints\n\nLimit CPU and Memory usage for containers to protect the host.\n\n[More Info](https://www.geeksforgeeks.org/docker-resource-limits/)" },
                    { title: "Pushing", desc: "Distribution.", content: "# Push to Hub\n\nUpload your custom images to Docker Hub registry to share with others.\n\n[More Info](https://www.geeksforgeeks.org/how-to-push-docker-image-to-docker-hub/)" },
                ],
                advanced: [
                    { title: "Multi-stage", desc: " Optimization.", content: "# Multi-stage Builds\n\nMinimize image size by separating build and runtime environments.\n\n[More Info](https://docs.docker.com/build/building/multi-stage/)" },
                    { title: "Swarm Basics", desc: "Orchestration.", content: "# Docker Swarm\n\nTurn a pool of Docker hosts into a single virtual server for clustering.\n\n[More Info](https://www.geeksforgeeks.org/introduction-to-docker-swarm/)" },
                    { title: "Security", desc: "Hardening.", content: "# Security Best Practices\n\nRun as non-root, scan for vulnerabilities, and minimize attack surface.\n\n[More Info](https://www.geeksforgeeks.org/docker-security-best-practices/)" },
                    { title: "Overlays", desc: "Cluster Net.", content: "# Overlay Networks\n\nEnable communication between containers across different Swarm nodes.\n\n[More Info](https://docs.docker.com/network/drivers/overlay/)" },
                    { title: "Monitoring", desc: "Prometheus.", content: "# Monitoring Containers\n\nUse tools like Prometheus and Grafana to track container metrics.\n\n[More Info](https://www.geeksforgeeks.org/docker-monitoring-tools/)" },
                    { title: "CI/CD", desc: "Automation.", content: "# CI/CD Integration\n\nAutomate build and deployment pipelines using GitHub Actions or Jenkins.\n\n[More Info](https://www.geeksforgeeks.org/continuous-integration-with-docker/)" },
                    { title: "K8s Intro", desc: "Orchestration.", content: "# Intro to Kubernetes\n\nUnderstand how K8s scales Docker containers in enterprise environments.\n\n[More Info](https://www.geeksforgeeks.org/difference-between-docker-and-kubernetes/)" },
                    { title: "Secrets", desc: "Protection.", content: "# Managing Secrets\n\nSecurely handle sensitive data like passwords without exposing them in enviroment variables.\n\n[More Info](https://docs.docker.com/engine/swarm/secrets/)" },
                    { title: "Cache Ops", desc: "Speed.", content: "# Optimizing Build Cache\n\nStructure Dockerfiles to maximize layer caching and speed up builds.\n\n[More Info](https://docs.docker.com/build/cache/)" },
                    { title: "Enterprise", desc: "Patterns.", content: "# Enterprise Patterns\n\nLoad balancing, health checks, and self-healing infrastructure.\n\n[More Info](https://www.geeksforgeeks.org/docker-enterprise-edition/)" },
                ],
                finalQuiz: [
                    { question: "Virtual Machine aur Docker mein kya farak hai?", options: ["VM OS share karta hai", "Docker OS kernel share karta hai", "Dono same hain"], correctOption: 1, explanation: "Containers share Host Kernel." },
                    { question: "Image build karne ki command?", options: ["docker create", "docker build", "docker make"], correctOption: 1, explanation: "docker build -t." },
                    { question: "Running container mein enter karne ke liye?", options: ["docker enter", "docker exec -it", "docker inside"], correctOption: 1, explanation: "docker exec -it." },
                    { question: "Data persist karne ke liye kya use hota hai?", options: ["Images", "Volumes", "Networks"], correctOption: 1, explanation: "Docker Volumes." },
                    { question: "Unused objects clean karne ki command?", options: ["docker clean", "docker delete", "docker system prune"], correctOption: 2, explanation: "docker system prune." }
                ]
            },
            'C++': {
                beginner: [
                    { title: "Intro", desc: "History & Compilation.", content: "# C++ Intro\n\nIntroduction to C++ and how compilation works (Preprocessing, Compiling, Linking)..." },
                    { title: "Variables & Types", desc: "Data storage.", content: "# Variables & Types\n\nint, float, double, char, bool, and const..." },
                    { title: "I/O Streams", desc: "cin & cout.", content: "# I/O Streams\n\nUsing <iostream>, std::cout, and std::cin..." },
                    { title: "Control Flow", desc: "If/Else.", content: "# Control Flow\n\nConditional logic using if, else if, else, and switch..." },
                    { title: "Loops", desc: "Iteration.", content: "# Loops\n\nFor, while, and do-while loops..." },
                    { title: "Functions", desc: "Modular code.", content: "# Functions\n\nDefining functions, parameters, and return types..." },
                    { title: "Arrays & Strings", desc: "Collections.", content: "# Arrays & Strings\n\n1D/2D arrays and std::string..." },
                    { title: "Operators", desc: "Math & Logic.", content: "# Operators\n\nArithmetic, relational, logical, and bitwise..." },
                    { title: "Pointers Intro", desc: "Memory addresses.", content: "# Pointers\n\nIntroduction to pointers, &, and * operators..." },
                    { title: "Scope", desc: "Variable lifetime.", content: "# Scope\n\nLocal, global, and static variables..." },
                ],
                intermediate: [
                    { title: "Memory Mgmt", desc: "New/Delete.", content: "# Dynamic Memory\n\nUsing new and delete for heap allocation..." },
                    { title: "Structs & Unions", desc: "Data groups.", content: "# Structs & Unions\n\nGrouping data types..." },
                    { title: "Classes & Objects", desc: "OOP Basics.", content: "# Classes & Objects\n\nBlueprints and instances..." },
                    { title: "Constructors", desc: "Lifecycle.", content: "# Constructors\n\nDefault, parameterized, copy constructors, and destructors..." },
                    { title: "Encapsulation", desc: "Access control.", content: "# Encapsulation\n\nPublic, private, protected, and getters/setters..." },
                    { title: "Overloading", desc: "Polymorphism.", content: "# Overloading\n\nFunction and operator overloading..." },
                    { title: "References", desc: "Aliases.", content: "# References\n\nPass by reference vs pass by value..." },
                    { title: "File Handling", desc: "fstream.", content: "# File I/O\n\nReading and writing files with fstream..." },
                    { title: "Static & Friends", desc: "Shared data.", content: "# Static & Friends\n\nStatic members and friend functions..." },
                    { title: "Recursion", desc: "Self-calling.", content: "# Recursion\n\nFunctions calling themselves..." },
                ],
                advanced: [
                    { title: "Inheritance", desc: "Hierarchies.", content: "# Inheritance\n\nBase and derived classes..." },
                    { title: "Polymorphism", desc: "Virtual functions.", content: "# Polymorphism\n\nVirtual functions and V-Tables..." },
                    { title: "Abstract Classes", desc: "Interfaces.", content: "# Abstract Classes\n\nPure virtual functions..." },
                    { title: "Templates", desc: "Generics.", content: "# Templates\n\nFunction and class templates..." },
                    { title: "STL Containers", desc: "Vectors, Maps.", content: "# STL\n\nStandard Template Library containers..." },
                    { title: "Exceptions", desc: "Error handling.", content: "# Exceptions\n\nTry, catch, and throw..." },
                    { title: "Smart Pointers", desc: "Modern memory.", content: "# Smart Pointers\n\nunique_ptr, shared_ptr, weak_ptr..." },
                    { title: "Multithreading", desc: "Concurrency.", content: "# Multithreading\n\nUsing <thread> and mutexes..." },
                    { title: "Lambdas", desc: "Anonymous funcs.", content: "# Lambdas\n\nModern C++ syntax..." },
                    { title: "Profiling", desc: "Performance.", content: "# Profiling\n\nMemory alignment and optimization..." },
                ],
                finalQuiz: [
                    { question: "C++ mein output ke liye kya use hota hai?", options: ["printf", "cout", "print", "System.out"], correctOption: 1, explanation: "std::cout." },
                    { question: "Memory leak rokne ke liye modern C++ mein kya best hai?", options: ["malloc", "new", "Smart Pointers", "pointers"], correctOption: 2, explanation: "Smart Pointers manage memory automatically." },
                    { question: "Class ke andar data hide karne ke liye keyword?", options: ["public", "private", "hidden", "secret"], correctOption: 1, explanation: "private." },
                    { question: "Polymorphism implement karne ke liye kaunsa keyword use hota hai?", options: ["virtual", "poly", "override", "abstract"], correctOption: 0, explanation: "virtual function." },
                    { question: "Standard Template Library (STL) ka part kaunsa hai?", options: ["Vector", "Array (C-style)", "Pointer", "Struct"], correctOption: 0, explanation: "std::vector." }
                ]
            },
            'C': {
                beginner: [
                    { title: "Intro to C", desc: "History & Compilation.", content: "# Intro to C\n\nOrigin of C, structure, and compilation stages..." },
                    { title: "Syntax & Types", desc: "Basics.", content: "# Syntax & Types\n\nPrimitive types (int, float, char) and variable declaration..." },
                    { title: "Constants", desc: "Fixed values.", content: "# Constants\n\n#define macros and const keyword..." },
                    { title: "I/O (printf/scanf)", desc: "Console options.", content: "# I/O\n\nFormat specifiers like %d, %f..." },
                    { title: "Operators", desc: "Math logic.", content: "# Operators\n\nArithmetic, relational, logical, and assignment..." },
                    { title: "Decision Making", desc: "If/Switch.", content: "# Decision Making\n\nIf-else and switch statements..." },
                    { title: "Loops", desc: "Iteration.", content: "# Loops\n\nFor, while, and do-while loops..." },
                    { title: "Arrays Intro", desc: "Contiguous memory.", content: "# Arrays\n\nZero-based indexing and storage..." },
                    { title: "Functions", desc: "Modularity.", content: "# Functions\n\nDefining functions and scope..." },
                    { title: "Strings in C", desc: "Char arrays.", content: "# Strings\n\nNull-terminated character arrays..." },
                ],
                intermediate: [
                    { title: "Pointers", desc: "Memory addresses.", content: "# Pointers\n\nAddress-of (&) and dereference (*) operators..." },
                    { title: "Pointer Arithmetic", desc: "Traversal.", content: "# Pointer Arithmetic\n\nMoving through memory..." },
                    { title: "Structures", desc: "Custom types.", content: "# Structures\n\nGrouping data types..." },
                    { title: "Unions & Enums", desc: "Optimization.", content: "# Unions & Enums\n\nShared memory and named constants..." },
                    { title: "Dynamic Memory", desc: "Malloc/Free.", content: "# Dynamic Memory\n\nUsing malloc, calloc, realloc, and free..." },
                    { title: "File Handling", desc: "FILE pointers.", content: "# File Handling\n\nfopen, fprintf, fscanf..." },
                    { title: "Recursion", desc: "Self-calling.", content: "# Recursion\n\nFactorials and Tower of Hanoi..." },
                    { title: "Preprocessor", desc: "Macros.", content: "# Preprocessor\n\n#include, #define, #ifdef..." },
                    { title: "Command Line", desc: "Args.", content: "# Command Line Arguments\n\nargc and argv..." },
                    { title: "Bitwise Ops", desc: "Bit level.", content: "# Bitwise\n\nAND, OR, XOR, Shift..." },
                ],
                advanced: [
                    { title: "Double Pointers", desc: "Pointer to pointer.", content: "# Pointers to Pointers\n\nDynamic 2D arrays..." },
                    { title: "Function Pointers", desc: "Callbacks.", content: "# Function Pointers\n\nStoring function addresses..." },
                    { title: "Memory Safety", desc: "Leaks.", content: "# Memory Leaks\n\nDebugging with Valgrind..." },
                    { title: "Linked Lists", desc: "Dynamic structures.", content: "# Linked Lists\n\nCreating nodes and chains..." },
                    { title: "Algorithms", desc: "Sort/Search.", content: "# Algorithms\n\nBubble sort, Binary search..." },
                    { title: "Signals", desc: "Interrupts.", content: "# Signal Handling\n\n<signal.h>..." },
                    { title: "Multi-file Projects", desc: "Organization.", content: "# Multi-file\n\nHeader and implementation files..." },
                    { title: "Makefiles", desc: "Automation.", content: "# Makefiles\n\nAutomating the build process..." },
                    { title: "Hardware", desc: "Low-level.", content: "# Hardware Interaction\n\nRegisters and volatile..." },
                    { title: "Standard Library", desc: "libc.", content: "# C Standard Library\n\nDeep dive into <math.h>, <time.h>..." },
                ],
                finalQuiz: [
                    { question: "Dynamic memory allocate karne ke liye function?", options: ["alloc()", "new", "malloc()", "create()"], correctOption: 2, explanation: "malloc()." },
                    { question: "Address of operator kaunsa hai?", options: ["*", "&", "@", "#"], correctOption: 1, explanation: "& gives address." },
                    { question: "String ka end character kya hota hai?", options: ["\\0", "\\n", "END", "."], correctOption: 0, explanation: "Null terminator \\0." },
                    { question: "Structure ka size kya hota hai?", options: ["Sum of members", "Largest member", "Zero"], correctOption: 0, explanation: "Sum of members (plus padding)." },
                    { question: "Union ka size kya hota hai?", options: ["Sum of members", "Largest member", "Zero"], correctOption: 1, explanation: "Size of largest member." }
                ]
            },
            'PHP': {
                beginner: [
                    { title: "Syntax & Setup", desc: "Environment.", content: "# PHP Syntax & Environment\n\nLearn how to set up a local server (XAMPP/WAMP) and write your first PHP script using the <?php ... ?> tags.\n\n[More Info](https://www.geeksforgeeks.org/php-basic-syntax/)" },
                    { title: "Variables & Output", desc: "Echo/Print.", content: "# Variables & Echo/Print\n\nUnderstand how to declare variables using the $ sign and the differences between echo and print for outputting data.\n\n[More Info](https://www.geeksforgeeks.org/php-variables/)" },
                    { title: "Data Types", desc: "Scalars.", content: "# Data Types\n\nExplore the core data types in PHP, including Strings, Integers, Floats, Booleans, Arrays, and Objects.\n\n[More Info](https://www.geeksforgeeks.org/php-data-types/)" },
                    { title: "String Functions", desc: "Manipulation.", content: "# String Functions\n\nMaster built-in functions like strlen(), str_replace(), and strrev() to manipulate text data effectively.\n\n[More Info](https://www.geeksforgeeks.org/php-string-functions/)" },
                    { title: "Math & Constants", desc: "Calculations.", content: "# Math & Constants\n\nLearn to perform calculations and define permanent values using the define() function that remain unchanged during script execution.\n\n[More Info](https://www.geeksforgeeks.org/php-constants/)" },
                    { title: "Operators", desc: "Logic.", content: "# Operators\n\nStudy arithmetic, assignment, comparison, and logical operators to build functional expressions.\n\n[More Info](https://www.geeksforgeeks.org/operators-in-php/)" },
                    { title: "If-Else Logic", desc: "Conditions.", content: "# If-Else-Elseif Logic\n\nControl the flow of your application by executing different code blocks based on specific conditions.\n\n[More Info](https://www.geeksforgeeks.org/php-if-else-if-statement/)" },
                    { title: "Switch Case", desc: "Multi-choice.", content: "# Switch Case\n\nLearn an efficient alternative to long if-else chains when comparing a single variable against multiple potential values.\n\n[More Info](https://www.geeksforgeeks.org/php-switch-statement/)" },
                    { title: "Loops", desc: "Iteration.", content: "# While & For Loops\n\nAutomate repetitive tasks by iterating through code blocks as long as a condition is met or for a fixed number of times.\n\n[More Info](https://www.geeksforgeeks.org/php-loops/)" },
                    { title: "Arrays Basics", desc: "Collections.", content: "# Arrays Basics\n\nLearn to store multiple values in one single variable using Indexed, Associative, and Multidimensional arrays.\n\n[More Info](https://www.geeksforgeeks.org/php-arrays/)" },
                ],
                intermediate: [
                    { title: "Functions", desc: "Reusability.", content: "# Functions & Arguments\n\nWrite reusable code by creating custom functions that accept parameters and return values.\n\n[More Info](https://www.geeksforgeeks.org/functions-in-php/)" },
                    { title: "Variable Scope", desc: "Global/Local.", content: "# Global vs. Local Variables\n\nUnderstand variable scope and how the global keyword allows you to access variables outside of a function.\n\n[More Info](https://www.geeksforgeeks.org/variable-scope-in-php/)" },
                    { title: "Superglobals", desc: "GET/POST.", content: "# Superglobals ($_GET & $_POST)\n\nLearn how PHP collects data from HTML forms using built-in variables like $_GET (URL parameters) and $_POST (secure data).\n\n[More Info](https://www.geeksforgeeks.org/php-superglobals/)" },
                    { title: "Form Validation", desc: "Security.", content: "# Form Validation\n\nSecure your application by validating and sanitizing user input to prevent malicious data entry.\n\n[More Info](https://www.geeksforgeeks.org/php-form-validation/)" },
                    { title: "Dates & Times", desc: "Timestamps.", content: "# Dates & Times\n\nMaster the date() function to display and format timestamps for logs, posts, and user activity.\n\n[More Info](https://www.geeksforgeeks.org/php-date-and-time/)" },
                    { title: "Include & Require", desc: "Modularity.", content: "# Include & Require\n\nLearn to modularize your website by inserting the content of one PHP file into another, ideal for headers and footers.\n\n[More Info](https://www.geeksforgeeks.org/php-include-and-require-statements/)" },
                    { title: "File Uploading", desc: "Handling Files.", content: "# File Uploading\n\nBuild features that allow users to upload images or documents to your server safely.\n\n[More Info](https://www.geeksforgeeks.org/php-file-upload/)" },
                    { title: "Sessions & Cookies", desc: "State.", content: "# Sessions & Cookies\n\nTrack user data across different pages. Use Sessions for sensitive login data and Cookies for user preferences.\n\n[More Info](https://www.geeksforgeeks.org/php-sessions/)" },
                    { title: "MySQLi Connect", desc: "Database.", content: "# MySQLi Connect\n\nLearn the basics of connecting your PHP application to a MySQL database to store persistent information.\n\n[More Info](https://www.geeksforgeeks.org/php-mysql-connect-to-database/)" },
                    { title: "CRUD Operations", desc: "Data Ops.", content: "# CRUD Operations\n\nThe core of web apps: learn to Create, Read, Update, and Delete records in a database using SQL and PHP.\n\n[More Info](https://www.geeksforgeeks.org/php-mysql-crud-operations/)" },
                ],
                advanced: [
                    { title: "OOP Basics", desc: "Classes.", content: "# PHP OOP (Classes/Objects)\n\nTransition to Object-Oriented Programming. Learn to define blueprints (classes) and create instances (objects).\n\n[More Info](https://www.geeksforgeeks.org/object-oriented-programming-in-php/)" },
                    { title: "Traits & Interfaces", desc: "Structure.", content: "# Traits & Interfaces\n\nMaster code reuse through Traits and define structural contracts for your classes using Interfaces.\n\n[More Info](https://www.geeksforgeeks.org/php-traits/)" },
                    { title: "Namespaces", desc: "Organization.", content: "# Namespaces\n\nAvoid naming collisions in large projects by organizing your classes and functions into distinct virtual folders.\n\n[More Info](https://www.geeksforgeeks.org/namespaces-in-php/)" },
                    { title: "Exception Handling", desc: "Errors.", content: "# Exception Handling\n\nUse try-catch blocks to handle runtime errors professionally without letting the website crash.\n\n[More Info](https://www.geeksforgeeks.org/exception-handling-in-php/)" },
                    { title: "RegEx", desc: "Patterns.", content: "# Regular Expressions (RegEx)\n\nLearn complex pattern matching for advanced data validation, such as verifying complex passwords or email formats.\n\n[More Info](https://www.geeksforgeeks.org/php-regular-expressions/)" },
                    { title: "AJAX", desc: "Interactive.", content: "# AJAX with PHP\n\nUpdate parts of a web page without reloading the entire page by combining PHP with JavaScript.\n\n[More Info](https://www.geeksforgeeks.org/how-to-use-ajax-with-php/)" },
                    { title: "JSON Handling", desc: "APIs.", content: "# JSON Handling\n\nLearn to encode and decode JSON data, which is essential for building and communicating with modern APIs.\n\n[More Info](https://www.geeksforgeeks.org/php-json_encode-function/)" },
                    { title: "Filters", desc: "Sanitization.", content: "# PHP Filters\n\nExplore the built-in filter extension used to validate and sanitize external input safely.\n\n[More Info](https://www.geeksforgeeks.org/php-filters/)" },
                    { title: "MVC Pattern", desc: "Architecture.", content: "# MVC Pattern Basics\n\nUnderstand the Model-View-Controller architecture, the industry standard for organizing professional web applications.\n\n[More Info](https://www.geeksforgeeks.org/mvc-design-pattern/)" },
                    { title: "Composer", desc: "Dependencies.", content: "# Composer & Libraries\n\nLearn how to use Composer, the dependency manager for PHP, to install and manage third-party libraries and frameworks.\n\n[More Info](https://www.geeksforgeeks.org/introduction-to-php-composer/)" },
                ],
                finalQuiz: [
                    { question: "PHP scripts execute kahan hoti hain?", options: ["Client", "Browser", "Server", "ISP"], correctOption: 2, explanation: "Server side." },
                    { question: "Variable declare symbol?", options: ["#", "$", "&", "@"], correctOption: 1, explanation: "$ sign." },
                    { question: "String concatenate?", options: ["+", ".", "&", "*"], correctOption: 1, explanation: "Dot operator." },
                    { question: "Session start func?", options: ["start_session()", "session_start()"], correctOption: 1, explanation: "session_start()." },
                    { question: "Safe way to output data?", options: ["echo", "print", "htmlspecialchars"], correctOption: 2, explanation: "Prevents XSS." }
                ]
            },
            'Operating Systems': {
                beginner: [
                    { title: "Intro vs History", desc: "Evolution.", content: "# Intro to OS & History\n\nUnderstand what an OS is and its evolution from Mainframe to Mobile systems.\n\n[More Info](https://www.geeksforgeeks.org/operating-systems/)" },
                    { title: "Types of OS", desc: "Batch/Time-sharing.", content: "# Types of Operating Systems\n\nDifferentiate between Batch Processing, Multiprogramming, Time-Sharing, and Distributed OS.\n\n[More Info](https://www.geeksforgeeks.org/types-of-operating-systems/)" },
                    { title: "Kernel Types", desc: "Monolithic/Micro.", content: "# Kernel and its Types\n\nThe core of the OS: Monolithic vs Microkernel architectures and their performance impacts.\n\n[More Info](https://www.geeksforgeeks.org/kernel-in-operating-system/)" },
                    { title: "System Calls", desc: "API.", content: "# System Calls & Library Functions\n\nHow user programs request services (fork, exec, wait) from the kernel.\n\n[More Info](https://www.geeksforgeeks.org/system-calls-in-operating-system/)" },
                    { title: "Process PCB", desc: "Control Block.", content: "# Process Concept & PCB\n\nUnderstanding the Process Control Block (PCB) which stores ID, State, and Registers.\n\n[More Info](https://www.geeksforgeeks.org/process-table-and-process-control-block-pcb/)" },
                    { title: "Process States", desc: "Lifecycle.", content: "# Process Life Cycle\n\nThe 5 states of a process: New, Ready, Running, Waiting, and Terminated.\n\n[More Info](https://www.geeksforgeeks.org/states-of-a-process-in-operating-system/)" },
                    { title: "Threads", desc: "Concurrency.", content: "# Introduction to Threads\n\nLightweight processes. Understanding Single vs Multi-threaded execution.\n\n[More Info](https://www.geeksforgeeks.org/thread-in-operating-system/)" },
                    { title: "Scheduling Basics", desc: "CPU allocation.", content: "# CPU Scheduling Basics\n\nPreemptive vs Non-Preemptive scheduling to keep the CPU busy.\n\n[More Info](https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/)" },
                    { title: "I/O Mgmt", desc: "Buffering.", content: "# I/O Management & Buffering\n\nManaging devices (keyboard, mouse) using Spooling and Buffering techniques.\n\n[More Info](https://www.geeksforgeeks.org/input-output-system-in-operating-system/)" },
                    { title: "Booting", desc: "Startup.", content: "# Booting Process\n\nFrom Power On to Kernel Loading: BIOS, POST, and Bootloader.\n\n[More Info](https://www.geeksforgeeks.org/booting-process-in-operating-system/)" },
                ],
                intermediate: [
                    { title: "FCFS & SJF", desc: "Algorithms 1.", content: "# CPU Scheduling: FCFS & SJF\n\nFirst-Come-First-Serve and Shortest Job First scheduling algorithms with examples.\n\n[More Info](https://www.geeksforgeeks.org/cpu-scheduling-algorithms/)" },
                    { title: "RR & Priority", desc: "Algorithms 2.", content: "# CPU Scheduling: Round Robin\n\nRound Robin and Priority-based scheduling for real-time systems.\n\n[More Info](https://www.geeksforgeeks.org/round-robin-scheduling-algorithm/)" },
                    { title: "Synchronization", desc: "Race Condition.", content: "# Process Synchronization\n\nSolving Race Conditions when processes access shared resources.\n\n[More Info](https://www.geeksforgeeks.org/process-synchronization-in-operating-system/)" },
                    { title: "Semaphores", desc: "Mutex.", content: "# Semaphores & Mutex\n\nUsing Integer variables and Binary locks to achieve synchronization.\n\n[More Info](https://www.geeksforgeeks.org/semaphores-in-operating-system/)" },
                    { title: "Deadlock", desc: "Stalemate.", content: "# Deadlock Introduction\n\nUnderstanding the 4 conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait) that cause deadlock.\n\n[More Info](https://www.geeksforgeeks.org/deadlock-in-operating-system/)" },
                    { title: "Banker's Algo", desc: "Avoidance.", content: "# Banker's Algorithm\n\nDeadlock avoidance by checking if allocating resources leaves the system in a safe state.\n\n[More Info](https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/)" },
                    { title: "Memory Mgmt", desc: "Partitions.", content: "# Memory Management\n\nContiguous allocation and Fixed vs Variable partitioning.\n\n[More Info](https://www.geeksforgeeks.org/memory-management-in-operating-system/)" },
                    { title: "Paging", desc: "Non-contiguous.", content: "# Paging Mechanism\n\nEliminating fragmentation using Pages (logical) and Frames (physical).\n\n[More Info](https://www.geeksforgeeks.org/paging-in-operating-system/)" },
                    { title: "Segmentation", desc: "Logical view.", content: "# Segmentation\n\nDividing memory into logical modules (Main, Stack, Function) for better user perspective.\n\n[More Info](https://www.geeksforgeeks.org/segmentation-in-operating-system/)" },
                    { title: "Virtual Memory", desc: "Demand Paging.", content: "# Virtual Memory\n\nRunning large programs by loading only necessary pages into RAM.\n\n[More Info](https://www.geeksforgeeks.org/virtual-memory-in-operating-system/)" },
                ],
                advanced: [
                    { title: "Replacement Algos", desc: "LRU/FIFO.", content: "# Page Replacement Algorithms\n\nDeciding which page to swap out: FIFO, Optimal, and LRU.\n\n[More Info](https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/)" },
                    { title: "Thrashing", desc: "Performance kill.", content: "# Thrashing\n\nWhen the system spends more time swapping pages than executing processes.\n\n[More Info](https://www.geeksforgeeks.org/thrashing-in-operating-system/)" },
                    { title: "Disk Scheduling", desc: "Seek time.", content: "# Disk Scheduling Algorithms\n\nOptimizing disk arm movement: FCFS, SCAN, C-SCAN, and LOOK.\n\n[More Info](https://www.geeksforgeeks.org/disk-scheduling-algorithms/)" },
                    { title: "File Systems", desc: "NTFS/EXT4.", content: "# File Systems & Directories\n\nFile storage structures (FAT, NTFS) and allocation methods (Linked, Indexed).\n\n[More Info](https://www.geeksforgeeks.org/file-systems-in-operating-system/)" },
                    { title: "Protection", desc: "Access Matrix.", content: "# Protection & Security\n\nAccess Matrix and Encryption mechanisms to secure OS resources.\n\n[More Info](https://www.geeksforgeeks.org/security-in-operating-system/)" },
                    { title: "RAID", desc: "Redundancy.", content: "# RAID Levels\n\nRedundant Array of Independent Disks (0, 1, 5, 10) for performance and backup.\n\n[More Info](https://www.geeksforgeeks.org/raid-levels-in-operating-system/)" },
                    { title: "Distributed OS", desc: "Networked.", content: "# Distributed OS Concepts\n\nTreating multiple network connected machines as a single system.\n\n[More Info](https://www.geeksforgeeks.org/distributed-operating-system/)" },
                    { title: "RTOS", desc: "Real-time.", content: "# Real-Time OS (RTOS)\n\nHard vs Soft real-time systems where timing is critical (e.g., Air Traffic Control).\n\n[More Info](https://www.geeksforgeeks.org/real-time-operating-system-rtos/)" },
                    { title: "Linux vs Windows", desc: "Internals.", content: "# Linux vs Windows Internals\n\nComparative analysis of architecture, file handling, and process management.\n\n[More Info](https://www.geeksforgeeks.org/difference-between-windows-and-linux/)" },
                    { title: "Virtualization", desc: "Hypervisors.", content: "# Virtualization\n\nRunning multiple OS instances using Type-1 and Type-2 Hypervisors.\n\n[More Info](https://www.geeksforgeeks.org/hypervisor/)" },
                ],
                finalQuiz: [
                    { question: "Process ka instance?", options: ["Program", "Thread", "Task"], correctOption: 0, explanation: "Program in execution." },
                    { question: "Deadlock prevent algo?", options: ["Banker's", "Round Robin", "FIFO"], correctOption: 1, explanation: "Banker's Algo." },
                    { question: "Program in execution is called?", options: ["Code", "Process", "Thread"], correctOption: 1, explanation: "Process." },
                    { question: "Virtual Memory is implemented using?", options: ["Segmentation", "Paging", "Demand Paging"], correctOption: 2, explanation: "Demand Paging." },
                    { question: "Core of Operating System?", options: ["UI", "Kernel", "Shell"], correctOption: 1, explanation: "Kernel." }
                ]
            },
            'Computer Networks': {
                beginner: [
                    { title: "Intro to Networking", desc: "Foundations.", content: "# Intro to Networking\n\nUnderstand the basics of computer networking, its history, and why it's essential for modern communication.\n\n[More Info](https://www.geeksforgeeks.org/basics-computer-networking/)" },
                    { title: "Network Types", desc: "LAN/WAN/MAN.", content: "# Network Types\n\nLearn how networks are classified by physical distance: LAN (Local), WAN (Wide), and MAN (Metropolitan).\n\n[More Info](https://www.geeksforgeeks.org/types-of-area-networks-lan-man-and-wan/)" },
                    { title: "OSI Model", desc: "7 Layers.", content: "# OSI Model Overview\n\nThe 7-layer theoretical model (Physical to Application) that defines networking standards.\n\n[More Info](https://www.geeksforgeeks.org/layers-of-osi-model/)" },
                    { title: "Physical Layer", desc: "Media.", content: "# Physical Layer & Media\n\nHow data travels via Optical Fiber, Coaxial cables, or Wireless signals as bits.\n\n[More Info](https://www.geeksforgeeks.org/physical-layer-in-osi-model/)" },
                    { title: "Data Link Layer", desc: "Framing.", content: "# Data Link Layer & MAC\n\nUnderstanding MAC addresses and framing to ensure error-free transfer between connected nodes.\n\n[More Info](https://www.geeksforgeeks.org/data-link-layer/)" },
                    { title: "Topologies", desc: "Layouts.", content: "# Network Topologies\n\nPatterns like Star, Mesh, and Bus used to physically connect computers.\n\n[More Info](https://www.geeksforgeeks.org/topologies-in-computer-networks/)" },
                    { title: "Devices", desc: "Hardware.", content: "# Networking Devices\n\nHubs vs Switches vs Routers: Identifying the right hardware for the job.\n\n[More Info](https://www.geeksforgeeks.org/network-devices-hub-switch-router-bridge-gateway/)" },
                    { title: "IPv4 Basics", desc: "Addressing.", content: "# IPv4 Addressing\n\nClass A, B, C architectures and the concept of reserved IP addresses.\n\n[More Info](https://www.geeksforgeeks.org/ip-addressing-introduction-and-ipv4-classful-addressing/)" },
                    { title: "TCP/IP vs OSI", desc: "Models.", content: "# TCP/IP Model\n\nComparing the real-world TCP/IP suite with the theoretical OSI model.\n\n[More Info](https://www.geeksforgeeks.org/tcp-ip-model/)" },
                    { title: "Basic Commands", desc: "Ping/Tracert.", content: "# Basic Commands\n\nTroubleshoot connectivity using `ping` and `tracert` to diagnose network issues.\n\n[More Info](https://www.geeksforgeeks.org/basic-networking-commands-in-linux/)" },
                ],
                intermediate: [
                    { title: "Subnetting", desc: "VLSM.", content: "# Subnetting & VLSM\n\nDivide large networks into smaller subnets to optimize IP usage and improve security.\n\n[More Info](https://www.geeksforgeeks.org/introduction-to-subnetting-in-computer-networks/)" },
                    { title: "Routing Protocols", desc: "RIP/OSPF.", content: "# Network Layer & Routing\n\nHow routers decide the best path for data packets using protocols like RIP and OSPF.\n\n[More Info](https://www.geeksforgeeks.org/routing-v-s-routed-protocols/)" },
                    { title: "TCP vs UDP", desc: "Transport.", content: "# TCP vs UDP\n\nDeep dive into Reliable (TCP) vs Fast/Connectionless (UDP) communication.\n\n[More Info](https://www.geeksforgeeks.org/differences-between-tcp-and-udp/)" },
                    { title: "HTTP/HTTPS", desc: "App Layer.", content: "# Application Layer Protocols\n\nWeb browsing logic and the role of SSL/TLS in secure HTTP communication.\n\n[More Info](https://www.geeksforgeeks.org/http-https-protocols/)" },
                    { title: "DNS", desc: "Naming.", content: "# Domain Name System (DNS)\n\nThe internet's phonebook: Converting human-friendly names to IP addresses.\n\n[More Info](https://www.geeksforgeeks.org/dns-domain-name-system/)" },
                    { title: "DHCP", desc: "Auto IP.", content: "# DHCP & Dynamic Addressing\n\nHow servers automatically assign IPs to devices, simplifying network management.\n\n[More Info](https://www.geeksforgeeks.org/dynamic-host-configuration-protocol-dhcp/)" },
                    { title: "NAT", desc: "Translation.", content: "# Network Address Translation\n\nMapping Private IPs to Public IPs to conserve address space.\n\n[More Info](https://www.geeksforgeeks.org/network-address-translation-nat/)" },
                    { title: "VPN", desc: "Tunneling.", content: "# Virtual Private Networks\n\nCreating encrypted tunnels over public internet for secure data access.\n\n[More Info](https://www.geeksforgeeks.org/virtual-private-network-vpn/)" },
                    { title: "Firewalls", desc: "Security.", content: "# Firewalls & ACLs\n\nBlocking unwanted traffic and controlling access using security rules.\n\n[More Info](https://www.geeksforgeeks.org/firewall-in-computer-network/)" },
                    { title: "Error Detection", desc: "CRC/Checksum.", content: "# Error Detection & Correction\n\nEnsuring data integrity using methods like Cyclic Redundancy Check (CRC).\n\n[More Info](https://www.geeksforgeeks.org/error-detection-in-computer-networks/)" },
                ],
                advanced: [
                    { title: "BGP", desc: "Internet Routing.", content: "# Advanced Routing (BGP)\n\nBorder Gateway Protocol: How Autonomous Systems execute internet-scale routing.\n\n[More Info](https://www.geeksforgeeks.org/border-gateway-protocol-bgp/)" },
                    { title: "Load Balancing", desc: "Traffic Dist.", content: "# Load Balancing\n\nDistributing traffic across multiple servers to prevent overload and ensure uptime.\n\n[More Info](https://www.geeksforgeeks.org/load-balancing-system-design/)" },
                    { title: "QoS", desc: "Priority.", content: "# Quality of Service (QoS)\n\nPrioritizing time-sensitive traffic like VoIP and Gaming over other data.\n\n[More Info](https://www.geeksforgeeks.org/quality-of-service-qos-in-networking/)" },
                    { title: "SDN", desc: "Programmable.", content: "# Software Defined Networking\n\nDecoupling Control Plane from Data Plane to manage networks programmatically.\n\n[More Info](https://www.geeksforgeeks.org/software-defined-networking-sdn/)" },
                    { title: "CDN", desc: "Delivery.", content: "# Content Delivery Networks\n\nGeographically distributed servers to reduce latency for global users.\n\n[More Info](https://www.geeksforgeeks.org/content-delivery-network-cdn/)" },
                    { title: "Network Virt", desc: "VLANs.", content: "# Network Virtualization\n\nRunning multiple virtual networks (VLANs, VXLANs) on single physical hardware.\n\n[More Info](https://www.geeksforgeeks.org/virtual-lan-vlan-and-its-advantages/)" },
                    { title: "IPv6", desc: "Next Gen.", content: "# IPv6 Transition\n\nStrategies like Dual-stack and Tunneling to migrate from IPv4 to IPv6.\n\n[More Info](https://www.geeksforgeeks.org/ipv6-transition-strategies/)" },
                    { title: "IDS/IPS", desc: "Intrusion.", content: "# Intrusion Detection Systems\n\nReal-time tools to identify and prevent network attacks.\n\n[More Info](https://www.geeksforgeeks.org/intrusion-detection-system-ids/)" },
                    { title: "Wireless Sec", desc: "WPA3.", content: "# Wireless Security\n\nSecuring Wi-Fi networks using WPA2/WPA3 protocols.\n\n[More Info](https://www.geeksforgeeks.org/wpa2-v-s-wpa3/)" },
                    { title: "Socket Prog", desc: "I/O Code.", content: "# Socket Programming\n\nWriting code for client-server communication at the application layer.\n\n[More Info](https://www.geeksforgeeks.org/socket-programming-cc/)" },
                ],
                finalQuiz: [
                    { question: "OSI Layer 1?", options: ["Application", "Physical", "Network"], correctOption: 1, explanation: "Physical Layer." },
                    { question: "Connection-oriented protocol?", options: ["UDP", "IP", "TCP"], correctOption: 2, explanation: "TCP." },
                    { question: "Uniquely identifies a device physically?", options: ["IP Address", "MAC Address", "Port"], correctOption: 1, explanation: "MAC Address." },
                    { question: "Protocol for web browsing?", options: ["FTP", "SMTP", "HTTP"], correctOption: 2, explanation: "HTTP/HTTPS." },
                    { question: "Device connecting different networks?", options: ["Hub", "Switch", "Router"], correctOption: 2, explanation: "Router." }
                ]
            },

            'DBMS': {
                beginner: [
                    { title: "Intro", desc: "Databases.", content: "# DB\n\nIntro..." }, { title: "SQL vs NoSQL", desc: "Types.", content: "# Types..." }, { title: "SELECT", desc: "Read.", content: "# Select..." }, { title: "WHERE", desc: "Filter.", content: "# Where..." }, { title: "CRUD", desc: "Ops.", content: "# CRUD..." }, { title: "Types", desc: "Data.", content: "# Types..." }, { title: "PK", desc: "Primary Key.", content: "# PK..." }, { title: "ORDER BY", desc: "Sort.", content: "# Sort..." }, { title: "NULL", desc: "Empty.", content: "# Null..." }, { title: "Setup", desc: "Install.", content: "# Setup..." }
                ],
                intermediate: [
                    { title: "JOINS", desc: "Combining.", content: "# Joins..." }, { title: "Aggregates", desc: "Sum/Avg.", content: "# Agg..." }, { title: "GROUP BY", desc: "Group.", content: "# Group..." }, { title: "FK", desc: "Foreign Key.", content: "# FK..." }, { title: "Normalization", desc: "1NF-3NF.", content: "# Norm..." }, { title: "Constraints", desc: "Rules.", content: "# Rules..." }, { title: "Subqueries", desc: "Nested.", content: "# Sub..." }, { title: "Views", desc: " Virtual.", content: "# Views..." }, { title: "Indexes", desc: "Speed.", content: "# Index..." }, { title: "Transactions", desc: "ACID.", content: "# ACID..." }
                ],
                advanced: [
                    { title: "Indexing Deep Dive", desc: "B-Trees, Hash.", content: "# Indexing\n\nData structures..." },
                    { title: "Query Optimization", desc: "Execution Plans.", content: "# Optimization\n\nQuery cost..." },
                    { title: "Isolation Levels", desc: "Transactions.", content: "# Isolation\n\nRead Committed..." },
                    { title: "Distributed DBs", desc: "Scaling.", content: "# Distributed\n\nCAP theorem..." },
                    { title: "Sharding", desc: "Partitioning.", content: "# Sharding\n\nHorizontal scale..." },
                    { title: "NoSQL Modeling", desc: "Schema design.", content: "# NoSQL\n\nDocument vs Graph..." },
                    { title: "Replication", desc: "Master-Slave.", content: "# Replication\n\nHigh availability..." },
                    { title: "CAP Theorem", desc: "Tradeoffs.", content: "# CAP\n\nConsistency/Availability..." },
                    { title: "Concurrency", desc: "Locking.", content: "# Concurrency\n\nOptimistic/Pessimistic..." },
                    { title: "Backup/Recovery", desc: "DR.", content: "# Backup\n\nDisaster recovery..." },
                ],
                finalQuiz: [
                    { question: "Unique records?", options: ["FK", "PK", "Local Key"], correctOption: 1, explanation: "Primary Key." },
                    { question: "Delete schema?", options: ["REMOVE", "DELETE", "DROP"], correctOption: 2, explanation: "DROP." },
                    { question: "ACID C?", options: ["Consistency", "Control"], correctOption: 0, explanation: "Consistency." }
                ]
            },
            'C#': {
                beginner: [
                    { title: "Syntax & .NET", desc: "Ecosystem.", content: "# C# Syntax & .NET Ecosystem\n\nIntroduction to the .NET platform and the C# compiler. You will learn the basic structure of a C# program, including the Main method and how to use namespaces to organize your code." },
                    { title: "Variables & Types", desc: "Data System.", content: "# Variables & Core Data Types\n\nExplore C#'s type system. This module covers value types (int, double, bool) and reference types (string). You will learn about implicit and explicit type conversion (casting)." },
                    { title: "Operators", desc: "Expressions.", content: "# Operators & Expressions\n\nMaster mathematical, logical, and assignment operators. You will learn how to build complex expressions and understand the precedence rules that govern how C# evaluates code." },
                    { title: "Control Flow", desc: "Decision Making.", content: "# Control Flow: Decision Making\n\nLearn how to use if, else if, and else to create logical branches. You will also study the switch statement, which is highly optimized in C# for handling multiple conditions." },
                    { title: "Loops", desc: "Iteration.", content: "# Iteration & Loops\n\nAutomating tasks using for, while, and do-while loops. This module also introduces the foreach loop, which is the preferred way in C# to iterate through collections and arrays." },
                    { title: "Arrays & Collections", desc: "Lists.", content: "# Arrays & Collections Basics\n\nLearn to store multiple items in fixed-size arrays. You will also get an introduction to the List<T> class, which provides a more flexible, dynamic way to store data compared to traditional arrays." },
                    { title: "Methods", desc: "Parameters.", content: "# Methods & Parameters\n\nOrganize your logic into reusable blocks. You will learn about method signatures, return types, and how to pass arguments using named and optional parameters." },
                    { title: "Classes & Objects", desc: "OOP Basics.", content: "# Classes and Objects: The Basics\n\nEnter the world of Object-Oriented Programming (OOP). You will learn how to define a class as a blueprint and instantiate objects that hold data and behavior." },
                    { title: "Strings", desc: "Text Manipulation.", content: "# Strings & Text Manipulation\n\nLearn to handle text efficiently. This module covers the String class methods and the StringBuilder class, which is essential for high-performance text modification in C#." },
                    { title: "Exception Handling", desc: "Try-Catch.", content: "# Basic Exception Handling\n\nBuild resilient programs by handling runtime errors. You will learn the try-catch block basics to ensure your application doesn't crash when it encounters unexpected input." },
                ],
                intermediate: [
                    { title: "Inheritance", desc: "Base Classes.", content: "# Inheritance & Base Classes\n\nLearn how to create a hierarchy of classes. You will study how a derived class inherits members from a base class and how to use the virtual and override keywords." },
                    { title: "Interfaces", desc: "Contracts.", content: "# Interfaces & Abstract Classes\n\nDefine \"contracts\" for your code. You will learn how interfaces enforce specific behaviors and how abstract classes provide a partial implementation for other classes to follow." },
                    { title: "Properties", desc: "Encapsulation.", content: "# Properties & Encapsulation\n\nProtect your data using \"Getters\" and \"Setters.\" You will learn about Auto-Implemented Properties, which allow you to control how data is read and written in a concise way." },
                    { title: "Lists & Dictionaries", desc: "Generics.", content: "# Working with Lists & Dictionaries\n\nDeep dive into the System.Collections.Generic namespace. You will master List<T> for ordered data and Dictionary<TKey, TValue> for fast, key-based data retrieval." },
                    { title: "LINQ", desc: "Querying.", content: "# Introduction to LINQ\n\nLanguage Integrated Query (LINQ) is a powerful C# feature. You will learn to query, filter, and transform data from collections using a syntax similar to SQL." },
                    { title: "Generics", desc: "Type Safety.", content: "# Generics\n\nWrite type-safe, reusable code. You will learn how to create classes and methods that work with any data type while maintaining performance and avoiding runtime errors." },
                    { title: "Delegates & Events", desc: "Event-driven.", content: "# Delegates and Events\n\nLearn how to pass methods as arguments. This module covers the foundation of event-driven programming, which is crucial for building User Interfaces and Game Logic." },
                    { title: "File I/O", desc: "Streams.", content: "# File I/O & Streams\n\nInteract with the computer's storage. You will learn to read and write text and binary files using the System.IO namespace and handle file streams safely." },
                    { title: "Attributes", desc: "Metadata.", content: "# Attributes & Metadata\n\nLearn how to add descriptive information to your code. Attributes are used to provide instructions to the compiler or tools about how to treat specific classes or methods." },
                    { title: "Async/Await", desc: "Concurrency.", content: "# Asynchronous Programming Basics\n\nPrepare for modern development. You will learn the basics of the Task based pattern and how async and await prevent applications from freezing during long tasks." },
                ],
                advanced: [
                    { title: "Dependency Injection", desc: "Decoupling.", content: "# Dependency Injection\n\nLearn the industry standard for creating de-coupled code. This module explains how to inject services into classes, making your code easier to test and maintain." },
                    { title: "Reflection", desc: "Dynamic Loading.", content: "# Reflection & Dynamic Loading\n\nExplore code at runtime. You will learn how to inspect types, call methods, and access properties dynamically, which is vital for building frameworks and plugins." },
                    { title: "Memory Mgmt", desc: "Garbage Collection.", content: "# Memory Management (Garbage Collection)\n\nUnderstand the .NET runtime. You will learn how the Garbage Collector manages memory and how to use the IDisposable interface to clean up unmanaged resources manually." },
                    { title: "Multi-threading", desc: "Parallelism.", content: "# Multi-threading & Task Parallel Library\n\nUnlock the power of multi-core processors. You will learn to run multiple operations in parallel while managing thread safety and synchronization." },
                    { title: "Entity Framework", desc: "ORM.", content: "# Entity Framework Core\n\nBridge the gap between C# and Databases. You will learn how to use an ORM (Object-Relational Mapper) to interact with databases using C# objects instead of SQL." },
                    { title: "Design Patterns", desc: "Architecture.", content: "# Advanced Design Patterns\n\nStudy architectural patterns like Singleton, Factory, and Repository. These patterns help you solve common software design problems in a scalable way." },
                    { title: "Unity Integration", desc: "Game Dev.", content: "# Unity Game Engine Integration\n\nLearn how C# is specifically used in Unity. This module covers MonoBehaviours, GameObjects, and the specific scripting lifecycle used in game development." },
                    { title: "Microservices", desc: "Web API.", content: "# Microservices with .NET\n\nLearn how to build small, independent services that communicate with each other. This module focuses on Web API development and inter-service communication." },
                    { title: "Unit Testing", desc: "xUnit.", content: "# Unit Testing with xUnit\n\nEnsure your code works as expected. You will learn to write automated tests that verify individual units of logic, a requirement for any professional enterprise project." },
                    { title: "gRPC", desc: "Communication.", content: "# gRPC & High-Performance Communication\n\nExplore modern communication protocols. You will learn how to use gRPC for fast, contract-based communication between different services in a distributed system." },
                ],
                finalQuiz: [
                    { question: "Foreach works on?", options: ["Array", "IEnumerable", "String"], correctOption: 1, explanation: "IEnumerable." },
                    { question: "Base class?", options: ["Object", "Main", "Root"], correctOption: 0, explanation: "System.Object." },
                    { question: "Using statement?", options: ["Import", "Dispose Resource", "Speed"], correctOption: 1, explanation: "Dispose/Resource Mgmt." },
                    { question: "Value types store?", options: ["Heap", "Stack", "Disk"], correctOption: 1, explanation: "Stack." },
                    { question: "Sealed class?", options: ["No Instance", "No Inherit", "Constant"], correctOption: 1, explanation: "Cannot be inherited." }
                ]
            },
            'Data Science': {
                beginner: [
                    { title: "NumPy", desc: "Arrays.", content: "# NumPy\n\nNumerical Python..." },
                    { title: "Pandas", desc: "DataFrames.", content: "# Pandas\n\nData manipulation..." },
                    { title: "Matplotlib", desc: "Plots.", content: "# Plot\n\nVisualization..." },
                    { title: "Statistics", desc: "Basics.", content: "# Stats\n\nMean, Median, Mode..." },
                    { title: "Scikit-Learn", desc: "ML Intro.", content: "# Sklearn\n\nMachine Learning..." },
                    { title: "Linear Regression", desc: "Prediction.", content: "# Regression\n\nLine fitting..." },
                    { title: "Decision Trees", desc: "Classification.", content: "# Trees\n\nDecisions..." },
                    { title: "Data Cleaning", desc: "Preprocessing.", content: "# Cleaning\n\nMissing values..." },
                    { title: "Neural Networks", desc: "Basics.", content: "# NN\n\nNeurons/Layers..." },
                    { title: "Deployment", desc: "Model.", content: "# Deploy\n\nServing models..." },
                ],
                intermediate: [], advanced: [],
                finalQuiz: [
                    { question: "Main library for arrays?", options: ["Pandas", "NumPy", "Matplotlib"], correctOption: 1, explanation: "NumPy." },
                    { question: "Library for DataFrames?", options: ["Pandas", "NumPy", "Sklearn"], correctOption: 0, explanation: "Pandas." }
                ]
            },
            'TypeScript': {
                beginner: [
                    { title: "Intro & Compiler", desc: "Setup.", content: "# TS Intro & The Compiler (tsc)\n\nIntroduction to TypeScript and the benefits of static typing. You will learn to set up the environment and use the tsc compiler to transpile TS into JS." },
                    { title: "Primitives & Inference", desc: "Types.", content: "# Primitive Types & Inference\n\nLearn about string, number, and boolean. You will also understand Type Inference—how TypeScript \"guesses\" the type of a variable without you telling it." },
                    { title: "Arrays & Tuples", desc: "Lists.", content: "# Arrays & Tuples\n\nLearn to define typed arrays (e.g., number[]) and Tuples, which are arrays with a fixed number of elements and specific types at each position." },
                    { title: "Functions", desc: "Annotations.", content: "# Functions & Type Annotations\n\nMaster typed functions. You will learn how to annotate parameters and return types, ensuring that your functions are called correctly every time." },
                    { title: "Objects & Aliases", desc: "Shapes.", content: "# Objects & Type Aliases\n\nLearn to define the shape of objects. You will use Type Aliases to create custom, reusable names for complex object types." },
                    { title: "Unions & Intersections", desc: "Combinations.", content: "# Union & Intersection Types\n\nLearn flexibility. Union types (|) allow a variable to be one of several types, while Intersection types (&) combine multiple types into one." },
                    { title: "Literals & Enums", desc: "Constants.", content: "# Literal Types & Enums\n\nRestrict values to specific strings or numbers using Literal types. You will also study enums to define a set of named constants." },
                    { title: "Any & Unknown", desc: "Dynamic.", content: "# The 'any' and 'unknown' Types\n\nUnderstand the escape hatches. You will learn why any is dangerous and why unknown is the safer alternative when you don't know the incoming data type." },
                    { title: "Void & Never", desc: "Special types.", content: "# Void, Never, and Null/Undefined\n\nLearn special types. void for functions that return nothing, and never for functions that never finish (like infinite loops or error-throwing functions)." },
                    { title: "Type Assertions", desc: "Casting.", content: "# Type Assertions\n\nLearn how to tell the compiler \"Trust me, I know what I'm doing\" using the as keyword to override inferred types when necessary." },
                ],
                intermediate: [
                    { title: "Interface vs Alias", desc: "Differences.", content: "# Interfaces vs. Type Aliases\n\nDeep dive into the differences between interface and type. You will learn when to use each and how interfaces can be \"extended\" and \"merged.\"" },
                    { title: "Classes", desc: "OOP.", content: "# Classes in TypeScript\n\nApply types to Object-Oriented Programming. You will learn about access modifiers (public, private, protected) and the readonly keyword within classes." },
                    { title: "Generics Basics", desc: "Reusable.", content: "# Generics: The Basics\n\nCreate reusable components. You will learn how to write functions and classes that can work with a variety of types while retaining type information." },
                    { title: "Generic Constraints", desc: "Limits.", content: "# Generic Constraints\n\nLearn to limit what types can be passed to a Generic. For example, ensuring a Generic type must have a .length property." },
                    { title: "Optional & Readonly", desc: "Modifiers.", content: "# Optional & Readonly Properties\n\nMaster object flexibility. You will use the ? symbol for optional properties and readonly to prevent properties from being changed after initialization." },
                    { title: "Modules", desc: "Imports.", content: "# Modules & Namespaces\n\nOrganize code into logical units. You will learn how TypeScript handles ES6 imports/exports and when to use (or avoid) Namespaces." },
                    { title: "Type Guards", desc: "Narrowing.", content: "# Type Narrowing & Guards\n\nLearn how to help TypeScript understand a more specific type within a conditional block using typeof, instanceof, and custom type predicates." },
                    { title: "Utility Types", desc: "Helpers.", content: "# Utility Types (Partial, Pick, Omit)\n\nMaster TypeScript’s built-in helper types that allow you to transform existing types into new ones without rewriting them." },
                    { title: "DOM & Web APIs", desc: "Browser.", content: "# TS with DOM & Web APIs\n\nLearn how to type-safely interact with HTML elements, event listeners, and browser APIs like fetch." },
                    { title: "Configuration", desc: "tsconfig.", content: "# Configuring tsconfig.json\n\nA deep dive into compiler options. You will learn about strict mode, target versions, and how to optimize your build process." },
                ],
                advanced: [
                    { title: "Adv Generics", desc: "Mapping.", content: "# Advanced Generics & Mapped Types\n\nLearn to create new types based on old ones by iterating over keys. This is the secret behind many advanced TypeScript libraries." },
                    { title: "Conditional Types", desc: "Logic.", content: "# Conditional Types\n\nLearn the \"If-Then\" logic of types. You will use the extends keyword in a type definition to choose a type based on a condition." },
                    { title: "Infer Keyword", desc: "Extraction.", content: "# The 'infer' Keyword\n\nUnlock the power of type inference within conditional types. You will learn how to \"extract\" types from within other types (like the return type of a function)." },
                    { title: "Template Literals", desc: "Patterns.", content: "# Template Literal Types\n\nCombine string literals with types to create complex string patterns, like auto-generating all possible CSS classes or API routes." },
                    { title: "Decorators", desc: "Metadata.", content: "# Decorators\n\nExplore an experimental but powerful feature. You will learn how to use Decorators to modify classes and methods at runtime, similar to Java or Python." },
                    { title: "Declaration Files", desc: "d.ts.", content: "# Declaration Files (.d.ts)\n\nLearn how to provide types for existing JavaScript libraries that don't have them, and how to use @types from DefinitelyTyped." },
                    { title: "Mixins", desc: "Composition.", content: "# Mixins & Advanced OOP Patterns\n\nStudy how to \"mix\" behaviors from multiple classes into one, bypassing the limitations of single inheritance in TypeScript." },
                    { title: "Type Systems", desc: "Structural.", content: "# Nominal vs. Structural Typing\n\nUnderstand the philosophy of TypeScript’s type system and how to simulate \"Nominal\" (name-based) typing for extra safety." },
                    { title: "Scale & Perf", desc: "Monorepos.", content: "# Performance & Large Scale Architectures\n\nLearn how to structure massive TypeScript monorepos, use Project References, and optimize the compiler for speed." },
                    { title: "Full Stack TS", desc: "React/Node.", content: "# Integrating with React/Node\n\nThe final capstone. You will learn best practices for using TypeScript in full-stack development, including typing React Props, Hooks, and Express controllers." },
                ],
                finalQuiz: [
                    { question: "TypeScript kya hai?", options: ["Browser", "JS SuperSet", "Database"], correctOption: 1, explanation: "Superset of JS." },
                    { question: "Boolean type variable?", options: ["var b: bool", "let b: boolean"], correctOption: 1, explanation: "boolean full keyword." },
                    { question: "JS file generate command?", options: ["tsc", "ts-run"], correctOption: 0, explanation: "tsc compiles TS to JS." },
                    { question: "Interface use?", options: ["Design", "Shape definition", "Styling"], correctOption: 1, explanation: "Defining structure." },
                    { question: "Type for null & undefined?", options: ["void", "any", "unknown"], correctOption: 2, explanation: "unknown is safer, any covers all." }
                ]
            },
            'Go': {
                beginner: [
                    { title: "Install & Workspace", desc: "Setup.", content: "# Go Installation & Workspace\n\nSet up the Go environment. You will learn about the GOPATH, Go modules (go mod), and how to write and run your first \"Hello World\" using the Go CLI." },
                    { title: "Variables & Constants", desc: "Syntax.", content: "# Variables & Constants\n\nLearn Go's unique variable declaration syntax. You will cover the short assignment operator (:=), static typing, and how constants work in Go's compiled environment." },
                    { title: "Basic Data Types", desc: "Primitives.", content: "# Basic Data Types\n\nExplore Go's primitive types: integers, floats, strings, and booleans. You will also learn about the strict type-safety in Go that prevents accidental type mixing." },
                    { title: "Control Flow", desc: "If/Switch.", content: "# Control Flow: If-Else & Switch\n\nMaster decision-making. You will learn the if statement (with its unique initialization block) and the highly versatile Go switch that doesn't require \"break\" statements." },
                    { title: "Loops", desc: "For only.", content: "# Loops in Go (For only)\n\nGo keeps it simple. There is no while or do-while loop; only the for loop exists. You will learn how to use it for standard loops, condition-based loops, and infinite loops." },
                    { title: "Functions", desc: "Basics.", content: "# Functions Basics\n\nLearn how to write clean, modular code. Go functions can return multiple values, a feature you will master for better logic and error handling." },
                    { title: "Packages", desc: "Imports.", content: "# Packages and Imports\n\nGo is built on packages. You will learn how to organize your code into packages and how to import both standard library packages and external third-party tools." },
                    { title: "Pointers", desc: "Memory.", content: "# Pointers in Go\n\nUnlike C++, Go pointers are safe and simple. You will learn how to use pointers to share data across functions without copying, while understanding that Go does not allow pointer arithmetic." },
                    { title: "Arrays & Slices", desc: "Dynamic arrays.", content: "# Arrays and Slices\n\nUnderstand the difference between fixed-size arrays and dynamic Slices. Slices are the most commonly used data structure in Go, and you will learn to manage them using append and copy." },
                    { title: "Maps", desc: "Key-Value.", content: "# Maps (Key-Value Pairs)\n\nLearn Go’s built-in hash table implementation. You will study how to create maps, add/delete entries, and check for the existence of keys efficiently." },
                ],
                intermediate: [
                    { title: "Structs", desc: "Custom types.", content: "# Structs\n\nGo does not have classes. Instead, it uses Structs. You will learn how to define custom types to group data together and represent real-world entities." },
                    { title: "Methods", desc: "Receivers.", content: "# Methods\n\nLearn how to add behavior to your structs. You will study \"Value Receivers\" and \"Pointer Receivers\" to understand how methods interact with data in Go." },
                    { title: "Interfaces", desc: "Implicit.", content: "# Interfaces (Implicit Implementation)\n\nGo's interfaces are unique. You don't \"implement\" them explicitly; if a struct has the required methods, it satisfies the interface. This module covers the power of this decoupled design." },
                    { title: "Error Handling", desc: "No Exceptions.", content: "# Error Handling (No Exceptions)\n\nGo handles errors as values. You will learn the standard pattern of returning an error type and checking it, ensuring your code is predictable and robust." },
                    { title: "Goroutines", desc: "Concurrency.", content: "# Goroutines: The Concurrency Secret\n\nIntroduction to Go’s lightweight threads. You will learn how to run thousands of tasks simultaneously using the go keyword with very little memory overhead." },
                    { title: "Channels", desc: "Communication.", content: "# Channels Intro\n\nLearn how Goroutines communicate. Channels allow you to send data between concurrent tasks safely without using complex locks or shared memory." },
                    { title: "Defer & Panic", desc: "Cleanup.", content: "# Defer, Panic, and Recover\n\nMaster Go's cleanup and emergency mechanisms. defer ensures resources are closed, while panic and recover handle critical failures in the system." },
                    { title: "File I/O & JSON", desc: "Data.", content: "# File I/O & Working with JSON\n\nInteract with data. You will learn to read/write files and use the encoding/json package to convert Go structs into JSON for web communication." },
                    { title: "Go Modules", desc: "Dependencies.", content: "# Go Modules & Dependency Management\n\nLearn how to manage project dependencies. You will master go mod tidy and go get to keep your project libraries organized and version-controlled." },
                    { title: "Testing", desc: "Unit tests.", content: "# Testing in Go\n\nGo has a built-in testing tool. You will learn how to write test files ending in _test.go and use the testing package to verify your logic with a simple command." },
                ],
                advanced: [
                    { title: "Select & Mutex", desc: "Sync.", content: "# Advanced Concurrency (Select & Mutex)\n\nMaster complex concurrent patterns. You will learn to use the select statement to handle multiple channels and sync.Mutex for protecting shared data." },
                    { title: "Context", desc: "Cancellation.", content: "# Context Package\n\nLearn how to manage timeouts and cancellations. The context package is vital for web servers to stop long-running tasks when a user disconnects." },
                    { title: "Reflection", desc: "Runtime.", content: "# Reflection in Go\n\nExplore the reflect package. You will learn how to inspect types and values at runtime, which is useful for building generic tools like encoders or validators." },
                    { title: "REST APIs", desc: "Http Server.", content: "# Building REST APIs\n\nLearn to build high-performance web servers. You will use the standard net/http package and learn about routing, middleware, and handling requests." },
                    { title: "GORM", desc: "Database.", content: "# GORM (Database ORM)\n\nConnect Go to databases. You will learn how to use GORM to interact with SQL databases like PostgreSQL or MySQL using Go structs and methods." },
                    { title: "Microservices", desc: "Distributed.", content: "# Microservices in Go\n\nExplore how Go powers microservices. You will learn about inter-service communication, gRPC, and building scalable, distributed backends." },
                    { title: "Profiling", desc: "Performance.", content: "# Profiling & Performance Tuning\n\nLearn to find bottlenecks. You will use pprof to analyze CPU and memory usage, ensuring your Go application is as fast as possible." },
                    { title: "Race Conditions", desc: "Detection.", content: "# Race Condition Detection\n\nConcurrency can be tricky. You will learn how to use the -race flag in Go to detect and fix data races before they reach production." },
                    { title: "WebAssembly", desc: "Wasm.", content: "# WebAssembly with Go\n\nRun Go in the browser. You will learn how to compile Go code into WebAssembly (Wasm) to perform heavy calculations on the client side." },
                    { title: "Tooling & Deploy", desc: "Docker.", content: "# Go Tooling & Deployment\n\nFinalize your skills. You will learn about static binary compilation, cross-compilation for different OSs, and deploying Go apps using Docker containers." },
                ],
                finalQuiz: [
                    { question: "Go kisne banayi?", options: ["Microsoft", "Google", "Facebook"], correctOption: 1, explanation: "Google." },
                    { question: "Slices vs Arrays?", options: ["Dynamic vs Fixed", "Color"], correctOption: 0, explanation: "Slices are dynamic." },
                    { question: "Goroutine keyword?", options: ["run", "go", "start"], correctOption: 1, explanation: "go func()." },
                    { question: "Go mein while loop?", options: ["Yes", "No"], correctOption: 1, explanation: "Only for loop." },
                    { question: "Default int value?", options: ["nil", "0", "-1"], correctOption: 1, explanation: "0." }
                ]
            },
            'Rust': {
                beginner: [
                    { title: "Toolchain & Cargo", desc: "Setup.", content: "# Rust Toolchain & Cargo\n\nIntroduction to rustup and cargo, the Swiss Army knife for Rust developers. You will learn to create new projects, manage dependencies, and build your first \"Hello World\" application." },
                    { title: "Variables & Mutability", desc: "State.", content: "# Variables & Mutability\n\nIn Rust, variables are immutable by default. You will learn how to use the let keyword and the mut modifier to safely manage state, along with shadowing concepts." },
                    { title: "Data Types", desc: "Primitives.", content: "# Data Types & Constants\n\nExplore Rust's scalar and compound types, including integers, floats, booleans, and characters. You will also learn about const for compile-time values." },
                    { title: "Functions & Flow", desc: "Expressions.", content: "# Functions & Control Flow\n\nMaster function signatures and the \"expression-based\" nature of Rust. You will learn to use if, else, and match as expressions that return values." },
                    { title: "Ownership", desc: "Memory Safety.", content: "# Ownership: The Heart of Rust\n\nUnderstand the unique concept of Ownership. You will learn the three rules of ownership that allow Rust to manage memory safely without a garbage collector." },
                    { title: "References", desc: "Borrowing.", content: "# References & Borrowing\n\nLearn how to access data without taking ownership. This module covers immutable and mutable references, and the crucial rule: one mutable reference OR multiple immutable ones." },
                    { title: "Slices", desc: "Views.", content: "# Slices & Memory Safety\n\nStudy slices to reference contiguous sequences of elements in a collection without copying them. This is vital for efficient string and array handling." },
                    { title: "Structs", desc: "Custom Types.", content: "# Structs & Custom Types\n\nLearn to group related data using Structs. You will study tuple structs, unit-like structs, and how to define methods on these types using impl blocks." },
                    { title: "Enums & Matching", desc: "Patterns.", content: "# Enums & Pattern Matching\n\nMaster Rust's powerful Enums. You will learn how enums can hold data and how the match expression ensures you handle every possible case safely." },
                    { title: "Collections", desc: "Vec & String.", content: "# Standard Collections (Vec & String)\n\nDeep dive into the heap-allocated Vec<T> (Vectors) and the growable String type, learning how to manipulate dynamic data at runtime." },
                ],
                intermediate: [
                    { title: "Error Handling", desc: "Result/Option.", content: "# Error Handling (Result & Option)\n\nRust does not have null or exceptions. You will learn to use Option<T> for potentially missing values and Result<T, E> for recoverable errors." },
                    { title: "Generics", desc: "Type Params.", content: "# Generic Types\n\nWrite code that works with multiple data types. You will learn how to define generic structs and functions to reduce code duplication while maintaining performance." },
                    { title: "Traits", desc: "Shared Behavior.", content: "# Traits: Defining Shared Behavior\n\nLearn Rust's version of interfaces. Traits allow you to define methods that different types can implement, enabling powerful polymorphism." },
                    { title: "Lifetimes", desc: "Validation.", content: "# Lifetimes & Reference Validation\n\nThe \"borrow checker\" ensures references are always valid. You will learn about lifetime annotations ('a) to tell the compiler how long references should live." },
                    { title: "Iterators & Closures", desc: "Functional.", content: "# Iterators & Closures\n\nMaster functional programming in Rust. You will learn to use closures (anonymous functions) and iterators to process data collections efficiently." },
                    { title: "Smart Pointers", desc: "Box/Rc.", content: "# Smart Pointers (Box, Rc, RefCell)\n\nGo beyond standard references. You will study Box<T> for heap allocation, Rc<T> for reference counting, and RefCell<T> for interior mutability." },
                    { title: "Modules & Crates", desc: "Organization.", content: "# Modules & Crates\n\nOrganize large projects. You will learn to use mod, pub, and use to create a clean project structure and manage public/private visibility." },
                    { title: "Testing", desc: "Unit Tests.", content: "# Testing & Documentation\n\nLearn to write unit tests and integration tests directly in your source code. You will also use rustdoc to generate professional documentation." },
                    { title: "Concurrency", desc: "Threads.", content: "# Fearless Concurrency: Threads\n\nLearn how Rust's ownership system prevents data races. You will study how to spawn threads and use Arc and Mutex to share data safely." },
                    { title: "Channels", desc: "Message Passing.", content: "# Message Passing (Channels)\n\nExplore the \"Do not communicate by sharing memory; instead, share memory by communicating\" philosophy using MPSC (Multi-Producer, Single-Consumer) channels." },
                ],
                advanced: [
                    { title: "Unsafe Rust", desc: "Raw Pointers.", content: "# Unsafe Rust\n\nLearn when and how to bypass the compiler’s safety checks. This module covers raw pointers and calling external C functions (FFI)." },
                    { title: "Trait Objects", desc: "Dynamic Dispatch.", content: "# Advanced Traits & Trait Objects\n\nStudy dynamic dispatch using dyn Trait, associated types, and how to use traits to build complex, extensible software architectures." },
                    { title: "Macros", desc: "Metaprogramming.", content: "# Macros: Declarative & Procedural\n\nMeta-programming in Rust. You will learn how to write macro_rules! for declarative macros and explore procedural macros for custom derives." },
                    { title: "Async/Await", desc: "Tokio.", content: "# Async/Await & Tokio\n\nMaster asynchronous programming. You will learn to write non-blocking code and use the Tokio runtime to build high-performance network services." },
                    { title: "FFI", desc: "Interoperability.", content: "# FFI (Foreign Function Interface)\n\nLearn how Rust interacts with other languages. You will study how to call C libraries from Rust and how to export Rust code for use in C or Python." },
                    { title: "Profiling", desc: "Optimization.", content: "# Performance Profiling & Optimization\n\nLearn to find bottlenecks. You will use tools like cargo-expand and profilers to optimize binary size and execution speed." },
                    { title: "WebAssembly", desc: "Wasm.", content: "# WebAssembly (Wasm) with Rust\n\nCompile Rust to run in the web browser. You will learn to use wasm-pack to build high-speed frontend logic that interfaces with JavaScript." },
                    { title: "Interior Mutability", desc: "Patterns.", content: "# Interior Mutability Patterns\n\nDeep dive into advanced memory patterns. You will learn when to use UnsafeCell and how to build thread-safe, mutable data structures." },
                    { title: "Pinning", desc: "Future Internals.", content: "# Pinning & Future Internals\n\nUnderstand how Rust's async system works under the hood. You will learn about the Pin type and how it ensures self-referential structures don't move in memory." },
                    { title: "Runtime Build", desc: "Capstone.", content: "# Building a Runtime/Framework\n\nThe final capstone. You will learn the principles of building your own library or framework in Rust, focusing on API design and zero-cost abstractions." },
                ],
                finalQuiz: [
                    { question: "Default variable mutability?", options: ["Mutable", "Immutable"], correctOption: 1, explanation: "Immutable by default." },
                    { question: "Package manager?", options: ["npm", "cargo", "pip"], correctOption: 1, explanation: "Cargo." },
                    { question: "Match expression similar to?", options: ["Loop", "Switch", "If"], correctOption: 1, explanation: "Switch case." },
                    { question: "Ownership manages?", options: ["Memory", "Graphics"], correctOption: 0, explanation: "Memory safety." },
                    { question: "Error handling?", options: ["Try-Catch", "Result/Option"], correctOption: 1, explanation: "Result enum." }
                ]
            },
            'Swift': {
                beginner: [
                    { title: "Swift Basics & Playgrounds", desc: "Intro.", content: "# Swift Basics & Playgrounds\n\nIntroduction to Apple's development environment. You will learn the basic syntax and how to use Swift Playgrounds for interactive coding.\n\n[More Info](https://www.geeksforgeeks.org/swift-programming-basics/)" },
                    { title: "Variables & Constants", desc: "Var/Let.", content: "# Variables, Constants & Data Types\n\nUnderstand how to store data using var and let. This module covers integers, doubles, booleans, and strings, emphasizing Swift's type-safety.\n\n[More Info](https://www.geeksforgeeks.org/swift-data-types/)" },
                    { title: "Operators", desc: "Math.", content: "# Operators & Basic Math\n\nLearn arithmetic, comparison, and logical operators. You will also explore range operators (... and ..<) which are unique to Swift.\n\n[More Info](https://www.geeksforgeeks.org/swift-operators/)" },
                    { title: "Control Flow", desc: "If/Switch.", content: "# Control Flow: If-Else & Switch\n\nBuild logic into your apps. You will master if-else statements and the powerful Swift switch which supports complex pattern matching.\n\n[More Info](https://www.geeksforgeeks.org/swift-control-flow/)" },
                    { title: "Loops", desc: "Iteration.", content: "# Loops: For-In & While\n\nAutomate repetitive tasks. You will learn how to iterate over ranges, arrays, and dictionaries using the for-in loop and conditional while loops.\n\n[More Info](https://www.geeksforgeeks.org/swift-loops/)" },
                ],
                intermediate: [
                    { title: "Optionals", desc: "Safety.", content: "# Optionals & Unwrapping\n\nOptionals are a core safety feature in Swift. You will learn how to handle \"nil\" values using if let, guard let, and optional chaining.\n\n[More Info](https://www.geeksforgeeks.org/swift-optionals/)" },
                    { title: "Structs vs Classes", desc: "Types.", content: "# Structs vs. Classes\n\nUnderstand the difference between Value Types (Structs) and Reference Types (Classes). This module covers initialization, properties, and methods.\n\n[More Info](https://www.geeksforgeeks.org/swift-structures-vs-classes/)" },
                    { title: "Closures", desc: "Blocks.", content: "# Closures\n\nLearn about self-contained blocks of functionality that can be passed around. Closures are vital for handling asynchronous tasks and animations in iOS.\n\n[More Info](https://www.geeksforgeeks.org/swift-closures/)" },
                ],
                advanced: [
                    { title: "Design Patterns", desc: "Architecture.", content: "# Design Patterns in Swift\n\nLearn about Singleton, Factory, and Observer patterns and how they are implemented specifically in Swift.\n\n[More Info](https://www.geeksforgeeks.org/software-design-patterns/)" },
                    { title: "Unit Testing", desc: "XCTest.", content: "# Unit Testing with XCTest\n\nEnsure code quality by writing automated tests using XCTest for Swift apps.\n\n[More Info](https://www.geeksforgeeks.org/unit-testing-software-testing/)" },
                ],
                finalQuiz: [
                    { question: "Swift platform?", options: ["Windows", "iOS/Apple", "Linux"], correctOption: 1, explanation: "Apple." },
                    { question: "Immutable variable keyword?", options: ["var", "let", "const"], correctOption: 1, explanation: "let." },
                    { question: "Range operator?", options: ["->", "...", "::"], correctOption: 1, explanation: "..." },
                    { question: "Handle nil values?", options: ["Try-Catch", "Optionals", "Pointers"], correctOption: 1, explanation: "Optionals." },
                    { question: "Structs are?", options: ["Reference Types", "Value Types"], correctOption: 1, explanation: "Value Types." }
                ]
            },
            'Kotlin': {
                beginner: [
                    { title: "Syntax & Environment", desc: "Intro.", content: "# Kotlin Syntax & Environment\n\nSet up IntelliJ IDEA or Android Studio. You will learn the basic structure of a Kotlin file and write your first \"Hello World\" program.\n\n[More Info](https://www.geeksforgeeks.org/kotlin-programming-language/)" },
                    { title: "Val vs Var", desc: "Variables.", content: "# Variables: Val vs. Var\n\nLearn the difference between immutable (val) and mutable (var) variables, which helps in writing thread-safe and bug-free code.\n\n[More Info](https://www.geeksforgeeks.org/kotlin-variables/)" },
                    { title: "Null Safety", desc: "No NPE.", content: "# Null Safety\n\nKotlin's \"billion-dollar mistake\" fix. Learn how to use nullable types (String?) and the Elvis operator (?:) to eliminate NullPointerExceptions.\n\n[More Info](https://www.geeksforgeeks.org/kotlin-null-safety/)" },
                ],
                intermediate: [
                    { title: "Data Classes", desc: "Models.", content: "# Data Classes\n\nLearn to create classes whose main purpose is to hold data. Kotlin automatically generates equals(), hashCode(), and toString() for these.\n\n[More Info](https://www.geeksforgeeks.org/kotlin-data-classes/)" },
                    { title: "Extension Functions", desc: "Extending.", content: "# Extension Functions\n\nExtend the functionality of existing classes without inheriting from them. This is a powerful feature for keeping your code clean and readable.\n\n[More Info](https://www.geeksforgeeks.org/kotlin-extension-function/)" },
                    { title: "Coroutines", desc: "Async.", content: "# Coroutines Intro\n\nMaster asynchronous programming. Coroutines allow you to write non-blocking code (like network calls) in a simple, sequential way.\n\n[More Info](https://www.geeksforgeeks.org/kotlin-coroutines-multiple-background-tasks/)" },
                ],
                advanced: [
                    { title: "Design Patterns", desc: "Architecture.", content: "# Design Patterns in Kotlin\n\nLearn about Singleton, Factory, and Observer patterns and how they are implemented specifically in Kotlin.\n\n[More Info](https://www.geeksforgeeks.org/software-design-patterns/)" },
                    { title: "Unit Testing", desc: "JUnit.", content: "# Unit Testing with JUnit/MockK\n\nEnsure code quality by writing automated tests using JUnit or MockK for Kotlin apps.\n\n[More Info](https://www.geeksforgeeks.org/unit-testing-software-testing/)" },
                ],
                finalQuiz: [
                    { question: "Null safety symbol?", options: ["!", "?", "@"], correctOption: 1, explanation: "? for nullable." },
                    { question: "Immutable variable?", options: ["var", "val", "const"], correctOption: 1, explanation: "val." },
                    { question: "Data class generates?", options: ["UI", "toString/equals", "Database"], correctOption: 1, explanation: "Boilerplate code." },
                    { question: "Extension functions?", options: ["Inherit", "Extend without inherit"], correctOption: 1, explanation: "Extend functionality." },
                    { question: "Coroutines are for?", options: ["UI", "Async tasks", "Styling"], correctOption: 1, explanation: "Async programming." }
                ]
            },
            'Ruby': {
                beginner: [
                    { title: "Install & IRB", desc: "Setup.", content: "# Ruby Installation & IRB\n\nSet up the Ruby environment and learn to use the Interactive Ruby (IRB) shell for testing code snippets instantly.\n\n[More Info](https://www.geeksforgeeks.org/ruby-installation/)" },
                    { title: "Variables & Types", desc: "Data.", content: "# Variables & Data Types\n\nExplore how Ruby handles Numbers, Strings, and Booleans. Learn about variable naming conventions in Ruby.\n\n[More Info](https://www.geeksforgeeks.org/ruby-variables/)" },
                    { title: "Strings", desc: "Interpolation.", content: "# Strings & Interpolation\n\nMaster string manipulation and the power of interpolation (#{variable}) to embed logic directly inside text.\n\n[More Info](https://www.geeksforgeeks.org/ruby-strings/)" },
                    { title: "Numbers & Ops", desc: "Math.", content: "# Numbers & Operators\n\nLearn arithmetic operations and how Ruby treats almost everything, including numbers, as objects.\n\n[More Info](https://www.geeksforgeeks.org/ruby-operators/)" },
                    { title: "Arrays", desc: "Collections.", content: "# Arrays Basics\n\nStore ordered collections of data and learn basic methods like .push, .pop, and .length.\n\n[More Info](https://www.geeksforgeeks.org/ruby-arrays/)" },
                    { title: "Hashes", desc: "Key-Value.", content: "# Hashes (Key-Value Pairs)\n\nLearn about Ruby Hashes, which are similar to dictionaries in Python or objects in JavaScript, used for storing labeled data.\n\n[More Info](https://www.geeksforgeeks.org/ruby-hashes/)" },
                    { title: "Conditionals", desc: "If/Unless.", content: "# Conditionals (If/Unless)\n\nBuild logic using if, else, and the unique Ruby unless keyword (the opposite of if).\n\n[More Info](https://www.geeksforgeeks.org/ruby-if-else-statement/)" },
                    { title: "Loops", desc: "Iteration.", content: "# Loops (While/Until)\n\nExplore repetitive logic with while and until loops, along with the loop keyword.\n\n[More Info](https://www.geeksforgeeks.org/loops-in-ruby/)" },
                    { title: "Methods", desc: "Functions.", content: "# Methods Basics\n\nLearn to define reusable code blocks using the def keyword and understand how Ruby returns the last evaluated expression automatically.\n\n[More Info](https://www.geeksforgeeks.org/methods-in-ruby/)" },
                    { title: "Symbols", desc: "Constants.", content: "# Symbols\n\nUnderstand Symbols—immutable, reusable constants that are often used as keys in hashes for better performance.\n\n[More Info](https://www.geeksforgeeks.org/ruby-symbols/)" },
                ],
                intermediate: [
                    { title: "Blocks & Procs", desc: "Closures.", content: "# Blocks, Procs, and Lambdas\n\nMaster Ruby's powerful closure features. Learn how to pass blocks of code to methods and store them in Proc objects.\n\n[More Info](https://www.geeksforgeeks.org/ruby-block/)" },
                    { title: "Classes & Objects", desc: "OOP.", content: "# Classes and Objects\n\nDeep dive into OOP. Learn how to define classes, initialize objects, and use instance variables (@var) and class variables (@@var).\n\n[More Info](https://www.geeksforgeeks.org/ruby-classes-and-objects/)" },
                    { title: "Inheritance", desc: "Hierarchy.", content: "# Inheritance & Modules\n\nLearn how to create class hierarchies and use Modules as mixins to share behavior across different classes.\n\n[More Info](https://www.geeksforgeeks.org/ruby-inheritance/)" },
                    { title: "Access Control", desc: "Visibility.", content: "# Access Control\n\nUnderstand public, private, and protected access modifiers to control the visibility of your methods.\n\n[More Info](https://www.geeksforgeeks.org/ruby-access-control/)" },
                    { title: "Exception Handling", desc: "Rescue.", content: "# Exception Handling\n\nLearn to handle errors gracefully using begin, rescue, and ensure blocks to prevent your program from crashing.\n\n[More Info](https://www.geeksforgeeks.org/ruby-exceptions/)" },
                    { title: "File I/O", desc: "Files.", content: "# File I/O\n\nRead from and write to files using the File class. Learn to handle file paths and directories.\n\n[More Info](https://www.geeksforgeeks.org/ruby-file-handling/)" },
                    { title: "Regular Expressions", desc: "Matching.", content: "# Regular Expressions\n\nUse RegEx to search, match, and replace patterns in strings, a vital skill for text processing.\n\n[More Info](https://www.geeksforgeeks.org/ruby-regular-expressions/)" },
                    { title: "Gems", desc: "Packages.", content: "# Ruby Gems\n\nLearn how to use the RubyGems package manager to install and manage third-party libraries.\n\n[More Info](https://www.geeksforgeeks.org/ruby-gems/)" },
                    { title: "Time & Date", desc: "Scheduling.", content: "# Time and Date\n\nWork with dates and times in Ruby. Learn to format, parse, and calculate time differences.\n\n[More Info](https://www.geeksforgeeks.org/ruby-date-time/)" },
                    { title: "Networking", desc: "Sockets.", content: "# Socket Programming\n\nBasic networking concept in Ruby. Learn to create simple clients and servers.\n\n[More Info](https://www.geeksforgeeks.org/ruby-socket-programming/)" },
                ],
                advanced: [
                    { title: "Metaprogramming", desc: "Dynamic.", content: "# Metaprogramming\n\nWrite code that writes code. Learn manual dispatching, define_method, and regular expressions.\n\n[More Info](https://www.geeksforgeeks.org/metaprogramming-in-ruby/)" },
                    { title: "Rails Intro", desc: "Framework.", content: "# Introduction to Rails\n\nGet started with Ruby on Rails, the famous web application framework. Understand the MVC architecture.\n\n[More Info](https://www.geeksforgeeks.org/ruby-on-rails-introduction/)" },
                    { title: "Active Record", desc: "ORM.", content: "# Active Record\n\nInteract with databases without writing SQL. Learn how models map to database tables.\n\n[More Info](https://www.geeksforgeeks.org/ruby-on-rails-active-record/)" },
                    { title: "Routing", desc: "URL Mapping.", content: "# Rails Routing\n\nUnderstand the config/routes.rb file and how Rails maps URLs to controller actions.\n\n[More Info](https://www.geeksforgeeks.org/ruby-on-rails-routing/)" },
                    { title: "Controllers", desc: "Logic.", content: "# Action Controller\n\nLearn how controllers handle requests, interact with models, and render views.\n\n[More Info](https://www.geeksforgeeks.org/ruby-on-rails-controller/)" },
                    { title: "Views", desc: "ERB.", content: "# Action View & ERB\n\nCreate dynamic HTML pages using Embedded Ruby (ERB) templates and view helpers.\n\n[More Info](https://www.geeksforgeeks.org/ruby-on-rails-views/)" },
                    { title: "Testing", desc: "RSpec.", content: "# Testing with RSpec\n\nWrite behavioral tests for your Ruby code. Learn the describe/it syntax.\n\n[More Info](https://www.geeksforgeeks.org/ruby-rspec-testing/)" },
                    { title: "API Development", desc: "JSON.", content: "# Building APIs\n\nCreate RESTful APIs using Rails to serve JSON data to frontend applications.\n\n[More Info](https://www.geeksforgeeks.org/ruby-on-rails-api/)" },
                    { title: "Authentication", desc: "Devise.", content: "# Authentication with Devise\n\nImplement user login and signup features using the popular Devise gem.\n\n[More Info](https://github.com/heartcombo/devise)" },
                    { title: "Deployment", desc: "Heroku.", content: "# Deployment\n\nLearn how to deploy your Ruby on Rails application to platforms like Heroku.\n\n[More Info](https://www.geeksforgeeks.org/deploying-ruby-on-rails-app-on-heroku/)" },
                ],
                finalQuiz: [
                    { question: "File extension?", options: [".py", ".rb", ".js"], correctOption: 1, explanation: ".rb" },
                    { question: "Symbol prefix?", options: [":", "@", "$"], correctOption: 0, explanation: ":symbol" },
                    { question: "Unless is opposite of?", options: ["Switch", "If", "While"], correctOption: 1, explanation: "If statement." },
                    { question: "Framework for Web?", options: ["Django", "Rails", "Spring"], correctOption: 1, explanation: "Ruby on Rails." },
                    { question: "Package manager?", options: ["npm", "pip", "gem"], correctOption: 2, explanation: "RubyGems." }
                ]
            },
            'Lua': {
                beginner: [
                    { title: "Env & Setup", desc: "Install.", content: "# Lua Environment & Setup\n\nInstall the Lua interpreter and learn to use the terminal to run .lua scripts. Understand the basic \"Hello World\" structure.\n\n[More Info](https://www.geeksforgeeks.org/lua-programming-introduction/)" },
                    { title: "Variables & Types", desc: "Dynamic.", content: "# Variables & Data Types\n\nExplore Lua’s dynamic typing. Learn about the 8 basic types: nil, boolean, number, string, userdata, function, thread, and table.\n\n[More Info](https://www.geeksforgeeks.org/lua-variables-and-data-types/)" },
                    { title: "Operators", desc: "Math.", content: "# Operators & Expressions\n\nMaster arithmetic, relational, and logical operators. Understand the .. operator for string concatenation.\n\n[More Info](https://www.geeksforgeeks.org/lua-operators/)" },
                    { title: "Control Flow", desc: "If-Else.", content: "# Control Structures (If-Else)\n\nLearn how to use if, then, else, and elseif to create decision-making logic in your scripts.\n\n[More Info](https://www.geeksforgeeks.org/lua-decision-making/)" },
                    { title: "Loops: While", desc: "Repeat.", content: "# Loops: While & Repeat\n\nStudy condition-based loops. Learn the difference between while and the repeat-until loop, which executes at least once.\n\n[More Info](https://www.geeksforgeeks.org/lua-loops/)" },
                    { title: "For Loops", desc: "Iterate.", content: "# For Loops (Numeric & Generic)\n\nLearn to iterate through ranges and tables. This module covers the unique syntax of Lua’s for loops.\n\n[More Info](https://www.geeksforgeeks.org/lua-for-loop/)" },
                    { title: "Functions", desc: "Blocks.", content: "# Functions Basics\n\nDefine reusable blocks of code. Learn about function parameters and how Lua functions can return multiple values.\n\n[More Info](https://www.geeksforgeeks.org/functions-in-lua/)" },
                    { title: "Scope", desc: "Local.", content: "# Local vs. Global Scope\n\nUnderstand why using local variables is essential for performance and avoiding bugs in large scripts.\n\n[More Info](https://www.tutorialspoint.com/lua/lua_variables.htm)" },
                    { title: "Strings", desc: "Text.", content: "# String Manipulation\n\nMaster built-in string functions like string.upper, string.lower, and string.sub to handle text data.\n\n[More Info](https://www.tutorialspoint.com/lua/lua_strings.htm)" },
                    { title: "Tables Intro", desc: "Arrays.", content: "# Introduction to Tables\n\nTables are the only data structure in Lua. Learn how to use them as simple arrays (indexed from 1).\n\n[More Info](https://www.geeksforgeeks.org/lua-tables/)" },
                ],
                intermediate: [
                    { title: "Dictionaries", desc: "Key-Value.", content: "# Tables as Dictionaries\n\nLearn to use tables with string keys to store complex data objects, similar to JSON.\n\n[More Info](https://www.tutorialspoint.com/lua/lua_tables.htm)" },
                    { title: "Iterators", desc: "Pairs.", content: "# Iterators (ipairs & pairs)\n\nMaster the difference between ipairs (for arrays) and pairs (for dictionaries) when traversing tables.\n\n[More Info](https://www.tutorialspoint.com/lua/lua_iterators.htm)" },
                    { title: "Varargs", desc: "...", content: "# Variable Arguments (...)\n\nLearn how to create functions that can accept any number of inputs using the triple-dot syntax.\n\n[More Info](https://www.lua.org/pil/5.2.html)" },
                    { title: "Error Handling", desc: "Pcall.", content: "# Error Handling (pcall & xpcall)\n\nUse \"protected calls\" to execute code and catch errors without crashing the entire application.\n\n[More Info](https://www.tutorialspoint.com/lua/lua_error_handling.htm)" },
                    { title: "Coroutines", desc: "Tasks.", content: "# Coroutines Intro\n\nLearn about collaborative multitasking. Coroutines allow you to pause and resume function execution.\n\n[More Info](https://www.tutorialspoint.com/lua/lua_coroutines.htm)" },
                    { title: "Metatables", desc: "Behavior.", content: "# Metatables & Metamethods\n\nChange the behavior of tables. Learn about __index, __newindex, and operator overloading.\n\n[More Info](https://www.lua.org/pil/13.html)" },
                    { title: "OOP in Lua", desc: "Classes.", content: "# Object-Oriented Programming\n\nLua doesn't have classes, but you will learn to simulate them using tables and metatables.\n\n[More Info](https://www.lua.org/pil/16.html)" },
                    { title: "Modules", desc: "Packages.", content: "# Modules & Packages\n\nOrganize your code into reusable modules using the require function.\n\n[More Info](https://www.lua.org/pil/15.html)" },
                    { title: "File I/O", desc: "Files.", content: "# File I/O\n\nRead from and write to files. Learn about the io library and file handles.\n\n[More Info](https://www.tutorialspoint.com/lua/lua_file_io.htm)" },
                    { title: "Math Lib", desc: "Calculations.", content: "# Math Library\n\nExplore the math library for advanced calculations, random numbers, and trigonometry.\n\n[More Info](https://www.tutorialspoint.com/lua/lua_math_library.htm)" },
                ],
                advanced: [
                    { title: "Weak Tables", desc: "Memory.", content: "# Weak Tables\n\nUnderstand weak references and how they interact with Lua's garbage collector.\n\n[More Info](https://www.lua.org/pil/17.html)" },
                    { title: "C API Intro", desc: "Embedding.", content: "# C API Introduction\n\nLua is designed to be embedded. Learn the basics of the Lua C API and the stack.\n\n[More Info](https://www.lua.org/pil/24.html)" },
                    { title: "Calling C", desc: "Extensions.", content: "# Calling C from Lua\n\nExtend Lua functionality by writing libraries in C and calling them from your scripts.\n\n[More Info](https://www.lua.org/pil/26.html)" },
                    { title: "LuaJIT", desc: "Performance.", content: "# LuaJIT & FFI\n\nIntroduction to the Just-In-Time compiler and using the FFI library for high performance.\n\n[More Info](https://luajit.org/)" },
                    { title: "LÖVE Framework", desc: "Game Dev.", content: "# LÖVE (Love2D) Basics\n\nApply your Lua skills to game development using the popular LÖVE framework.\n\n[More Info](https://love2d.org/wiki/Main_Page)" },
                    { title: "Roblox scripting", desc: "Luau.", content: "# Roblox & Luau\n\nBrief overview of Luau, the derivative of Lua used in Roblox development.\n\n[More Info](https://create.roblox.com/docs/scripting)" },
                    { title: "Coroutines Adv", desc: "Pipelines.", content: "# Advanced Coroutines\n\nUse coroutines for producer-consumer pipelines and complex state management.\n\n[More Info](https://www.lua.org/pil/9.html)" },
                    { title: "Garbage Collection", desc: "Memory.", content: "# Garbage Collection Control\n\nManually control the garbage collector for performance-critical applications.\n\n[More Info](https://www.lua.org/manual/5.1/manual.html#2.10)" },
                    { title: "Debugging", desc: "Tools.", content: "# Debugging & Profiling\n\nLearn to use the debug library to inspect the stack and profile your code.\n\n[More Info](https://www.lua.org/pil/23.html)" },
                    { title: "LuaRocks", desc: "Package Mgr.", content: "# LuaRocks\n\nManage dependencies and install third-party modules using the Lua package manager.\n\n[More Info](https://luarocks.org/)" },
                ],
                finalQuiz: [
                    { question: "Lua array index start?", options: ["0", "1", "-1"], correctOption: 1, explanation: "1-based indexing." },
                    { question: "Comment syntax?", options: ["//", "#", "--"], correctOption: 2, explanation: "-- comment." },
                    { question: "String concat operator?", options: ["+", ".", ".."], correctOption: 2, explanation: ".. operator." },
                    { question: "Get length of string/table?", options: ["len()", "#", "size()"], correctOption: 1, explanation: "# operator." },
                    { question: "Function return multiple values?", options: ["True", "False"], correctOption: 0, explanation: "Yes, separated by commas." }
                ]
            },
            'R': {
                beginner: [
                    { title: "Setup", desc: "RStudio.", content: "# R & RStudio Setup\n\nSet up the R environment and RStudio. Learn to use the console and script editor to execute mathematical commands.\n\n[More Info](https://www.geeksforgeeks.org/r-programming-language-introduction/)" },
                    { title: "Variables", desc: "Assignment.", content: "# Variables & Assignment\n\nLearn the <- operator for assigning values and the basic data types like Numeric, Integer, Complex, and Character.\n\n[More Info](https://www.geeksforgeeks.org/r-variables/)" },
                    { title: "Vectors", desc: "Core.", content: "# Vectors - The Core of R\n\nVectors are the most basic data structure in R. Learn to create sequences using c() and perform vectorized operations.\n\n[More Info](https://www.geeksforgeeks.org/r-vectors/)" },
                    { title: "Math & Ops", desc: "Calculation.", content: "# Basic Math & Operators\n\nExplore arithmetic and logical operators. Learn how R handles operations on entire vectors simultaneously.\n\n[More Info](https://www.geeksforgeeks.org/r-operators/)" },
                    { title: "Conditionals", desc: "If-Else.", content: "# Decision Making (If-Else)\n\nUse conditional statements to filter data or control the logic flow of your analysis.\n\n[More Info](https://www.geeksforgeeks.org/r-if-else-statement/)" },
                    { title: "Loops", desc: "Iteration.", content: "# Loops in R\n\nLearn for, while, and repeat loops. Understand why loops are often replaced by \"Apply\" functions in R.\n\n[More Info](https://www.geeksforgeeks.org/r-loops/)" },
                    { title: "Functions", desc: "Custom.", content: "# Functions\n\nLearn to write custom functions to automate repetitive data cleaning or calculation tasks.\n\n[More Info](https://www.geeksforgeeks.org/functions-in-r-programming/)" },
                    { title: "Lists", desc: "Heterogeneous.", content: "# Lists\n\nUnlike vectors, lists can hold different types of elements. Learn to create and index multi-type lists.\n\n[More Info](https://www.geeksforgeeks.org/r-lists/)" },
                    { title: "Matrices", desc: "2D.", content: "# Matrices\n\nUnderstand 2D data structures where all elements are of the same type, essential for linear algebra.\n\n[More Info](https://www.geeksforgeeks.org/r-matrices/)" },
                    { title: "Data Frames", desc: "Tables.", content: "# Data Frames Basics\n\nThe most important structure for Data Science. Learn to handle table-like data where columns have different types.\n\n[More Info](https://www.geeksforgeeks.org/r-data-frames/)" },
                ],
                intermediate: [
                    { title: "Factors", desc: "Categories.", content: "# Factors\n\nLearn how R handles categorical data (like \"Male/Female\" or \"Low/Medium/High\") using Factors.\n\n[More Info](https://www.geeksforgeeks.org/r-factors/)" },
                    { title: "Import Data", desc: "CSV/Excel.", content: "# Loading CSV & Excel Data\n\nMaster importing data from external files into R for analysis using read.csv.\n\n[More Info](https://www.geeksforgeeks.org/reading-files-in-r-programming/)" },
                    { title: "Data Cleaning", desc: "Wrangling.", content: "# Data Cleaning Basics\n\nLearn to handle missing data (NA), remove duplicates, and filter outliers.\n\n[More Info](https://www.geeksforgeeks.org/data-cleaning-in-r/)" },
                    { title: "Basic Plotting", desc: "Visuals.", content: "# Basic Plotting\n\nIntroduction to plot(), hist(), and barplot() for quick data visualization.\n\n[More Info](https://www.geeksforgeeks.org/r-plotting/)" },
                    { title: "Apply Family", desc: "Vectorization.", content: "# Apply Functions\n\nMaster apply(), lapply(), and sapply() to write cleaner, more idiomatic R code instead of loops.\n\n[More Info](https://www.geeksforgeeks.org/apply-family-in-r-programming/)" },
                    { title: "Dplyr Basics", desc: "Manipulation.", content: "# dplyr: Data Manipulation\n\nIntroduction to the tidyverse. Learn select, filter, mutate, arrange, and summarize functions.\n\n[More Info](https://www.geeksforgeeks.org/dplyr-package-in-r-programming/)" },
                    { title: "Ggplot2 Intro", desc: "Grammar.", content: "# ggplot2: Grammar of Graphics\n\nCreate beautiful, publication-quality plots using the ggplot2 package layer system.\n\n[More Info](https://www.geeksforgeeks.org/ggplot2-in-r-programming/)" },
                    { title: "Dates", desc: "Lubridate.", content: "# Dates & Times (Lubridate)\n\nHandle dates and times effortlessly using the lubridate package.\n\n[More Info](https://www.geeksforgeeks.org/r-lubridate-package/)" },
                    { title: "Stringr", desc: "Text.", content: "# String Manipulation (stringr)\n\nAdvanced string handling using the stringr package from tidyverse.\n\n[More Info](https://www.geeksforgeeks.org/stringr-package-in-r-programming/)" },
                    { title: "Statistics", desc: "Hypothesis.", content: "# Basic Statistics\n\nPerform t-tests, chi-square tests, and correlation analysis using built-in R functions.\n\n[More Info](https://www.geeksforgeeks.org/statistical-analysis-in-r/)" },
                ],
                advanced: [
                    { title: "Regression", desc: "Linear.", content: "# Linear Regression\n\nBuild and interpret linear regression models (`lm`) to predict outcomes.\n\n[More Info](https://www.geeksforgeeks.org/linear-regression-in-r-programming/)" },
                    { title: "Classification", desc: "Logistic.", content: "# Logistic Regression\n\nPredict binary outcomes using logistic regression models (`glm`).\n\n[More Info](https://www.geeksforgeeks.org/logistic-regression-in-r-programming/)" },
                    { title: "RMarkdown", desc: "Reports.", content: "# R Markdown\n\nCreate dynamic reports that combine code, output, and narrative text in one document.\n\n[More Info](https://www.geeksforgeeks.org/introduction-to-r-markdown/)" },
                    { title: "Shiny Basics", desc: "Web Apps.", content: "# Shiny Web Apps\n\nBuild interactive web applications directly from R using the Shiny package.\n\n[More Info](https://www.geeksforgeeks.org/introduction-to-shiny-in-r/)" },
                    { title: "Caret Pkg", desc: "ML.", content: "# Machine Learning (caret)\n\nStreamline the process of creating predictive models using the caret package.\n\n[More Info](https://www.geeksforgeeks.org/caret-package-in-r-programming/)" },
                    { title: "Time Series", desc: "Forecasting.", content: "# Time Series Analysis\n\nAnalyze and forecast time-dependent data.\n\n[More Info](https://www.geeksforgeeks.org/time-series-analysis-in-r/)" },
                    { title: "Web Scraping", desc: "Rvest.", content: "# Web Scraping (rvest)\n\nExtract data from websites using the rvest package.\n\n[More Info](https://www.geeksforgeeks.org/web-scraping-using-r-language/)" },
                    { title: "API Stats", desc: "JSON.", content: "# Working with APIs\n\nFetch data from REST APIs using httr and jsonlite.\n\n[More Info](https://www.geeksforgeeks.org/r-json-files/)" },
                    { title: "Package Dev", desc: "Creation.", content: "# Creating R Packages\n\nLearn the structure of an R package and how to document and publish your own.\n\n[More Info](https://r-pkgs.org/)" },
                    { title: "Performance", desc: "Rcpp.", content: "# High Performance R\n\nOptimize R code and integrate C++ using Rcpp for speed.\n\n[More Info](https://www.geeksforgeeks.org/rcpp-package-in-r-programming/)" },
                ],
                finalQuiz: [
                    { question: "Assignment operator?", options: ["=", "<-", "=="], correctOption: 1, explanation: "<- is standard." },
                    { question: "Vector creation func?", options: ["v()", "c()", "vec()"], correctOption: 1, explanation: "c() combine." },
                    { question: "Data Frame col access?", options: ["df.col", "df$col", "df->col"], correctOption: 1, explanation: "$ operator." },
                    { question: "Plotting package?", options: ["matplotlib", "ggplot2", "seaborn"], correctOption: 1, explanation: "ggplot2." },
                    { question: "Install package command?", options: ["npm install", "install.packages()", "pip install"], correctOption: 1, explanation: "install.packages()." }
                ]
            },
            'DSA': {
                beginner: [
                    { title: "Intro & Analysis", desc: "Big O.", content: "# Intro to DSA & Analysis\n\nEfficiency matters. Learn Time and Space complexity (Big O Notation) to choose the best algorithms.\n\n[More Info](https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/)" },
                    { title: "Arrays", desc: "Contiguous.", content: "# Arrays Basics\n\nFixed vs Dynamic arrays. Operations like insertion, deletion, and searching.\n\n[More Info](https://www.geeksforgeeks.org/array-data-structure/)" },
                    { title: "Strings", desc: "Patterns.", content: "# String Manipulation\n\nHandling character arrays, reversing strings, and basic pattern matching.\n\n[More Info](https://www.geeksforgeeks.org/string-data-structure/)" },
                    { title: "Linear vs Binary Search", desc: "Searching.", content: "# Searching Algorithms\n\nCompare O(N) Linear Search with O(log N) Binary Search.\n\n[More Info](https://www.geeksforgeeks.org/binary-search/)" },
                    { title: "Sorting Basics", desc: "Bubble/Selection.", content: "# Sorting Basics\n\nImplementation of Bubble, Selection, and Insertion sort algorithms.\n\n[More Info](https://www.geeksforgeeks.org/sorting-algorithms/)" },
                    { title: "Singly Linked List", desc: "Nodes.", content: "# Singly Linked List\n\nDynamic memory allocation and pointer manipulation for node chains.\n\n[More Info](https://www.geeksforgeeks.org/data-structures/linked-list/)" },
                    { title: "Doubly & Circular LL", desc: "Two-way.", content: "# Advanced Linked Lists\n\nDoubly (two-way) and Circular (looped) list implementations.\n\n[More Info](https://www.geeksforgeeks.org/doubly-linked-list/)" },
                    { title: "Stacks", desc: "LIFO.", content: "# Stacks (LIFO)\n\nLast-In-First-Out data structure used in recursion and expression matching.\n\n[More Info](https://www.geeksforgeeks.org/stack-data-structure/)" },
                    { title: "Queues", desc: "FIFO.", content: "# Queues (FIFO)\n\nFirst-In-First-Out logic. Implement Simple, Circular, and Double-ended queues.\n\n[More Info](https://www.geeksforgeeks.org/queue-data-structure/)" },
                    { title: "Hashing", desc: "Hash Tables.", content: "# Hashing & Collisions\n\nO(1) search power. Understanding hash functions and collision resolution.\n\n[More Info](https://www.geeksforgeeks.org/hashing-data-structure/)" },
                ],
                intermediate: [
                    { title: "Recursion Deep Dive", desc: "Self-calling.", content: "# Recursion\n\nBreaking complex problems into sub-problems. The foundation of Trees and DP.\n\n[More Info](https://www.geeksforgeeks.org/recursion/)" },
                    { title: "Divide & Conquer", desc: "Merge/Quick Sort.", content: "# Advanced Sorting\n\nMerge Sort (Stable) and Quick Sort (In-place) algorithm analysis.\n\n[More Info](https://www.geeksforgeeks.org/merge-sort/)" },
                    { title: "Bit Manipulation", desc: "O/1 logic.", content: "# Bit Manipulation\n\nUsing bitwise operators (&, |, ^, ~) for high-performance calculations.\n\n[More Info](https://www.geeksforgeeks.org/bit-manipulation/)" },
                    { title: "Pointers & Windows", desc: "Optimization.", content: "# Two Pointers & Sliding Window\n\nOptimizing O(N^2) problems to O(N) using window techniques.\n\n[More Info](https://www.geeksforgeeks.org/window-sliding-technique/)" },
                    { title: "Trees Intro", desc: "Hierarchy.", content: "# Introduction to Trees\n\nRoot, Nodes, and Leaf concepts. Building a basic Binary Tree.\n\n[More Info](https://www.geeksforgeeks.org/binary-tree-data-structure/)" },
                    { title: "Tree Traversals", desc: "DFS/BFS.", content: "# Tree Traversals\n\nInorder, Preorder, and Postorder traversals using recursion and iteration.\n\n[More Info](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/)" },
                    { title: "BST", desc: "Sorted Tree.", content: "# Binary Search Tree\n\nInsertion, deletion, and optimized searching in a sorted tree structure.\n\n[More Info](https://www.geeksforgeeks.org/binary-search-tree-data-structure/)" },
                    { title: "Heaps", desc: "Priority.", content: "# Heaps & Priority Queues\n\nMax-heap, Min-heap implementation and the Heap Sort algorithm.\n\n[More Info](https://www.geeksforgeeks.org/heap-data-structure/)" },
                    { title: "Graphs Intro", desc: "Networks.", content: "# Introduction to Graphs\n\nStoring graphs using Adjacency Matrix and List representations.\n\n[More Info](https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/)" },
                    { title: "Greedy Basics", desc: "Local Optima.", content: "# Greedy Algorithms\n\nMaking the best local choice at each step (e.g., Huffman Coding).\n\n[More Info](https://www.geeksforgeeks.org/greedy-algorithms/)" },
                ],
                advanced: [
                    { title: "Backtracking", desc: "Sudoku/N-Queen.", content: "# Backtracking\n\nTrial and error method to solve Sudoku and N-Queen problems.\n\n[More Info](https://www.geeksforgeeks.org/backtracking-algorithms/)" },
                    { title: "DP - Memoization", desc: "Caching.", content: "# Dynamic Programming (Memoization)\n\nTop-down approach to optimize recursion using pre-calculated results.\n\n[More Info](https://www.geeksforgeeks.org/dynamic-programming/)" },
                    { title: "DP - Tabulation", desc: "Bottom-up.", content: "# Dynamic Programming (Tabulation)\n\nSolving Knapsack and LCS problems using bottom-up tables.\n\n[More Info](https://www.geeksforgeeks.org/tabulation-vs-memoization/)" },
                    { title: "Advanced Graphs", desc: "Shortest Path.", content: "# Graph Algorithms\n\nDijkstra and Bellman-Ford algorithms for finding the shortest path.\n\n[More Info](https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/)" },
                    { title: "MST", desc: "Prims/Kruskals.", content: "# Minimum Spanning Tree\n\nOptimizing connectivity cost using Prim's and Kruskal's algorithms.\n\n[More Info](https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/)" },
                    { title: "Tries", desc: "Prefix Trees.", content: "# Tries (Prefix Trees)\n\nImplementing efficient dictionary search and auto-complete features.\n\n[More Info](https://www.geeksforgeeks.org/trie-insert-and-search/)" },
                    { title: "Segment Trees", desc: "Range Queries.", content: "# Segment Trees\n\nHandling range sum and minimum queries in O(log N) time.\n\n[More Info](https://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/)" },
                    { title: "DSU", desc: "Disjoint Sets.", content: "# Disjoint Set Union\n\nManaging connected components and cycle detection efficiently.\n\n[More Info](https://www.geeksforgeeks.org/disjoint-set-data-structures/)" },
                    { title: "Balanced Trees", desc: "AVL/RB Trees.", content: "# Self-Balancing Trees\n\nMaintaining performance using AVL and Red-Black tree rotations.\n\n[More Info](https://www.geeksforgeeks.org/avl-tree-set-1-insertion/)" },
                    { title: "Network Flow", desc: "Advanced DP.", content: "# Network Flow & Bitmasking\n\nFord-Fulkerson algorithm and bitmask DP for competitive programming.\n\n[More Info](https://www.geeksforgeeks.org/ford-fulkerson-algorithm-for-maximum-flow-problem/)" },
                ],
                finalQuiz: [
                    { question: "Binary Search ki Time Complexity?", options: ["O(N)", "O(log N)", "O(N^2)"], correctOption: 1, explanation: "Divide and Conquer." },
                    { question: "Stack kis principle par kaam karta hai?", options: ["FIFO", "LIFO", "FILO"], correctOption: 1, explanation: "Last In First Out." },
                    { question: "O(1) access kis structure mein hota hai?", options: ["Array", "Linked List", "Hash Table"], correctOption: 2, explanation: "Hash Table (average case)." },
                    { question: "Balanced tree ka example?", options: ["Binary Tree", "AVL Tree", "Heap"], correctOption: 1, explanation: "AVL is self-balancing." },
                    { question: "Shortest path algorithm?", options: ["DFS", "Dijkstra", "Kruskal"], correctOption: 1, explanation: "Dijkstra's Algo." }
                ]
            },
            'System Design': {
                beginner: [
                    { title: "Intro to System Design", desc: "Scalability goals.", content: "# Introduction to System Design\n\nDefine components and data flow to build scalable and reliable software.\n\n[More Info](https://www.geeksforgeeks.org/system-design-tutorial/)" },
                    { title: "Scalability", desc: "Vert vs Horiz.", content: "# Scalability Fundamentals\n\nScale-up (Vertical) vs Scale-out (Horizontal) and their trade-offs.\n\n[More Info](https://www.geeksforgeeks.org/horizontal-and-vertical-scaling/)" },
                    { title: "Architecture", desc: "Client-Server.", content: "# Client-Server Architecture\n\nModern web foundation: Request-Response cycle and HTTP protocols.\n\n[More Info](https://www.geeksforgeeks.org/client-server-model/)" },
                    { title: "Load Balancers", desc: "Traffic dist.", content: "# Load Balancing\n\nDistributing traffic across servers to prevent crashes (Round Robin, etc.).\n\n[More Info](https://www.geeksforgeeks.org/load-balancing-system-design/)" },
                    { title: "Caching", desc: "Performance.", content: "# Caching\n\nUsing RAM to store frequent data for lightning-fast responses.\n\n[More Info](https://www.geeksforgeeks.org/caching-system-design-concept/)" },
                    { title: "DNS", desc: "Phonebook.", content: "# Domain Name System\n\nMapping human-friendly URLs to machine IP addresses.\n\n[More Info](https://www.geeksforgeeks.org/dns-domain-name-system/)" },
                    { title: "Latency vs Throughput", desc: "Metrics.", content: "# System Metrics\n\nBalancing delay (Latency) with capacity (Throughput).\n\n[More Info](https://www.geeksforgeeks.org/latency-vs-throughput-in-system-design/)" },
                    { title: "Availability", desc: "Reliability.", content: "# Availability vs Reliability\n\nEnsuring system uptime and error-free operation (Five Nines concept).\n\n[More Info](https://www.geeksforgeeks.org/availability-vs-reliability/)" },
                    { title: "Monolith vs Micro", desc: "Structs.", content: "# Architecture Patterns\n\nSingle-block Monolithic vs Independent Microservices architectures.\n\n[More Info](https://www.geeksforgeeks.org/monolithic-vs-microservices-architecture/)" },
                    { title: "CDNs", desc: "Global content.", content: "# Content Delivery Networks\n\nDistributing static content geographically to reduce latency.\n\n[More Info](https://www.geeksforgeeks.org/content-delivery-network-cdn/)" },
                ],
                intermediate: [
                    { title: "SQL vs NoSQL", desc: "Databases.", content: "# Databases: SQL vs NoSQL\n\nChoosing between Relational MySQL and Document-based MongoDB/Redis.\n\n[More Info](https://www.geeksforgeeks.org/difference-between-sql-and-nosql/)" },
                    { title: "Database Sharding", desc: "Partitions.", content: "# Sharding\n\nBreaking large databases into horizontal partitions for scale.\n\n[More Info](https://www.geeksforgeeks.org/database-sharding-a-system-design-concept/)" },
                    { title: "Replication", desc: "Copies.", content: "# Database Replication\n\nMaster-Slave models to prevent data loss and increase availability.\n\n[More Info](https://www.geeksforgeeks.org/database-replication/)" },
                    { title: "CAP Theorem", desc: "Tradeoffs.", content: "# CAP Theorem\n\nConsistency, Availability, and Partition Tolerance decisions in distributed systems.\n\n[More Info](https://www.geeksforgeeks.org/the-cap-theorem/)" },
                    { title: "Proxies", desc: "Nginx.", content: "# Forward vs Reverse Proxies\n\nProtecting clients and servers while managing load distribution.\n\n[More Info](https://www.geeksforgeeks.org/forward-proxy-vs-reverse-proxy/)" },
                    { title: "Message Queues", desc: "Async.", content: "# Async Communication\n\nUsing Kafka or RabbitMQ to decouple systems and handle tasks asynchronously.\n\n[More Info](https://www.geeksforgeeks.org/message-queues-system-design/)" },
                    { title: "Consistent Hashing", desc: "Mapping.", content: "# Consistent Hashing\n\nScalable data mapping to prevent redistribution overhead when servers change.\n\n[More Info](https://www.geeksforgeeks.org/consistent-hashing-system-design/)" },
                    { title: "API Gateway", desc: "Entry point.", content: "# API Gateway\n\nCentralizing authentication, rate limiting, and routing for microservices.\n\n[More Info](https://www.geeksforgeeks.org/api-gateway-in-microservices/)" },
                    { title: "Health Checks", desc: "Monitoring.", content: "# Heartbeats & Health Checks\n\nMechanisms to detect server failures in central systems.\n\n[More Info](https://www.geeksforgeeks.org/health-check-in-system-design/)" },
                    { title: "Rate Limiting", desc: "Abuse prevention.", content: "# Rate Limiting\n\nImplementing Token/Leaky Bucket algorithms to control user requests.\n\n[More Info](https://www.geeksforgeeks.org/rate-limiting-system-design/)" },
                ],
                advanced: [
                    { title: "Distributed TX", desc: "2PC.", content: "# Distributed Transactions\n\nMaintaining consistency across services using Two-Phase Commit protocols.\n\n[More Info](https://www.geeksforgeeks.org/two-phase-commit-protocol-2pc/)" },
                    { title: "Consensus", desc: "Paxos/Raft.", content: "# Consensus Algorithms\n\nHow distributed nodes agree on values for fault-tolerant operation.\n\n[More Info](https://www.geeksforgeeks.org/raft-consensus-algorithm/)" },
                    { title: "Leader Election", desc: "Coordination.", content: "# Leader Election\n\nUsing tools like Zookeeper to select coordinator nodes in a cluster.\n\n[More Info](https://www.geeksforgeeks.org/leader-election-in-distributed-systems/)" },
                    { title: "Consistency Models", desc: "Strong vs Eventual.", content: "# Eventual vs Strong Consistency\n\nUnderstanding data propagation trade-offs (e.g., DynamoDB).\n\n[More Info](https://www.geeksforgeeks.org/eventual-consistency-vs-strong-consistency/)" },
                    { title: "Case: TinyURL", desc: "URL Shortener.", content: "# Designing TinyURL\n\nImplementing hashing, database choice, and reliable redirection.\n\n[More Info](https://www.geeksforgeeks.org/how-to-design-a-url-shortener-like-tinyurl/)" },
                    { title: "Case: WhatsApp", desc: "Chat system.", content: "# Designing WhatsApp\n\nWebsockets, storage, and push notifications at massive scale.\n\n[More Info](https://www.geeksforgeeks.org/system-design-whatsapp-chat-messenger/)" },
                    { title: "Case: Netflix", desc: "Video streaming.", content: "# Designing Netflix\n\nVideo encoding, CDN usage, and adaptive bitrate streaming architecture.\n\n[More Info](https://www.geeksforgeeks.org/system-design-video-streaming-service-like-netflix/)" },
                    { title: "Case: Google Search", desc: "Indexing.", content: "# Designing Google Search\n\nDistributed crawling, indexing, and ranking at internet scale.\n\n[More Info](https://www.geeksforgeeks.org/system-design-of-google-search/)" },
                    { title: "Disaster Recovery", desc: "Backups.", content: "# Disaster Recovery\n\nMulti-region deployments and backup strategies for data center failure.\n\n[More Info](https://www.geeksforgeeks.org/disaster-recovery-plan/)" },
                    { title: "Interview Patterns", desc: "Estimation.", content: "# System Design Interview Patterns\n\nFAANG-level step-by-step approach and technical estimation techniques.\n\n[More Info](https://www.geeksforgeeks.org/how-to-crack-system-design-interviews/)" },
                ],
                finalQuiz: [
                    { question: "Load Balancer purpose?", options: ["Speed", "Distribute Traffic", "Data"], correctOption: 1, explanation: "Distribution." },
                    { question: "Horizontal Scaling ka matlab?", options: ["RAM badhana", "Naye Servers add karna"], correctOption: 1, explanation: "Adding more nodes." },
                    { question: "CAP Theorem mein 'P'?", options: ["Performance", "Partition Tolerance", "Persistence"], correctOption: 1, explanation: "Partition Tolerance." },
                    { question: "Async comms ke liye kya use hota hai?", options: ["Kafka", "SQL", "HTML"], correctOption: 0, explanation: "Message Queues." },
                    { question: "Static content speed up karne ke liye?", options: ["CDN", "RAM", "CPU"], correctOption: 0, explanation: "Content Delivery Network." }
                ]
            }
        };

        console.log(`Seeding ${stacks.length} stacks...`);

        for (const stack of stacks) {
            let challenges = [];

            // Check if we have detailed content for this stack
            if (courseContent[stack.id]) {
                console.log(`Seeding Comprehensive Course: ${stack.id}...`);
                const content = courseContent[stack.id];
                let levelCounter = 1;

                // Helper to add module levels
                const addModuleLevel = async (mod, diff) => {
                    const challenge = await Challenge.create({
                        title: mod.title,
                        type: 'Article',
                        description: mod.desc,
                        difficulty: diff === 'Beginner' ? 'Easy' : diff === 'Intermediate' ? 'Medium' : 'Hard',
                        xpReward: diff === 'Beginner' ? 30 : diff === 'Intermediate' ? 50 : 80,
                        articleContent: mod.content,
                        instructions: "Read the article."
                    });
                    await Level.create({
                        levelNumber: levelCounter++,
                        title: mod.title,
                        description: mod.desc,
                        category: stack.id,
                        difficulty: diff,
                        requiredXp: 0,
                        challenges: [challenge._id]
                    });
                };

                // Add Beginner
                if (content.beginner) {
                    for (const mod of content.beginner) await addModuleLevel(mod, 'Beginner');
                }
                // Add Intermediate
                if (content.intermediate) {
                    for (const mod of content.intermediate) await addModuleLevel(mod, 'Intermediate');
                }
                // Add Advanced
                if (content.advanced) {
                    for (const mod of content.advanced) await addModuleLevel(mod, 'Advanced');
                }

                // Add Final Quiz (if exists)
                if (content.finalQuiz && content.finalQuiz.length > 0) {
                    const quiz = await Challenge.create({
                        title: `${stack.id} Certification Exam`,
                        type: 'Quiz',
                        description: "Final comprehensive assessment.",
                        difficulty: 'Hard',
                        xpReward: 500,
                        quizQuestions: content.finalQuiz
                    });
                    await Level.create({
                        levelNumber: levelCounter++,
                        title: "Certification Exam",
                        description: "Prove your mastery.",
                        category: stack.id,
                        difficulty: 'Advanced',
                        requiredXp: 0,
                        challenges: [quiz._id]
                    });
                }
            } else {
                // Standard/Placeholder contents for other stacks
                const challenge = await Challenge.create({
                    title: `${stack.id} Starter`,
                    description: `Introductory challenge for ${stack.id}`,
                    difficulty: 'Easy',
                    xpReward: 50,
                    instructions: `Complete the basic task for ${stack.id}.`,
                    initialCode: stack.code,
                    type: 'Algorithm'
                });
                challenges = [challenge];

                // Create Level 1
                await Level.create({
                    levelNumber: 1,
                    title: stack.title,
                    description: stack.desc,
                    category: stack.id,
                    difficulty: 'Beginner',
                    requiredXp: 0,
                    challenges: challenges.map(c => c._id) // Add all challenges to the level
                });

                // Create Level 2 (Placeholder)
                await Level.create({
                    levelNumber: 2,
                    title: `${stack.id} Advanced`,
                    description: 'Moving to the next step.',
                    category: stack.id,
                    difficulty: 'Intermediate',
                    requiredXp: 100,
                    challenges: []
                });
            }
        }

        console.log('Seeding Completed with Categories!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
