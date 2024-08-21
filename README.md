Disclaimer: this repo is very far from production code, but hey, my first react native project, and it works(*)! 💪

(*) at least on Android and web

# What's this

This is a language learning app, inspired by [Cloze Master](https://www.clozemaster.com/), a popular mobile app for learning languages. The twist here is to learn from movies, tv series, and books, i.e. from stories. While `Cloze Master`'s motto is to *learn in context*, one still learns from sentences coming in a random order, from a dictionary of millions of sentences. Instead, here we follow stories, leading to interesting multi-sentence episodes.

This app does not help in learning the basics of a language. You won't learn grammar or basic vocabulary, but simply practice/extend vocabulary and see applications of what you already know. Consequently, it is recommended for language learners with **at least an A2 level**.

Please note that there are still a ton of features to be implemented, see [Pending work](#pending-work) section for more details. Bare with me , I'll get there!

# Table of Contents

- [Running](#running)
- [Debugging](#debugging)
- [Building](#building)
- [Pending work](#pending-work)

To install, run `npm install`

# Running

To start the app, `npm start`

To run it offline `npx expo start --offline`

# Debugging
Running react-dev-tools. In a separate terminal, run `react-dev-tools`. This should open a new window

# Building

## First time

* `npm install --global eas-cli`
* `eas init --id a9...`
* `eas build:configure`

## Once everything configured

Just run `eas build -p android --profile preview`, and wait for some time (> 10min):
```bash
~/...../caption-master ❯ eas build -p android --profile preview
✔ Using remote Android credentials (Expo server)
✔ Using Keystore from configuration: Build Credentials y-NTnpaOgo (default)

Compressing project files and uploading to EAS Build. Learn more
✔ Uploaded to EAS 2s

Build details: https://expo.dev/accounts/marc.torsoc/projects/caption-master/builds/cb2dfa67-5f3e-4b45-afd6-6afcbc8ecfc0
```

# Pending work

- Add Welcome screen first time and as a button with icon=(?) in headerRight to open again
- Add splash screen with more elaborated logo
- Detect clean sheets and react-native-confetti
- Disable immersive mode by default, and add to settings to enable. Remove status bar as well in immersive mode
- Create logo of the app and add to use
- Change all mentions of caption-master to lingua-quest and LinguaQuest
- i8n app (choose english, spanish or catalan in the welcome screen and save). Suggest the one configured in the phone. Add setting to change language of the app too

- Track usage of the app
    - Stories completed
    - Number of sentences done
    - Number of clean sheets (total and per story)
    - Strikes (consecutive days using)

- Review immersive mode
    - Hide status bar when immersive mode is on
- in `sentenceLongPressHandler`
    - ask if translate or copy to clipboard
    - if translate, GET to "https://clients5.google.com", get the translation and overwrite
- Add ability to sort stories by last time played, and then by name in SortAndFilter. But allow to keep sorting just by name.

- Tech debt i8n
    - Add tooltip to catalog item's corner to show num episodes and other
    information
    - Add logo for movie / tv series / book to story cards in both catalog and library
- Search for better translation models for
    - ca -> es
- Finish filter once new data with movies / books is added
- Add ability to add stories from Google Drive
- Add refreshControl to refresh stories by pulling down in LibraryOutput
- Add modal to select what data to reset, and what data to load
- Use react-native-paper
- Change fonts VScode like in Bootcamp
- Add tests
- GH actions to auto-release with every push to master

