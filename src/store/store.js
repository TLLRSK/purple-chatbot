import { createStore } from 'vuex';
import { botProfileData, dropdownMenuOptionsData, chatOptionsList, botResponsesData } from '../data';

export const store = createStore({
  state() {
    return {
      isChatbotOpen: true,
      isCtoOpen: true,
      isChatWindowOpen: false,
      isProcessingMessage: false,
      botProfile: botProfileData,
      dropdownMenuOptions: dropdownMenuOptionsData,
      messagesLog: [
        {
          author: "chatbot",
          type: "default",
          content: "¡Hola! Soy Millie de 1MillionBot 🙋🏽‍♀️"
        },
        {
          author: "chatbot",
          type: "default",
          content: "Ya seas particular, empresa o institución, cuéntame tus intereses o necesidades. Así, podré ayudarte mejor. 🌐"
        },
      ],
      currentMessage: {
        content: '',
        author: 'user',
        type: 'default',
      },
      botResponses: botResponsesData,
      chatOptionsList: chatOptionsList,
    };
  },
  mutations: {
    closeCto(state) {
      state.isCtoOpen = false;
    },
    closeChatbot(state) {
      state.isChatbotOpen = false;
    },
    toggleChatbotWindow(state) {
      state.isChatWindowOpen = !state.isChatWindowOpen;
    },
    sendMessage(state) {
      const message = state.currentMessage;
      const formatedMessage = { 
        author: message.author,
        content: message.content,
        type: message.type
      }
      state.messagesLog.push(formatedMessage);
      state.currentMessage.content = '';
    },
    sendResponse(state) {
      const randomIndex = Math.floor(Math.random() * state.botResponses.length);
      const selectedResponse = state.botResponses[randomIndex];
      let formattedResponse = {
        author: "chatbot",
        type: selectedResponse.type,
        content: selectedResponse.content
      };

      state.messagesLog.push(formattedResponse);
    },
  },
  actions: {
    sendMessage({ commit }) {
      commit('sendMessage');
      setTimeout(() => {
        console.log("responding")
        commit('sendResponse');
      }, 2000);
    },
    sendOption({state, commit}, option) {
      state.currentMessage = {...state.currentMessage, content: option.text};
      commit('sendMessage');
      setTimeout(() => {
        commit('sendResponse');
      }, 2000);
    },
    processUserMessage({commit, state}, message) {
      commit('sendMessage');
      console.log("processing message")
      setTimeout(() => {
        state.isProcessingMessage = true;
      }, 500)
      setTimeout(() => {
        state.isProcessingMessage = false;
        commit('sendResponse');
      }, 3000)
    },
    showChatWindow({commit, state}) {
      if (state.isCtoOpen) {
        commit('closeCto');
      }
      commit('toggleChatbotWindow')
    },
  },
});