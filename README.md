# AI Chatbot Project

## Overview

This project is a web-based AI chatbot application designed to facilitate user interaction and provide helpful responses to user queries. It includes features for conversation history, user ratings, and feedback.

## Features

- **Chat Interface**: A user-friendly interface for users to ask questions and receive answers from the AI.
- **Conversation History**: Displays previous conversations, allowing users to revisit past interactions.
- **Rating System**: Users can rate the AI responses on a scale of 1 to 5 stars, along with the option to provide feedback.
- **Session Management**: Manages user sessions and stores conversation data in `localStorage`, allowing users to switch between different sessions.

## Components

### 1. `OldConversations`
- **Description**: Displays the history of user conversations with the AI.
- **Features**:
  - Renders user questions and AI answers.
  - Shows timestamps for each interaction.
  - Displays user ratings and feedback, if available.
  
### 2. `ConversationHistoryPage`
- **Description**: The main page where users can view their conversation history and filter it based on ratings.
- **Features**:
  - Allows users to filter conversations by star rating.
  - Displays a message when no conversations match the selected rating.

## Technologies Used

- **React**: For building the user interface.
- **Material-UI**: For UI components, including the Rating component.
- **CSS Modules**: For scoped styling of components.
- **Local Storage**: To store session data and conversation history.

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
