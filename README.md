# BotAI - Chatbot

BotAI is a chatbot web application created as part of the **Crio.Do's Front End Development module**, aimed at providing users with an intuitive interface to chat with an AI model, give feedback, and view past conversations. The application is built using **ReactJS** and implements a simple yet effective UI/UX design. 

This project assesses front-end development skills by creating an easy-to-navigate and well-designed web application using modular and testable code. The requirements and constraints for the project were provided as part of the course.

## Features

- Chat with an AI model using ***mocked responses from a JSON file***.
- Provide feedback for the AI's responses:
  - Thumbs up or thumbs down on AI's responses.
  - Rating out of 5 at the end of the conversation.
  - Subjective feedback on the entire conversation.
- Save multiple conversations and revisit them with all feedback included.
- View a comprehensive table of feedback points across all conversations.
- Responsive UI/UX ensuring optimal usability on any device.

## Tech Stack

- **ReactJS**: Framework for building the front-end.
- **CSS**: For custom styling.
- **Material UI (MUI)**: To leverage modern UI components and maintain consistency.
- **Vercel**: Deployment platform for hosting the project.
- **Local Storage**: Persist conversations for revisitation.

## Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Sai-Karthik9113/bot-ai.git
   ```

2. Navigate to the project directory:
    ```bash
    cd bot-ai
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

To start the development server, run:
```
npm start
```

Open your browser and go to `http://localhost:3000` to view the application.

## Screenshots & GIFs

1. **Homepage (Default View)**  
   The initial interface showing the chatbot greeting and quick-start options.

   ![Homepage][home page]

2. **Active Chat Session**  
   A snapshot of an ongoing conversation between the user and the AI chatbot.

   ![Active Chat][active chat]

3. **Feedback Interface**  
   Users can provide feedback for an AI response or a conversation session here.

   ![Feedback][positive feedback]

   ![Feedback][improvement feedback]

4. **Past Conversations**  
   A view showing previously saved conversations and associated feedback.
   
   ![Past Conversations][past conversations]

5. **Filter/Sort Feedback View**  
   Display of a feedback table with sorting and filtering options.

   ![Feedback View][filter]

## Trade-offs and Future Enhancements

### Trade-offs
- **Data Persistence**: Conversations are stored using localStorage, which limits scalability and multi-user access.
- **Backend**: This project intentionally excludes a backend to simplify the setup.

### Future Updates/Enhancements
- **Seamless AI Interaction**: Enhance the chatbot's response mechanism to make it appear more natural, mimicking real-time AI interactions.
- **Typing Animation**: Introduce a typing animation for the AI to simulate human-like response behavior, improving the user experience.

### Other Planned Enhancements
1. Add backend support for robust data storage and real-time interactions.
2. Include light/dark mode toggle for enhanced user customization.
3. Improve the AI by integrating an API for real-time responses.
4. Enhance UI with advanced animations and transitions for better interactivity.

## License

This project is licensed under the MIT License.

[home page]: src/Assets/Screenshots/HomePage.png
[active chat]: src/Assets/Screenshots/20241223-0454-07.5590717_1.gif
[positive feedback]: src/Assets/Screenshots/20241223-0455-00.4340522_1.gif
[improvement feedback]: src/Assets/Screenshots/20241223-0501-18.3271286_1_1.gif
[past conversations]: src/Assets/Screenshots/ConversationHistory.png
[filter]: src/Assets/Screenshots/20241223-0506-48.5371134_1_1.gif