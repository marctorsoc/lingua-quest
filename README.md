# LinguaQuest: Learn a Language Through Stories! 📚

LinguaQuest is a unique app that helps you build vocabulary and comprehension by immersing you in stories from your favorite movies, TV series, and books. Inspired by [ClozeMaster](https://www.clozemaster.com/) and contextual learning, LinguaQuest lets you follow narratives, helping you learn in a sequential context for a more natural language experience.

Disclaimer: this is far from production code, but hey, my first react native project, and multi-platform! (*)! 💪

(*) only tested on Android and web

# 🌟 Key Features:

* Story-Based Learning: Learn through engaging, real-world stories that keep you interested and motivated.
* Two Practice Modes: Choose Reading Mode to enjoy the story without interaction or Standard Mode for challenging fill-in-the-blank exercises.
* Advanced Vocabulary Building: Perfect for intermediate learners (A2 level or above) looking to expand beyond basic vocabulary.
* Support for Multiple Languages: LinguaQuest currently helps you learn English, Spanish, Catalan and Lithuanian. The app menus are also available in these four languages, whereas stories have translations to English and Spanish. More languages coming soon!

# 🔹 Who is LinguaQuest for? 

LinguaQuest is ideal for language learners with some foundation in the language. This app doesn’t cover basic grammar or beginner vocabulary but instead focuses on vocabulary expansion and contextual understanding. It’s great for intermediate to advanced learners aiming to deepen their knowledge.

# 💡 How to Use LinguaQuest

* Reading Mode: Simply follow the story, absorbing vocabulary as you go.
* Standard Mode: Challenge yourself by filling in blanks with the correct words from four options. The distractor words are thoughtfully chosen, so it can be tough—even for native speakers!
* For Movies/TV Stories: Refresh your memory by re-watching before starting. LinguaQuest doesn’t show scene transitions or speaker names, so familiarity with the story helps you stay on track.

Experience language learning in a new way with LinguaQuest. Dive into the stories you love and enhance your language skills through engaging, contextual practice. Start your language journey today!

# Short note on status

Please note that there are still a ton of features to be implemented, see [Pending work](#pending-work) section for more details.

It seems to grow faster than I can implement them, so if you want to contribute, please create an issue! This does not mean you'll need to code it. It can give me ideas too.

# Table of Contents

- [Running](#running)
- [Debugging](#debugging)
- [Building](#building)
- [Updating translations](#updating-translations)
- [Creating logos](#creating-logos)
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

Build details: https://expo.dev/accounts/marc.torsoc/projects/lingua-quest/builds/cb2dfa67-5f3e-4b45-afd6-6afcbc8ecfc0
```

# Updating translations

Go to `raw.js` and update. Then run `node raw.js` to generate all `$language.json` files.

# Creating logos

* Dall-E creates images, but they webp
* Transform images from webp to png + crop with [ezgif](https://ezgif.com/webp-to-png)
* Use [remove.bg](https://www.remove.bg/) to remove background, and remove objects
* To create consistent characters, see [this](https://www.youtube.com/watch?v=Sc2f2oTaR7U)

# Pending work

- Start with app language from the the one configured in the phone
- Disable immersive mode by default, and add to settings to enable. Remove status bar as well in immersive mode
- re-enable confetti. Right now makes it too slow on Android
- Update picker to see if warnings go out. Otherwise, silence warnings
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
- Implement better alerts that allow long messages
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


