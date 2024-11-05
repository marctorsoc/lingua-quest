Disclaimer: this is far from production code, but hey, my first frontend project, and multi-platform! (*)! 💪

(*) only tested on Android and web

# What's this

This is a language learning app, inspired by [Cloze Master](https://www.clozemaster.com/), a popular app for learning languages. The twist here is to learn from movies, tv series, and books, i.e. from stories. While `Cloze Master`'s motto is to *learn in context*, one still learns from sentences coming in a random order, from a dictionary of millions of sentences. Instead, here we follow stories, *learning in a sequential context*.

# Who is this for?

This app does not help in learning the basics of a language. It is recommended for language learners with **at least an A2 level**. You won't learn grammar or basic vocabulary, but practice/extend vocabulary and see applications of what you already know.

# How to use?

As of writing, there are two modes: reading mode, and standard mode. In reading mode, you'll just be reading without any interaction. In standard mode, you'll be tasked with filling the gap in the sentence with one of the 4 options presented. Please note that the standard mode can be hard, even for natives! That's because the wrong answers are not simply random. I plan to add `easy` mode in the future. For those days where you don't feel like a challenge, but still want to continue the story :)

In case of movies / tv series, I strongly recommend to re-watch them before starting the story in `Lingua Quest`, unless you know it by heart, e.g. me with `Back to the Future`. Take into account that reading only subtitles will exclude all the scenes without dialogues, or suddenly change location and characters from one sentence to the next. At the moment, we don't even have an indication of who is the speaker. For all these reasons, the story might be hard to follow at times. 

# Short note on status

Please note that there are still a ton of features to be implemented, see [Pending work](#pending-work) section for more details.

It seems to grow faster than I can implement them, so if you want to contribute, please create an issue! This does not mean you'll need to code it. It can give me ideas too.

# Table of Contents

- [Running](#running)
- [Debugging](#debugging)
- [Building](#building)
- [Updating translations][#updating-translations]
- [Pending work](#pending-work)

To install, run `npm install`

# Running

To start the app, `npm start`. This requires a working Internet connection.

To run it offline `npx expo start --offline`

# Debugging
Running react-dev-tools. In a separate terminal, run `react-dev-tools`. This should open a new window.

# Building

## First time

Follow https://docs.expo.dev/build/introduction/. Summary:

* `npm install --global eas-cli`
* `eas init --id a9...` (you will need to create an account on expo.dev)
* `eas build:configure`

## Once everything configured

Just run `eas build -p android --profile preview`, and wait for some time (> 10min):
```bash
~/...../lingua-quest ❯ eas build -p android --profile preview
✔ Using remote Android credentials (Expo server)
✔ Using Keystore from configuration: Build Credentials y-NTnpaOgo (default)

Compressing project files and uploading to EAS Build. Learn more
✔ Uploaded to EAS 2s

Build details: https://expo.dev/accounts/marc.torsoc/projects/caption-master/builds/cb2dfa67-5f3e-4b45-afd6-6afcbc8ecfc0
```

# Updating translations

Go to `raw.js` and update. Then run `node raw.js` to generate all `$language.json` files.

# Pending work

- Add tutorial after Welcome (first time mandatory, later as optional) and as a button in settings

- Remove values in welcome form when logout

- Update App language in settings picker when changing user

- Set default values in settings when new user

- Update picker to see if warnings go out. Otherwise, silence warnings

- Translate texts in getNextButtonMessage


----------- ENOUGH FOR GOOGLE PLAY ---------

- Start with app language from the the one configured in the phone
- Disable immersive mode by default, and add to settings to enable. Remove status bar as well in immersive mode
- re-enable confetti. Right now makes it too slow on Android
- Fix selected app language in settings when loading another user. There
is some code comment that creates an infinite loop
- Show translations for answers when reviewing if clicked
(need first to get translations from the backend)
- Add dark mode. Tips in https://www.youtube.com/watch?v=zuFh9lfb4HY
- Use google fonts, see https://www.youtube.com/watch?v=zuFh9lfb4HY
- Add splash screen with 2secs delay and more elaborated logo
- Pickers
    - when no label for each option, center icons and remove check

- Make header back in ManageStory remove storyLongPressed
- Add ability to add stories from Google Drive
- Allow edit for stories within folders (it gets selected but the header is not updated to show the icon)
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

- Tech debt Catalog
    - Add tooltip to catalog item's corner to show num episodes and other information
    - Add logo for movie / tv series / book to story cards in both catalog and library
- Finish filter once new data with movies / books is added
- Add refreshControl to refresh stories by pulling down in LibraryOutput
- Use react-native-paper
- Change fonts VScode like in Bootcamp
- Add tests
- GH actions to auto-release with every push to master

