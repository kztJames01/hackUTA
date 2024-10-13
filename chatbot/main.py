import streamlit as st
import os
from openai import OpenAI

# Set the title of the Streamlit app
st.title("Furever Home Support Bot")

# Initialize OpenAI client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)

# Hide the settings icon
hide_streamlit_style = """
      <style>
      #MainMenu {visibility: hidden;}
      .stAppDeployButton {visibility: hidden;}
      </style>
      """
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

# Set a default model
if "openai_model" not in st.session_state:
    st.session_state["openai_model"] = "gpt-3.5-turbo"

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Accept user input
if prompt := st.chat_input("What is up?"):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})

    # Display user message in chat message container
    with st.chat_message("user"):
        st.markdown(prompt)

    # Create a container for the assistant's response
    with st.chat_message("assistant"):
        response_container = st.empty()

        # Initialize an empty response
        response_text = ""

        try:
            # Stream the assistant response using the latest OpenAI API method
            response = client.chat.completions.create(
                model=st.session_state["openai_model"],
                messages=[
                    {"role": m["role"], "content": m["content"]}
                    for m in st.session_state.messages
                ],
                stream=True,
            )

            for chunk in response:
                if "choices" in chunk:
                    delta = chunk["choices"][0]["delta"]
                    if "content" in delta:
                        response_text += delta["content"]
                        response_container.markdown(response_text)
        except Exception as e:
            response_container.markdown(f"Error: {str(e)}")

        # Add assistant's response to chat history
        st.session_state.messages.append(
            {"role": "assistant", "content": response_text}
        )
