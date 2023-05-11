# SutureLogs - Frontend

#### Geeks for Geeks - Solving for India Hackathon 2023

## Problem Statement

There is a lack of a centralised platform to share detailed surgical logs and outcomes, making it challenging for surgeons to learn from each other's experiences, identify areas for improvement, and stay up-to-date with the latest developments in the field. As a result, there is a need for a solution that can streamline the process of recording and sharing surgical logs, while also fostering collaboration and promoting knowledge sharing among surgeons.

## Methodology

Our solution comprises several key features :

1.  **Surgical Logs**: Our platform provides a comprehensive record of all surgical procedures performed, including procedural videos, patient vitals that are synced with the video, AI-generated surgery transcripts, and patient details. These logs serve as a vital resource for monitoring and analyzing surgical outcomes and advancing the field of surgery.

2.  **Community**: Our platform fosters a community of medical professionals who can collaborate and share their expertise through our discussion feature. This promotes ongoing learning and keeps practitioners up to date with the latest surgical methods and techniques.

3.  **Learn**: To facilitate learning, our platform offers the ability to learn from surgeries through our AI-generated quizzes and flashcards. These features allow medical professionals to engage with surgical procedures in a dynamic and interactive manner, further enhancing their knowledge and skills.

## Result

-   Browse Page
    ![Browse Page](https://i.imgur.com/BoJrYnv.png)

-   Surgery and Patient Details
    ![Log Base page](https://i.imgur.com/MJKIEgx.png)

-   Surgery Procedure Video and Patient Vitals
    ![Log Log page](https://i.imgur.com/YIwQoAz.png)

-   Discussion Page
    ![Discussion Page](https://i.imgur.com/lTU1yk9.png)

-   Learn from Surgeries through AI generated quizzes and flashcards
    ![Learn](https://i.imgur.com/UxxisVG.png)

## Technologies Used

The frontend is using the following technologies:

-   SvelteJS
-   TailwindCSS
-   DaisyUI
-   Hosted on Google Cloud AMD T2D Instance

## Setup

To get started with the project, follow these steps:

1.  Clone the repository: `git clone https://github.com/SutureLogs/frontend`
2.  Install dependencies: `npm install`
3.  Start the server: `npm run start`

## Submission Video

[https://youtu.be/qRUZjKnmgAw](https://youtu.be/qRUZjKnmgAw)

## Backend Repository

The backend code for the project is hosted here [https://github.com/SutureLogs/backend](https://github.com/SutureLogs/backend), check it out for more details

## Transcribe Server

The backend relies on a Flask server to generate the transcriptions for the surgery videos, the code is hosted here https://github.com/SutureLogs/transcribe
