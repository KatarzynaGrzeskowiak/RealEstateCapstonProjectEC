# What is it ?

Here is a capstone project I made during participation in Front-End Q1 2025 epam course

## Goal:
My task was to create a web application using HTML, CSS, and JavaScript to practice your core web development skills. I was required to avoid using JavaScript frameworks (e.g., React, Angular) or CSS frameworks (e.g., Bootstrap).


## Options:
I could choose one of the following projects:
Option 1: Online Learning Platform
Create a web application for an online learning platform that allows users to browse and enroll in courses. The platform should include course information such as titles, instructors, difficulty levels, and topics, along with photos. Highlight user interactions by adding features like a course list, search functionality, and tools for exploring the course catalog. The landing page should feel visually organized with responsive layouts, a gallery for presenting course-related images, and intuitive navigation. Use interactive elements such as pagination, sorting, and filtering to help users explore course data efficiently.

Option 2: Real Estate Website
Develop a web application for a real estate listing website where users can search properties available for sale or rent. The site should display detailed property information such as price, size, location, and amenities, along with photos. Enhance user experience by providing a dynamic gallery for property images, a search function to quickly find listings, and pagination to navigate between listing pages. A map should indicate the property location, making geographic information easily accessible. Ensure the layout is responsive and visually appealing on different devices.

I choose Real Estate Website

## Data and assets:
*	The data used in the application was created by me in JSON format. There was at least 11 items (elements), and the data was stored locally (not fetched from external APIs).
*	Images in your project are free for using.

# Web Application Development

My web application follows the general requirements described below and structures my HTML, CSS, and JavaScript code effectively. The application uses HTML, CSS, and JavaScript to create a dynamic and user-friendly experience.

## HTML & CSS part

*	Create semantic HTML markup using tags like <header>, <footer>, <article>, <nav>, <ul>, <li>, etc., for structured content organization.

*	Implement styles using Sass: utilize mixins, variables, and Sass inheritance to simplify and organize styles.

*	Apply Flexbox and/or CSS Grid layouts to arrange elements effectively.

*	The “Home” page should contain an image slider and a navigation menu:

*	Implement a submenu in the main menu using proper tags (<nav>, <ul>, <li>, <a>).

*	Ensure the menu block stretches across the available space (responsive design). If necessary, menu can be displayed on different devices in different ways.

*	Ensure the web application is responsive: use media queries to adjust layout and styles so that the design works on all devices and avoids horizontal scrolling when resizing the browser window.

## JavaScript part

*	Implement a "Gallery" page that displays a set of cards featuring courses or properties (depending on the selected project option). Each card should display an image with 300 x 300 px dimensions along with all relevant information provided in the data (JSON) file. Handle varying original image sizes by ensuring proper scaling or cropping.

*	Add client-side pagination to display data page-by-page (maximum of 10 elements per page). Include navigation controls for users to access other pages. Additionally, implement asynchronous loading for elements that are initially hidden. These elements should load dynamically when the user clicks a “Show more” button.

*	Add functionality to enable sorting and filtering of data on designated pages.

*	Provide functionality to search information across the data provided.

*	Include a "Contacts" page with a map indicating a specific location. Use JavaScript to integrate a map service like Google Maps or OpenStreetMap.

