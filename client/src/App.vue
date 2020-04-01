<template>
  <v-app>
    <v-app-bar app>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row class="ma-12">
        <v-text-field label="Nom" v-model="nom"></v-text-field>
      </v-row>
        <v-row class="ma-12">
          <v-text-field label="Prénom" v-model="prenom"></v-text-field>
        </v-row>
        <v-row class="ma-12">
          <v-text-field label="Champ Random" v-model="random"></v-text-field>
        </v-row>
        <v-row class="ma-12">
          <v-btn @click="onSend()">Envoyer</v-btn>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data: () => ({
    nom: '',
    prenom: '',
    random: ''
  }),
  methods: {
    onSend() {
      const data = {
        channelID: '686365397666234370',
        message: [
                ['**__Nom:__**', this.nom],
                ['**__Prénom:__**', this.prenom],
                ['**__Champ Random:__**', this.random]
        ]
      };

      axios.post('http://localhost:4343/', data);
    }
  }
};
</script>
