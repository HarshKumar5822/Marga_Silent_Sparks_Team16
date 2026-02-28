const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Challenge = require('./models/Challenge');

dotenv.config();

const challenges = [
    // PYTHON
    {
        title: "Reverse the String",
        description: "Write a function that reverses a given string. Reversing strings is a core concept in data manipulation.",
        difficulty: "Easy",
        category: "Python",
        type: "Algorithm",
        xpReward: 50,
        instructions: "Given a string `s`, return the reversed version of it. Do not use built-in reverse functions if possible to understand the logic.",
        template: "def reverse_string(s):\n    # your code here\n    pass",
        testCases: [
            { input: "hello", expectedOutput: "olleh" },
            { input: "world", expectedOutput: "dlrow" }
        ]
    },
    {
        title: "Find the Missing Number",
        description: "Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.",
        difficulty: "Medium",
        category: "Python",
        type: "Algorithm",
        xpReward: 100,
        instructions: "Return the missing number. Remember that the sum of the first n natural numbers is `n*(n+1)/2`.",
        template: "def missing_number(nums):\n    # your code here\n    pass",
        testCases: [
            { input: "[3,0,1]", expectedOutput: "2" },
            { input: "[9,6,4,2,3,5,7,0,1]", expectedOutput: "8" }
        ]
    },
    {
        title: "Valid Palindrome",
        description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
        difficulty: "Easy",
        category: "Python",
        type: "Algorithm",
        xpReward: 70,
        instructions: "Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
        template: "def is_palindrome(s):\n    # your code here\n    pass",
        testCases: [
            { input: "\"A man, a plan, a canal: Panama\"", expectedOutput: "true" },
            { input: "\"race a car\"", expectedOutput: "false" }
        ]
    },
    {
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        difficulty: "Easy",
        category: "Python",
        type: "Algorithm",
        xpReward: 80,
        instructions: "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        template: "def two_sum(nums, target):\n    # your code here\n    pass",
        testCases: [
            { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
            { input: "[3,2,4], 6", expectedOutput: "[1,2]" }
        ]
    },
    {
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        difficulty: "Medium",
        category: "Python",
        type: "Algorithm",
        xpReward: 150,
        instructions: "Use a sliding window approach to keep track of the longest valid substring.",
        template: "def length_of_longest_substring(s):\n    # your code here\n    pass",
        testCases: [
            { input: "\"abcabcbb\"", expectedOutput: "3" },
            { input: "\"bbbbb\"", expectedOutput: "1" }
        ]
    },
    {
        title: "Merge Intervals",
        description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
        difficulty: "Medium",
        category: "Python",
        type: "Visual",
        xpReward: 160,
        instructions: "Return an array of the non-overlapping intervals that cover all the intervals in the input.",
        template: "def merge_intervals(intervals):\n    # your code here\n    pass",
        testCases: [
            { input: "[[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]" },
            { input: "[[1,4],[4,5]]", expectedOutput: "[[1,5]]" }
        ]
    },
    // JAVASCRIPT
    {
        title: "FizzBuzz",
        description: "Write a program that outputs the string representation of numbers from 1 to n.",
        difficulty: "Easy",
        category: "JavaScript",
        type: "Algorithm",
        xpReward: 50,
        instructions: "Return 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, 'FizzBuzz' for multiples of both, and the number itself otherwise.",
        template: "function fizzBuzz(n) {\n    // your code here\n}",
        testCases: [
            { input: "3", expectedOutput: "[\"1\",\"2\",\"Fizz\"]" },
            { input: "5", expectedOutput: "[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"]" }
        ]
    },
    {
        title: "Remove Duplicates from Sorted Array",
        description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.",
        difficulty: "Easy",
        category: "JavaScript",
        type: "Algorithm",
        xpReward: 60,
        instructions: "The relative order of the elements should be kept the same. Return the length of the unique elements.",
        template: "function removeDuplicates(nums) {\n    // your code here\n}",
        testCases: [
            { input: "[1,1,2]", expectedOutput: "2" },
            { input: "[0,0,1,1,1,2,2,3,3,4]", expectedOutput: "5" }
        ]
    },
    {
        title: "Maximum Subarray",
        description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        difficulty: "Medium",
        category: "JavaScript",
        type: "Visual",
        xpReward: 120,
        instructions: "Kadane's algorithm is highly recommended for solving this efficiently in O(n) time.",
        template: "function maxSubArray(nums) {\n    // your code here\n}",
        testCases: [
            { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
            { input: "[1]", expectedOutput: "1" }
        ]
    },
    {
        title: "Climbing Stairs",
        description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        difficulty: "Easy",
        category: "JavaScript",
        type: "Algorithm",
        xpReward: 80,
        instructions: "Calculate the Fibonacci sequence up to n, as each step is the sum of the previous two combinations.",
        template: "function climbStairs(n) {\n    // your code here\n}",
        testCases: [
            { input: "2", expectedOutput: "2" },
            { input: "3", expectedOutput: "3" }
        ]
    },
    {
        title: "Best Time to Buy and Sell Stock",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day.",
        difficulty: "Easy",
        category: "JavaScript",
        type: "Algorithm",
        xpReward: 90,
        instructions: "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        template: "function maxProfit(prices) {\n    // your code here\n}",
        testCases: [
            { input: "[7,1,5,3,6,4]", expectedOutput: "5" },
            { input: "[7,6,4,3,1]", expectedOutput: "0" }
        ]
    },
    {
        title: "Container With Most Water",
        description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
        difficulty: "Medium",
        category: "JavaScript",
        type: "Visual",
        xpReward: 140,
        instructions: "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        template: "function maxArea(height) {\n    // your code here\n}",
        testCases: [
            { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" },
            { input: "[1,1]", expectedOutput: "1" }
        ]
    },
    // DATA STRUCTURES
    {
        title: "Invert Binary Tree",
        description: "Given the root of a binary tree, invert the tree, and return its root.",
        difficulty: "Easy",
        category: "Data Structures",
        type: "Algorithm",
        xpReward: 100,
        instructions: "Swap the left and right child of all nodes in the tree.",
        template: "function invertTree(root) {\n    // your code here\n}",
        testCases: [
            { input: "[4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]" },
            { input: "[2,1,3]", expectedOutput: "[2,3,1]" }
        ]
    },
    {
        title: "Linked List Cycle",
        description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
        difficulty: "Easy",
        category: "Data Structures",
        type: "Visual",
        xpReward: 110,
        instructions: "Use Floyd's Cycle-Finding Algorithm (Tortoise and Hare) to determine if a cycle exists.",
        template: "function hasCycle(head) {\n    // your code here\n}",
        testCases: [
            { input: "[3,2,0,-4], pos = 1", expectedOutput: "true" },
            { input: "[1,2], pos = 0", expectedOutput: "true" }
        ]
    },
    {
        title: "Merge Two Sorted Lists",
        description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
        difficulty: "Easy",
        category: "Data Structures",
        type: "Algorithm",
        xpReward: 90,
        instructions: "The list should be made by splicing together the nodes of the first two lists.",
        template: "function mergeTwoLists(list1, list2) {\n    // your code here\n}",
        testCases: [
            { input: "[1,2,4], [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" },
            { input: "[], []", expectedOutput: "[]" }
        ]
    },
    {
        title: "Valid Parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        difficulty: "Easy",
        category: "Data Structures",
        type: "Algorithm",
        xpReward: 80,
        instructions: "Use a Stack data structure to keep track of opening and closing brackets.",
        template: "function isValid(s) {\n    // your code here\n}",
        testCases: [
            { input: "\"()\"", expectedOutput: "true" },
            { input: "\"()[]{}\"", expectedOutput: "true" }
        ]
    },
    {
        title: "Reverse Linked List",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        difficulty: "Easy",
        category: "Data Structures",
        type: "Visual",
        xpReward: 100,
        instructions: "Change the next pointer of each node to point to the previous node.",
        template: "function reverseList(head) {\n    // your code here\n}",
        testCases: [
            { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
            { input: "[1,2]", expectedOutput: "[2,1]" }
        ]
    },
    {
        title: "Binary Tree Level Order Traversal",
        description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
        difficulty: "Medium",
        category: "Data Structures",
        type: "Algorithm",
        xpReward: 150,
        instructions: "Use a Queue to keep track of nodes at the current level before moving to the next level.",
        template: "function levelOrder(root) {\n    // your code here\n}",
        testCases: [
            { input: "[3,9,20,null,null,15,7]", expectedOutput: "[[3],[9,20],[15,7]]" },
            { input: "[1]", expectedOutput: "[[1]]" }
        ]
    },
    // ALGORITHMS
    {
        title: "Search Insert Position",
        description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.",
        difficulty: "Easy",
        category: "Algorithms",
        type: "Algorithm",
        xpReward: 70,
        instructions: "You must write an algorithm with O(log n) runtime complexity.",
        template: "function searchInsert(nums, target) {\n    // your code here\n}",
        testCases: [
            { input: "[1,3,5,6], 5", expectedOutput: "2" },
            { input: "[1,3,5,6], 2", expectedOutput: "1" }
        ]
    },
    {
        title: "First Bad Version",
        description: "You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.",
        difficulty: "Easy",
        category: "Algorithms",
        type: "Algorithm",
        xpReward: 90,
        instructions: "Implement a function to find the first bad version. You should minimize the number of calls to the API.",
        template: "var solution = function(isBadVersion) {\n    return function(n) {\n        // your code here\n    };\n};",
        testCases: [
            { input: "n = 5, bad = 4", expectedOutput: "4" },
            { input: "n = 1, bad = 1", expectedOutput: "1" }
        ]
    },
    {
        title: "Binary Search",
        description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
        difficulty: "Easy",
        category: "Algorithms",
        type: "Visual",
        xpReward: 80,
        instructions: "You must write an algorithm with O(log n) runtime complexity.",
        template: "function search(nums, target) {\n    // your code here\n}",
        testCases: [
            { input: "[-1,0,3,5,9,12], 9", expectedOutput: "4" },
            { input: "[-1,0,3,5,9,12], 2", expectedOutput: "-1" }
        ]
    },
    {
        title: "Jump Game",
        description: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.",
        difficulty: "Medium",
        category: "Algorithms",
        type: "Algorithm",
        xpReward: 130,
        instructions: "Return true if you can reach the last index, or false otherwise.",
        template: "function canJump(nums) {\n    // your code here\n}",
        testCases: [
            { input: "[2,3,1,1,4]", expectedOutput: "true" },
            { input: "[3,2,1,0,4]", expectedOutput: "false" }
        ]
    },
    {
        title: "Unique Paths",
        description: "A robot is located at the top-left corner of a m x n grid. The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid.",
        difficulty: "Medium",
        category: "Algorithms",
        type: "Visual",
        xpReward: 150,
        instructions: "How many possible unique paths are there?",
        template: "function uniquePaths(m, n) {\n    // your code here\n}",
        testCases: [
            { input: "3, 7", expectedOutput: "28" },
            { input: "3, 2", expectedOutput: "3" }
        ]
    },
    {
        title: "Coin Change",
        description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.",
        difficulty: "Medium",
        category: "Algorithms",
        type: "Algorithm",
        xpReward: 160,
        instructions: "Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
        template: "function coinChange(coins, amount) {\n    // your code here\n}",
        testCases: [
            { input: "[1,2,5], 11", expectedOutput: "3" },
            { input: "[2], 3", expectedOutput: "-1" }
        ]
    },
    {
        title: "Word Break",
        description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
        difficulty: "Medium",
        category: "Algorithms",
        type: "Algorithm",
        xpReward: 170,
        instructions: "Note that the same word in the dictionary may be reused multiple times in the segmentation.",
        template: "function wordBreak(s, wordDict) {\n    // your code here\n}",
        testCases: [
            { input: "\"leetcode\", [\"leet\",\"code\"]", expectedOutput: "true" },
            { input: "\"applepenapple\", [\"apple\",\"pen\"]", expectedOutput: "true" }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Warning: we keep the initial 2 challenges if user desires or we clear. I will just insert to keep existing safe
        await Challenge.insertMany(challenges);

        console.log('Added 25 new unique challenges!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();
