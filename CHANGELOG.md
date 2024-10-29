2024-11-XX:
- Migrate to expo-router, with lot of cleaning e.g. no more hardcoded back button
- Header with logo
- Very simple user management (with local storage)
- Welcome screen and tutorial
- i8n text
- New styles

2024-05-31:
- Adding prettier pickers supporting logos

2024-05-27:
- Supporting multiple languages
- Adding catalog tab

2024-04-02:
- Adding ability to filter stories by language from LibraryFilter and clean settings page

2024-03:
- Adding reading mode
- Adding delete story
- Immersive mode: hide back, home controls
- Cleaning:
  - Code around showTranslation, started showing translation when passthrough, and hiding for previous sents in current round
  - Fixing language pickers in settings for Android: widths and colours
  - Starting Google sign in

2023-12-26:
- Better sentencization:
  - We used to join all text, then split with spaCy sentencizer. Now relying on subtitles splits, and joining "..." or starting with lowercase
  - Split into two sents if "\n" found
- Better vocabulary generation. Adding extra words to complement spacy.vocab.strings, based on 1) wordnet, 2) unimorph
- Better answer generation. Now can mask sentences with only one maskable token but multiple non-maskable (but still valid tokens i.e. alpha and len <=2)
- Translating texts in Colab: https://colab.research.google.com/drive/182W-BRAL8cyQ3xFn-M-CdeTDE9uyGj-L#scrollTo=ZYEGSAWziUJY


2023-10-31:
- Adding show totals and avoid editing > total
- Moving languages to the settings screen and filter by language
- Dirty fix to scroll when omitted sentence


2023-10-11:
- Adding ability to import data to filesystem (only Android)
- Still some repeated and 1 word sentences (strip "-" at the end of sentences)
- Still some english words in vocab
- Checking if complete and show Completed
- Copying to clipboard when holding sentence

2023-09-11:
- Adding backButton when adding new story
- Improving stories:
  - Replacing ˝ and similar to split sents better 
  - Using large spaCy model to split sents better
  - Removing consecutive duplicate sents
  - Keeping but bypass single word sentences
- Improving vocab:
    - Removing 1 character words
    - Adding hardcoded list of English false positives
- Improving answers:
  - Token to mask: 
      - Only in vocab
      - If uppercase and not starting sent, remove from negative pool
  - Wrong answers:
    - using spaCy tags to choose words with the same tag

2023-08-28:
- Adding edit story
- Fixing scrolling when tapping to translate
- Removing status when no leaf story
- Adding "bypassable" sents

2023-08-13:
- First usable release 🎉

...

2023-04-25:
- First build

2023-03-01
- Starting more seriously

2022-12-16
- Created expo app